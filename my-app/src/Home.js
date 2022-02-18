import {buildProducts, showCategory} from "./server/product.js"
import './Home.css';
import {loggedin} from "./server/login.js";

const Home = () => {
    buildProducts(false);
    return (   
        <div className="home" id="main">       
        </div>
    );
}

export default Home;