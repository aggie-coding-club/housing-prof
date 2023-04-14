// tasks/initFeaturedListings.js
const setFeaturedListings = require('./setFeaturedListings');

const initFeaturedListings = async () => {
	try {
		console.log('Setting initial featured listings...');
		await setFeaturedListings();
		console.log('Initial featured listings set successfully.');
	} catch (error) {
		console.error('Error setting initial featured listings:', error.message);
	}
};

module.exports = initFeaturedListings;
