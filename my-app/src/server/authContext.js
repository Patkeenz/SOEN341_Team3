import React, { useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import app from '../server/index.js';
import {getDatabase, get, ref, set} from 'firebase/database';

const AuthContext = React.createContext();
const auth = getAuth();
const db = getDatabase(app);

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider( { children }) {

    const [currentUser, setCurrentUser] = useState(null);
    
    async function getEmail(username){
        var email;
    
        const userRef = ref(db,"Users/"); 
        const adminRef = ref(db,"Admins/"); 
        const collectionsnap = await get((userRef));
            collectionsnap.forEach(doc=>{
                var user = doc.val().Username;
                var em = doc.val().Email;
                if(username==user){
                    email = em;
                }
    
            });
        if (email==null){
            const collectionsnap = await get((adminRef));
            collectionsnap.forEach(doc=>{
                var user = doc.val().Username;
                var em = doc.val().Email;
                if(username==user){
                    email = em;
                }
    
            });
        }
        return email; 
    }

    async function getUsername(email){
        var username;
    
        const userRef = ref(db,"Users/"); 
        const adminRef = ref(db,"Admins/"); 
        const collectionsnap = await get((userRef));
            collectionsnap.forEach(doc=>{
                var user = doc.val().Username;
                var em = doc.val().Email;
                if(email==em){
                    username = user;
                }
    
            });
        if (username==null){
            const collectionsnap = await get((adminRef));
            collectionsnap.forEach(doc=>{
                var user = doc.val().Username;
                var em = doc.val().Email;
                if(email==em){
                    username = user;
                }
    
            });
        }
        return username; 
    }

    async function userType(){
        if (currentUser){
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

    async function signup(usertype){

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

    async function login(user, password) {
        var email = await getEmail(user);
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        return auth.signOut().then(() => {console.log("logged out")})
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(person => {
            setCurrentUser(person)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        userType
    }
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
