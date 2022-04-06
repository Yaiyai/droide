const Dron = require('../model/dron.model');
class Scan {
	constructor(coordinates, enemies, allies) {
		this.coordinates = coordinates;
		this.enemies = enemies;
		this.allies = allies;
	}
}
describe('Dron', () => {
	let dron;
	const scan = [
		new Scan({ coordinates: { x: 0, y: 40 } }, { enemies: { type: 'soldier', number: 10 } }, null),
		new Scan({ coordinates: { x: 0, y: 80 } }, { enemies: { type: 'mech', number: 1 } }, { allies: 5 }),
	];

	beforeEach(() => {
		dron = new Dron(scan);
	});

	describe('class', () => {
		it('should receive 1 argument (scan)', () => {
			expect(Dron.length).toEqual(1);
		});

		it('should receive scan as its 1st argument', () => {
			expect(dron.scan).toEqual(scan);
		});

		it('should receive scan as an array of objects', () => {
			expect(dron.scan).toBeInstanceOf(Array);
		});

		it('scan items should have Scan structure', () => {
			expect(dron.scan.every((x) => x instanceof Scan)).toBe(true);
		});
	});

	describe('assistAllies() method', () => {
		it('should be a function', () => {
			expect(typeof dron.assistAllies).toBe('function');
		});

		it('should receive 0 arguments', () => {
			expect(dron.assistAllies.length).toEqual(0);
		});
	});

	describe('avoidCrossFire() method', () => {
		it('should be a function', () => {
			expect(typeof dron.avoidCrossFire).toBe('function');
		});

		it('should receive 0 arguments', () => {
			expect(dron.avoidCrossFire.length).toEqual(0);
		});
	});

	describe('prioritizeMech() method', () => {
		it('should be a function', () => {
			expect(typeof dron.prioritizeMech).toBe('function');
		});

		it('should receive 0 arguments', () => {
			expect(dron.prioritizeMech.length).toEqual(0);
		});
	});

	describe('avoidMech() method', () => {
		it('should be a function', () => {
			expect(typeof dron.avoidMech).toBe('function');
		});

		it('should receive 0 arguments', () => {
			expect(dron.avoidMech.length).toEqual(0);
		});
	});

	describe('filterProtocol() method', () => {
		it('should be a function', () => {
			expect(typeof dron.filterProtocol).toBe('function');
		});

		it('can receive 1 argument or none', () => {
			expect(dron.filterProtocol.length === 0 || dron.filterProtocol.length === 1).toBe(true);
		});

		it('should return an array', () => {
			expect(dron.filterProtocol()).toBeInstanceOf(Array);
		});
	});

	describe('furthestEnemies() method', () => {
		it('should be a function', () => {
			expect(typeof dron.furthestEnemies).toBe('function');
		});

		it('can receive 1 argument or none', () => {
			expect(dron.furthestEnemies.length === 0 || dron.furthestEnemies.length === 1).toBe(true);
		});
	});

	describe('closestEnemies() method', () => {
		it('should be a function', () => {
			expect(typeof dron.closestEnemies).toBe('function');
		});

		it('can receive 1 argument or none', () => {
			expect(dron.closestEnemies.length === 0 || dron.closestEnemies.length === 1).toBe(true);
		});
	});
});
