import React from "react";
import "./Home.css";




const Home = () => {
    return (
        <div className="home">
            <h2>Home</h2>
            <h3 className="home_categories"> 
            Shop by category:               
            </h3>
            <h4 classname= "home_categoryTitle">
               <div>Monitors</div>
               <div>Audio</div>
               <div>TVs</div>
               <div>Desks</div>
               <div>Accessories</div>
            </h4>
        </div>

    );
}



export default Home;