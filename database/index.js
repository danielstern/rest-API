import { MongoClient } from 'mongodb';
const MONGO_URL = `mongodb://localhost:27017`;

let client = null;

export async function getClient () {
    
    if (!client) {

        client = new MongoClient(MONGO_URL, {useUnifiedTopology: true});
        await client.connect();

    }  

    return client;

}

export async function closeClient () {

    client.close();

}

export async function getCollection(db, collection) {

    const client = await getClient();
    return client.db(db).collection(collection);
    
}

export async function getProductsCollection() {

    return await getCollection("store", "products");
}