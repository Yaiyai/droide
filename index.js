const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

//CORS
app.use(cors());
//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/radar', require('./routes/radar.routes'));

//Escuchar peticiones
app.listen(process.env.PORT, () => console.log(`Servidor establecido en puerto ${process.env.PORT}`));
