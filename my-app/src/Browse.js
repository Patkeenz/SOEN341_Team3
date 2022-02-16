import getProducts from "./server/home.js"
import buildProduct from "./server/product.js"


async function buildProducts(loaded) {
    if(!loaded){
        var products = await getProducts();
    }
    else{
        products = loaded;
    }
    let maindiv = document.getElementById("product-display");
    maindiv.innerHTML = "";  //this line makes the products off center
    for(var i=0; i<products.length; i++){
      var product = products[i];
      let div = document.createElement("div");
      div.className = "grid-item";
      let pic = document.createElement("img");
      pic.setAttribute("src", products[i].link)
      let p1 = document.createElement("p");
      p1.innerHTML = product.name;
      let p2 = document.createElement("p");
      p2.innerHTML = product.price+ "$";
      let button = document.createElement("button");
      button.setAttribute("id", product.name)
      button.innerHTML = "Go";
      button.onclick= function(){
        buildProduct(this.id, products); //build the product page for this product
        //navigate to Product.js now...
        
      }
      div.appendChild(pic);
      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(button);
      maindiv.appendChild(div);
    }
    return products
  }


  export default buildProducts;