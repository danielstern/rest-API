import express from 'express';

import { router as products } from './products';

const app = express();

app.get('/', express.static('api/public'));

app.use('/products', products);

app.listen(7777, function(){console.info("App is listening")});