const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const swapi = "https://swapi.dev/api/";

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

app.get('/films/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "films/" + id);
    console.log(api.title)

    const data = { title: api.title };
    res.render("index", data);
});

app.get('/people', (req, res) => {
    const data = { title: "people" };
    res.render("index", data);
});

app.get('/people/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "people/" + id);
    console.log(api.name)

    const data = { title: api.name };
    res.render("index", data);
});

app.get('/planets', (req, res) => {
    const data = { title: "planets" };
    res.render("index", data);

});

app.get('/planets/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "planets/" + id);
    console.log(api.name)

    const data = { title: api.name };
    res.render("index", data);
});

app.get('/species', (req, res) => {
    const data = { title: "Species" };
    res.render("index", data);
});

app.get('/species/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "species/" + id);
    console.log(api.name)

    const data = { title: api.name };
    res.render("index", data);
});

app.get('/starships', (req, res) => {
    const data = { title: "Starships" };
    res.render("index", data);
});

app.get('/starships/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "starships/" + id);
    console.log(api.name)

    const data = { title: api.name };
    res.render("index", data);
});

app.get('/vehicles', (req, res) => {
    const data = { title: "Vehicles" };
    res.render("index", data);
});

app.get('/vehicles/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "vehicles/" + id);
    console.log(api.name)

    const data = { title: api.name };
    res.render("index", data);
});

app.listen(process.env.PORT || 8080);
console.log("L'application tourne.");

async function request(pathApi) {
    try {
        const response = await axios.get(pathApi);
        //console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}