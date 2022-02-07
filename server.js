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

app.get('/films', async(req, res) => {
    const api = await request(swapi + "films");

    let films = [];
    for (let index in api.results) {
        const title = api.results[index].title;
        const number = api.results[index].url.split("/")[api.results[index].url.split("/").length - 2];
        films.push({ title: title, url: "/films/" + number });
    }

    const data = { title: "Films", navbar: navbar, films: films };
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

    const data = { title: api.title, navbar: navbar };
    res.render("index", data);
});

app.get('/people', async(req, res) => {
    const page = req.param("page");
    let api;
    if (page != undefined) {
        api = await request(swapi + "people/?page=" + page);
    } else {
        api = await request(swapi + "people");
    }
    let people = [];
    for (let index in api.results) {
        const name = api.results[index].name;
        const number = api.results[index].url.split("/")[api.results[index].url.split("/").length - 2];
        people.push({ name: name, url: "/people/" + number });
    }

    const data = { title: "People", navbar: navbar, people: people };
    res.render("index", data);
});

app.get('/people/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "people/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/planets', async(req, res) => {
    const page = req.param("page");
    let api;
    if (page != undefined) {
        api = await request(swapi + "planets/?page=" + page);
    } else {
        api = await request(swapi + "planets");
    }
    let planets = [];
    for (let index in api.results) {
        const name = api.results[index].name;
        const number = api.results[index].url.split("/")[api.results[index].url.split("/").length - 2];
        planets.push({ name: name, url: "/planets/" + number });
    }

    const data = { title: "Planets", navbar: navbar, planets: planets };
    res.render("index", data);

});

app.get('/planets/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "planets/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/species', async(req, res) => {
    const page = req.param("page");
    let api;
    if (page != undefined) {
        api = await request(swapi + "species/?page=" + page);
    } else {
        api = await request(swapi + "species");
    }
    let species = [];
    for (let index in api.results) {
        const name = api.results[index].name;
        const number = api.results[index].url.split("/")[api.results[index].url.split("/").length - 2];
        species.push({ name: name, url: "/species/" + number });
    }
    console.log(species)

    const data = { title: "Species", navbar: navbar, species: species };
    res.render("index", data);
});

app.get('/species/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "species/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/starships', async(req, res) => {
    const page = req.param("page");
    let api;
    if (page != undefined) {
        api = await request(swapi + "starships/?page=" + page);
    } else {
        api = await request(swapi + "starships");
    }
    let starships = [];
    for (let index in api.results) {
        const name = api.results[index].name;
        const number = api.results[index].url.split("/")[api.results[index].url.split("/").length - 2];
        starships.push({ name: name, url: "/starships/" + number });
    }

    const data = { title: "Starships", navbar: navbar, starships: starships };
    res.render("index", data);
});

app.get('/starships/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "starships/" + id);

    const data = { title: api.name, navbar: navbar };
    res.render("index", data);
});

app.get('/vehicles', async(req, res) => {
    const page = req.param("page");
    let api;
    if (page != undefined) {
        api = await request(swapi + "vehicles/?page=" + page);
    } else {
        api = await request(swapi + "vehicles");
    }
    let vehicles = [];
    for (let index in api.results) {
        const name = api.results[index].name;
        const number = api.results[index].url.split("/")[api.results[index].url.split("/").length - 2];
        vehicles.push({ name: name, url: "/vehicles/" + number });
    }

    const data = { title: "Vehicles", navbar: navbar, vehicles: vehicles };
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