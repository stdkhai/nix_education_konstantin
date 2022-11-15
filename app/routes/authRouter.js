const Router = require('express').Router();
const authController=require('../controller/authController');
const authControll = new authController();

Router.get('', authControll.getPage);
Router.post('/registration', authControll.registration);
Router.post('/login', authControll.login);

module.exports=Router;