// tasks/setFeaturedListings.js
const Listing = require('../models/listingModel');
const cron = require('node-cron');
const mongoose = require('mongoose');

const setFeaturedListings = async () => {
	// Unset featured status for all current featured listings
	await Listing.updateMany({ featured: true }, { featured: false });

	// Set featured status for a new set of listings
	const newFeaturedListings = await Listing.aggregate([
		{ $sample: { size: 5 } },
	]);
	const newFeaturedIds = newFeaturedListings.map((listing) => listing._id);
	await Listing.updateMany(
		{ _id: { $in: newFeaturedIds } },
		{ featured: true }
	);
};

// Schedule the task to run every week on Sunday at 12:00 AM (midnight)
cron.schedule('0 0 * * SUN', setFeaturedListings);

module.exports = setFeaturedListings;
