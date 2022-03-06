import handleUpload from './server/addproduct.js';
import { useState } from "react";
//import './addProduct.css';

const AddProduct = () => {
    const [image, setImage] = useState(null);

    const handleChange = e => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };

    
    

    const categories = ["monitor", "audio", "peripherals", "desks", "accesories"];
    return (
        <div className="absolute w-9/12 ml-40 mt-5 pl-5 border-2 border-red-700 rounded-3xl bg-black text-white">
          <h2 className="text-white text-5xl leading-normal font-heading font-bold text-center">Add a Product</h2>
          <form>
            <div className=" pb-2">
              <label className="font-bold pl-5" for="nameText">Product Name*</label>
              <br/>
              <input id="name" className="w-11/12 pl-4 pr-6 py-2 font-bold placeholder-gray-400 rounded-full focus:outline-none" type="text" name="name" placeholder="Product Name" required/>
              <br/>
            </div>
            <div className=" pb-2">
              <label className="font-bold pl-5" for="priceText">Product Price*</label>
              <br/>
              <input id="price" className="w-11/12 pl-4 pr-6 py-2 font-bold placeholder-gray-400 rounded-full focus:outline-none" type="text" name="price" placeholder="Product Price" required/>
              <br/>
            </div>
            <div className=" pb-2">
              <label className="font-bold pl-5" for="descriptionText">Product Description*</label>
              <br/>
              <input id="description" className="w-11/12 pl-4 pr-6 py-2 font-bold placeholder-gray-400 rounded-full focus:outline-none" type="text" name="description" placeholder="Product Description" required/>
              <br/>
            </div>
            <div className='container' >
              <select id="category" className="dropdown-toggle my-3 inline-block px-2 py-1.5 text-black font-medium text-xs  uppercase rounded  hover:bg-red-600  transition duration-150 ease-in-out flex items-center whitespace-nowrap" required>
              <option value = "" selected disabled hidden>Choose a Product Category* </option>
              <option value="monitor">monitor</option>
              <option value="audio">audio</option>
              <option value="peripherals">peripherals</option>
              <option value="desks">desks</option>
              <option value="accessories">accesories</option>
              </select> 
            </div>
            <div className="w-11/12">
              <input type="file" accept=".png, .jpg, .jpeg" className='form-control px-2 py-1.5 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded' onChange={handleChange}/>
              {/* Insert an image here */}    
            </div> 
            <div className="flex py-3 w-full grid">
              <button type="button" className="inline-block justify-self-center px-3 py-2.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700" onClick={()=>handleUpload(image)}>Add Product</button>
            </div>
          </form>
        </div>   
        );
}

export default AddProduct;