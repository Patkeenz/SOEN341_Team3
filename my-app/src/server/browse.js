import buildProducts from "../Browse.js";

function showCategory(products){
    var category = document.getElementById("homecategory").value;
    if(category=="all"){
        buildProducts(false);
    }
    var newproducts = [];
    for(var i=0; i<products.length; i++){
        if(products[i].category==category){
            newproducts.push(products[i]);
        }
    }
    buildProducts(newproducts);
}

export default showCategory;