import handleUpload from './server/addproduct.js';
import { useState } from "react";
import { useAuth } from './server/authContext.js';
import {getDatabase, get, ref, remove} from 'firebase/database';
import app from '../server/index.js';

const db = getDatabase(app);


test('checks if add products function works', () => {
  var result;
  var price;

  uploadProduct("test1", 100, "This is a test","cat","picture");
  const docRef = ref(db,"Products/"+ "test1");
  const docsnap = await get((docRef));
    if(docsnap.exist()){
        price = docsnap.val().Price;
        result = 1;
    }
    assert.equal(price, 100);
    docsnap.remove();
});


  