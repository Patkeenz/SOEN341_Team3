import {uploadProduct, handleUpload} from './server/addproduct.js';
//import { useState } from "react";
//import { useAuth } from './server/authContext.js';
import {getDatabase, get, ref, remove} from 'firebase/database';
import app from '../server/index.js';
import { useAuth } from './server/authContext'

const db = getDatabase(app);


test('checks if add products function works', async () => {
  var price;

  uploadProduct("test1", 100, "This is a test","cat","picture");
  const docRef = ref(db,"Products/"+ "test1");
  const docsnap = await get((docRef));
    if(docsnap.exist()){
        price = docsnap.val().Price;
    }
    assert.equal(price, 100);
    docsnap.remove();
});


  