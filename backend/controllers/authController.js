const User = require('../models/userModel');

exports.getUserByEmail = async (req, res) => {
	try {
		// console.log('Email being queried:', req.params.email);
		const user = await User.findOne({ email: req.params.email });
		// console.log('Checking User>>>', user);
		if (user) {
			return res.status(200).json(user);  //User exists in DB
		} else {
			return res.status(200).json({ message: 'User not found' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error });
	}
};