const Dron = require('../../model/dron.model');

const setRadar = (req, res) => {
	const dron = new Dron(req.body.scan);
	const protocols = req.body.protocols;
	const isDoubleProtocol = protocols.length > 1; //Two or more protocols given
	let firstProtocol = null; // Always be closest-enemies or furthest-enemies protocols. These are the ones that get distances
	let secondProtocol = null; //Rest of protocols. These are the ones that filter by enemy or ally

	const dronActionsByProtocol = {
		'closest-enemies': () => dron.closestEnemies(secondProtocol),
		'furthest-enemies': () => dron.furthestEnemies(secondProtocol),
		'assist-allies': () => dron.assistAllies(),
		'avoid-crossfire': () => dron.avoidCrossFire(),
		'prioritize-mech': () => dron.prioritizeMech(),
		'avoid-mech': () => dron.avoidMech(),
	};

	if (isDoubleProtocol) {
		firstProtocol = protocols.find((elm) => elm === 'closest-enemies' || elm === 'furthest-enemies');
		secondProtocol = protocols.filter((elm) => elm !== 'closest-enemies' && elm !== 'furthest-enemies');
	} else {
		firstProtocol = protocols[0];
	}

	dronActionsByProtocol[firstProtocol]();

	return res.status(200).json(dron.shootCoord);
};

module.exports = setRadar;
