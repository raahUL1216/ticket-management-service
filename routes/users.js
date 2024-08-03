const express = require('express');
const User = require('../models/user');
const authUtils = require('../utils/auth');
const router = express.Router();

router.post('/', async function(req, res){
	const {name, email, password} = req.body;

	if (!email) {
		return res.send('email is required.');
	}

	if (!password || password?.length < 8) {
		return res.send('min password length should be 8.');
	}

    const existUser = await User.findOne({'email': email});

	if (existUser) {
		return res.send('user with given email already exists.');
	}

	const user = await User.create({
		name: name,
		email: email,
		password: authUtils.cryptPassword(password)
	});

	return res.json({
		'id': user._id,
		'name': user.name,
		'email': user.email
	});
});

module.exports = router;