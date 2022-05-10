import { ResizeService } from '../../src/services/resize.service';
import Sharp from './mocks/sharp';
import mockSharp from 'sharp';
jest.mock('Sharp');
describe('Resize service', () => {
	it('should be defined', () => {
		expect(ResizeService.resize()).toBeDefined();
	});
	it('should return buffer', async () => {

		const buffer = Buffer.from('a buffer');
		const width = 10;	
		const height= 10;
		mockSharp.mockResolvedValue(buffer);
		await ResizeService.resize(buffer,width, height);
		expect(mockSharp).toHaveBeenCalledTimes(2);
	});
});