import {getItems, removeItem} from "./server/cart.js"


export async function buildCheckoutProducts(loaded) {
    if(!loaded){
        var products = await getItems();
    }
    else{
        products = loaded;
    }
    let maindiv = document.getElementById("checkoutItems");
    maindiv.innerHTML = "";
    if(products != null)
    {
        for(var i=0; i<products.length; i++)
        {
            var product = products[i];
            let row = document.createElement("tr");
            let imgCol = document.createElement("th");
            imgCol.className = "imgCol";
            let pic = document.createElement("img");
            pic.setAttribute("src", products[i].link);
            pic.className = "productImage";
            let infoCol = document.createElement("th");
            let prodName = document.createElement("h1");
            prodName.innerHTML = product.name;
            prodName.className = "slightlyMarginedItem";
            let lineBreak = document.createElement("br");
            let prodDescription = document.createElement("p");
            // prodDescription.innerHTML = product.description;
            let priceCol = document.createElement("th");
            let prodPrice = document.createElement("h1");
            prodPrice.innerHTML = product.price + "$";
            let editCol = document.createElement("th");
            let deleteButton = document.createElement("button");
            deleteButton.className = "deleteButton";
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("id", product.spot);
            deleteButton.onclick = function(){removeItem(this.id);
                buildCheckoutProducts(false);};

            maindiv.appendChild(row);
            row.appendChild(imgCol);
            row.append(infoCol);
            imgCol.appendChild(pic);
            infoCol.append(prodName);
            infoCol.append(lineBreak);
            //infoCol.append(prodDescription);
            row.append(priceCol);
            priceCol.append(prodPrice);
            row.append(editCol);
            editCol.append(deleteButton);
            
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
    }
    return products
  }