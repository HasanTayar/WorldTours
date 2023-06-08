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

    let tags = req.body.tags;
    let organizerId = req.body.organizerId;
    let name = req.body.name;
    let language = req.body.language;
    let places = req.body.places;
    let priceRange = req.body.priceRange;

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
    }
    if (organizerId) {
      filter.organizerId = organizerId;
    }
    if (name) {
      filter.name = name;
    }
    if (language) {
      filter.language = language;
    }
    if (places && places.length > 0) {
      filter["locations.locationName"] = { $in: places };
    }
    if (priceRange) {
      filter.price = {};
      if (priceRange.lowPrice) {
        filter.price.$gte = Number(priceRange.lowPrice);
      }
      if (priceRange.highPrice) {
        filter.price.$lte = Number(priceRange.highPrice);
      }
    }

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
            tags,
            organizerId,
            name,
            language,
            places,
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
