import uploadProduct from './server/product.js';
import { useState } from "react";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import app from "./server/index.js";

const Product = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const storage = getStorage(app);

    const handleChange = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
        uploadProduct(
            document.getElementById("name").value,
            document.getElementById("price").value,
            document.getElementById("description").value,
            document.getElementById("category").value
        );
      const imageRef = ref(storage, document.getElementById("name").value);
      uploadBytes(imageRef, image).then(()=>{
          getDownloadURL(imageRef).then((url)=>{
              setUrl(url);
          }).catch((error)=>{
            console.log(error.message);
            }); 
            setImage(null) 
          }).catch((error)=>{
              console.log(error.message);
          });
    };

    const categories = ["monitor", "audio", "peripherals", "desks", "accesories"];
    return (
        <div className="product">
        <h2>Add a Product</h2>
    <form>
        <input type="text" name="name" placeholder="Product Name" id="name"/>
        <br></br>
        <input type="text" name="price" placeholder="Product Price" id="price" />
        <br></br>
        <input type="text" name="description" placeholder="Product Description" id="description"/>
        <select id="category" placeholder= "Select a Category">
        <option value="monitor">monitor</option>
        <option value="audio">audio</option>
        <option value="peripherals">peripherals</option>
        <option value="desks">desks</option>
        <option value="accessories">accesories</option>
        </select> 
        <input type="file" onChange={handleChange}/>
        {/* Insert an image here */}       
        <br></br>
        <button type="button" onClick={handleUpload}>Add Product</button>
    </form>
    </div>   
        );
}

export default Product;