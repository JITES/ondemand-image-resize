import express from 'express';
import { ResizeController } from '../controllers/resize.controller.js';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', [
	check('url').exists().isURL().isString().withMessage('valid image url is required').trim(),
	check('height').exists().isNumeric().withMessage('height query param is required in numeric').trim(),
	check('width').exists().isNumeric().withMessage('width query param is required in numeric').trim(),
], ResizeController.resize);

export default router;

