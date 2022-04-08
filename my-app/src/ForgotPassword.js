import {Form, Button, Card, Container, Alert} from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
//import {login} from './server/login.js'
import { React, useState, useRef, useContext } from 'react'
import './addProduct.css';
import { UserContext } from './App'
import { useAuth } from './server/authContext.js';

const ForgotPassword = () => {

    const { resetPassword } = useAuth();

    const emailRef = useRef();
    const [error, setError] = useState("");
    const history = useHistory();

    async function handleSubmit() {
        try{
            setError("");
            await resetPassword(emailRef.current.value);
            alert("Check your inbox for further instructions");
        }
        catch{
            setError("Failed to reset password")
        }
    }
    return (
        <Container className="d-flex align-items-center justify-content-center " style={{ minHeight: "100vh"}}>
            <Card className=" d-flex w-100 border-3 border-red-400" border="danger" style= {{ maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group id="email">
                            {/** <Form.Label>Username</Form.Label>*/}
                            <Form.Control type="email" className='placeholder-grey-400' placeholder='Email' ref={emailRef} required />
                        </Form.Group>
                        <br/>
                        <div className="relative py-3 grid">
                            <button type="button" className="inline-block justify-self-center px-3 py-2.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700" onClick={handleSubmit}>Reset Password</button>
                        </div>
                        <div className="w-100 text-center">
                            <Link to="/login">Login</Link>
                        </div>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mb-2">
                New to TechTonic? <Link to="/signup"><button className="inline-block mr-3 px-2 py-1.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700">Sign up</button></Link>
            </div>
            </Card>
        </Container>
    );
}

export default ForgotPassword;