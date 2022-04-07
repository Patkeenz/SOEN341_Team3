import { buildCheckout } from "./buildCheckout.js";
import {getAllOrdersList, updateStatus} from "./server/order.js"
import ReactDOM, { render } from 'react-dom';
import { FaCreditCard, FaTrash, FaPenSquare } from 'react-icons/fa'


export async function buildUpdateOrders(loaded) {
    if(!loaded){
        var orders = await getAllOrdersList();
    }
    else{
        var orders = loaded;
    }


    // var today = new Date();
    // for(var i=0; i<orders.length; i++){
    //     
    //     if(currentorder.deliverydate.getDate()<today.getDate()){
    //         var delivered = true;
    //     }
    //     for(var j = 0; j<items.length; j++){
    //          alert("order number " + (i+1));
    //          alert(items[j].name)
    //     }
    // }
    
    // empty the page
    let maindiv = document.getElementById("usercart");
    maindiv.innerHTML="";

    // create a table for each order
    for(let i = 0; i < orders.length; i++)
    {
        var currentorder = orders[i]; 
        var items = currentorder.items; 

        // find the price of the order
        var totalPrice = 0;
        for(var k = 0; k < items.length; k++)
        {
            totalPrice += items[k].price;
        }

        // add the date and total of the order
        let tableDiv = document.createElement("div");
        tableDiv.setAttribute("class", "tableDiv");
        let table = document.createElement("table");
        table.className = "redBorderedLabelBorder";
        let infoRow = document.createElement("tr");
        let nameColumn = document.createElement("td");
        let nameString = document.createElement("p");
        nameString.setAttribute("class", "orderPageProductName");
        nameString.innerHTML = "User: " + currentorder.username;
        let dateColumn = document.createElement("td");
        let dateString = document.createElement("p");
        dateString.setAttribute("class", "orderPageProductName");
        dateString.innerHTML = "Estimated delivery: " + (currentorder.deliverydate).slice(0, 15);

        var deliveredCol;
        var deliveredCheck;
        var delivered = false;
        var curDate = new Date();
        var shipDate = new Date(currentorder.deliverydate.substring(4, 15));
        if(curDate >= shipDate)
        {
            deliveredCol = document.createElement("td")
            deliveredCheck = document.createElement("p");
            delivered = true;
            deliveredCheck.innerHTML = "Delivered";
            deliveredCheck.setAttribute("class", "deliveredIcon");
        }

        //Processing tag
        var processingCol = document.createElement("td")
        var processingCheck = document.createElement("p");
        processingCheck.innerHTML = "Processing";
        processingCheck.setAttribute("class", "processingIcon");

        let totalCostColumn = document.createElement("td");
        totalCostColumn.setAttribute("colspan", "4");
        let priceString = document.createElement("p");
        priceString.setAttribute("class", "orderPageProductName");
        priceString.innerHTML = "Total cost: $" + parseFloat(totalPrice).toFixed(2);
        // let deliveredButtonColumn = document.createElement("td");
        // let deliveredButton = document.createElement("button");
        // deliveredButton.setAttribute("type", "button");
        // deliveredButton.innerHTML = "Set to Delivered";
        // deliveredButton.setAttribute("class", "updateDeliveredButton");
        let shipButtonColumn = document.createElement("td");
        let shipButton = document.createElement("button");
        shipButton.setAttribute("type", "button");
        shipButton.innerHTML = "Set to Shipped";
        shipButton.setAttribute("class", "updateShippingButton");
        // processButton.onclick = async function(){
        //     await updateStatus(currentorder.username, currentorder.spot, "Delivered")
        // }
        // shipButton.onclick = async function(){
        //     await updateStatus(currentorder.username, currentorder.spot, "Shipped")
        // }

        // append
        maindiv.append(tableDiv);
        tableDiv.append(table);
        table.append(infoRow);
        infoRow.append(nameColumn);
        nameColumn.append(nameString);
        infoRow.append(dateColumn);
        dateColumn.append(dateString);
        
        if(delivered)
        {   
            infoRow.append(deliveredCol);
            deliveredCol.append(deliveredCheck);
        }
        //infoRow.append(totalCostColumn);
        //totalCostColumn.append(priceString);
        if(!delivered){
            infoRow.append(processingCol);
            processingCol.append(processingCheck);
            infoRow.append(shipButtonColumn);
            shipButtonColumn.append(shipButton); 
        }
        

        // add all the items in the order 
        for(var j = 0; j < items.length; j++)
        {
            let itemRow = document.createElement("tr");
            itemRow.className = "redRowBorder";
            let imageColumn = document.createElement("td");
            let image = document.createElement("img");
            image.setAttribute("src", items[j].link);
            image.setAttribute("class", "orderListImage");
            let itemNameColumn = document.createElement("td");
            itemNameColumn.setAttribute("colspan", "2");
            let itemName = document.createElement("p");
            itemName.setAttribute("class", "orderPageProductName");
            itemName.innerHTML = items[j].name;
            let itemCostColumn = document.createElement("td");
            let itemCostString = document.createElement("p");
            itemCostString.setAttribute("class", "orderPageProductName");
            itemCostString.innerHTML = "$" + items[j].price;

            // append the imagetable.append(infoRow);
            table.append(itemRow);
            itemRow.append(imageColumn);
            imageColumn.append(image);
            itemRow.append(itemNameColumn);
            itemNameColumn.append(itemName);
            itemRow.append(itemCostColumn);
            itemCostColumn.append(itemCostString);
        }
    }

    return orders;
        
}