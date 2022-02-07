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
    let planets = [];
    let species = [];
    let starships = [];
    let vehicles = [];

    console.log(characters, planets, starships, species, vehicles);

    for (let index in api.characters) {
        const url = api.characters[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        characters.push({ name: name, url: "/people/" + number });
    };
    api.characters = characters;

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

    let films = [];
    let species = [];
    let vehicles = [];
    let starships = [];
    
    console.log(films, species, starships, vehicles);

    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let film = await request(url);
        film = film.title;
        films.push({ film: film, url: "/films/" + number });
    };
    api.films = films;

    for (let index in api.species) {
        const url = api.species[index];
        const number = url.split("/")[url.split("/").length - 2];
        let specie = await request(url);
        specie = specie.name;
        species.push({ specie: specie, url: "/species/" + number });
    };
    api.species = species;

    for (let index in api.vehicles) {
        const url = api.vehicles[index];
        const number = url.split("/")[url.split("/").length - 2];
        let vehicle = await request(url);
        vehicle = vehicle.name;
        vehicles.push({ vehicle: vehicle, url: "/vehicles/" + number });
    };
    api.vehicles = vehicles;

    for (let index in api.starships) {
        const url = api.starships[index];
        const number = url.split("/")[url.split("/").length - 2];
        let starship = await request(url);
        starship = starship.name;
        starships.push({ starship: starship, url: "/starships/" + number });
    };
    api.starships = starships;

    const data = { title: api.name };
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


    let people = [];
    let films = [];

    console.log(people, films);

    for (let index in api.people) {
        const url = api.people[index];
        const number = url.split("/")[url.split("/").length - 2];
        let peopl = await request(url);
        peopl = peopl.name;
        people.push({ people: peopl, url: "/people/" + number });
    };
    api.people = people;

    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let film = await request(url);
        film = film.title;
        films.push({ films: film, url: "/films/" + number });
    };
    api.films = films;

    const data = { title: api.name };
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

    let films = [];
    let residents = [];

    console.log(films, residents)

    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        films.push({ name: name, url: "/films/" + number });
    };
    api.films = films;

    for (let index in api.residents) {
        const url = api.residents[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        residents.push({ name: name, url: "/residents/" + number });
    };
    api.residents = residents;

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

    let films = [];
    let pilots = [];

    console.log(films, pilots);

    for (let index in api.pilots) {
        const url = api.pilots[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        pilots.push({ name: name, url: "/pilots/" + number });
    };
    api.pilots = pilots;

    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        films.push({ name: name, url: "/films/" + number });
    };
    api.films = films;
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

    let pilots = [];
    let films = [];

    console.log(pilots, films);


    for (let index in api.pilots) {
        const url = api.pilots[index];
        const number = url.split("/")[url.split("/").length - 2];
        let pilot = await request(url);
        pilot = pilot.name;
        pilots.push({ pilot: pilot, url: "/people/" + number });
    };
    api.pilots = pilots;

    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let film = await request(url);
        film = film.name;
        films.push({ film: film, url: "/people/" + number });
    };
    api.films = films;

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