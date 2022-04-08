import {Card, Container} from 'react-bootstrap';



const AboutUs = () => {
    
    

    return (
        <Container className="d-flex absolute align-items-center justify-content-center grid" style={{ minHeight: "75vh"}}>
            <Card className=" d-flex w-100 ml-24 inline-block justify-self-center" border="danger" style= {{ maxWidth: "1500px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4" id="cart-title">About TechTonic</h2>
                    <p>TechTonic prioritizes customer satisfaction with creative styling in displaying products for everyday use. With our simple but efficient dropdown selection of products, the 
                        user can quickly find the product they're meant for. The products vary from monitor (gaming/regular) to accessories.
                        As of this moment, Techtonic focuses solely on the technology aspects but hopes to expand to further types. With affordable
                        prices and mind-blowing weekly deals, TechTonic ensures every customer will leave with a smile on their face.
                        <br></br>
                        <center>TechTonic Family</center>
                       
                    </p>
                </Card.Body>
                
            </Card>
        </Container>
    );
}

export default AboutUs;