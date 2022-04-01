const express = require('express');
const setRadar = require('./controller/radar.controller');
const router = express.Router();

router.post('/', setRadar);

module.exports = router;
