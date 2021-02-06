import express from 'express';

import { router as products } from './products';

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', express.static('api/public'));

app.use('/products', products);

app.listen(7777, function(){console.info("App is listening")});