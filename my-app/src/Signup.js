import addUser from './server/signup.js';
import {Form, Card, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './addProduct.css';

const Signup = () => {
    return (
        <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <Card className="w-100" border="danger" style={{ maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" id="email" required />
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" id="user" required />
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="pass" required />
                        </Form.Group>
                        <br/>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" required />
                        </Form.Group>
                        <br/>
                        <div className="redGlowBg">
                            <button type="button" className="button"
                            onClick={() =>addUser('admin')}>Sign up</button>
                        </div>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mb-2">
                Already have an account? <Link to="/login"><a>Login</a></Link>
            </div>
            </Card>
        </Container>
        
        {/* <div className="signup">
            <h2>Sign up</h2>
        <form>
            <input type="text" name="email" placeholder="Email" id="email"/>
            <br></br>
            <input type="text" name="username" placeholder="Username" id="user" />
            <br></br>
            <input type="text" name="password" placeholder="Password" id="pass"/>
            <br></br>
            <button type="button" onClick={() =>addUser('admin')}>Sign Up!</button>
        </form>
        </div> */}
        </>
    );
}

export default Signup;