import {Card, Container} from 'react-bootstrap';

import './addProduct.css';

const Checkout = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh"}}>
            <Card className=" d-flex w-100" border="danger" style= {{ maxWidth: "600px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Here are your products Below:</h2>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Checkout;