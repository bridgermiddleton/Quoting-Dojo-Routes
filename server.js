const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.urlencoded({ extended: true }));
const flash = require('express-flash');
app.use(flash());
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quotingdojo', { useNewUrlParser: true });
const QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
    date_added: Date
})
// create an object that contains methods for mongoose to interface with MongoDB
const Quote = mongoose.model('Quote', QuoteSchema);
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
require('./server/config/routes.js')(app)

