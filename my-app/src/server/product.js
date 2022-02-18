import "../Product.css";
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

export function showCategory(products){
    var category = document.getElementById("homecategory").value;
    if(category=="all"){
        buildProducts(false);
    }
    var newproducts = [];
    for(var i=0; i<products.length; i++){
        if(products[i].category==category){
            newproducts.push(products[i]);
        }
    }
    buildProducts(newproducts);
} 


export async function buildProducts(loaded) {
    if(!loaded){
        var products = await getProducts();
    }
    else{
        products = loaded;
    }
    let solodiv = document.getElementById("product-display");
    solodiv.innerHTML="";
    let maindiv = document.getElementById("products-display");
    maindiv.innerHTML = "";  //this line makes the products off center
    for(var i=0; i<products.length; i++){
      var product = products[i];
      let div = document.createElement("div");
      div.className = "grid-item";
      let pic = document.createElement("img");
      pic.setAttribute("src", product.link)
      let p1 = document.createElement("p");
      p1.innerHTML = product.name;
      let p2 = document.createElement("p");
      p2.innerHTML = product.price+ "$";
      let button = document.createElement("button");
      button.setAttribute("id", product.name)
      button.innerHTML = "Go";
      button.onclick= function(){
        var selectedproduct;
        for(var i=0; i<products.length; i++){
          if((this.id)==products[i].name){
              selectedproduct = products[i];
              break;
          }
      }
       buildProduct(selectedproduct, products);
      }
      div.appendChild(pic);
      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(button);
      maindiv.appendChild(div);
    }
    return products
  }


 async function buildProduct(currentproduct, products){
    let maindiv = document.getElementById("products-display");
    maindiv.innerHTML=""; 
    let solodiv = document.getElementById("product-display");
    let button = document.createElement("button");
    button.innerHTML= "Go back";
    button.onclick= function(){
        buildProducts(products);
    }
    button.style.display = "block";
    button.style.margin = "0 auto";
    let pic = document.createElement("img");
    pic.setAttribute("src", currentproduct.link); //set the img source to the current products source
    pic.style.display = "block";
    pic.style.margin = "0 auto";
    let header = document.createElement("h1");
    header.style.color="white";
    header.style.textAlign="center";
    header.innerHTML= currentproduct.name;
    let p2 = document.createElement("p");
    p2.style.color="white";
    p2.style.textAlign="center"
    p2.innerHTML=currentproduct.price+ " $";
    let p = document.createElement("p");
    p.style.color="white";
    p.innerHTML = currentproduct.description;
    p.style.textAlign="center"
    p.style.marginLeft="150px"
    p.style.marginRight="150px"
    solodiv.appendChild(pic);
    solodiv.appendChild(header);
    solodiv.appendChild(p2);
    solodiv.appendChild(p);
    solodiv.appendChild(button);
 }

// function sortOut(description){
//     var lines = description.split("-");
//         alert(lines[1]);
//     for(var i=0; i<lines.length; i++){
//         lines[i] = "\n"+lines[i];
//     }
//     var returnstring;
//     for(var i=0; i<lines.length; i++){
//         returnstring+=lines[i];
//     }
//     return returnstring;
// }