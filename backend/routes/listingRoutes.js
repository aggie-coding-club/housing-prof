const express = require('express');
const router = express.Router();
const {
	createListing,
	getAllListings,
	getListingById,
	updateListing,
	deleteListing,
	getFeaturedListings,
} = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/featured').get(getFeaturedListings);

router.route('/').get(getAllListings).post(protect, createListing);

router
	.route('/:id')
	.get(getListingById)
	.put(protect, updateListing)
	.delete(protect, deleteListing);

module.exports = router;
