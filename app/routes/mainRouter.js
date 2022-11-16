const express = require('express');
var Router = express.Router();
const mainController = require('../controller/mainController');

const mainControll = new mainController();

Router.get('/', mainControll.getMain);
Router.get('/products', mainControll.getProducts);

module.exports=Router;