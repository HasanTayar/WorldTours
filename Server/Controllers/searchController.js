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
    // Fetch the latest search made by the user
    let latestSearch = await Search.findOne({ userId: req.user._id });

    // Create a filter object based on the search criteria
    const filter = {};

    // Use new search criteria if provided, else use the old one
    let tags =
      req.body.tags || (latestSearch ? latestSearch.searchCriteria.tags : null);
    let organizerId =
      req.body.organizerId ||
      (latestSearch ? latestSearch.searchCriteria.organizerId : null);
    let name =
      req.body.name || (latestSearch ? latestSearch.searchCriteria.name : null);
    let language =
      req.body.language ||
      (latestSearch ? latestSearch.searchCriteria.language : null);
    let places =
      req.body.places ||
      (latestSearch ? latestSearch.searchCriteria.places : null);
    let priceRange =
      req.body.priceRange ||
      (latestSearch ? latestSearch.searchCriteria.priceRange : null);

    if (tags && tags.length > 0) {
      filter.tags = { $in: tags };
      console.log("tags pass");
    }
    if (organizerId) {
      filter.organizerId = organizerId;
      console.log("organizerId pass");
    }
    if (name) {
      filter.name = name;
      console.log("name pass");
    }
    if (language) {
      filter.language = language;
      console.log("language pass");
    }
    if (places && places.length > 0) {
      filter["locations.locationName"] = { $in: places };
      console.log("places pass");
    }
    if (priceRange) {
      filter.price = {};
      console.log("price pass", priceRange);
      if (priceRange.lowPrice) {
        filter.price.$gte = priceRange.lowPrice;
      }
      if (priceRange.highPrice) {
        filter.price.$lte = priceRange.highPrice;
      }
    }

    // Fetch tours based on the filter and sort them by orderCount
    const tours = await Tour.find(filter).sort({ orderCount: -1 });

    // Check if any duplicate tours exist and remove them
    const uniqueTours = Array.from(new Set(tours.map((tour) => tour._id))).map(
      (id) => tours.find((tour) => tour._id === id)
    );

    // Pick the top 5 tours
    const topPicks = uniqueTours.slice(0, 5);

    // Update the user's top picks
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { topPicks: topPicks.map((tour) => tour._id) },
      { new: true }
    );

    // Save the new search to the database
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

    // Send both the search and the tours in the response
    res
      .status(200)
      .json({ success: true, data: { search, tours: uniqueTours } });
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
    const user = await User.findById(req.user._id).populate("topPicks"); // populate the topPicks field

    // Send both the searches and the top picks in the response
    res
      .status(200)
      .json({ success: true, data: { searches, topPicks: user.topPicks } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
