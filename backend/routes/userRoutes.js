const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getMe,
	getUserBookmarks,
	addBookmark,
	removeBookmark,
	getUserBookmarksListings,
	logoutUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/me/bookmarks', protect, getUserBookmarks);
router.put('/me/bookmarks/add/:listingId', protect, addBookmark);
router.put('/me/bookmarks/remove/:listingId', protect, removeBookmark);
router.get('/me/bookmarks/listings', protect, getUserBookmarksListings);
router.post('/logout', logoutUser);

module.exports = router;
