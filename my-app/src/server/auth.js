import {getAuth} from 'firebase/auth';
import app from '../server/index.js';
import {getDatabase, get, ref} from 'firebase/database';

const auth = getAuth();
const db = getDatabase(app);

export function loggedin(){
    if(auth.currentUser.uid==null) {
        //alert("not logged in");
    return false;
    }
    else{
      //  alert("logged in");
    return true;
    }
}

export async function userType(){
    if (loggedin()){
        var uid = auth.currentUser.uid
        var user;
        const collectionRef = ref(db,"Users/"); 
        const collectionsnap = await get((collectionRef));
        collectionsnap.forEach(doc=>{
            var id = doc.key;
            if(uid == id){
                user=true;
            }
        });
        if(user){
            return "User";
        }
        else{
            return "Admin";
        }
    }
    else{
        return null;
    }
}

export async function getEmail(username){
    var email;
    const collectionRef = ref(db,"Admins/"); 
    const collectionsnap = await get((collectionRef));
        collectionsnap.forEach(doc=>{
            var user = doc.val().Username;
            var em = doc.val().Email;
            if(username==user){
                email = em;
            }
            
        });
    return email; 
}