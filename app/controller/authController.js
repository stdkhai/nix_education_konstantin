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
            const {name, password, email} = (req.body);
            if (!name||name==""||name.length<3) {
                return res.status(400).json({message: 'User name must be 3 chars or longer'});
            }
            if (!password||password=="") {
                return res.status(400).json({message: 'Invalid password'});
            }
            if(!validateEmail(email)){
                return res.status(400).json({message: 'Invalid email'});
            }
            const candidate = await User.findOne({Email:email});
            if (candidate) {
                return res.status(400).json({message: 'User with similar email already exists'});
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const user = new User({Name:name, Password: hashPassword, Email:email});
            await user.save();
            res.status(200).json({message: 'User has been registered please login'});
        } catch(err) {
            console.log(err);
            res.status(400).json({message: "Registration error"});
        }   
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({Email:email});
            if (!user) {
                return res.status(400).json("User with similar name didn't exist");
            }
            const validPassword = bcrypt.compareSync(password, user.Password);
            if (!validPassword) {
                return res.status(400).json('Entered invalid password');
            }
            const token = generateAccessToken(user._id, user.Email);
            res.cookie('macOutletTOKEN',token, {maxAge: 3600000});
            res.status(200).json({token});
        } catch(err) {
            console.log(err);
            res.status(400).json("Login error");
        }       
    }

    async getPage(req, res) {
        try {
            res.sendFile(path.resolve('app/views/register.html'));
        } catch(err) {
            console.log(err);
            res.status(400).json('Response error');
        }       
    }

    async getLogin(req, res) {
        try {
            res.sendFile(path.resolve('app/views/login.html'));
        } catch(err) {
            console.log(err);
            res.status(400).json('Response error');
        }       
    }
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

module.exports=authController;