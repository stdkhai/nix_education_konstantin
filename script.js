import * as http from "http";
import { readFile } from 'node:fs';
const host = 'localhost';
const port = 8000;

let indexFile, stock;

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
    try {
        switch (req.url) {
            case "/":
                //res.setHeader('Access-Control-Allow-Origin', '*');
                //res.setHeader("Access-Control-Allow-Headers","Access-Control-Allow-Headers");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
                res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                res.writeHead(200);
                console.log(stock);
                req.body = JSON.stringify(stock);
                res.end(JSON.stringify(stock));
                break
            default:
                res.setHeader("Content-Type", "application/json");
                res.writeHead(404);
                res.end(`{code: 404, message: "Resource not found"}`);
        }
    } catch (e) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(500);
        console.log(e)
        res.end(JSON.stringify(e));
    }
}

const server = http.createServer(requestListener);



readFile(process.cwd() + "/index.html", 'utf8', ((err, data) => {
    if (err) {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
        return;
    }
    indexFile = data;
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}));
readFile("device.csv", 'utf-8', ((err, data) => {

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
