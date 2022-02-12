import {getDatabase, set, ref} from 'firebase/database';
import app from '../server/index.js';

const db = getDatabase(app);



function Product(name, price, description, category, img){
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.img = img;
}

async function uploadProduct(name, price, description, category){
    set(ref(db, 'Products/' + name),{
        Price: price,
        Description: description,
        Category: category,
    })
    alert("Product added!");
}


export default uploadProduct;
