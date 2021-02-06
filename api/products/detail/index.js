import { getProductsCollection } from '../../../database';

export async function detail(req,res){

    const SKU = req.params.SKU;
    const collection = await getProductsCollection();
    const product = await collection.findOne({SKU});
    res.json(product);

}