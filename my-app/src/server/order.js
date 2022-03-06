import {getCart, getItems, removeItem, updateQuantity} from "./server/cart.js"
import {getDatabase, get, update, ref, deleteField} from 'firebase/database';
import {userType} from '../server/auth.js'

const db = getDatabase(app);
const auth = getAuth();
var uid;
var collection;

// d.getFullYear()
// d.getMonth() returns the month #-1
// d.getDate()

export async function deliveryTime(country){//returns amount of days it will take to deliver the order
    var deliverytime;
    if (country=="Canada"){
        deliverytime = 3;
    }
    else{
        deliverytime = 7;
    }
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    if (day+deliverytime<monthDays(month)){
        return Date(year, month, day+deliverytime, 3, 0, 0, 0); //3 pm delivery 
    }
    else{
        var newday = day+deliverytime%monthDays(month);
        month++;
        if (month>11){
            month=0;
            year++;
        }
        return Date(year, month, newday, 3, 0, 0, 0);
    }
}

function monthDays(month){//returrns days in the month
    if(month==0||month==2||month==4||month==6||month==7||month==9||month==11){
        return 31;
    }
    else if(month==1){
        return 28;
    }
    else{
        return 30;
    }
}

export async function confirmOrder(){
    var currentdate = new Date();
    var country = document.getElementById("country");
    var deliverydate = deliveryTime(country);
    var cart = await getCart();
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
        var orders;
        await get(ref(db, collection + uid)).then((snapshot)=>{
            orders = snapshot.val().Orders;
        })
        var orders = currentdate+"~"+cart+"~"+deliverydatedate;
        if (orders==null || orders==""){
            update(ref(db, collection + uid),{
                Orders: addon
            })
        }
        else{
            update(ref(db, collection + uid),{
                Orders: cart+"+ "+addon
            })
        }
        update(ref(db, collection + uid),{//empty out the cart
            Cart: deleteField(),
        })
        alert("Order Confirmed");

    }
    else{
        alert("Not logged in...");
    }


}

async function getOrders(){
    var usertype = await userType();
    if (usertype!=null){
        uid = auth.currentUser.uid;
        if(usertype=="User"){
            collection = "Users/";
        }
        else{
            collection = "Admins/";
        }
        var cart;
        await get(ref(db, collection + uid)).then((snapshot)=>{
            orders = snapshot.val().Orders;
        })
        if (cart==null){
            return null;
        }
        else{
            return orders;
        }

    }
    else{
        return null;
    }
}

export async function getOrdersList() {
    var allorders = await getOrders();
        if (allorders==null){
            return null;
        }
        else{
            const orders = [];
            var itemsanddates = allorders.split("+ ");
            for(var i=0; i<itemsanddates.length; i++){
                var split = itemsanddates[i].split("~"); //split items and dates into order date, products in the order, and delivery date
                var allitems = split[1].split(", ");
                var items;
                for(var i=0; i<allitems.length; i++){
                    var splitup = allitems[i].split("|");
                    const item = {quantity: splitup[0], name: splitup[1], price: splitup[2], link: splitup[3], spot: i};
                    items.push(item);            
                }
                const order = {orderdate: split[0], items: items, deliverydate: split[2], spot: i};
                orders.push(order)
                
            }
            return orders;
        }
}

export async function removeOrder(spot){
    if(spot==null){
        return;
    }
    var orders = await getOrders();
    var allorders = orders.split("+ ");
    var updatedorders="";
    for(var i=0; i<allorders.length; i++){
        if(i!=spot) {//do not add the product in the spot back
            if(i==0){
                updatedorders+=allorders[i];
            }
            else if (spot==0 && i==1){
                updatedorders+=allorders[i];
            }
            else{
                updatedorders+="+ "+allorders[i];
            }
        }
    }
        update(ref(db, collection + uid),{
            Orders: updatedorders
        })
}