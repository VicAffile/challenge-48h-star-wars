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
    { name: "Vehicles", url: "/vehicles" },
    { name: "Quizz", url: "/quizz" }
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
    res.render("home", data);
});

app.get('/films', async(req, res) => {
    const api = await request(swapi + "films");

    let films = [];
    for (let index in api.results) {
        const title = api.results[index].title;
        const order = api.results[index].episode_id;
        const number = api.results[index].url.split("/")[api.results[index].url.split("/").length - 2];
        films.push({ name: "Movie n°" + order + " : " + title, url: "/films/" + number });
    }

    const data = { title: "Films", navbar: navbar, elements: films, buttons: { previous: null, next: null } };
    res.render("list", data);
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

    let planets = [];
    for (let index in api.planets) {
        const url = api.planets[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        planets.push({ name: name, url: "/planets/" + number });
    };
    api.planets = planets;

    let species = [];
    for (let index in api.species) {
        const url = api.species[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        species.push({ name: name, url: "/species/" + number });
    };
    api.species = species;

    let starships = [];
    for (let index in api.starships) {
        const url = api.starships[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        starships.push({ name: name, url: "/starships/" + number });
    };
    api.starships = starships;

    let vehicles = [];
    for (let index in api.vehicles) {
        const url = api.vehicles[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        vehicles.push({ name: name, url: "/vehicles/" + number });
    };
    api.vehicles = vehicles;

    const data = { title: api.title, navbar: navbar, film: api };
    res.render("film", data);
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

    const data = { title: "People", navbar: navbar, elements: people, buttons: buttons(api, page) };
    res.render("list", data);
});

app.get('/people/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "people/" + id);

    const url = api.homeworld;
    const number = url.split("/")[url.split("/").length - 2];
    let name = await request(url);
    name = name.name;
    api.homeworld = { name: name, url: "/planets/" + number };

    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        const film = await request(url);
        const title = film.title;
        films.push({ title: title, url: "/films/" + number });
    };
    api.films = films;

    let species = [];
    for (let index in api.species) {
        const url = api.species[index];
        const number = url.split("/")[url.split("/").length - 2];
        let specie = await request(url);
        let name = specie.name;
        species.push({ name: name, url: "/species/" + number });
    };
    api.species = species;

    let vehicles = [];
    for (let index in api.vehicles) {
        const url = api.vehicles[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        vehicles.push({ name: name, url: "/vehicles/" + number });
    };
    api.vehicles = vehicles;

    let starships = [];
    for (let index in api.starships) {
        const url = api.starships[index];
        const number = url.split("/")[url.split("/").length - 2];
        const starship = await request(url);
        const name = starship.name;
        starships.push({ name: name, url: "/starships/" + number });
    };
    api.starships = starships;

    const data = { title: api.name, navbar: navbar, people: api };
    res.render("people", data);
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

    const data = { title: "Species", navbar: navbar, elements: species, buttons: buttons(api, page) };
    res.render("list", data);
});

app.get('/species/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "species/" + id);

    let homeworld = { name: "", url: "" };
    if (api.homeworld != null) {
        const url = api.homeworld;
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        homeworld = { name: name, url: "/planets/" + number };
    }
    api.homeworld = homeworld;

    let people = [];
    for (let index in api.people) {
        const url = api.people[index];
        const number = url.split("/")[url.split("/").length - 2];
        const peopl = await request(url);
        const name = peopl.name;
        people.push({ name: name, url: "/people/" + number });
    };
    api.people = people;

    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        const film = await request(url);
        const title = film.title;
        films.push({ title: title, url: "/films/" + number });
    };
    api.films = films;

    const data = { title: api.name, navbar: navbar, specie: api };
    res.render("specie", data);
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

    const data = { title: "Planets", navbar: navbar, elements: planets, buttons: buttons(api, page) };
    res.render("list", data);

});

app.get('/planets/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "planets/" + id);

    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        let film = await request(url);
        title = film.title;
        films.push({ title: title, url: "/films/" + number });
    };
    api.films = films;

    let residents = [];
    for (let index in api.residents) {
        const url = api.residents[index];
        const number = url.split("/")[url.split("/").length - 2];
        let name = await request(url);
        name = name.name;
        residents.push({ name: name, url: "/residents/" + number });
    };
    api.residents = residents;

    const data = { title: api.name, navbar: navbar, planet: api };
    res.render("planet", data);
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

    const data = { title: "Starships", navbar: navbar, elements: starships, buttons: buttons(api, page) };
    res.render("list", data);
});

app.get('/starships/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "starships/" + id);

    let pilots = [];
    for (let index in api.pilots) {
        const url = api.pilots[index];
        const number = url.split("/")[url.split("/").length - 2];
        const pilot = await request(url);
        const name = pilot.name;
        pilots.push({ name: name, url: "/pilots/" + number });
    };
    api.pilots = pilots;

    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        const film = await request(url);
        const title = film.title;
        films.push({ title: title, url: "/films/" + number });
    };
    api.films = films;

    const data = { title: api.name, navbar: navbar, starship: api };
    res.render("starship", data);
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

    const data = { title: "Vehicles", navbar: navbar, elements: vehicles, buttons: buttons(api, page) };
    res.render("list", data);
});

app.get('/vehicles/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    let api = await request(swapi + "vehicles/" + id);

    let pilots = [];
    for (let index in api.pilots) {
        const url = api.pilots[index];
        const number = url.split("/")[url.split("/").length - 2];
        const pilot = await request(url);
        const name = pilot.name;
        pilots.push({ name: name, url: "/people/" + number });
    };
    api.pilots = pilots;

    let films = [];
    for (let index in api.films) {
        const url = api.films[index];
        const number = url.split("/")[url.split("/").length - 2];
        const film = await request(url);
        const title = film.title;
        films.push({ title: title, url: "/people/" + number });
    };
    api.films = films;

    const data = { title: api.name, navbar: navbar, vehicle: api };
    res.render("vehicle", data);
});

app.get('/quizz', async(req, res) => {
    const listQuizz = [
        { name: "General", url: "/quizz/general", picture: "/images/general.jpg" },
        { name: "People", url: "/quizz/people", picture: "/images/people.jpg" },
        { name: "Film", url: "/quizz/film", picture: "/images/film.jpeg" },
        { name: "Planet", url: "/quizz/planet", picture: "/images/planet.jpg" }
    ];
    const data = { title: "Choix du quizz", navbar: navbar, listQuizz: listQuizz };
    res.render("listQuizz", data);
});

app.listen(process.env.PORT || 8080);

async function request(pathApi) {
    try {
        const response = await axios.get(pathApi);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

function buttons(api, page) {
    page = page == undefined ? 1 : page;
    let buttons = { previous: null, next: null };
    if (api.previous != null) {
        buttons.previous = "/" + api.previous.split("/")[api.previous.split("/").length - 2] + "/?page=" + (page - 1);
    }
    if (api.next != null) {
        buttons.next = "/" + api.next.split("/")[api.next.split("/").length - 2] + "/?page=" + (page - (-1));
    }
    return buttons;
}