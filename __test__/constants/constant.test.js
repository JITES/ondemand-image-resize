import { INVALID_REQUEST, INVALID_IMAGE } from '../../src/constants/constants';

describe('Constant', () => {
	it('should exist INVALID_REQUEST', () => {
		expect(INVALID_REQUEST()).toBeDefined();
	});
	it('should return correct value INVALID_REQUEST', () => {
		expect(INVALID_REQUEST()).toBe('Request validation failed');
	});
	it('should exist INVALID_IMAGE', () => {
		expect(INVALID_IMAGE()).toBeDefined();
	});
	it('should return correct value for INVALID_IMAGE', () => {
		expect(INVALID_IMAGE()).toBe('Error while processing the image');
	});
});