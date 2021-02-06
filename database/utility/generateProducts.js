import * as _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';
import { loremIpsum } from "lorem-ipsum";

const productSchema = {
    brand:String,
    type:String,
    color: String,
    size: String
}

const brands = [
    "Shane's",
    "Dilgan",
    "Veggies of the Spinning Wheel"
];

const productType = [
    "Sweater",
    "T-Shirt",
    "Hat"
];

const colors = [
    "Blue",
    "Red",
    "Navy",
    "Pink",
    "Orange",
    "Black",
    "White"
];

const sizes = [
    "Small",
    "Medium",
    "Large",
    "Extra Large"
]



export async function generateProducts(count = 60) {

    const products = [];    

    for (let brand of brands) {

        for (let type of productType) {

            for (let color of colors) {

                for (let size of sizes) {

                    let quantity = _.sample([0,1,2,3]);

                    products.push({
                        SKU: v4(),
                        price: +((Math.random() * 100).toFixed(2)),
                        productFamily:`${brand}-${type}`,
                        brand,
                        type,
                        color,
                        size,
                        quantity,
                        shortDescription: loremIpsum({ count : 1 , units: "sentences"}),
                        longDescription: loremIpsum({ count : 8 , units: "sentences"}),
                        mainImage:{url:`${loremIpsum({ count : 1 , units: "word"})}.png`},
                        images:[
                            {url:`${loremIpsum({ count : 1 , units: "word"})}.png`, description: loremIpsum({ count : 2 , units: "sentences"})},
                            {url:`${loremIpsum({ count : 1 , units: "word"})}.png`, description: loremIpsum({ count : 2 , units: "sentences"})},
                            {url:`${loremIpsum({ count : 1 , units: "word"})}.png`, description: loremIpsum({ count : 2 , units: "sentences"})},
                            {url:`${loremIpsum({ count : 1 , units: "word"})}.png`, description: loremIpsum({ count : 2 , units: "sentences"})}
                        ]
                    });

                }
            }
        }

    }

    let final = _.sampleSize(products, count);
    fs.writeFileSync(path.join(__dirname, "..", "config", "products.json"), JSON.stringify(final, null, 2));
    console.info("Generated and saved Database Configuration.");
    return final;

}

// generateProducts();