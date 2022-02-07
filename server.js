const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const swapi = "https://swapi.dev/api/";

const navbar = [
    { name: "Films", url: "/films" },
    { name: "People", url: "/people" },
    { name: "Planets", url: "/planets" },
    { name: "Species", url: "/species" },
    { name: "Starships", url: "/Starships" },
    { name: "Vehicles", url: "/vehicles" }
];

let app = express();
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'publics')));
app.use(express.json());


app.engine('html', swig.renderFile);


app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    const data = { title: "Star Wars", navbar: navbar };
    res.render("index", data);
});

app.get('/films', (req, res) => {
    const data = { title: "films", navbar: navbar };
    res.render("index", data);
});

app.get('/films/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "films/" + id);

    let characters = [];
    let planets = [];
    let species = [];
    let starships = [];
    let vehicles = [];

    for (let index in api.characters) {
        const url = api.characters[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        characters.push({ name: name, url: "/people/" + number });
    };
    api.characters = characters;

<<<<<<< HEAD
    for (let index in api.planets) {
        const url = api.planets[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        planets.push({ name: name, url: "/planets/" + number });
    };
    api.planets = planets;

    for (let index in api.species) {
        const url = api.species[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        species.push({ name: name, url: "/species/" + number });
    };
    api.species = species;

    for (let index in api.starships) {
        const url = api.starships[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        starships.push({ name: name, url: "/starships/" + number });
    };
    api.starships = starships;

    for (let index in api.vehicles) {
        const url = api.vehicles[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        vehicles.push({ name: name, url: "/vehicles/" + number });
    };
    api.vehicles = vehicles;
    console.log(vehicles);

    const data = { title: api.title };
=======
    const data = { title: api.title, navbar: navbar };
>>>>>>> 2103b554e63aab6516a3836d7fd1e839e720137d
    res.render("index", data);
});

app.get('/people', (req, res) => {
    const data = { title: "people", navbar: navbar };
    res.render("index", data);
});

app.get('/people/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "people/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/planets', (req, res) => {
    const data = { title: "planets", navbar: navbar };
    res.render("index", data);

});

app.get('/planets/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "planets/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/species', (req, res) => {
    const data = { title: "Species", navbar: navbar };
    res.render("index", data);
});

app.get('/species/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "species/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/starships', (req, res) => {
    const data = { title: "Starships", navbar: navbar };
    res.render("index", data);
});

app.get('/starships/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "starships/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/vehicles', (req, res) => {
    const data = { title: "Vehicles", navbar: navbar };
    res.render("index", data);
});

app.get('/vehicles/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "vehicles/" + id);

    const data = { title: api.name, navbar: navbar };
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