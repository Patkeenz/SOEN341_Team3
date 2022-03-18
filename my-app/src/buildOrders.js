import { buildCheckout } from "./buildCheckout.js";
import {getOrdersList} from "./server/order.js"
import ReactDOM, { render } from 'react-dom';
import { FaCreditCard, FaTrash, FaPenSquare } from 'react-icons/fa'


export async function buildOrders(loaded) {
    if(!loaded){
        var orders = await getOrdersList();
    }
    else{
        var orders = loaded;
    }
    
    

    // var today = new Date();
    // for(var i=0; i<orders.length; i++){
    //     var currentorder = orders[i]; 
    //     var items = currentorder.items; 
    //     if(currentorder.deliverydate.getDate()<today.getDate()){
    //         var delivered = true;
    //     }
    //     for(var j = 0; j<items.length; j++){
    //          alert("order number " + (i+1));
    //          alert(items[j].name)
    //     }
    
    // }

    // temporary
    var orders = ["order1", "order2", "order3"];
    
    // empty the page
    let maindiv = document.getElementById("usercart");
    maindiv.innerHTML="";

    // create a table for each order
    for(let i = 0; i < orders.length; i++)
    {
        // add the date and total of the order
        let table = document.createElement("table");
        table.className = "redBorderedLabelBorder";
        let infoRow = document.createElement("tr");
        infoRow.className = "redBorderedLabelBorder";
        let dateColumn = document.createElement("td");
        let dateString = document.createElement("p");
        dateString.innerHTML = "October 26";
        let totalCostColumn = document.createElement("td");
        let priceString = document.createElement("p");
        priceString.innerHTML = "$549.99";

        // append
        maindiv.append(table);
        table.append(infoRow);
        infoRow.append(dateColumn);
        dateColumn.append(dateString);
        infoRow.append(totalCostColumn);
        totalCostColumn.append(priceString);

        var items = ["item1", "item2", "item3"];

        // add all the items in the order 
        for(var j = 0; j < items.length; j++)
        {
            let itemRow = document.createElement("tr");
            itemRow.className = "redBorderedLabelBorder";
            let imageColumn = document.createElement("td");
            let image = document.createElement("img");
            let itemNameColumn = document.createElement("td");
            let itemName = document.createElement("p");
            itemName.innerHTML = "desk";
            let itemCostColumn = document.createElement("td");
            let itemCostString = document.createElement("p");
            itemCostString.innerHTML = "$5.89";

            // append the imagetable.append(infoRow);
            table.append(itemRow);
            itemRow.append(imageColumn);
            itemRow.append(itemNameColumn);
            itemNameColumn.append(itemName);
            itemRow.append(itemCostColumn);
            itemCostColumn.append(priceString);
        }
    }

    return orders;
        
}