
import { generateProducts } from './generateProducts';
import { getCollection, closeClient } from '../'
import { token } from '../config';

(async function(){

    console.log("Inserting products into Database");

    const products = await generateProducts();

    const collection = await getCollection("store", `products`);
    await collection.deleteMany();
    await collection.insertMany(products);

    console.log("Inserted products");

    const tokens = await getCollection("auth", `tokens`);

    await tokens.deleteMany();
    await tokens.insertOne({
        owner: "CLIENT-1",
        value: token,
        expiry: null,
        canModifyProducts: true
    });

    closeClient();
})();