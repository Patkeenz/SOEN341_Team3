import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import applePic from './images/blackandwhite_cart.png';
import './checkout.css';
import showCategory from "./server/browse.js";
import buildProducts from "./buildCheckoutPage.js";

var products;

const Checkout = () => {
    
    buildProducts(false).then(val=>{
        products = val;
    });

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh"}}>
            <Card className=" d-flex w-100" border="danger" style= {{ maxWidth: "1000px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Here are your products Below:</h2>
                </Card.Body>
                {/*the following div is where items will be inserted*/}
                <div id="checkoutItems"> 
                    <Row className="block-example border-top border-dark">
                        <Col xs={3} className="text-center"><img src={applePic} className="justify-content-md-center" style= {{ width:"150px"}} alt="product"/></Col>
                        <Col xs={5}>
                            <h1 className="slightlyMarginedItem">Product Name</h1>
                            <br/>
                            <p>This product is a super cool product that you should definitely buy</p>
                        </Col>
                        <Col>
                            <h1 className="center">$100</h1>
                        </Col>
                        <Col className="text-center">
                            <Button style={{margin: "20px"}} variant="danger">Delete</Button>
                            <p style={{fontSize:'30px'}} className="text-center mb-4">Quntity: 200</p>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Container>
    );
}

export default Checkout;