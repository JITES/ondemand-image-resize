import express from 'express';
import { ResizeController } from '../controllers/resize.controller.js';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', [
                check('url').isString().withMessage('A valid image url is required').trim(),
                check('height').isNumeric().withMessage('height query param is required in numeric').trim(),
                check('width').isNumeric().withMessage('width query param is required in numeric').trim(),
                ], ResizeController.resize);

export default router;

