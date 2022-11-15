const jwt = require('jsonwebtoken');
const key = require('../config/tokenKey');

function checkToken (req, res, next) {
    try {
        const token = req.cookies.macOutletTOKEN;
        if(!token) {
            res.redirect('/auth');
        }
        jwt.verify(token, key.secret);
        next()
    } catch (err) {
        console.log(err);
        res.redirect('/auth');
    }
}

module.exports=checkToken;