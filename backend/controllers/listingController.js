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

// @desc    Filter listings with multiple parameters
// @route   GET /api/listings/filter?price=:price&bedrooms=:bedrooms&bathrooms=:bathrooms&sqft=:sqft&zip=:zip&city=:city&type=:type
// @access  Public
const filterListings = asyncHandler(async (req, res) => {

	// TODO: make parameters have default values 
	
	// Problem: listings is different from Listing, some listings may already be filtered out when filterListings is already called
	// Listing is the model, listings is the filtered listings, they may be different, Listing may have more listings than listings
	// listings may have less than Listing because searchListings may be already called

	// Might need to somehow pass in the current listings as a parameter

	const listings = await Listing.filter(
		(listing) =>
			listing.price <= req.query.price &&
			(req.query.type === 'all' ||
				listing.propertyType === req.query.type) &&
			(req.query.zip === '' || listing.zip === req.query.zip) &&
			(req.query.city === '' ||
				listing.city.toLowerCase() === req.query.city.toLowerCase()) &&
			(req.query.bedrooms === 0 ||
				listing.bedrooms >= req.query.bedrooms) &&
			(req.query.bathrooms === 0 ||
				listing.bathrooms >= req.query.bathrooms) &&
			(req.query.sqft === 0 || listing.sqft >= req.query.sqft)
	);

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
	filterListings,
};
