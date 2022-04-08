import {buildProducts, showCategory} from "./server/product.js"
import './Home.css';

const Home = () => {
    buildProducts(false);
    return (   
        <div className="mx-auto mb-3 align-items-center justify-content-center" id="main">       
        </div>
    );
}

export default Home;