const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Listing = require('../models/listingModel');

// @desc    Get featured listings
// @route   GET /api/listings/featured
// @access  Public
const getFeaturedListings = asyncHandler(async (req, res) => {
	const featuredListings = await Listing.find({ featured: true });
	res.status(200).json(featuredListings);
});

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private
const createListing = asyncHandler(async (req, res) => {
	// Check if the user is verified
	console.log(req.user.isVerified);
	if (req.user.isVerified) {
		const listing = new Listing(req.body);
		try {
			await listing.save();
			res.status(201).json(listing);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	} else {
		res
			.status(403)
			.json({ message: 'User is not verified to create listings' });
	}
});

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getAllListings = asyncHandler(async (req, res) => {
	const listings = await Listing.find();
	res.status(200).json(listings);
});

// @desc    Get a specific listing
// @route   GET /api/listings/:id
// @access  Public
const getListingById = asyncHandler(async (req, res) => {
	const listing = await Listing.findById(req.params.id);

	if (listing) {
		res.status(200).json(listing);
	} else {
		res.status(404);
		throw new Error('Listing not found');
	}
});

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private
const updateListing = asyncHandler(async (req, res) => {
	const listing = await Listing.findById(req.params.id);

	if (listing) {
		Object.assign(listing, req.body);

		await listing.save();
		res.status(200).json(listing);
	} else {
		res.status(404);
		throw new Error('Listing not found');
	}
});

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private
const deleteListing = asyncHandler(async (req, res) => {
	const listing = await Listing.findById(req.params.id);

	if (listing) {
		await listing.remove();
		res.status(200).json({ message: 'Listing removed' });
	} else {
		res.status(404);
		throw new Error('Listing not found');
	}
});

// @desc    Search listings with multiple keywords
// @route   GET /api/listings/search?keywords=keyword1+keyword2
// @access  Public
const searchListings = asyncHandler(async (req, res) => {
	const keywords = req.query.keywords ? req.query.keywords.split('+') : [];

	const keywordQueries = keywords.flatMap((keyword) => [
		{ description: { $regex: keyword.trim(), $options: 'i' } },
		{ address: { $regex: keyword.trim(), $options: 'i' } },
		{ city: { $regex: keyword.trim(), $options: 'i' } },
		{ state: { $regex: keyword.trim(), $options: 'i' } },
	]);

	const query = keywords.length > 0 ? { $or: keywordQueries } : {};

	const listings = await Listing.find(query);
	res.status(200).json(listings);
});

module.exports = {
	createListing,
	getAllListings,
	getListingById,
	updateListing,
	deleteListing,
	getFeaturedListings,
	searchListings,
};
