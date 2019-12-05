const mongoose = require('mongoose')
Quote = mongoose.model('Quote')
module.exports = function (app) {
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

}