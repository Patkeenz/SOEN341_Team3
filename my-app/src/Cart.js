import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import './checkout.css';
import {buildCartProducts} from "./buildCart.js";
import {buildCheckout} from "./buildCheckout.js";

var products;

const Cart = () => {
    
    window.onload=(buildCartProducts(false));

    return (
        <Container className="d-flex absolute align-items-center justify-content-center" style={{ minHeight: "50vh"}}>
            <Card className=" d-flex w-100" border="danger" style= {{ maxWidth: "1000px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4" id="cart-title">Here are your products Below:</h2>
                </Card.Body>
                {/*the following div is where items will be inserted*/}
                <div id = "usercart">
                <table id="cartItems"> 

                </table>
                </div>
            </Card>
        </Container>
    );
}

export default Cart;