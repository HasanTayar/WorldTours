const mongoose = require('mongoose');

const Search = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  searchCriteria: {
    locations: [
      {
        locationName: String,
        long: Number,
        lat: Number,
      },
      
    ],
    priceRange: {
      lowPrice: Number,
      highPrice: Number,
    },
    
  },
  createdAt: { type: Date, default: Date.now },
});

const UserSearch = mongoose.model('Search', Search);
module.exports = UserSearch;
