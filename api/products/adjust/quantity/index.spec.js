import * as axios from 'axios';

(async function(){

    console.log("Doing thie thing");
    const search = await axios.get('http://localhost:7777/products/search?limit=1');
    const { SKU } = search.data[0];
    console.log("Search?",search.data,SKU)
    const adjust = await axios.post(`http://localhost:7777/products/adjust/quantity`, {SKU,token:"wiow-????", count:-1});
    console.log(adjust.data);

})();

//   .then(a => console.log(a));

// axios
//   .post('https://localhost:7777/products/adjust/quantity/', {
//     todo: 'Buy the milk'
//   })
//   .then(res => {
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(res)
//   })
//   .catch(error => {
//     console.error(error)
//   })