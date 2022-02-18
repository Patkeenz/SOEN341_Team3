import app from '../server/index.js';
import {getDatabase, get, update, ref} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import {userType} from "./auth.js";
import {getItems, updateQuantity, removeItem} from "./cart.js";
import '../Home.css';

const db = getDatabase(app);
const auth = getAuth();

var productslist;
const categories = ["All", "Monitor", "Audio", "Peripherals", "Desks", "Accessories"];

var selectedproduct;
const numbers = ["1", "2", "3", "4", "5"];

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
    productslist = products;
    return products;
  }

function showCategory(){
    var category = document.getElementById("categoryquantity").value.toLowerCase();
    if(category=="all"){
        buildProducts(productslist);
        return;
    }
    var newproducts = [];
    for(var i=0; i<productslist.length; i++){
         if(productslist[i].category==category){
            newproducts.push(productslist[i]);
        }
    }
    buildProducts(newproducts);
} 

async function addToCart(){
    var usertype = await userType();
    if (usertype!=null){
        var uid = auth.currentUser.uid;
        var collection;
        if(usertype=="User"){
            collection = "Users/";
        }
        else{
            collection = "Admins/";
        }
        var cart;
        await get(ref(db, collection + uid)).then((snapshot)=>{
            cart = snapshot.val().Cart;
        })
        var quantity = document.getElementById("categoryquantity").value
        var addon = quantity+"|"+selectedproduct.name+"|"+selectedproduct.price+"|"+selectedproduct.link;
        if (cart==null){
            update(ref(db, collection + uid),{
                Cart: addon
            })
        }
        else{
            var items = await getItems();
            for (var i=0; i<items.length;i++){ //if the product is already in the cart update quantity
                if (selectedproduct.name == items[i].name){
                    var spot=i;
                    var newquantity=parseInt(items[i].quantity)+parseInt(quantity);
                    updateQuantity(spot, newquantity);
                    alert("Product added");
                    return;
                }
            }
            update(ref(db, collection + uid),{
                Cart: cart+", "+addon
            })
        }
        alert("Product added");

    }
    else{
        alert("Please log in to add to cart.");
    }
}

function buildButtonDrop(list,buttonfunc, buttontext){
    let buttondropdiv = document.createElement("div");
    buttondropdiv.className = "buttondrop"
    let select = document.createElement("select");
    select.setAttribute("id", "categoryquantity");
    select.className="button3";
    for (var i=0; i<list.length; i++){
        let option = document.createElement("option");
        option.value = list[i]
        option.innerHTML = list[i];
        select.appendChild(option);
    }
    let button = document.createElement("button");
    button.className="button2";
    button.innerHTML=buttontext;
    button.onclick=function() {
        buttonfunc();
    }
    buttondropdiv.appendChild(select);
    buttondropdiv.appendChild(button);
    return buttondropdiv;
}

export async function buildProducts(loaded) {
    var products;
    if(productslist==null){
        products = await getProducts();
    }
    else{
        products = loaded;
    }
    let homediv = document.getElementById("main");
    homediv.innerHTML = "";
    homediv.appendChild(buildButtonDrop(categories, showCategory, "Search"));
    let productsdiv = document.createElement("div");
    productsdiv.className=
    ("products-display");
    productsdiv.className = "grid-container";
    productsdiv.innerHTML = "";  //this line makes the products off center
    for(var i=0; i<products.length; i++){
      var product = products[i];
      let div = document.createElement("div");
      div.setAttribute("id", product.name)
      div.className = "grid-item";
      let pic = document.createElement("img");
      pic.setAttribute("src", product.link)
      let p1 = document.createElement("p");
      p1.innerHTML = product.name;
      let p2 = document.createElement("p");
      p2.innerHTML = product.price+ "$";
      div.onclick= function(){
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
      productsdiv.appendChild(div);
      homediv.appendChild(productsdiv);
    }
    return products
  }


 async function buildProduct(currentproduct){
    selectedproduct = currentproduct;
    let maindiv = document.getElementById("main");
    maindiv.innerHTML=""; 
    let solodiv = document.createElement("div");
    solodiv.className=("product-display");
    let button = document.createElement("button");
    button.innerHTML= "Go back";
    button.onclick= function(){
        buildProducts(productslist);
    }
    button.style.display = "block";
    button.style.margin = "0 auto";
    button.className = "button2";
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
    p.style.marginLeft="500px"
    p.style.marginRight="500px"
    
    solodiv.appendChild(button);
    solodiv.appendChild(pic);
    solodiv.appendChild(buildButtonDrop(numbers, addToCart, "Add to Cart")); //buttonfunc should be addToCart
    solodiv.appendChild(header);
    solodiv.appendChild(p2);
    solodiv.appendChild(p);
    maindiv.appendChild(solodiv);
 }

 async function testCart(test){
     if (test=="get"){
        var items = await getItems();
     }
     else if(test=="update"){
         await updateQuantity(0,7);
     }
     else{
      await removeItem(1);
     }
     var items = await getItems();
     for(var i=0; i<items.length; i++){
        alert(items[i].quantity+ "\n"+items[i].name+ "\n"+items[i].price+ "\n"+items[i].link+ "\n"+items[i].spot);
    }
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