class Dron {
	constructor(protocols, scan) {
		this.protocols = protocols;
		this.scan = scan;
		this.shootCoord = {};
	}

	init() {
		this.protocols.forEach((prot) => {
			switch (prot) {
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
		});
	}

	closestEnemies() {
		const scan = [...this.scan];
		const closest = scan.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? current : prev));
		this.shootCoord = { x: closest.coordinates.x, y: closest.coordinates.y };
	}

	furthestEnemies() {
		let scan = [...this.scan];
		scan = scan.filter((elm) => Math.hypot(elm.coordinates.x, elm.coordinates.y) < 100);
		const furthest = scan.reduce((prev, current) => (Math.hypot(prev.coordinates.x, prev.coordinates.y) > Math.hypot(current.coordinates.x, current.coordinates.y) ? prev : current));
		this.shootCoord = { x: furthest.coordinates.x, y: furthest.coordinates.y };
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
}

module.exports = Dron;
