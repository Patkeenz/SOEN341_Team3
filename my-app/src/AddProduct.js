import handleUpload from './server/addproduct.js';
import { useState } from "react";
import './addProduct.css';

const AddProduct = () => {
    const [image, setImage] = useState(null);

    const handleChange = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    
    

    const categories = ["monitor", "audio", "peripherals", "desks", "accesories"];
    return (
        <div className="product">
          <h2 className="page-header">Add a Product</h2>
          <form>
            <div className="inputSpace">
              <label className="textboxLabel" for="nameText">Product Name*</label>
              <br/>
              <input id="name" className="textbox" type="text" name="name" placeholder="Product Name" required/>
              <br/>
            </div>
            <div className="inputSpace">
              <label className="textboxLabel" for="priceText">Product Price*</label>
              <br/>
              <input id="price" className="textbox" type="text" name="price" placeholder="Product Price" required/>
              <br/>
            </div>
            <div className="inputSpace">
              <label className="textboxLabel" for="descriptionText">Product Description*</label>
              <br/>
              <input id="description" className="textbox" type="text" name="description" placeholder="Product Description" required/>
              <br/>
            </div>
            <div className="inputSpace">
              <select id="category" required>
              <option value = "" selected disabled hidden>Choose a Product Category* </option>
              <option value="monitor">monitor</option>
              <option value="audio">audio</option>
              <option value="peripherals">peripherals</option>
              <option value="desks">desks</option>
              <option value="accessories">accesories</option>
              </select> 
            </div>
            <div className="inputSpace">
              <input type="file" accept=".png, .jpg, .jpeg" onChange={handleChange}/>
              {/* Insert an image here */}    
            </div> 
            <div className="redGlowBg">
              <button type="button" className="button" onClick={()=>handleUpload(image)}>Add Product</button>
            </div>
          </form>
        </div>   
        );
}

export default AddProduct;