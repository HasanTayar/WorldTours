const express = require('express');
const router = express.Router();
const searchController = require('../Controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware'); // assuming you have this middleware

router.post('/search', authMiddleware, searchController.createSearch);
router.get('/search', authMiddleware, searchController.getUserSearches);

module.exports = router;
