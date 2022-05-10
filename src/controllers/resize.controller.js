import { StatusCodes } from 'http-status-codes';
import { ResizeService } from '../services/resize.service.js';
import { validationResult } from 'express-validator';
import { INVALID_REQUEST } from '../constants/constants.js';
import axios from 'axios';

function isBuffer(buffer) {
	return Buffer.isBuffer(buffer);
}

const resize = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) 
		return res.status(422).json({ message: INVALID_REQUEST(), errors: errors.array() });
    
	try {
		const width = req.query.width;
		const height = req.query.height;
		const url = decodeURI(req.query.url);
		const imageBuffer = await getImage(url);
		const validImage = isBuffer(imageBuffer);
		const resizedImage = await ResizeService.resize(imageBuffer,parseInt(width), parseInt(height));
		const isValidResizedImage = isBuffer(resizedImage);
		if(isValidResizedImage) {
			res.set('Content-Type', 'image/png');
			res.status(StatusCodes.ACCEPTED).send(resizedImage);
		}
		else {
			console.log(`Image Valid - ${validImage}, Resized Image Valid - ${isValidResizedImage}`);
			res.status(StatusCodes.BAD_REQUEST).send({ message : INVALID_REQUEST() });
		}
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send( { error: 'Error while processing request', message : error.message });
	}
};

async function convertStreamToBuffer(stream) {
	return new Promise((resolve, reject) => {
		const buffer = [];
		stream.on('data', (chunk) => {
			buffer.push(chunk);
		});
		stream.on('end', () => resolve(Buffer.concat(buffer)));
		stream.on('error', (err) => reject(err));
	});
}

const getImage = async (url) => {
	try {
		const response = await axios.get(url, {responseType : 'stream'});
		const imageInBuffer = await convertStreamToBuffer(response.data);
		return imageInBuffer;
	} catch (error) {
		console.log(error.message);
	}
};

export const ResizeController = { resize };