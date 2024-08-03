const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// currently hardcoded for simplification
const secret = process.env.JWT_SECRET_KEY || 'secret_key_123';

exports.cryptPassword = function (password) {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

exports.comparePassword = function (plainPass, hashword) {
	return bcrypt.compareSync(plainPass, hashword);
};

exports.generateAccessToken = function (user) {
	const payload = {
		userId: user._id,
		name: user.name,
        email: user.email
    };

    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options)
};

const verifyAccessToken = function (token) {
    try{
        const decoded = jwt.verify(token, secret);
        return {success: true, data: decoded};
    } catch(e){
        return {success: false, error: e.message};
    }
};

exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    const result = verifyAccessToken(token);

    if(!result.success){
		console.log('Error while authenticating user. ' + result.error);
        return res.status(403).json({ error: 'Authentication error.' })
    } 

    req.user = result.data;
    next()
};