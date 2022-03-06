import {Form, Button, Card, Container, Alert} from 'react-bootstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
//import {login} from './server/login.js'
import { React, useState, useRef, useContext } from 'react'
import './addProduct.css';
import { UserContext } from './App'
import { useAuth } from './server/authContext.js';

const Login = () => {

    const { login } = useAuth();
    const {state, dispatch} = useContext(UserContext);

    const userRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const history = useHistory();

    async function handleSubmit() {
        try{
            setError("");
            await login(userRef.current.value, passwordRef.current.value);
            dispatch({type:"USER", payload:true})
            history.push("/");
        }
        catch{
            setError("Incorrect User or password")
        }
    }
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <Card className=" d-flex w-100" border="danger" style= {{ maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" ref={userRef} required />
                        </Form.Group>
                        <br/>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <br/>
                        <div className="redGlowBg">
                            <button type="button" className="button" onClick={handleSubmit} href="/">Log In</button>
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