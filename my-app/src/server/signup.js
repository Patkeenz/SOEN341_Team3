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

        if(errorMessage == 'Firebase: Error (auth/email-already-in-use).')
        {
            var emailDiv = document.getElementById('emailDiv'); 
            emailDiv.className = "invalidInput";
        }
    })
}

function checkForValidPassword(userType)
{
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const digits = /[1234567890]/;

    var passwordValid = true;

    // get passwords from form
    var password = document.getElementById('pass').value;
    var validatedPass = document.getElementById('validatedPass').value;

    //remove the red outline on the textspace for resubmission
    var emailDiv = document.getElementById('emailDiv'); 
            emailDiv.className = "";

    var passwordDiv = document.getElementById('passDiv'); 
    passwordDiv.className = "";

    // make sure password is at least 8 characters and contains at least one digit
    if(password.length < 8)
    {
        passwordValid = false;
        alert("Password must contain at least 8 characters :)");
        passwordDiv = document.getElementById('passDiv'); 
        passwordDiv.className = "invalidInput";
    }
    
    // make sure password has a special character
    if(!specialChars.test(password))
    {
        passwordValid = false;
        alert("Password must contain at least 1 special character :)");
        passwordDiv = document.getElementById('passDiv'); 
        passwordDiv.className = "invalidInput";
    }

    // make sure password has a digit
    if(!digits.test(password))
    {
        passwordValid = false;
        alert("Password must contain at least 1 digit :)");
        passwordDiv = document.getElementById('passDiv'); 
        passwordDiv.className = "invalidInput";
    }

    var validationDiv;

    // make sure both passwords are the same
    if(password !== validatedPass)
    {
        passwordValid = false;
        alert("Passwords must match :)");
        validationDiv = document.getElementById('passVerifDiv'); 
        validationDiv.className = "invalidInput";
    }
    else // make sure there is no red highlight
    {
        validationDiv = document.getElementById('passVerifDiv'); 
        validationDiv.className = "";
    }


    // make sure pass1=pass2

    if(passwordValid)
        addUser(userType);
}

export default checkForValidPassword;
