const express = require('express');
const app = express();

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/radar', require('./routes/radar.routes'));

//Escuchar peticiones
app.listen(8888, () => console.log(`Servidor establecido en puerto 8888`));
