require('./config/config');
const express = require('express');
const app = express();



//Escuchando puertos
app.listen(process.env.PORT, () => {
    console.log('Escuchando Puerto', process.env.PORT);
})