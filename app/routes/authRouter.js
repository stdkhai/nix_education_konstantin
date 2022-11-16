const Router = require('express').Router();
const authController=require('../controller/authController');
const authControll = new authController();
const bodyParser = require('body-parser');

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: true }));

Router.get('', authControll.getPage);
Router.get('/login', authControll.getLogin);
Router.post('/registration', authControll.registration);
Router.post('/login', authControll.login);

module.exports=Router;