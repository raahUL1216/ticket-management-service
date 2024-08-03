const router = require('express').Router();
const User = require('../models/user');
const authUtils = require('../utils/auth');

router.post('/login', async function(req, res) {
	const { email, password } = req.body;

	const existUser = await User.findOne({email: email})

	if (!existUser) {
		return res.send('User does not exist.')
	}
    
    const passwordMatch = authUtils.comparePassword(password, existUser.password);

	if (passwordMatch){
        const token = authUtils.generateAccessToken(existUser);
        return res.json({token: token});
    } else {
		return res.send('Invalid user credentials.');
	}
});

module.exports = router;