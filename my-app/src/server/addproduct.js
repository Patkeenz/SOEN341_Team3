import {getDatabase, set, ref} from 'firebase/database';
import app from './index.js';
import {getStorage, ref as sref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const db = getDatabase(app);
const storage = getStorage(app);
var urlget = "";

async function uploadProduct(name, price, description, category, url){
    set(ref(db, 'Products/' + name),{
        Price: price,
        Description: description,
        Category: category,
        Link: url,
    })
    alert("Product added!");
}

async function handleUpload(image){
    const imageRef = sref(storage, document.getElementById("name").value);
    const uploadtask = uploadBytesResumable(imageRef, image);
    uploadtask.on('state-changed', snapshot =>{
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      if(progress==100){
        getDownloadURL(uploadtask.snapshot.ref).then((url)=>{
          //alert(url);
          urlget=url;
          uploadProduct(
            document.getElementById("name").value,
            document.getElementById("price").value,
            document.getElementById("description").value,
            document.getElementById("category").value,
            urlget
        );
            });
      }
    })

  };

// this function can get every product its associated url if it has an image uploaded in the same name
//   async function transferUrls() {
//     const collectionRef = ref(db,"Products/");
//     const collectionsnap = await get((collectionRef));
//     collectionsnap.forEach(doc=>{
//         var name = doc.key;
//         var category = doc.val().Category;
//         var description = doc.val().Description;
//         var price = doc.val().Price
//         var picref = sref(storage, name);
//         getDownloadURL(picref).then((link)=>{
//           set(ref(db, "Products/" + name),{
//             Category: category, 
//             Description: description,
//             Link: link,
//             Price: price, 
//           });
//         });
//     });
//   }

export default handleUpload;
