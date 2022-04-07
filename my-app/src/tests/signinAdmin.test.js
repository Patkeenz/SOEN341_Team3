import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {getDatabase, get, ref, remove} from 'firebase/database';
import app from '../server/index.js';

const db = getDatabase(app);

//createUserWithEmailAndPassword(auth, email, password);

test('checks if sign up function works', async () => {
    var email;
  
    createUserWithEmailAndPassword("mel", "testEmail@test.com", "helloo1!");
    const docRef = ref(db,"User/"+ "mel");
    const docsnap = await get((docRef));
      if(docsnap.exist()){
          email = docsnap.val().Email;
          result = 1;
      }
      assert.equal(email, "testEmail@test.com");
      docsnap.remove();
  });