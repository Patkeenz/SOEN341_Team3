import { buildCheckout } from "./buildCheckout.js";
import {getItems, removeItem, updateQuantity} from "./server/cart.js"
import ReactDOM, { render } from 'react-dom';
import { FaCreditCard, FaTrash, FaPenSquare } from 'react-icons/fa'


export async function buildCartProducts(loaded) {
    if(!loaded){
        var products = await getItems();
    }
    else{
        products = loaded;
    }
    let maindiv = document.getElementById("usercart");
    maindiv.innerHTML="";
    maindiv.className="nolink";
    let table = document.createElement("table")
    var subtotal = 0;
        for(var i=0; i<products.length; i++)
        {
            if(products[i].name!=null){
                var product = products[i];
                let row = document.createElement("tr");
                row.className="border-t border-b border-red-300"
                let imgCol = document.createElement("th");
                imgCol.className = "imgCol";
                let pic = document.createElement("img");
                pic.setAttribute("src", products[i].link);
                pic.className = "p-1 w-11/12 bg-white border rounded max-w-sm justify-self-center bg-opacity-25";//"productImage";
                let infoCol = document.createElement("th");
                let prodName = document.createElement("p");
                prodName.innerHTML = product.name;
                prodName.className = "slightlyMarginedItem";
                let lineBreak = document.createElement("br");
                let textbox = document.createElement("input");
                textbox.setAttribute("type", "text");
                textbox.setAttribute("placeholder", product.quantity);
                textbox.setAttribute("id", "product-quantity" + product.spot);
                textbox.className="border-3 w-1/3 border-blue-50";
                let prodQuant = document.createElement("p");
                prodQuant.innerHTML = product.quantity;
                let priceCol = document.createElement("th");
                let prodPrice = document.createElement("p");
                prodPrice.className="mr-3"
                prodPrice.innerHTML = (product.price*product.quantity).toFixed(2) + "$";
                subtotal += parseFloat(product.price*product.quantity);
                let editCol = document.createElement("th");

                let deleteIcon = document.createElement("div");
                deleteIcon.className="inline-block justify-self-center px-2.5 py-1.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700 hover:cursor-pointer"//"btn bg-red-400 justify-self-center btn-sm mt-1"
                let deleteButton = document.createElement("button");
                //deleteButton.className = "deleteButton";
                deleteButton.innerHTML = "Delete";
                deleteButton.setAttribute("id", product.spot);
                deleteIcon.onclick = async function(){
                    await removeItem(deleteButton.id);
                    buildCartProducts(false);
                }

                let updateIcon = document.createElement("div");
                updateIcon.className="inline-block justify-self-center px-2 py-1.5 bg-green-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-green-700 hover:cursor-pointer"
                let updateButton = document.createElement("button");
                //updateButton.className = "updateButton";
                updateButton.innerHTML = "Update";
                updateButton.setAttribute("id", product.spot);
                updateIcon.onclick = async function(){
                    await updateQuantity(updateButton.id, document.getElementById("product-quantity" + updateButton.id).value);
                    buildCartProducts(false);
                }

                ReactDOM.render(<FaTrash className="float-left mr-1"/>, deleteIcon)
                deleteIcon.appendChild(deleteButton)

                ReactDOM.render(<FaPenSquare className="float-left mr-1"/>, updateIcon)
                updateIcon.appendChild(updateButton)

                //appending elements
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
                editCol.append(updateIcon);
                editCol.append(textbox);
                editCol.append(deleteIcon);
            }
        }
        let subtotalheader = document.createElement("h3");
        subtotalheader.setAttribute("id", "subtotal");
        subtotalheader.className = "right";
        subtotalheader.innerHTML = "";
        subtotalheader.innerHTML = "Subtotal: " + subtotal.toFixed(2) + "$";

        let checkoutContainer = document.createElement("div");
        checkoutContainer.className="grid mb-2"
        let checkoutIcon = document.createElement("div");
        checkoutIcon.className="inline-block justify-self-center px-2.5 py-2.5 bg-green-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-green-700 hover:cursor-pointer"
        let checkoutButton = document.createElement("button");
        checkoutButton.innerHTML = "Checkout";
        //checkoutButton.className= "button5";
        checkoutIcon.onclick = async function(){
            buildCheckout(false);
        }
        ReactDOM.render(<FaCreditCard className="float-left mr-1"/>, checkoutIcon)
        checkoutIcon.appendChild(checkoutButton)
        checkoutContainer.appendChild(checkoutIcon)

        maindiv.append(table);
        maindiv.append(subtotalheader);
        maindiv.append(checkoutContainer)

    return products
  }