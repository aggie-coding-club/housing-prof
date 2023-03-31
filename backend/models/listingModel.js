// Import Mongoose
const mongoose = require('mongoose');

// Define Image schema
const imagesModel = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		required: true,
	},
});

// Define Property schema
const listingModel = new mongoose.Schema({
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	bedrooms: {
		type: Number,
		required: true,
	},
	bathrooms: {
		type: Number,
		required: true,
	},
	sqft: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: {
		type: [imagesModel],
		required: true,
	},
});

// Compile the schema into a model
const Listing = mongoose.model('Listing', listingModel);

// Export the model
module.exports = Listing;
