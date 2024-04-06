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

app.get("/results", (req, res) => {
    fs.readFile('responses.json', 'utf8', (err, data) => {
      const responses = JSON.parse(data);
      res.render('results', { responses });
    });
  });


  
// zpracování zadaných informací a uložení do objektu subject
app.post('/saved', function (req, res) {
    let subject = {
        name: req.body.jmeno,
        favouriteSubject: req.body.predmet,
        teacher: req.body.ucitel,
        distribution: req.body.rozdeleniTridy,
        time: new Date().toISOString(),
        ip: req.ip.split(':').pop()
    }

    // Čtení stávajících dat z souboru
    fs.readFile("responses.json", function (err, data) {
        if (err) throw err;
        let json = JSON.parse(data);
        json.push(subject);

        fs.writeFile('responses.json', JSON.stringify(json, null, 2), function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.redirect('results');
    });
    })
})

// port 3001
app.listen(3001);