import { StatusCodes } from 'http-status-codes';
import { ResizeService } from '../services/resize.service.js';
import { validationResult } from 'express-validator';
import { INVALID_REQUEST } from '../constants/constants.js';
import { HTTPClient } from '../http/client.js';

function convertStreamToBuffer(stream) {
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
        const response = await HTTPClient.get(url, 'stream');
        return await convertStreamToBuffer(response.data);
        
        } catch (error) {
        console.log(error.message);
    }
}

const resize = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            return res.status(422).json({ message: INVALID_REQUEST, errors: errors.array() });
    
        try {
            const width = req.query.width;
            const height = req.query.height;
            const url = decodeURI(req.query.url);
            console.log(url);
            const imageBuffer = await getImage(url);
            const image = await ResizeService.resize(imageBuffer, parseInt(width), parseInt(height));
            
            res.set("Content-Type", "image/jpeg");
            res.status(StatusCodes.ACCEPTED).send(image);
    } catch (error) {
        console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send( { error: 'error in resize controller', message : error.message });
    }
}

export const ResizeController = { resize };