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
		let closest = null;
		let closestDistance = null;
		this.scan.forEach((elm) => {
			const distance = Math.hypot(elm.coordinates.y, elm.coordinates.x);
			if (closestDistance) {
				closestDistance > distance && (closest = elm);
			} else {
				closestDistance = distance;
				closest = elm;
			}
		});
		this.shootCoord = { x: closest.coordinates.x, y: closest.coordinates.y };
	}

	furthestEnemies() {
		let furthest = null;
		let furthestDistance = null;
		this.scan.forEach((elm) => {
			const distance = Math.hypot(elm.coordinates.y, elm.coordinates.x);
			if (furthestDistance) {
				furthestDistance < distance && (furthest = elm);
			} else {
				furthestDistance = distance;
				furthest = elm;
			}
		});
		this.shootCoord = { x: furthest.coordinates.x, y: furthest.coordinates.y };
	}

	assistAllies() {
		let scan = this.scan.filter((elm) => elm.hasOwnProperty('allies'));
		this.shootCoord = { x: scan[0].coordinates.x, y: scan[0].coordinates.y };
	}

	avoidCrossFire() {
		let scan = this.scan.filter((elm) => !elm.hasOwnProperty('allies'));
		this.shootCoord = { x: scan[0].coordinates.x, y: scan[0].coordinates.y };
	}

	prioritizeMech() {
		let scan = this.scan.filter((elm) => elm.enemies.type === 'mech');
		if (scan.length > 0) {
			this.shootCoord = scan[0].coordinates;
		}
	}

	avoidMech() {
		let scan = this.scan.filter((elm) => elm.enemies.type !== 'mech');
		this.shootCoord = scan[0].coordinates;
	}
}

module.exports = Dron;
