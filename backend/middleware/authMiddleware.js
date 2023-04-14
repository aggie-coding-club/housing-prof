const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.cookies && req.cookies.housingProf_token) {
		token = req.cookies.housingProf_token;
	} else {
		res.status(401);
		throw new Error('Not authorized, no token');
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Check if token is expired
		if (Date.now() >= decoded.exp * 1000) {
			const user = await User.findById(decoded.id);
			if (user) {
				// Generate a new token
				const newToken = generateToken(user._id);

				// Set the new token in the cookie
				res.cookie('housingProf_token', newToken, {
					httpOnly: true,
					expires: new Date(
						Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
					), // 30 days
				});

				// Update the token variable
				token = newToken;
			} else {
				res.status(401);
				throw new Error('Not authorized, user not found');
			}
		}

		// Get user from the token
		req.user = await User.findById(decoded.id).select('-password');

		next();
	} catch (error) {
		console.log(error);
		res.status(401);
		throw new Error('Not authorized');
	}
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
};

module.exports = { protect };
