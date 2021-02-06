import { getProductsCollection } from '../../../database';

export async function options(req,res){

    //ACTIVITY: Validate input provided to this route.
    const property = req.params.property;
    const collection = await getProductsCollection();
    const options = await collection.distinct(property);
    res.json(options);

}