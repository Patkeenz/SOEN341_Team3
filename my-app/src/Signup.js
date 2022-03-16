//import {checkForValidPassword, buildAdmin} from './server/signup.js';
import {Form, Card, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './addProduct.css';
import { FaUser } from 'react-icons/fa'
import { useAuth } from './server/authContext.js';

const Signup = () => {
    const { handleSignup, buildAdmin, currentUser } = useAuth();

    if (currentUser) {
        return (
            <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <Card className="w-100 border-3 border-red-400" border="danger" style={{ maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Thank you for signing up!</h2>
                    
                </Card.Body>
                <div className="w-100 text-center mb-2">
                <a href="/"><button className="inline-block mr-3 px-2 py-1.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700">Go Home</button></a>
            </div>
            </Card>
        </Container>
        </>
        );
    }
    return (
        <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
            <Card className="w-100 border-3 border-red-400" border="danger" style={{ maxWidth: "400px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign up</h2>
                    <Form id="signup-form">
                        <Form.Group>
                            
                            <div id='emailDiv' className="">
                                <Form.Control type="email" id="email" className='placeholder-grey-400' placeholder='Email' required />
                            </div>
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <div id='userDiv' className="">
                                <Form.Control type="text" id="user" className='placeholder-grey-400' placeholder='Username' required />
                            </div>
                            
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            
                            <div id="passDiv" className="">
                                <Form.Control type="password" id="pass" className='placeholder-grey-400' placeholder='Password' required />
                            </div>
                            
                        </Form.Group>
                        <br/>
                        <Form.Group id="confirm-password">
                            
                            <div id="passVerifDiv" className="">
                                <Form.Control type="password" id="validatedPass" className='placeholder-grey-400' placeholder='Confirm Password' required />
                            </div>
                        </Form.Group>
                        <br/>
                        <Form.Group id="admin-button" className='grid'>
                            {/**button5 */}
                            <div className='btn btn-primary justify-self-center btn-sm'>
                                <FaUser className='float-left mr-2 mt-0.5 '/> 
                                <button type="button" className="uppercase" 
                                onClick={() =>buildAdmin()}> Admin</button>
                            </div>
                        </Form.Group>
                        <br/>
                        <div className="relative py-3 grid">
                            <button type="button" className="inline-block justify-self-center px-3 py-2.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700"
                            onClick={() =>(handleSignup())}>Sign up</button>
                        </div>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mb-2">
                Already have an account? <Link to="/login"><button className="inline-block mr-3 px-2 py-1.5 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded hover:bg-red-700">Login</button></Link>
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