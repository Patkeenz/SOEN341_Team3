import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../server/index.js';
import React from 'react'

const auth = getAuth();

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

