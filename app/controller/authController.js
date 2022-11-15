const User=require('../models/users');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/tokenKey');


function generateAccessToken(id, username) {
    const payload = {
        id,
        username,
    }

    return jwt.sign(payload, key.secret, {expiresIn: '300s'})
}

class authController {
    async registration(req, res) {
        try {
            console.log(req.body);
            const {username, password, email} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: 'User with similar name already exists'});
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const user = new User({username, password: hashPassword, email});
            await user.save();
            res.status(200).json({message: '<p style="color: green;">User has been registered please login</p>'});
        } catch(err) {
            console.log(err);
            res.status(400).json({message: "Registration error"});
        }   
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json("User with similar name didn't exist");
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json('Entered invalid password');
            }
            const token = generateAccessToken(user._id, user.username);
            res.status(200).json({token});
        } catch(err) {
            console.log(err);
            res.status(400).json("Login error");
        }       
    }

    async getPage(req, res) {
        try {
            res.sendFile(path.resolve('app/public/index.html'));
        } catch(err) {
            console.log(err);
            res.status(400).json('Response error');
        }       
    }
}

module.exports=authController;