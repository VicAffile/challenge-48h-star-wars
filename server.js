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

    let characters = [];
    for (let index in api.characters) {
        const url = api.characters[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        characters.push({ name: name, url: "/people/" + number });
    };
    api.characters = characters;

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

    //films
    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let film = await request(url);
        film = film.title;
        films.push({ film: film, url: "/films/" + number });
    };
    api.films = films;
    // console.log(films);

    //species
    let species = [];
    for (let index in api.species) {
        const url = api.species[index];
        const number = url.split("/")[url.split("/").length - 2];
        let specie = await request(url);
        specie = specie.name;
        species.push({ specie: specie, url: "/species/" + number });
    };
    api.species = species;
    // console.log(species);

    //vehicles
    let vehicles = [];
    for (let index in api.vehicles) {
        const url = api.vehicles[index];
        const number = url.split("/")[url.split("/").length - 2];
        let vehicle = await request(url);
        vehicle = vehicle.name;
        vehicles.push({ vehicle: vehicle, url: "/vehicles/" + number });
    };
    api.vehicles = vehicles;
    // console.log(vehicles);

    //starships
    let starships = [];
    for (let index in api.starships) {
        const url = api.starships[index];
        const number = url.split("/")[url.split("/").length - 2];
        let starship = await request(url);
        starship = starship.name;
        starships.push({ starship: starship, url: "/starships/" + number });
    };
    api.starships = starships;
    // console.log(starships);

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

    //people
    let people = [];
    for (let index in api.people) {
        const url = api.people[index];
        const number = url.split("/")[url.split("/").length - 2];
        let peopl = await request(url);
        peopl = peopl.name;
        people.push({ people: peopl, url: "/people/" + number });
    };
    api.people = people;
    // console.log(people);

    //films
    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let film = await request(url);
        film = film.title;
        films.push({ films: film, url: "/films/" + number });
    };
    api.films = films;
    // console.log(films);

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

    //pilots
    let pilots = [];
    for (let index in api.pilots) {
        const url = api.pilots[index];
        const number = url.split("/")[url.split("/").length - 2];
        let pilot = await request(url);
        pilot = pilot.name;
        pilots.push({ pilot: pilot, url: "/people/" + number });
    };
    api.pilots = pilots;
    // console.log(pilots);

    //films
    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let film = await request(url);
        film = film.name;
        films.push({ film: film, url: "/people/" + number });
    };
    api.films = films;
    // console.log(films);

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