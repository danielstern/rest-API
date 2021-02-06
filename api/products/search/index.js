import { getCollection } from '../../../database';

export async function search(req,res){

    const ordinalProperties = ["color","size","brand"];
    const minMaxProperties = ["minPrice","maxPrice"];
    const validProperties = [...ordinalProperties,...minMaxProperties];

    if (Object.keys(req.query).length === 0) {

        res.json({error:"Please pass a query string consisting of desired values; i.e. ?color=blue"})
        return;

    };

    for (let key in req.query) {

        if (!validProperties.includes(key)) {

            res.json({error:`Invalid search term provided: ${key}. Valid search terms: ${validProperties.join(', ')}`});
            return;

        }
    }

    let dbQuery = {

        price: {

            $gt: req.query.minPrice ? +req.query.minPrice : 0,
            $lt: req.query.maxPrice ? +req.query.maxPrice : Infinity

        }


     };

    for (let property of ordinalProperties) {

        let value = req.query[property]

        if (value) {

            dbQuery[property] = {
                $in : value.split(',')
            };

        }

    }

    const collection = await getCollection("store", "products");
    const productQuery = collection
        .find(dbQuery)
        .project({SKU: 1, price: 1, brand: 1, color: 1, size: 1, quantity: 1, shortDescription: 1, mainImage: 1});
    const products = await productQuery.toArray();

    res.json(products);

}