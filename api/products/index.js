import express from 'express';
import { adjustQuantity } from './adjust/quantity';

import { detail } from './detail';
import { options } from './options';
import { search } from './search';

export const router = express.Router();

router.get('/detail/:SKU', detail);
router.get('/search', search);
router.get('/options/:property', options);
router.post('/adjust/quantity', adjustQuantity);

