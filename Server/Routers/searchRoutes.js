const express = require('express');
const router = express.Router();
const searchController = require('../Controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware'); 

router.post('/search', authMiddleware, searchController.createSearch);
router.get('/getSearch', authMiddleware, searchController.getUserSearches);

module.exports = router;
