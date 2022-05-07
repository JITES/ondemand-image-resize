import request from 'supertest';
import application from '../../src/index.js';

describe('Image Resize', () => {
	it('GET -> resize should return 202', async () => {
		await request(application)
			.get('/resize?url=https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg&height=100&width=100')
			.expect(202)
			.expect(res => expect(res.statusCode).toBe(202));
	});

	it('GET -> resize should return 422 with error message when invalid params are provided', async () => {
		await request(application)
			.get('/resize?url=&height=100&width=100')
			.expect(422)
			.expect(res => expect(res.text).toBe(
				'{"message":"Request validation failed","errors":[{"value":"","msg":"Invalid value","param":"url","location":"query"}]}'
			));
	});

	it('GET -> resize should return 422 with error message when invalid height and width are provided', async () => {
		await request(application)
			.get('/resize?url=an-invalid-url&height=100&width=100')
			.expect(422)
			.expect(res => expect(res.text).toBe(
				 '{"message":"Request validation failed","errors":[{"value":"an-invalid-url","msg":"Invalid value","param":"url","location":"query"}]}',
				
			));
	});

	it('GET -> resize should return 422 with error when invalid url is provided', async () => {
		await request(application)
			.get('/resize?url=https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg&height=text&width=text')
			.expect(422)
			.expect(res => expect(res.text).toBe(
				'{"message":"Request validation failed","errors":[{"value":"text","msg":"height query param is required in numeric","param":"height","location":"query"},{"value":"text","msg":"width query param is required in numeric","param":"width","location":"query"}]}'
			));
	});
});