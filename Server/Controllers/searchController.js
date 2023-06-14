const User = require("../Models/UserModel");
const Tour = require("../Models/TourModel");
const Search = require("../Models/search");

exports.createSearch = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res
      .status(400)
      .json({ success: false, message: "Missing search criteria" });
    return;
  }

  try {
    const filter = {};

    let location = req.body.location;
    let priceRange = req.body.priceRange;
    if (location) {
      let splitLocation = location.split(',')[0].trim();
      filter.$or = [
        { "locations": { $elemMatch: { "locationName": splitLocation } } },
        { name: splitLocation }
      ];
    }
    
    
    if (priceRange) {
      filter.price = {};
      if (priceRange.minPrice) {
        filter.price.$gte = Number(priceRange.minPrice);
      }
      if (priceRange.maxPrice) {
        filter.price.$lte = Number(priceRange.maxPrice);
      }
    }
     console.log(filter);
    const tours = await Tour.find(filter).sort({ orderCount: -1 });

    const uniqueTours = Array.from(new Set(tours.map((tour) => tour._id))).map(
      (id) => tours.find((tour) => tour._id === id)
    );

    if (req.user && req.user._id) {
      const topPicks = uniqueTours.slice(0, 5);
      
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { topPicks: topPicks.map((tour) => tour._id) },
        { new: true }
      );

      const search = await Search.findOneAndUpdate(
        { userId: req.user._id },
        {
          searchCriteria: {
            location,
            priceRange,
          },
          $push: {
            topPicks: { $each: topPicks.map((tour) => tour._id), $slice: -5 },
          },
        },
        { new: true, upsert: true }
      );

      res.status(200).json({ success: true, data: { search, tours: uniqueTours } });
    } else {
      res.status(200).json({ success: true, data: { tours: uniqueTours } });
    }

  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};


exports.getUserSearches = async (req, res) => {
  try {
    const searches = await Search.find({ userId: req.user._id });
    const user = await User.findById(req.user._id).populate("topPicks");

    res.status(200).json({ success: true, data: { searches, topPicks: user.topPicks } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
