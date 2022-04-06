const axios = require('axios');
const protocolProof = {
	protocols: ['avoid-mech'],
	scan: [
		{ coordinates: { x: 0, y: 40 }, enemies: { type: 'soldier', number: 10 } },
		{ coordinates: { x: 0, y: 80 }, allies: 5, enemies: { type: 'mech', number: 1 } },
	],
};

describe('App', () => {
	let server;
	beforeAll(() => {
		server = require('./../index');
	});
	describe('POST /radar', () => {
		var data = {};
		beforeAll((done) => {
			axios
				.post(`http://localhost:8888/radar`, JSON.stringify(protocolProof), {
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((response) => (data = response))
				.then(() => done());
		});
		it('Status 200', () => {
			expect(data.status).toBe(200);
		});
	});
});
