import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {getDatabase, set, ref} from 'firebase/database';
import app from '../server/index.js';


const auth = getAuth();
const db = getDatabase(app);

async function addUser(usertype){
    var collection;
    if(usertype=='admin'){
        collection = 'Admins/';
    }
    else{
        collection = 'Users/';
    }
    var email = document.getElementById("email").value;
    var username = document.getElementById("user").value;
    var password = document.getElementById("pass").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
        const user = userCredential.user; //sign the user in and create their account on the database
        set(ref(db, collection + user.uid),{
            Username: username,
            Email: email
        })
        alert('User Created!');
        })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message
        alert(errorMessage);
    })
}

export default addUser;
