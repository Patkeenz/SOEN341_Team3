import app from '../server/index.js';
import {getDatabase, get, update, ref, deleteField} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import {userType} from '../server/auth.js'

const db = getDatabase(app);
const auth = getAuth();
var uid;
var collection;

async function getCart(){ //returns cart string
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
            cart = snapshot.val().Cart;
        })
        if (cart==null){
            return null;
        }
        else{
            return cart;
        }

    }
    else{
        return null;
    }
}

export async function getItems() {
    var cart = await getCart();
        if (cart==null){
            return null;
        }
        else{
            const items = [];
            var allitems = cart.split(", ");
            for(var i=0; i<allitems.length; i++){
                var splitup = allitems[i].split("|");
                const item = {quantity: splitup[0], name: splitup[1], price: splitup[2], link: splitup[3], spot: i};
                items.push(item);            
            }
            return items;
        }
}

export async function updateQuantity(spot, newquantity){
    var cart = await getCart();
    var allitems = cart.split(", ");
    var splitup = allitems[spot].split("|");
    splitup[0] = newquantity;
    var updateditem="";
    for(var i=0; i<splitup.length; i++){
        if(i==3){
            updateditem+=splitup[3];
        }
        else{
            updateditem+=splitup[i] + "|";
        }      
    }
    allitems[spot] = updateditem;
    var updatedcart="";
    for(var i=0; i<allitems.length; i++){
        if(i==0){
            updatedcart+=allitems[i];
        }
        else{
            updatedcart+=", "+allitems[i];
        }
    }
    update(ref(db, collection + uid),{
        Cart: updatedcart
    })
}

export async function removeItem(spot){
    var cart = await getCart();
    var allitems = cart.split(", ");
    var updatedcart="";
    for(var i=0; i<allitems.length; i++){
        if(i!=spot) {//do not add the product in the spot back
            if(i==0){
                updatedcart+=allitems[i];
            }
            else if (spot==0 && i==1){
                updatedcart+=allitems[i];
            }
            else{
                updatedcart+=", "+allitems[i];
            }
        }
    }
}