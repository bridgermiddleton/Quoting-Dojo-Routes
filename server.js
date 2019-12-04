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


app.get('/', (_req, res) => {
    res.render("home")
});

app.post('/quotes', (req, res) => {
    console.log("***************************" + req.body.name + "****************");
    const quote = new Quote();
    quote.name = req.body.name;
    quote.quote = req.body.quote;
    quote.date_added = new Date();
    quote.save()
        .then(newQuoteData => console.log('quote created: ', newQuoteData))
        .catch(err => {
            console.log(err);
            for (var key in err.errors) {
                req.flash('home', err.errors[key].message);
            }
        });

    res.redirect('/quotes');
})
app.get('/quotes', (req, res) => {
    Quote.find()
        .then(quotes => {
            console.log("*****************************JOE MAMA****************************")
            console.log(quotes)

            res.render('quotespage', { quotes: quotes });

        })
})
