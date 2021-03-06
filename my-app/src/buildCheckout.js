import { confirmOrder, deliveryTime } from "./server/order.js";
import {getItems, removeItem, updateQuantity} from "./server/cart.js"
import { FaCcPaypal, FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import ReactDOM, { render } from 'react-dom';


export async function buildCheckout(loaded) {
    if(!loaded){
        var products = await getItems();
    }
    else{
        products = loaded;
    }
    let title = document.getElementById("cart-title");
    title.innerHTML = "Checkout";
    let maindiv = document.getElementById("usercart");
    maindiv.innerHTML="";
    let table = document.createElement("table")
    var subtotal = 0;
    var prices = [];
        for(var i=0; i<products.length; i++)
        {
            if(products[i].name!=null){
            var product = products[i];
            let row = document.createElement("tr");
            row.className = "border-t border-b border-red-300";
            let imgCol = document.createElement("th");
            imgCol.className = "imgCol";
            let pic = document.createElement("img");
            pic.setAttribute("src", products[i].link);
            pic.className = "p-1 w-11/12 bg-white border rounded max-w-sm justify-self-center bg-opacity-25"; //productImage px-10 pt-10
            let infoCol = document.createElement("th");
            let prodName = document.createElement("p");
            prodName.innerHTML = product.name;
            prodName.className = "slightlyMarginedItem";
            let lineBreak = document.createElement("br");
            let prodQuant = document.createElement("p");
            prodQuant.innerHTML = product.quantity;
            let priceCol = document.createElement("th");
            let prodPrice = document.createElement("p");
            prodPrice.innerHTML = product.price+ " x " +product.quantity + " = " + (product.price*product.quantity).toFixed(2) + "$";
            prices.push(product.price*product.quantity);
            subtotal += parseFloat(product.price*product.quantity);
            let editCol = document.createElement("th");
            table.appendChild(row);
            row.appendChild(imgCol);
            row.append(infoCol);
            imgCol.appendChild(pic);
            infoCol.append(prodName);
            infoCol.append(lineBreak);
            //infoCol.append(prodDescription);
            row.append(priceCol);
            priceCol.append(prodPrice);
            row.append(editCol);
        }
        }

        maindiv.append(table);
        let shippingheader = document.createElement("p");
        shippingheader.className = "right";
        var shipping = 0;
        if(subtotal<100){
            shipping = 25;
            shippingheader.innerHTML = "Shipping: 25.00$"
            let shippingadvertisement = document.createElement("h5");
            shippingadvertisement.className = "center";
            shippingadvertisement.innerHTML="Spend more than 100$ before tax for free shipping!";
            maindiv.append(shippingadvertisement)
        }

        for(var i=0; i<prices.length; i++){
                let priceheader = document.createElement("p")
                priceheader.className = "right";
                if(i<prices.length-1){
                     priceheader.innerHTML = prices[i].toFixed(2) + "$";
                }
                else{
                    let utag = document.createElement("u");
                    utag.innerHTML = "+ " + prices[i].toFixed(2);
                    priceheader.appendChild(utag)
                }
            maindiv.append(priceheader);
        }

        let subtotalheader = document.createElement("p");
        subtotalheader.className = "right";
        subtotalheader.innerHTML = "Subtotal: " + subtotal.toFixed(2) + "$";
        maindiv.append(subtotalheader);

        maindiv.append(shippingheader);

        let taxheader = document.createElement("p");
        taxheader.className = "right";
        taxheader.innerHTML = "Tax (15%): " + (subtotal*0.15).toFixed(2) + "$";

        let totalheader = document.createElement("h5");
        totalheader.className = "right";
        totalheader.innerHTML = "Total: " + (subtotal*1.15+shipping).toFixed(2) + "$";

        let payIcon = document.createElement("div");
        let payButton = document.createElement("button");
        payButton.innerHTML = "Choose a Payment Method";
        payButton.className= "inline-block justify-self-center px-2 py-1.5 bg-green-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-green-700 hover:cursor-pointer";
        payButton.onclick = function(){
            paymentBuilder();
        }
        payIcon.className = "grid mb-2";
        let iconContainer = document.createElement("div");
        iconContainer.className = "flex justify-self-center"
        const icons = [<FaCcMastercard className=" mx-2" size={42}/>, 
                        <FaCcVisa className=" mx-2" size={42}/>,
                        <FaCcPaypal className=" mx-2" size={42}/>];
        maindiv.append(taxheader);
        maindiv.append(totalheader);
        ReactDOM.render(icons, iconContainer)
        payIcon.appendChild(iconContainer)
        payIcon.appendChild(payButton)
        maindiv.append(payIcon);

    return products
  }

  export function paymentBuilder()
  {

      //create the form for users to put in their payment and shipping info
      let title = document.getElementById("cart-title");
      title.innerHTML = "Payment and shipping";
      let maindiv = document.getElementById("usercart");
      maindiv.innerHTML = "";

      // create and append a form for all info
      let infoForm = document.createElement("form");;
      maindiv.append(infoForm);
      maindiv.className = "mb-4"; 

      // create a div within the credit card form
      let cardsDiv = document.createElement("div");

      // ask user to input their info
      let instructions = document.createElement("p");
      instructions.innerHTML = "Please fill out your credit card information";
      instructions.setAttribute("class", "updateTitle");
    
      // insert textbox and label for card number
      let cardNumberInput = document.createElement("input");
      cardNumberInput.type = "text";
      cardNumberInput.setAttribute("class", "labelBorder");
      cardNumberInput.id = "cardNumber";
      cardNumberInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let cardNumberLabel = document.createElement("label");
      cardNumberLabel.setAttribute("for", "cardNumber");
      cardNumberLabel.setAttribute("class", "fieldRequired");
      cardNumberLabel.innerHTML = "Card Number:";
      cardNumberLabel.className = "font-bold text-sm ml-2";

      // insert textbox and label for card expiraion date
      let cardDateInput = document.createElement("input");
      cardDateInput.type = "text";
      cardDateInput.id = "cardDate";
      cardDateInput.setAttribute("class", "labelBorder");
      cardDateInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let cardDateLabel = document.createElement("label");
      cardDateLabel.setAttribute("for", "cardDate");
      cardDateLabel.setAttribute("class", "fieldRequired");
      cardDateLabel.innerHTML = "Expiration Date:";
      cardDateLabel.className = "font-bold text-sm ml-2";

      // insert textbox and label for card expiraion date
      let cardCVVInput = document.createElement("input");
      cardCVVInput.type = "text";
      cardCVVInput.id = "cardCVV";
      cardCVVInput.setAttribute("class", "labelBorder");
      cardCVVInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let cardCVVLabel = document.createElement("label");
      cardCVVLabel.setAttribute("for", "cardCVV");
      cardCVVLabel.setAttribute("class", "fieldRequired");
      cardCVVLabel.innerHTML = "CVV Numbers:";
      cardCVVLabel.className = "font-bold text-sm ml-2";

      // create break line tags
      let breakLine1 = document.createElement("br");
      let breakLine2 = document.createElement("br");
      let breakLine3 = document.createElement("br");
      let breakLine18 = document.createElement("br");
      let breakLine19 = document.createElement("br");
      let breakLine20 = document.createElement("br");

      // apend everything credit card related
      infoForm.append(cardsDiv);
      cardsDiv.append(instructions);
      cardsDiv.append(cardNumberLabel);
      cardsDiv.append(breakLine18);
      cardsDiv.append(cardNumberInput);
      cardsDiv.append(breakLine1);
      cardsDiv.append(cardDateLabel);
      cardsDiv.append(breakLine19);
      cardsDiv.append(cardDateInput);
      cardsDiv.append(breakLine2);
      cardsDiv.append(cardCVVLabel);
      cardsDiv.append(breakLine20);
      cardsDiv.append(cardCVVInput);
      cardsDiv.append(breakLine3);

      // create a div for the shipping information
      let shippingDiv = document.createElement("div");

      // tell user to input shipping info
      let shippingInstructions = document.createElement("p");
      shippingInstructions.innerHTML = "Please fill out your shipping information";
      shippingInstructions.setAttribute("class", "updateTitle");

      // insert textbox and label for first name
      let firstNameInput = document.createElement("input");
      firstNameInput.type = "text";
      firstNameInput.id = "firstName";
      firstNameInput.setAttribute("class", "labelBorder");
      firstNameInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let firstNameLabel = document.createElement("label");
      firstNameLabel.setAttribute("for", "firstName");
      firstNameLabel.setAttribute("class","fieldRequired");
      firstNameLabel.innerHTML = "First Name:";
      firstNameLabel.className = "font-bold text-sm ml-2";

      // insert textbox and label for last name
      let lastNameInput = document.createElement("input");
      lastNameInput.type = "text";
      lastNameInput.id = "lastName";
      lastNameInput.setAttribute("class", "labelBorder");
      lastNameInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let lastNameLabel = document.createElement("label");
      lastNameLabel.setAttribute("for", "lastName");
      lastNameLabel.setAttribute("class","fieldRequired");
      lastNameLabel.innerHTML = "Last Name:";
      lastNameLabel.className = "font-bold text-sm ml-2";
      
      // insert textbox and label for last name
      let phoneInput = document.createElement("input");
      phoneInput.type = "text";
      phoneInput.id = "phoneNumber";
      phoneInput.setAttribute("class", "labelBorder");
      phoneInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";

      let phoneLabel = document.createElement("label");
      phoneLabel.setAttribute("for", "phoneNumber");
      phoneLabel.setAttribute("class","fieldRequired");
      phoneLabel.innerHTML = "Phone number:";
      phoneLabel.className = "font-bold text-sm ml-2";
      // insert textbox and label for address
      let addressInput = document.createElement("input");
      addressInput.type = "text";
      addressInput.id = "address";
      addressInput.setAttribute("class", "labelBorder");
      addressInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let addressLabel = document.createElement("label");
      addressLabel.setAttribute("for", "address");
      addressLabel.setAttribute("class","fieldRequired");
      addressLabel.innerHTML = "Address:";
      addressLabel.className = "font-bold text-sm ml-2";

      // insert textbox and label for city
      let cityInput = document.createElement("input");
      cityInput.type = "text";
      cityInput.id = "city";
      cityInput.setAttribute("class", "labelBorder");
      cityInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let cityLabel = document.createElement("label");
      cityLabel.setAttribute("for", "city");
      cityLabel.setAttribute("class","fieldRequired");
      cityLabel.innerHTML = "City:";
      cityLabel.className = "font-bold text-sm ml-2";

      // insert textbox and label for country
      let countryInput = document.createElement("input");
      countryInput.type = "text";
      countryInput.id = "country";
      countryInput.setAttribute("class", "labelBorder");
      countryInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let countryLabel = document.createElement("label");
      countryLabel.setAttribute("for", "country");
      countryLabel.setAttribute("class","fieldRequired");
      countryLabel.innerHTML = "Country:";
      countryLabel.className = "font-bold text-sm ml-2";

      // insert textbox and label for postal code
      let postalCodeInput = document.createElement("input");
      postalCodeInput.type = "text";
      postalCodeInput.id = "postaCode";
      postalCodeInput.setAttribute("class", "labelBorder");
      postalCodeInput.className = "ml-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-500 transition-colors";
      let postalCodeLabel = document.createElement("label");
      postalCodeLabel.setAttribute("for", "postalCode");
      postalCodeLabel.setAttribute("class","fieldRequired");
      postalCodeLabel.innerHTML = "Postal code:";
      postalCodeLabel.className = "font-bold text-sm ml-2";


      // create break line tags
      let breakLine4 = document.createElement("br");
      let breakLine5 = document.createElement("br");
      let breakLine6 = document.createElement("br");
      let breakLine7 = document.createElement("br");
      let breakLine8 = document.createElement("br");
      let breakLine9 = document.createElement("br");
      let breakLine10 = document.createElement("br");

      let breakLine11 = document.createElement("br");
      let breakLine12 = document.createElement("br");
      let breakLine13 = document.createElement("br");
      let breakLine14 = document.createElement("br");
      let breakLine15 = document.createElement("br");
      let breakLine16 = document.createElement("br");
      let breakLine17 = document.createElement("br");

      // appened everything shipping related
      infoForm.append(shippingDiv);
      shippingDiv.append(shippingInstructions);
      shippingDiv.append(firstNameLabel);
      shippingDiv.append(breakLine11);
      shippingDiv.append(firstNameInput);
      shippingDiv.append(breakLine4);
      shippingDiv.append(lastNameLabel);
      shippingDiv.append(breakLine12);
      shippingDiv.append(lastNameInput);
      shippingDiv.append(breakLine5);
      shippingDiv.append(phoneLabel);
      shippingDiv.append(breakLine13);
      shippingDiv.append(phoneInput);
      shippingDiv.append(breakLine6);
      shippingDiv.append(addressLabel);
      shippingDiv.append(breakLine14);
      shippingDiv.append(addressInput);
      shippingDiv.append(breakLine7);
      shippingDiv.append(cityLabel);
      shippingDiv.append(breakLine15);
      shippingDiv.append(cityInput);
      shippingDiv.append(breakLine10);
      shippingDiv.append(countryLabel);
      shippingDiv.append(breakLine16);
      shippingDiv.append(countryInput);
      shippingDiv.append(breakLine8);
      shippingDiv.append(postalCodeLabel);
      shippingDiv.append(breakLine17);
      shippingDiv.append(postalCodeInput);
      shippingDiv.append(breakLine9);

      // create an array of all the inputs
      var inputs = [cardNumberInput, cardDateInput, cardCVVInput, firstNameInput, lastNameInput,
         phoneInput, addressInput, cityInput, postalCodeInput, countryInput]; 


      // create an order button
      let orderButtonContainer = document.createElement("div")
      orderButtonContainer.className = "grid"
      let orderButton = document.createElement("input");
      orderButton.setAttribute("type", "submit");
      orderButton.setAttribute("class", "updateButton");
      orderButton.className= "inline-block justify-self-center mt-10 px-2 py-1.5 bg-green-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-green-700 hover:cursor-pointer";
      orderButton.addEventListener("click", function(event){
        event.preventDefault();
        buildOrderConfirmation(inputs); 
      });
      
      orderButton.value = "Confirm Order";

      // append order button
      orderButtonContainer.appendChild(orderButton)
      infoForm.append(orderButtonContainer);
}

  export async function buildOrderConfirmation(input, loaded)
  {
    if(!loaded){
        var products = await getItems();
      }
      else{
        products = loaded;
    }

    // boolean var: true if all requirements are met
    var formRequirementsMet = true;


    // make sure all fields are filled
    var allFieldsFull = true;
    for(var i = 0; i<input.length; i++)
    {
        // initialize all the fields have black borders (remove red if fields were fixed)
        input[i].setAttribute("class", "labelBorder");

        if(input[i].value == "")
        {
            allFieldsFull = false;

            // make the label border red for missed fields
            input[i].setAttribute("class", "invalidLabelBorder");
        }
    }

    // name all values
    var cardNum = input[0].value;
    var cardDate = input[1].value;
    var cardCVV = input[2].value;
    var first = input[3].value;
    var last = input[4].value;
    var phone = input[5].value;
    var address = input[6].value;
    var city = input[7].value;
    var postal = input[8].value;
    var country = input[9].value;

    // check the card matches an existing card
    var validCard = creditCheck(cardNum, cardDate, cardCVV);
    if(!validCard)
    {
        formRequirementsMet = false;
    }


    // verify that the first name last name and city are letters
    var validFirst = true;
    var validLast = true;
    var validCity = true;
    var validCountry = true;
    if(invalidString(first))
    {
        formRequirementsMet = false;
        validFirst = false;
    }
    if(invalidString(last))
    {
        formRequirementsMet = false;
        validLast = false;
    }
    if(invalidString(city))
    {
        formRequirementsMet = false;
        validCity = false;
    }
    if(invalidString(country))
    {
        formRequirementsMet = false;
        validCountry = false;
    }

    // verify that the phone number is 10 digits
    var validPhone = true;
    if(invalidPhone(phone))
    {
        formRequirementsMet = false;
        validPhone = false;
    }

    // verify that the postal code is in an accepted format
    var validPostal = true;
    if(invalidPostal(postal))
    {
        formRequirementsMet = false;
        validPostal = false;
    }

    if(formRequirementsMet)
    {
        // remove all items from the cart
        // for(var i = (products.length)-1; i >= 0; i--)
        // {
        //     await removeItem(i);
        // }

        await confirmOrder(input[9].value, input[7].value, input[6].value);
        //remove everything from page and replace it w/ confirmation message that order is complete
        let title = document.getElementById("cart-title");
        title.innerHTML = "Order complete";
        let maindiv = document.getElementById("usercart");
        maindiv.innerHTML = "";

    }
    else
    {
        if(!allFieldsFull)
        {
            alert("All fields must be filled.");
        }
        else
        {
            if(!validCard)
            {
                alert("Invalid card.");
                input[0].setAttribute("class", "invalidLabelBorder");
            }
            if(!validFirst)
            {
                alert("Invalid first name.");
                input[3].setAttribute("class", "invalidLabelBorder");
            }
            if(!validLast)
            {
                alert("Invalid last name.");
                input[4].setAttribute("class", "invalidLabelBorder");
            }
            if(!validCity)
            {
                alert("Invalid city.");
                input[7].setAttribute("class", "invalidLabelBorder");
            }
            if(!validPhone)
            {
                alert("Invalid phone number.");
                input[5].setAttribute("class", "invalidLabelBorder");
            }
            if(!validPostal)
            {
                alert("Invalid postal code.");
                input[8].setAttribute("class", "invalidLabelBorder");
            }
            if(!validCountry)
            {
                alert("Invalid country name.");
                input[9].setAttribute("class", "invalidLabelBorder");
            }
        }
    }
  }

  export function creditCheck(cardNum, cardDate, cardCVV)
  {
        // create default cards
        let cards = [["12345", "12/34", "123"], ["23456", "23/45", "234"], ["34567", "34/56", "345"], 
        ["45678", "45/67", "456"], ["56789", "56/78", "567"]];

        var validCard = false;
        for(var i = 0; i < cards.length; i++) 
        {
            if(cards[i][0] == cardNum && cards[i][1] == cardDate && cards[i][2] == cardCVV)
            {
                validCard = true;
                return true;
            }
        }
        if(validCard == false)
        {
            return false;
        }
    }

    export function invalidString(str)
    {
        if(!/^[a-zA-Z\s]+$/.test(str))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    export function invalidPhone(phone)
    {
        if(!/^\d+$/.test(phone) || phone.length != 10)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    export function invalidPostal(postal)
    {
        if(!/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(postal))
        {
            return true;
        }
        else
        {
            return false;
        }
    }