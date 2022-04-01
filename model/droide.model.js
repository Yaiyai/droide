class Dron {
	constructor(protocols, scan) {
		this.protocols = protocols;
		this.scan = scan;
		this.shootCoord = null;
		this.isDoubleProtocol = false;
		this.firstProtocol = null;
		this.secondProtocol = null;
	}

	init() {
		console.log(this.protocols);
		if (this.protocols.length > 1) {
			this.isDoubleProtocol = true;
			this.firstProtocol = this.protocols.find((elm) => elm === 'closest-enemies' || elm === 'furthest-enemies');
			this.secondProtocol = this.protocols.find((elm) => elm !== 'closest-enemies' && elm !== 'furthest-enemies');
			switch (this.firstProtocol) {
				case 'closest-enemies':
					this.closestEnemies(this.secondProtocol);
					break;
				case 'furthest-enemies':
					this.furthestEnemies(this.secondProtocol);
					break;
				default:
					break;
			}
		} else if (this.protocols.length === 1) {
			this.firstProtocol = this.protocols[0];
			switch (this.firstProtocol) {
				case 'closest-enemies':
					this.closestEnemies();
					break;
				case 'furthest-enemies':
					this.furthestEnemies();
					break;
				case 'assist-allies':
					this.assistAllies();
					break;
				case 'avoid-crossfire':
					this.avoidCrossFire();
					break;
				case 'prioritize-mech':
					this.prioritizeMech();
					break;
				case 'avoid-mech':
					this.avoidMech();
					break;
				default:
					break;
			}
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
		switch (type) {
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
