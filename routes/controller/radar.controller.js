const Dron = require('../../model/droide.model');

const setRadar = (req, res) => {
	const shootTo = new Dron(req.body.protocols);
	shootTo.init();
	// return shootTo
};

module.exports = setRadar;
