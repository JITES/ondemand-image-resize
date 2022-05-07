import request from 'supertest';
import application from '../../src/index.js';

describe('Image Resize', () => {
	it('GET resize', async () => {
		await request(application)
			.get('/resize?url=mock&height=100&width=100')
			.expect(500)
			.expect(res => console.log(res));
	});
});