import {getItems, removeItem, updateQuantity} from "./server/cart.js"


export async function buildCheckoutProducts(loaded) {
    if(!loaded){
        var products = await getItems();
    }
    else{
        products = loaded;
    }
    let maindiv = document.getElementById("checkoutItems");
    maindiv.innerHTML = "";
    {
        for(var i=0; i<products.length; i++)
        {
            if(products[i].name!=null){
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
            let textbox = document.createElement("input");
            textbox.setAttribute("type", "text");
            textbox.setAttribute("placeholder", product.quantity);
            textbox.setAttribute("id", "product-quantity");
            textbox.className="textbox2";
            let prodQuant = document.createElement("p");
            prodQuant.innerHTML = product.quantity;
            let priceCol = document.createElement("th");
            let prodPrice = document.createElement("h1");
            prodPrice.innerHTML = product.price + "$";
            let editCol = document.createElement("th");
            let deleteButton = document.createElement("button");
            deleteButton.className = "deleteButton";
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("id", product.spot);
            deleteButton.onclick = async function(){
                await removeItem(this.id);
                buildCheckoutProducts(false);
            }
            let updateButton = document.createElement("button");
            updateButton.className = "updateButton";
            updateButton.innerHTML = "Update";
            updateButton.setAttribute("id", product.spot);
            updateButton.onclick = async function(){
                await updateQuantity(this.id, document.getElementById("product-quantity").value);
                buildCheckoutProducts(false);
            }
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
            editCol.append(textbox);
            editCol.append(updateButton);
        }
        }
    }
    return products
  }