require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let jsonFile;

const readJsonFile = () => {
    const file = fs.readFileSync(process.env.DB, 'utf-8');
    jsonFile = JSON.parse(file);
}

const updateJsonFile = () => fs.writeFileSync(process.env.DB, JSON.stringify(jsonFile));

const app = express();
// Importante Los middle-wares de manejo de datos van antes de las rutas
// Ete aquí el caso del bodyParser ya que nos modifica los datos de entrada y los convierte a json

// Convierte todo el String de datos que viene en el body a Json y lo devuelve a nuestra API
app.use(bodyParser.json());

// Idem caso aterior pero aca nos maneja todo los datos de nuestra url son convertidos a json
// EJ:   localhost/search?id=foo&filter=bar  nos devolvería
/*
    {
        id: 'foo',
        filter: 'bar'
    }
*/
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    readJsonFile();
    res.send(jsonFile);
});

app.get('/:id', (req, res) => {
    readJsonFile();
    res.send(jsonFile[req.params.id]);
});

app.post('/', (req, res) => {
    readJsonFile();
    jsonFile.push(req.body);
    updateJsonFile();
    res.send(jsonFile);
});

app.put('/')
app.delete('/')

app.listen(process.env.PORT, () => console.log(`running on port ${process.env.PORT}`));
