import {getCart, getItems, removeItem, updateQuantity} from "../server/cart.js"
import {getDatabase, get, update, ref, remove} from 'firebase/database';
import {userType} from '../server/auth.js'
import app from '../server/index.js';
import {getAuth} from 'firebase/auth';
import { FirebaseError } from "firebase/app";

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
        today.setDate(day+deliverytime);
        return today;
    }
    else{
        var newday = day+deliverytime%monthDays(month);
        today.setDate(newday)
        month++;
        if (month>11){
            month=0;
            year++;
        }
        today.setMonth(month);
        today.setFullYear(year);
        return today;
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

export async function confirmOrder(country, city, address){
    var currentdate = new Date();
    var address = city + ", " + address;
    var deliverydate = await deliveryTime(country);
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
        var addon = currentdate+"~"+cart+"~"+deliverydate+"~"+address+"~"+"Processing Order";
        if (orders==null || orders==""){
            update(ref(db, collection + uid),{
                Orders: addon
            })
        }
        else{
            update(ref(db, collection + uid),{
                Orders: orders+"+ "+addon
            })
        }
        update(ref(db, collection + uid),{//empty out the cart
            Cart: "",
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
        var orders;
        await get(ref(db, collection + uid)).then((snapshot)=>{
            orders = snapshot.val().Orders;
        })
        if (orders==null){
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
            var orders = [];
            var itemsanddates = allorders.split("+ ");
            for(var i=0; i<itemsanddates.length; i++){
                var split = itemsanddates[i].split("~"); //split items and dates into order date, products in the order, and delivery date
                var allitems = split[1].split(", ");
                var items = [];
                for(var j=0; j<allitems.length; j++){
                    var splitup = allitems[j].split("|");
                    const item = {quantity: splitup[0], name: splitup[1], price: splitup[2], link: splitup[3], spot: j};
                    items.push(item);            
                }
                const order = {orderdate: split[0], items: items, deliverydate: split[2], address: split[3], status: split[4], spot: i};
                orders.push(order)
            }
            return orders;
        }
}

async function getAllOrders(){
    var orders;
    var orderItem = [];
    collection = "Users/";
    await get(ref(db, collection)).then((snapshot)=>{
        snapshot.forEach(user => {
            orders = user.val().Orders;
            const userOrder = {orders: orders, username: user.val().Username}
            orderItem.push(userOrder);
        })
        
    })
    if (orderItem==null){
        return null;
    }
    else{
        //console.log(orderItem)
        return orderItem;
    }

}

export async function getAllOrdersList() {
var allorders = await getAllOrders();
//console.log(allorders[0].orders);
    if (allorders==null){
        return null;
    }
    else{
        var orders = [];
        allorders.forEach(userinfo => {
            if(userinfo.orders==null){
                return null
            }
            //console.log(useritems.orders)
        if(userinfo.orders !== undefined){
        var itemsanddates = userinfo.orders.split("+ ");
        //console.log(userinfo)
        for(var i=0; i<itemsanddates.length; i++){
            var split = itemsanddates[i].split("~"); //split items and dates into order date, products in the order, and delivery date
            if(split[1] !== undefined){
            var allitems = split[1].split(", ");
            
            var items = [];
            for(var j=0; j<allitems.length; j++){
                var splitup = allitems[j].split("|");
                const item = {quantity: splitup[0], name: splitup[1], price: splitup[2], link: splitup[3], spot: j};
                items.push(item);            
            }
            const order = {orderdate: split[0], items: items, deliverydate: split[2], address: split[3], username: userinfo.username, spot: i};
            orders.push(order)
        }
        }
    }
    })
    console.log(orders)
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

export async function updateStatus(username, spot, status){
    var userid;
    var orders;
    const collectionRef = ref(db,"Users/"); 
    const collectionsnap = await get((collectionRef));
    collectionsnap.forEach(doc=>{
        var currentusername = doc.val().Username;
        if(currentusername == username){
            userid = doc.key;
            orders=doc.val().Orders;
        }
    });
    if(spot>=0){
        var allorders = orders.split("+ ");
        var updatedorders="";
        for(var i=0; i<allorders.length; i++){
            if(i!=spot) {//do not add the product in the spot back
                if(i==0){
                    updatedorders+=allorders[i];
                }
                else{
                    updatedorders+="+ "+allorders[i];
                }
            }
            else{
                var ordersplit = allorders[i].split("~");
                ordersplit[4] = status;
                var rebuiltorder="";
                for(var j=0; j<ordersplit.length; j++){
                    if(j!=ordersplit.length-1){
                        rebuiltorder+=ordersplit[j];
                        rebuiltorder+="~";
                    }
                    else{
                        rebuiltorder+=ordersplit[j];
                    }
                }
                if(i==0){
                    updatedorders+=rebuiltorder;
                }
                else{
                    updatedorders+="+ "+rebuiltorder;
                }
            }
        }
    }
    update(ref(db, collection + uid),{
        Orders: updatedorders
    })

}