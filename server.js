const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');

let app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'publics')));
app.use(express.json());


app.engine('html', swig.renderFile);


app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    const data = { title: "Star Wars" };
    res.render("index", data);
});

app.get('/films', (req, res) => {
    const data = { title: "films" };
    res.render("index", data);
});

app.get('/films/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = { title: "filmsId" };
    res.render("index", data);

});

app.get('/people', (req, res) => {
    const data = { title: "people" };
    res.render("index", data);
});

app.get('/people/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = { title: "peopleId" };
    res.render("index", data);
});

app.get('/planets', (req, res) => {
    const data = { title: "planets" };
    res.render("index", data);

});

app.get('/planets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = { title: "planetsId" };
});

app.get('/species', (req, res) => {
    const data = { title: "Species" };
    res.render("index", data);
});

app.get('/species/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = { title: "Species" };
    console.log(id);
    res.render("index", data);
});

app.get('/starships', (req, res) => {
    const data = { title: "Starships" };
    res.render("index", data);
});

app.get('/starships/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = { title: "Starships" };
    res.render("index", data);
});

app.get('/vehicles', (req, res) => {
    const data = { title: "Vehicles" };
    res.render("index", data);
});

app.get('/vehicles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = { title: "Vehicles" };
    res.render("index", data);
});

app.listen(process.env.PORT || 8080);
console.log("L'application tourne.");