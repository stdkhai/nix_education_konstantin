const jwt = require('jsonwebtoken');
const key = require('../config/tokenKey');

function checkToken (req, res, next) {
    try {
        const token = req.cookies.macOutletTOKEN;
        if(!token) {
            res.redirect('/auth/login');
            return
        }
        jwt.verify(token, key.secret);
        next()
    } catch (err) {
        res.redirect('/auth/login');
    }
}

module.exports=checkToken;