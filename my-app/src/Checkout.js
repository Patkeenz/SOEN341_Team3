import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import applePic from './images/blackandwhite_cart.png';
import './checkout.css';
import {buildCheckoutProducts} from "./buildCheckoutPage.js";

var products;

const Checkout = () => {
    
    buildCheckoutProducts(false);

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh"}}>
            <Card className=" d-flex w-100" border="danger" style= {{ maxWidth: "1000px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Here are your products Below:</h2>
                </Card.Body>
                {/*the following div is where items will be inserted*/}
                <table id="checkoutItems"> 
                    <tr>
                        <th>
                            <img src={applePic} className="productImage" alt="product"/>
                        </th>
                        <th>
                            <h1 className="slightlyMarginedItem">Product Name</h1>
                            <br/>
                            <p>This product is a super cool product that you should definitely buy</p>
                        </th>
                        <th>
                            <h1 className="center">$100</h1>
                        </th>
                        <th className="text-center">
                            <button className="deleteButton">Delete</button>
                            <p style={{fontSize:'30px'}} className="text-center mb-4">Q: 200</p>
                        </th>
                    </tr>
                </table>
            </Card>
        </Container>
    );
}

export default Checkout;