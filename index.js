// připojení modulu Express
const express = require('express');
const app = express();
console.log("page is active");

// připojení modulu Body-parser
const bodyParser = require('body-parser');

// idk
const fs = require('fs');


// aktivování složky s css a img
app.use(express.static('public'));

// aktivování ejs
app.set('view engine', 'ejs');

// idk
app.use(bodyParser.urlencoded({ extended: true }));

// nastavení domovské stránky
app.get('/', function (req, res) {
    res.render('index.ejs');
})

// nastavení další stránky
app.get('/about', function (req, res) {
    res.render('about');
})

// zpracování zadaných informací a uložení do objektu subject
app.post('/saved', function (req, res) {
    let subject = {
        name: req.body.jmeno,
        favouriteSubject: req.body.predmet,
        time: new Date().toISOString(),
        ip: req.ip.split(':').pop()
    }
    console.log(subject);

    // idk
    fs.writeFile('saved/responses.json', JSON.stringify(subject), function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.send('<h1>Zpráva byla uložena</h1>');
    });
})

// nastavení další stránky
app.get('/saved', function (req, res) {
    res.render('saved');
})

// port 3001
app.listen(3001);