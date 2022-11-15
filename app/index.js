const bodyParser = require('body-parser');
const express = require('express');
const backend = require('./backend/main.js');
const mongoose = require("mongoose");
const cookieParser= require('cookie-parser');
const authRouter = require('./routes/authRouter');
const mainRouter = require('./routes/mainRouter');
const checkToken = require('./middleware/main');

const app = express();
app.use(cookieParser());
app.use('/back', backend);
/* app.use('/auth', authRouter);
app.use('/main', checkToken, mainRouter);
 app.use('', (req, res) => {
  res.redirect('/main');
}) */
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoDB = "mongodb+srv://root:XRASFtjgeDoqd3av@cluster0.l0s3vzx.mongodb.net/macOutlet?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(process.env.PORT || 3000, function () {
  console.log(`Example app listening on port ${process.env.PORT} or 3000!`);

});
