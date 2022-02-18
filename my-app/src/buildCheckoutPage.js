import getProducts from "./server/checkout.js"

async function buildProducts(loaded) {
    if(!loaded){
        var products = await getProducts();
    }
    else{
        products = loaded;
    }
    let maindiv = document.getElementById("checkoutItems");
    for(var i=0; i<products.length; i++){
        var product = products[i];
        let row = document.createElement("Row");
        row.className = "block-example border-top border-dark";
        let imgCol = document.createElement("Col");
        imgCol.className = "text-center";
        //imgCol.setAttribute("xs", {3}); unsure how to do this part
        let pic = document.createElement("img");
        pic.setAttribute("src", products[i].link);
        pic.className = "justify-content-md-center";
        pic.style = { width:"150px"};
        let infoCol = document.createElement("Col");
        let prodName = document.createElement("h1");
        prodName.innerHTML = product.name;
        prodName.className = "slightlyMarginedItem";


        maindiv.appendChild(row);
        maindiv.appendChild(imgCol);
        maindiv.appendChild(pic);
        maindiv.append(infoCol);
        maindiv.append(prodName);
        
        /*
        let p1 = document.createElement("p");
        
        let p2 = document.createElement("p");
        p2.innerHTML = product.price+ "$";
        div.appendChild(pic);
        div.appendChild(p1);
        div.appendChild(p2);
        maindiv.appendChild(div);
        */
        }
    return products
  }

  export default buildProducts;