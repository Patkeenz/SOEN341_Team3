import app from '../server/index.js';
import {getDatabase, get, ref} from 'firebase/database';
import '../Home.css';

const db = getDatabase(app);


async function getProducts() {
    const products = [];
    const collectionRef = ref(db,"Products/");
    const collectionsnap = await get((collectionRef));
    collectionsnap.forEach(doc=>{
        var name = doc.key;
        var category = doc.val().Category;
        var description = doc.val().Description;
        var price = doc.val().Price
        var link = doc.val().Link
       const product = {name: name, category: category, price: price, description: description, link:link};
       products.push(product);
    });
    return products;
  }

  export default getProducts;