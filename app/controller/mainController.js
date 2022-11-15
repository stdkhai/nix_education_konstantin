const path = require('path');
const Product=require('../models/items');

class mainController {
    async getMain(req, res) {
        try {
            res.status(200).sendFile(path.resolve('app/public/css/main.css'));
        } catch(err) {
            console.log(err);
            res.status(400).json({message: 'Response error'});
        }       
    }

    async getProducts(req, res) {
        const products = await Product.find();
        res.status(200).json(products);
    }
}

module.exports=mainController;