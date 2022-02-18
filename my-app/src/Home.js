import {buildProducts, showCategory} from "./server/product.js"
import './Home.css';

const categories = ["all", "monitor", "audio", "peripherals", "desks", "accesories"];

var products;
const Home = () => {
    buildProducts(false).then(val=>{
        products = val;
    });

    return (   
        <div className="home" id="main"> 
        <div className = "buttondrop">
              <select id="homecategory">
              <option value = "" selected disabled hidden>Choose a Product Category</option>
              <option value="all">All</option>
              <option value="monitor">Monitor</option>
              <option value="audio">Audio</option>
              <option value="peripherals">Peripherals</option>
              <option value="desks">Desks</option>
              <option value="accessories">Accesories</option>
              </select> 
            <button onClick={()=>showCategory(products)}> Search </button> 
            </div>
            <div className="grid-container" id="products-display">  
            </div>  
            <div id="product-display">
            </div>       
        </div>
    );
}

export default Home;