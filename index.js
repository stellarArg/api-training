const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => res.send('hello world'));

app.get('/filtros', (req, res) => {

    const objKeys = Object.keys(req.query)
    objKeys.map(keyval => req.query[keyval])
    console.log(req.query.id, req.query.filter, objKeys)
    res.send(req.query)
});

app.post('/', (req, res) => res.send(req.body));
app.put('/')
app.delete('/')

app.listen(3000, () => console.log('working'));
