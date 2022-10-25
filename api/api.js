var express = require('express');
var fs = require('fs');
var router = express.Router();

router.use(express.json());

router.get('/contacts', function (req, res) {
    res.statusCode = 200;
    res.json(listContacts());
});

router.get('/contacts/:userID', function (req, res) {
    if (req.body == undefined) {
        let info = getById(req.params["userID"])
        if (info == undefined) {
            res.statusCode = 404;
            res.json({ "message": "Not found" });
        } else {
            res.statusCode = 200;
            res.json(info);
        }
    } else {
        let args=updateContact(req.params["userID"],req.body);
        if (args!=undefined) {
            res.json(args);
            res.statusCode=200;
        }else{
            res.json({"message": "Contact not found"});
            res.statusCode=404;
        }
    }

});

router.post('/contacts', function (req, res) {
    if (!BodyValidate(req.body)) {
        res.json({ "message": "Missing required name field" });
        res.statusCode = 400;
    } else {
        res.json(addContact(req.body));
        res.statusCode = 201;

    }
});

router.delete('/contacts/:userID', function (req, res) {
    if (removeContact(req.params["userID"])) {
        res.json({ "message": "Сontact deleted" });
        res.statusCode = 200;
    } else {
        res.statusCode = 404;
        res.json({ "message": "Contact not found" });
    }
});

function listContacts() {
    const data = JSON.parse(fs.readFileSync(__dirname + '/data/contacts.json'));
    return data
}

function getById(id) {
    return listContacts().find(e => e.id == id)
}

function BodyValidate(body) {
    return body.hasOwnProperty("name") && body.hasOwnProperty("phone") && body.hasOwnProperty("email")
}

function addContact(body) {
    let copy = listContacts().slice();
    copy.sort((a, b) => a.id - b.id);
    body.id = Number(copy[copy.length - 1].id) + 1;
    let data = listContacts();
    data.push(body);
    fs.writeFileSync(__dirname + '/data/contacts.json', JSON.stringify(data));
    return body;
}

function removeContact(id) {
    let copy = listContacts().slice();
    let filtered = copy.filter(function (value, index, arr) {
        return value.id != id;
    });
    fs.writeFileSync(__dirname + '/data/contacts.json', JSON.stringify(filtered));
    return filtered.length == copy.length;
}

function updateContact(id,body) {
    let copy = listContacts().slice();
    let found =copy.find(e=>e.id==id);
    if (found==undefined) {
        return found;
    }else{
        for (const key in body) {
            if (body.hasOwnProperty.call(body, key)) {
                found[key]=body[key]
            }
        }
        for (let i = 0; i < copy.length; i++) {
           if (copy.id==id) {
             copy[i]=found;
             fs.writeFileSync(__dirname + '/data/contacts.json', JSON.stringify(copy));
             
            }
            
        }
        return found;
    }
}

module.exports = router;