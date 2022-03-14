import {getItems, removeItem, updateQuantity} from "./server/cart.js"


export async function buildCheckout(loaded) {
    if(!loaded){
        var products = await getItems();
    }
    else{
        products = loaded;
    }
    let title = document.getElementById("cart-title");
    title.innerHTML = "Checkout";
    let maindiv = document.getElementById("usercart");
    maindiv.innerHTML="";
    let table = document.createElement("table")
    var subtotal = 0;
    var prices = [];
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
            let prodQuant = document.createElement("p");
            prodQuant.innerHTML = product.quantity;
            let priceCol = document.createElement("th");
            let prodPrice = document.createElement("h3");
            prodPrice.innerHTML = product.price+ " x " +product.quantity + " = " + product.price*product.quantity + "$";
            prices.push(product.price*product.quantity);
            subtotal += parseFloat(product.price*product.quantity);
            let editCol = document.createElement("th");
            table.appendChild(row);
            row.appendChild(imgCol);
            row.append(infoCol);
            imgCol.appendChild(pic);
            infoCol.append(prodName);
            infoCol.append(lineBreak);
            //infoCol.append(prodDescription);
            row.append(priceCol);
            priceCol.append(prodPrice);
            row.append(editCol);
        }
        }

        maindiv.append(table);
        let shippingheader = document.createElement("p");
        shippingheader.className = "right";
        var shipping = 0;
        if(subtotal<100){
            shipping = 25;
            shippingheader.innerHTML = "Shipping: 25.00$"
            let shippingadvertisement = document.createElement("h5");
            shippingadvertisement.className = "center";
            shippingadvertisement.innerHTML="Spend more than 100$ before tax for free shipping!";
            maindiv.append(shippingadvertisement)
        }

        for(var i=0; i<prices.length; i++){
                let priceheader = document.createElement("p")
                priceheader.className = "right";
                if(i<prices.length-1){
                     priceheader.innerHTML = prices[i] + "$";
                }
                else{
                    let utag = document.createElement("u");
                    utag.innerHTML = "+ " + prices[i];
                    priceheader.appendChild(utag)
                }
            maindiv.append(priceheader);
        }

        let subtotalheader = document.createElement("p");
        subtotalheader.className = "right";
        subtotalheader.innerHTML = "Subtotal: " + subtotal + "$";
        maindiv.append(subtotalheader);

        maindiv.append(shippingheader);

        let taxheader = document.createElement("p");
        taxheader.className = "right";
        taxheader.innerHTML = "Tax (15%): " + subtotal*0.15 + "$";

        let totalheader = document.createElement("h5");
        totalheader.className = "right";
        totalheader.innerHTML = "Total: " + subtotal*1.15+shipping + "$";

        let payButton = document.createElement("button");
        payButton.innerHTML = "Choose a Payment Method";
        payButton.className= "button6";
        payButton.onclick = function(){
            paymentBuilder();
        }
        maindiv.append(taxheader);
        maindiv.append(totalheader);
        maindiv.append(payButton);

    return products
  }

  export function paymentBuilder(){
      //create the form for users to put in their payment info
      let title = document.getElementById("cart-title");
      title.innerHTML = "Supported Payment Methods";
      let maindiv = document.getElementById("usercart");
      maindiv.innerHTML="";
      // Below is a dummy purchase button
      let purchase = document.createElement("button");
      purchase.className= "button6";
      purchase.innerHTML=("Purchase");
      purchase.onclick=function(){     
        purchased();
    }
      maindiv.append(purchase);
 
  }
 
  export function purchased(){       
    let title = document.getElementById("cart-title");
    title.innerHTML = "Order Completed";
    let maindiv = document.getElementById("usercart");
    maindiv.innerHTML="";      
  } 

  