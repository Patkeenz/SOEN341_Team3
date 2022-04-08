import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {getDatabase, get, ref, remove} from 'firebase/database';
import app from '../server/index.js';
import { useAuth } from '../server/authContext'

const db = getDatabase(app);

// const { currentUser } = useAuth();
const { login } = useAuth();

//createUserWithEmailAndPassword(auth, email, password);

test('checks if sign up function works', async () => {
    var inte = 1;
    auth = getAuth();
  
    createUserWithEmailAndPassword(auth, "testEmail@test.com", "helloo1!");
    await login("helloworld", "hello1!");
    if(currentUser.displayName == "helloworld")
    {
        inte = 1;
    }
    else
    {
        inte = 1.1;
    }

    expect(isInteger(inte)).toBe(true);
  });