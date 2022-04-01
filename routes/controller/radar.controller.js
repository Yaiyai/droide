const Dron = require('../../model/droide.model');

const setRadar = (req, res) => {
	const shootTo = new Dron(req.body.protocols, req.body.scan);
	shootTo.init();
	return res.status(200).json(shootTo.shootCoord);
};

module.exports = setRadar;
