import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../server/index.js';
import React from 'react'
import {getEmail} from "../server/auth.js";

const auth = getAuth();

export async function login(user, password) {
    var email = await getEmail(user);
    return signInWithEmailAndPassword(auth, email, password);
}


