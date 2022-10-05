import { log } from "console";
import * as http from "http";
import { readFile } from 'node:fs';


const host = 'localhost';
const port = 8000;

let indexFile;

function NewUser(id, u, f, l, e, psw, ph) {
    this.id = id;
    this.username = u;
    this.firstName = f;
    this.lastname = l;
    this.email = e;
    this.password = psw;
    this.phone = ph;
}

const users = {
    id: 0,
    username: "Paulo",
    firstName: "Peter",
    lastname: "Parker",
    email: "mail@gmail.com",
    password: "123456",
    phone: "091-432-12-74"
};


const arr = [{
    id: 1,
    username: "Paulo123",
    firstName: "Peter",
    lastname: "Parker",
    email: "mail@gmail.com",
    password: "123456",
    phone: "091-432-12-74"
},
{
    id: 2,
    username: "Paulo567",
    firstName: "Peter",
    lastname: "Parker",
    email: "mail@gmail.com",
    password: "123456",
    phone: "091-432-12-74"
}];




const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
    try {

        switch (req.url) {
            case "/user":
                /* res.setHeader("Content-Type", "application/json");
                res.writeHead(200); */
                /*  res.end(books); */
                user(req, res)
                break
            case "/user/createWithArray":
                if (req.method == "POST") {
                    res.setHeader("Content-Type", "text/html");
                    res.writeHead(200);
                    req.body = JSON.stringify(arr);
                    res.end(req.body)
                }
                break;
            case "/":
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(indexFile);
                break
            default:
                console.log(req.url.split("/")[1]);
                if (req.url.split("/")[1] == 'user') {
                    EditUserByUsername(res, req, req.url.split("/")[2])
                    console.log("test");
                    break
                }
                res.setHeader("Content-Type", "application/json");
                res.writeHead(404);
                res.end(`{code: 404, message: "Resource not found"}`);
        }
    } catch (e) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(500);
        res.end(JSON.stringify(e));
    }
}

function EditUserByUsername(res, req, username) {
    
    switch (req.method) {
        case "GET":
            res.setHeader("Content-Type", "application/json");
            if (username == "") {

                res.writeHead(400);
                res.end(`{code: 400, message: "Invalid username supplied"}`);
            } else {
                let obj = arr.find(o => o.username === username);
                if (obj == null) {
                    res.writeHead(404);
                    res.end(`{code: 404, message: "User not found"}`);
                } else {
                    res.writeHead(200);
                    res.end(JSON.stringify(obj));
                }
            }

            break;
        default:
            break;
    }
}



function user(req, res) {
    switch (req.method) {
        case "GET":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(users));
            break
        case "POST":
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            const user = new NewUser(1, "username", "fn", "ln", "mail", "123", "3809");
            res.end(JSON.stringify(user));
            break
        default:
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(`{code: 404, message: "Resource not found"}`);
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
