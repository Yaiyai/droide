const Dron = require('../model/dron.model');

describe('Dron', () => {
	let dron;
	const protocols = [];
	const scan = [];

	beforeEach(() => {
		dron = new Dron(protocols, scan);
	});

	describe('class', () => {
		it('should receive 2 arguments (protocols & scan)', () => {
			expect(Dron.length).toEqual(2);
		});

		it('should receive protocols as its 1st argument', () => {
			expect(dron.protocols).toEqual(protocols);
		});

		it('should receive protocols as an array of strings', () => {
			expect(dron.protocols).toBeInstanceOf(Array);
		});

		it('should receive acan as its 2nd argument', () => {
			expect(dron.scan).toEqual(scan);
		});

		it('should receive scan as an array of objects', () => {
			expect(dron.scan).toBeInstanceOf(Array);
		});
	});

	describe('getProtocol() method', () => {
		it('should be a function', () => {
			expect(typeof dron.getProtocol).toBe('function');
		});

		it('should receive 2 arguments', () => {
			expect(dron.getProtocol.length).toEqual(2);
		});
	});

	describe('assistAllies() method', () => {
		it('should be a function', () => {
			expect(typeof dron.assistAllies).toBe('function');
		});

		it('should receive 2 arguments', () => {
			expect(dron.assistAllies.length).toEqual(0);
		});
	});

	describe('avoidCrossFire() method', () => {
		it('should be a function', () => {
			expect(typeof dron.avoidCrossFire).toBe('function');
		});

		it('should receive 2 arguments', () => {
			expect(dron.avoidCrossFire.length).toEqual(0);
		});
	});

	describe('prioritizeMech() method', () => {
		it('should be a function', () => {
			expect(typeof dron.prioritizeMech).toBe('function');
		});

		it('should receive 2 arguments', () => {
			expect(dron.prioritizeMech.length).toEqual(0);
		});
	});

	describe('avoidMech() method', () => {
		it('should be a function', () => {
			expect(typeof dron.avoidMech).toBe('function');
		});

		it('should receive 2 arguments', () => {
			expect(dron.avoidMech.length).toEqual(0);
		});
	});

	describe('filterProtocol() method', () => {
		it('should be a function', () => {
			expect(typeof dron.filterProtocol).toBe('function');
		});

		it('should receive 1 argument', () => {
			expect(dron.filterProtocol.length).toEqual(1);
		});

		it('should return an array', () => {
			expect(dron.filterProtocol()).toBeInstanceOf(Array);
		});
	});

	describe('furthestEnemies() method', () => {
		it('should be a function', () => {
			expect(typeof dron.furthestEnemies).toBe('function');
		});

		it('should receive 1 argument', () => {
			expect(dron.furthestEnemies.length).toEqual(1);
		});
	});
});
