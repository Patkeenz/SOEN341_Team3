import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {getDatabase, set, ref} from 'firebase/database';
import app from '../server/index.js';
import { FaUser } from 'react-icons/fa'
import ReactDOM, { render } from 'react-dom';


const auth = getAuth();
const db = getDatabase(app);

const admincode = "123456";
var wantsadmin;

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

        if(errorMessage == 'Firebase: Error (auth/invalid-email).')
        {
            var emailDiv = document.getElementById('emailDiv'); 
            emailDiv.className = "invalidInput";
        }
    })
}

export function checkForValidPassword(userType)
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

    if(passwordValid&&!wantsadmin){
        addUser("user");
    }
    else if(passwordValid&&wantsadmin){
        var code = document.getElementById('admin-code').value;
        if(code==admincode){
            addUser("admin");
        }
        else{
            alert("Code Invalid!")
        }
    }
}


export function buildAdmin(){
    wantsadmin=true;
    let div = document.getElementById("admin-button");
    div.className="grid"
    div.innerHTML = "";
    let textbox = document.createElement("input");
    textbox.setAttribute("type", "text");
    textbox.setAttribute("placeholder", "Enter The 6-Digit Code Supplied To You");
    textbox.setAttribute("required", "");
    textbox.setAttribute("id", "admin-code");
    textbox.className="w-full mb-2 border-2 border-blue-400";
    let xbutton = document.createElement("button")
    xbutton.className = "px-1 py-1.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700";
    xbutton.innerHTML = "Cancel";
    xbutton.onclick=function() {
        wantsadmin=false;
        let div = document.getElementById("admin-button");
        div.className="grid"
        div.innerHTML = "";
        let div2 = document.createElement("div")
        div2.className="btn btn-primary justify-self-center btn-sm"
        let adminbutton = document.createElement("button")
        adminbutton.className = "uppercase";
        adminbutton.innerHTML="Admin"
        adminbutton.onclick=function(){
            buildAdmin();
        }
        ReactDOM.render(<FaUser className='float-left mr-2 mt-0.5 '/>, div2)
        div2.appendChild(adminbutton);
        div.appendChild(div2)
    }
    div.appendChild(textbox);
    div.appendChild(xbutton);


    // <button type="button" className="button5"
    //                         onClick={() =>buildAdmin()}>Admin? Tap here.</button>
}

