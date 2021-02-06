import { getProductsCollection, getCollection } from '../../../../database';

export async function adjustQuantity(req,res){

    const { SKU, token } = req.body.SKU;
    const tokens = await getCollection('auth', 'tokens');
    const auth = await tokens.findOne({value:token});

    if (!auth) {

        res.json({error:"Invalid auth token provided"});
        return;
    }

    if (!auth.canModifyProducts) {

        res.json({error:"This token is not authorized to modify products."});
        return;

    }

    const collection = await getProductsCollection();
    const product = await collection.findOne({SKU});
    
    await collection.updateOne(
        {SKU},
        { 
            $set: {
                quantity: product.quantity + +req.body.count
            }
        }
    )

    res.json({success:true});

}