require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/todo-routes')); // importando rutas

//Conectado a la base de datos Moongo BD
mongoose.connect('mongodb://localhost:27017/todo', (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


//Escuchando puertos
app.listen(process.env.PORT, () => {
    console.log('Escuchando Puerto', process.env.PORT);
})