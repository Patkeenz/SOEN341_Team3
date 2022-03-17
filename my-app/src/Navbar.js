import { Link, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Bootstrap from 'react-bootstrap'
import logo from './images/company name.png';
import blackandred_cart from './images/blackandred_cart.png'
//import { getAuth } from 'firebase/auth'
//import { HandleLogout, logout } from './server/logout'
import { UserContext } from './App'
import { useContext, useState, useEffect } from 'react';
import { useAuth } from './server/authContext'

const Navbar = () => {

  const { state, dispatch } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false)
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const { userType } = useAuth();
  const history = useHistory();

  async function HandleLogout() {
    try{
        await logout();
        dispatch({type:"USER", payload:false})
        history.push("/");
    }
    catch{
        alert("Failed to log out");
    }
}
  let msg = "";
  if (currentUser !== null && currentUser.displayName !== null){
    msg = "Welcome back, " + currentUser.displayName;
  }

  //Check if user is an admin or a user
  let type = userType().then(value => {
    type = value
    if(type === "Admin"){
      setIsAdmin(true)
    }
  })


  if (currentUser) {
    return (
      <Bootstrap.Navbar className="container-fluid" bg="light" variant="light" expand="lg">
      <Bootstrap.Container>
        <Bootstrap.Navbar.Brand href="/">
          <img
          src={logo}
          width="157"
          height="45"
          className="highlight"
          alt="logo"
          />
        </Bootstrap.Navbar.Brand> {currentUser && msg}
        {/* <Bootstrap.Navbar.Brand href="#home">React-Bootstrap</Bootstrap.Navbar.Brand> */}
        <Bootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Bootstrap.Navbar.Collapse id="basic-navbar-nav">
          <Bootstrap.Nav className="ms-auto">
            {isAdmin && <Bootstrap.Nav.Link as={Link} to="/addproduct">Add product</Bootstrap.Nav.Link>}
            <Bootstrap.Navbar.Brand as={Link} to="/cart">
          <img
          src={blackandred_cart}
          width="40"
          height="40"
          className="highlight"
          alt="logo"
          />
            </Bootstrap.Navbar.Brand>
            <Bootstrap.NavDropdown title="Account" id="basic-nav-dropdown">
              <Bootstrap.NavDropdown.Item href="#action/3.1">My Profile</Bootstrap.NavDropdown.Item>
              <Bootstrap.NavDropdown.Item as={Link} to="/orders">Orders</Bootstrap.NavDropdown.Item>
              <Bootstrap.NavDropdown.Item href="#action/3.3">Privacy/Settings</Bootstrap.NavDropdown.Item>
              <Bootstrap.NavDropdown.Divider />
              <Bootstrap.NavDropdown.Item onClick={HandleLogout} href="/">Logout</Bootstrap.NavDropdown.Item>
            </Bootstrap.NavDropdown>
          </Bootstrap.Nav>
        </Bootstrap.Navbar.Collapse>
      </Bootstrap.Container>
    </Bootstrap.Navbar>
    )
  }
  else{
    return (
      <Bootstrap.Navbar className="container-fluid" bg="light" variant="light" expand="lg">
      <Bootstrap.Container>
        <Bootstrap.Navbar.Brand href="/">
          <img
          src={logo}
          width="157"
          height="45"
          className="highlight"
          alt="logo"
          />
        </Bootstrap.Navbar.Brand>
        {/* <Bootstrap.Navbar.Brand href="#home">React-Bootstrap</Bootstrap.Navbar.Brand> */}
        <Bootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Bootstrap.Navbar.Collapse id="basic-navbar-nav">
          <Bootstrap.Nav className="ms-auto">
            <Bootstrap.Nav.Link href="/login">Login</Bootstrap.Nav.Link>
            <Bootstrap.Nav.Link href="/signup">Sign up</Bootstrap.Nav.Link>
            <Bootstrap.Nav.Link href="/aboutus">About Us</Bootstrap.Nav.Link>
            <Bootstrap.Navbar.Brand as={Link} to="/cart">
            
          <img
          src={blackandred_cart}
          width="40"
          height="40"
          className="highlight"
          alt="logo"
          />
          
            </Bootstrap.Navbar.Brand>
          </Bootstrap.Nav>
        </Bootstrap.Navbar.Collapse>
      </Bootstrap.Container>
    </Bootstrap.Navbar>
    )
  }
    
}

export default Navbar;