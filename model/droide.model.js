class Dron {
	constructor(protocols) {
		this.protocols = protocols;
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
	}

	avoidMech() {
		console.log('avoidMech');
	}
}

module.exports = Dron;
