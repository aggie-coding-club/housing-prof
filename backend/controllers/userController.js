const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	// Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Get Profile Image
	const profileImage = `https://api.dicebear.com/6.x/initials/svg?seed=${firstName.charAt(
		0
	)}${lastName.charAt(0)}`;

	// Create user
	const user = await User.create({
		firstName: capitalizeFirstLetter(firstName),
		lastName: capitalizeFirstLetter(lastName),
		profileImage,
		bookmarks: [],
		email,
		password: hashedPassword,
	});

	if (user) {
		const token = generateToken(user._id);
		res.cookie('housingProf_token', token, {
			httpOnly: true,
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
		});
		res.status(201).json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			profileImage: user.profileImage,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Check for user email
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		const token = generateToken(user._id);
		res.cookie('housingProf_token', token, {
			httpOnly: true,
			expires: new Date(
				Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
			),
			maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
		});
		res.json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			profileImage: user.profileImage,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// @desc    Get user bookmarks
// @route   GET /api/users/me/bookmarks
// @access  Private
const getUserBookmarks = asyncHandler(async (req, res) => {
	const user = req.user;

	if (user) {
		res.status(200).json(user.bookmarks);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Add bookmark to user
// @route   PUT /api/users/me/bookmarks/add/:listingId
// @access  Private
const addBookmark = asyncHandler(async (req, res) => {
	const listingId = req.params.listingId;
	const user = req.user;

	// Check if listing is already bookmarked
	if (user.bookmarks.includes(listingId)) {
		res.status(400);
		throw new Error('Listing already bookmarked');
	}

	user.bookmarks.push(listingId);

	await user.save();

	res.status(200).json({
		message: 'Bookmark added successfully',
		bookmarks: user.bookmarks,
	});
});

// @desc    Remove bookmark from user
// @route   PUT /api/users/me/bookmarks/remove/:listingId
// @access  Private
const removeBookmark = asyncHandler(async (req, res) => {
	const listingId = req.params.listingId;
	const user = req.user;

	// Remove bookmark from user's bookmarks array
	user.bookmarks = user.bookmarks.filter(
		(bookmarkId) => bookmarkId.toString() !== listingId
	);

	await user.save();

	res.status(200).json({
		message: 'Bookmark removed successfully',
		bookmarks: user.bookmarks,
	});
});

// @desc    Get user bookmarks with listing objects
// @route   GET /api/users/me/bookmarks/listings
// @access  Private
const getUserBookmarksListings = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).populate({
		path: 'bookmarks',
		model: 'Listing',
	});

	if (user) {
		res.status(200).json(user.bookmarks);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
	res.clearCookie('housingProf_token'); // Replace 'token' with the name of the cookie you set during login
	res.status(200).json({ message: 'Logged out successfully' });
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	registerUser,
	loginUser,
	getMe,
	getUserBookmarks,
	addBookmark,
	removeBookmark,
	getUserBookmarksListings,
	logoutUser,
};
