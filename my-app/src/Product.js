import uploadProduct from './server/product.js';
import { useState } from "react";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import app from "./server/index.js";
import './addProduct.css';

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
          <h2 className="page-header">Add a Product</h2>
          <form>
            <div className="inputSpace">
              <label className="textboxLabel" for="nameText">Product Name</label>
              <br/>
              <input id="nameText" className="textbox" type="text" name="name" placeholder="Product Name" id="name"/>
              <br/>
            </div>
            <div className="inputSpace">
              <label className="textboxLabel" for="priceText">Product Price</label>
              <br/>
              <input id="priceText" className="textbox" type="text" name="price" placeholder="Product Price" id="price" />
              <br/>
            </div>
            <div className="inputSpace">
              <label className="textboxLabel" for="descriptionText">Product Description</label>
              <br/>
              <input id="descriptionText" className="textbox" type="text" name="description" placeholder="Product Description" id="description"/>
              <br/>
            </div>
            <div className="inputSpace">
              <select id="category">
              <option value = "" selected disabled hidden>Choose a Product Category</option>
              <option value="monitor">monitor</option>
              <option value="audio">audio</option>
              <option value="peripherals">peripherals</option>
              <option value="desks">desks</option>
              <option value="accessories">accesories</option>
              </select> 
            </div>
            <div className="inputSpace">
              <input type="file" onChange={handleChange}/>
              {/* Insert an image here */}    
            </div> 
            <div className="redGlowBg">
              <button type="submit" className="button" onClick={handleUpload}>Add Product</button>
            </div>
          </form>
        </div>   
        );
}

export default Product;