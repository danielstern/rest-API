
import { generateProducts } from './generateProducts';
import { getCollection, closeClient } from '../'

(async function(){

    console.log("Inserting products into Database");

    const products = await generateProducts();

    const collection = await getCollection("store", `products`);
    await collection.deleteMany();
    await collection.insertMany(products);

    console.log("Inserted products");

    closeClient();
})();