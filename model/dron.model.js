class Dron {
	constructor(scan) {
		this.scan = scan;
		this.shootCoord = null; //Result
	}

	closestEnemies(type) {
		const scan = this.filterProtocol(type);
		if (scan.length > 0) {
			const closest = scan.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? current : prev));
			this.shootCoord = { x: closest.coordinates.x, y: closest.coordinates.y };
		} else {
			this.shootCoord = 'Oops! No hay objetivos!';
		}
	}

	furthestEnemies(type) {
		let scan = this.filterProtocol(type);
		if (scan.length > 0) {
			scan = scan.filter((elm) => Math.hypot(elm.coordinates.x, elm.coordinates.y) < 100); //Always distances under 100m
			const furthest = scan.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? prev : current));
			this.shootCoord = { x: furthest.coordinates.x, y: furthest.coordinates.y };
		} else {
			this.shootCoord = 'Oops! No hay objetivos!';
		}
	}

	assistAllies() {
		const scan = this.scan.find((elm) => elm.hasOwnProperty('allies'));
		this.shootCoord = { x: scan.coordinates.x, y: scan.coordinates.y };
	}

	avoidCrossFire() {
		const scan = this.scan.find((elm) => !elm.hasOwnProperty('allies'));
		this.shootCoord = { x: scan.coordinates.x, y: scan.coordinates.y };
	}

	prioritizeMech() {
		const scan = this.scan.find((elm) => elm.enemies.type === 'mech');
		this.shootCoord = { x: scan.coordinates.x, y: scan.coordinates.y };
	}

	avoidMech() {
		const scan = this.scan.find((elm) => elm.enemies.type !== 'mech');
		this.shootCoord = { x: scan.coordinates.x, y: scan.coordinates.y };
	}

	filterProtocol(secProtocol) {
		//In case of more than one protocol, this method filters the scan array by enemy or ally.
		//In case of just one, it returns a copy of the scan array
		let auxScan = [...this.scan];
		const filterFunctions = {
			'assist-allies': (arr) => arr.filter((elm) => elm.hasOwnProperty('allies')),
			'avoid-crossfire': (arr) => arr.filter((elm) => !elm.hasOwnProperty('allies')),
			'prioritize-mech': (arr) => arr.filter((elm) => elm.enemies.type === 'mech'),
			'avoid-mech': (arr) => arr.filter((elm) => elm.enemies.type !== 'mech'),
		};
		if (!secProtocol) {
			return auxScan;
		} else {
			//According to the given protocols, there can only be a maximum of 3 combinations, so there is only the possibility to filter by enemy type and/or allies.
			if (secProtocol.length === 2) {
				let firstPass = filterFunctions[secProtocol[0]](auxScan);
				return filterFunctions[secProtocol[1]](firstPass);
			} else if (secProtocol.length === 1) {
				return filterFunctions[secProtocol[0]](auxScan);
			}
		}
	}
}

module.exports = Dron;
