const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const hostname = '127.0.0.1';
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var cons = require('consolidate');
// ----------------------------------------
// Connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDB');
  console.log("Connected😀");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// -----------------------------------------
const contactSchema = new mongoose.Schema({
    email: String,
    subject: String,
    message: String
  });

const Contact = mongoose.model('Contact', contactSchema);


// -----------------------------------------
app.use('/static', express.static('static'))
app.use(express.urlencoded())


// -----------------------------------------
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



// -----------------------------------------
app.get("/", (req, res) => {
    res.status(200).render('index.html');
})

app.post('/', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    // res.send("saved")
    res.status(200).render('index.html');
  }).catch(() => {
    res.status(400).render('400.html');
  });
})
// -----------------------------------------
app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})

