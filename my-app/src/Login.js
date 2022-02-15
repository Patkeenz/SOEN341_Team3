import {Form, Button, Card, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './addProduct.css';

const Login = () => {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <Card className=" d-flex w-100" border="danger" style= {{ maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    <Form>
                        <Form.Group id="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" required />
                        </Form.Group>
                        <br/>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required />
                        </Form.Group>
                        <br/>
                        <div className="redGlowBg">
                            <button type="button" className="button">Log In</button>
                        </div>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mb-2">
                New to TechTonic? <Link to="/signup"><a>Sign up</a></Link>
            </div>
            </Card>
        </Container>
    );
}

export default Login;