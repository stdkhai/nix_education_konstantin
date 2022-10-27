var express = require('express');
var fs = require('fs');
var router = express.Router();
const ContactModel = require("./models/contact")
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://root:XRASFtjgeDoqd3av@cluster0.l0s3vzx.mongodb.net/api", { useUnifiedTopology: true, useNewUrlParser: true });
router.use(express.json());


router.get('/contacts', function (req, res) {
    res.statusCode = 200;
    ContactModel.find({}, { _id: 0, __v: 0 }, (err, list) => {
        if (err) return { "message": err };
        res.json(list);
    });
});

router.get('/contacts/:userID', function (req, res) {

    ContactModel.findOne({ id: req.params["userID"] }, { _id: 0, __v: 0 }, (err, list) => {
        if (err) return { "message": err };
        if (list == null) {
            res.statusCode = 404;
            res.json({ "message": "Not found" });
        } else {
            res.json(list);
            res.statusCode = 200;
        }


    });

});

router.post('/contacts', function (req, res) {
    if (!BodyValidate(req.body)) {
        res.json({ "message": "Missing required name field" });
        res.statusCode = 400;
    } else {
        const user = new ContactModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        });
        ContactModel.count().then((count) => {
            user.id = count + 1;
            user.save((err) => {
                if (err) {
                    res.statusCode = 404;
                    res.json({ "message": err });
                } else {
                    res.json(user);
                    res.statusCode = 200;
                }
            });
        });
    }
});

router.delete('/contacts/:userID', function (req, res) {
    ContactModel.findOneAndDelete({ id: req.params["userID"] }, (err, b) => {
        if (b == null) {
            res.json({ "message": "Contact not found" });
            res.statusCode = 404;
        } else {
            res.json({ "message": "Contact deleted" });
            res.statusCode = 200;
        }
    });
});

router.put('/contacts/:userID', (req, res) => {
    if (!req.body) {
        res.statusCode = 400;
        res.json({ "message": "Missing fields" });
    } else {
        const cid = req.params["userID"];
        console.log(cid);
        const user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        };
        ContactModel.findOneAndUpdate({ "id": Number(cid) }, user, (err, user) => {
            if (err) {
                console.log(err);
                res.statusCode = 404;
                res.json({ "message": "Contact not found" });
            } else {
                res.statusCode = 200;
                res.json(user);
            }
        })
    }
})

function BodyValidate(body) {
    return body.hasOwnProperty("name") && body.hasOwnProperty("phone") && body.hasOwnProperty("email")
}




module.exports = router;