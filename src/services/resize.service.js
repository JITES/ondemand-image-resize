import sharp from 'sharp';

async function resize(buffer, width, height) {
	try {
		const resized = await sharp(buffer).resize(width, height).toBuffer();
		return resized;
	} catch (error) {
		console.log(error);
	}
    
}

export const ResizeService = { resize };