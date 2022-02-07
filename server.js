const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');

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


app.listen(process.env.PORT || 8080);
console.log("L'application tourne.");