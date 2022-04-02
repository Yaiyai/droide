class Dron {
	constructor(protocols, scan) {
		this.protocols = protocols;
		this.scan = scan;
		this.shootCoord = null;
		this.isDoubleProtocol = false;
		this.firstProtocol = null;
		this.secondProtocol = null;
	}

	getProtocol(first, second) {
		const prot = {
			'closest-enemies': () => this.closestEnemies(second),
			'furthest-enemies': () => this.furthestEnemies(second),
			'assist-allies': () => this.assistAllies(),
			'avoid-crossfire': () => this.avoidCrossFire(),
			'prioritize-mech': () => this.prioritizeMech(),
			'avoid-mech': () => this.avoidMech(),
		};
		prot[first]();
	}

	init() {
		if (this.protocols.length > 1) {
			this.isDoubleProtocol = true;
			this.firstProtocol = this.protocols.find((elm) => elm === 'closest-enemies' || elm === 'furthest-enemies');
			this.secondProtocol = this.protocols.filter((elm) => elm !== 'closest-enemies' && elm !== 'furthest-enemies');
			this.getProtocol(this.firstProtocol, this.secondProtocol);
		} else if (this.protocols.length === 1) {
			this.firstProtocol = this.protocols[0];
			this.getProtocol(this.firstProtocol);
		}
	}

	closestEnemies(type) {
		if (this.isDoubleProtocol) {
			const filter = this.filter(type);
			const closest = filter.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? current : prev));
			this.shootCoord = { x: closest.coordinates.x, y: closest.coordinates.y };
		} else {
			const scan = [...this.scan];
			const closest = scan.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? current : prev));
			this.shootCoord = { x: closest.coordinates.x, y: closest.coordinates.y };
		}
	}

	furthestEnemies(type) {
		if (this.isDoubleProtocol) {
			let filter = this.filter(type);
			filter = filter.filter((elm) => Math.hypot(elm.coordinates.x, elm.coordinates.y) < 100);
			const furthest = filter.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? prev : current));
			this.shootCoord = { x: furthest.coordinates.x, y: furthest.coordinates.y };
		} else {
			let scan = [...this.scan];
			scan = scan.filter((elm) => Math.hypot(elm.coordinates.x, elm.coordinates.y) < 100);
			const furthest = scan.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? prev : current));
			this.shootCoord = { x: furthest.coordinates.x, y: furthest.coordinates.y };
		}
	}

	assistAllies() {
		const scan = this.scan.filter((elm) => elm.hasOwnProperty('allies'));
		this.shootCoord = { x: scan[0].coordinates.x, y: scan[0].coordinates.y };
	}

	avoidCrossFire() {
		const scan = this.scan.filter((elm) => !elm.hasOwnProperty('allies'));
		this.shootCoord = { x: scan[0].coordinates.x, y: scan[0].coordinates.y };
	}

	prioritizeMech() {
		const scan = this.scan.filter((elm) => elm.enemies.type === 'mech');
		if (scan.length > 0) {
			this.shootCoord = scan[0].coordinates;
		}
	}

	avoidMech() {
		const scan = this.scan.filter((elm) => elm.enemies.type !== 'mech');
		this.shootCoord = scan[0].coordinates;
	}

	filter(type) {
		let protocol, result;
		if (type.length > 1) {
			protocol = type.join('//');
		} else {
			protocol = type[0];
		}

		switch (protocol) {
			case 'prioritize-mech//avoid-crossfire':
			case 'avoid-crossfire//prioritize-mech':
				result = this.scan.filter((elm) => elm.enemies.type === 'mech');
				result = result.filter((elm) => !elm.hasOwnProperty('allies'));
				return result;
				break;
			case 'prioritize-mech//assist-allies':
			case 'assist-allies//prioritize-mech':
				result = this.scan.filter((elm) => elm.enemies.type === 'mech');
				result = result.filter((elm) => elm.hasOwnProperty('allies'));
				return result;
				break;
			case 'avoid-mech//assist-allies':
			case 'assist-allies//avoid-mech':
				result = this.scan.filter((elm) => elm.enemies.type !== 'mech');
				result = result.filter((elm) => elm.hasOwnProperty('allies'));
				return result;
				break;
			case 'avoid-mech//avoid-crossfire':
			case 'avoid-crossfire//avoid-crossfire':
				result = this.scan.filter((elm) => elm.enemies.type !== 'mech');
				result = result.filter((elm) => !elm.hasOwnProperty('allies'));
				return result;
				break;
			case 'assist-allies':
				return this.scan.filter((elm) => elm.hasOwnProperty('allies'));
				break;
			case 'avoid-crossfire':
				return this.scan.filter((elm) => !elm.hasOwnProperty('allies'));
				break;
			case 'prioritize-mech':
				return this.scan.filter((elm) => elm.enemies.type === 'mech');
				break;
			case 'avoid-mech':
				return this.scan.filter((elm) => elm.enemies.type !== 'mech');
				break;
			default:
				break;
		}
	}
}

module.exports = Dron;
