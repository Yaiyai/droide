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
		console.log('closestEnemies');
	}

	furthestEnemies() {
		console.log('furthestEnemies');
	}

	assistAllies() {
		console.log('assistAllies');
	}

	avoidCrossFire() {
		console.log('avoidCrossFire');
	}

	prioritizeMech() {
		console.log('prioritizeMech');
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
