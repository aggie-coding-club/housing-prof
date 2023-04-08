const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please add a first name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please add a last name'],
		},
		profileImage: {
			type: String,
			required: [true, 'Please add a profile image'],
		},
		bookmarks: {
			type: [String],
			required: [true, 'Please add bookmarks'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
