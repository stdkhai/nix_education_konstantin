const express = require('express');
var router = express.Router();
let stock;
const fs = require('fs');
const Product=require('../models/items');
const User=require('../models/users')
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', function(req, res) {
    Product.find({}, function(err, products) {
        res.json(products).status(200);
    })
});

router.get('/:search', function(req, res) {
    tofind=req.params.search.toLowerCase();
    Product.find({}, function(err, products) {
        res.json(products.filter(n=>n.name.toLowerCase().indexOf(tofind)!=-1)).status(200);
    })
})

fs.readFile(__dirname+"/device.csv", 'utf-8', ((err, data) => {
    let csv = data;
    var lines = csv.split("\n");
    var result = [];

    var headers = lines[0].split(",");
    for (let i = 0; i < headers.length; i++) {
        headers[i] = headers[i].replace(/^\"+|\"+$/g, '');
    }


    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            currentline[j] = currentline[j].replace(/^\"+|\"+$/g, '');
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }
    stock = result;
}))



module.exports = router;