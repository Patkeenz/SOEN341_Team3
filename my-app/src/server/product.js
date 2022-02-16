import getProducts from "../server/home.js"

{/* <h1 class="display-5 fw-bolder">Shop item template</h1>
                        <div class="fs-5 mb-5">
                            <span>$40.00</span>
                        </div>
                        <p class="lead">Lorem ipsum?</p> */}

async function buildProduct(name, products){
    alert(name);    
    // var currentproduct;
    // for(var i=0; i<products.length; i++){
    //     if((name)==products[i].name){
    //         currentproduct = products[i];
    //     }
    // }
    // let img = document.getElementById("product-image");
    // img.setAttribute("src",currentproduct.link); //set the img source to the current products source
    // let maindiv = document.getElementById("display");
    // maindiv.innerHTML ="";
    // let header = document.createElement("h1");
    // header.className= "display-5 fw-bolder";
    // header.innerHTML= currentproduct.name;
    // let div = document.createElement("div");
    // div.className="fs-5 mb-5";
    // let span = document.createElement("span");
    // span.innerHTML=currentproduct.price+ " $";
    // div.appendChild(span);
    // let p = document.createElement("p");
    // p.className = "lead";
    // p.innerHTML = currentproduct.description;
    // maindiv.appendChild(header);
    // maindiv.appendChild(div);
    // maindiv.appendChild(p);
}


export default buildProduct;