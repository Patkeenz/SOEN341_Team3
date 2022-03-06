import {buildProducts, showCategory} from "./server/product.js"
import './Home.css';

const Home = () => {
    buildProducts(false);
    return (   
        <div className="home" id="main">       
        </div>
    );
}

export default Home;