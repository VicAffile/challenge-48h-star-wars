const axios = require('axios');

const swapi = "https://swapi.dev/api/";

async function request(pathApi) {
    // async
    try {
        // await
        const response = await axios.get(pathApi);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function quizz(){
    let awnserObjects = [];
    let goodAwnser = none;
    let maxHeight = 0;
    let id = 1;

    for (let i = 0; i < 4; i++){
        let people = await request(swapi + "people/" + id + "/");
        if (people.height > maxHeight) {
            maxHeight = guy.height;
        }
        awnserObjects.push({ name: people.name, height: people.height });
    }

    // awnserObjects.push({ name: 'Luke Skywalker', height: 172 });
    // awnserObjects.push({ name: 'perso 2', height: 160 });
    // awnserObjects.push({ name: 'perso 3', height: 150 });
    // awnserObjects.push({ name: 'perso 4', height: 140 });

}