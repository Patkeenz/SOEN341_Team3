import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../server/index.js';
import React from 'react'

const auth = getAuth();

function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export default login;
