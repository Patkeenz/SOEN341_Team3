import logo from './images/company name.png';
import blackandred_cart from './images/blackandred_cart.png'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Navbar from './Navbar'
import Home from './Home'
import Checkout from './Checkout'
import Product from './AddProduct'
import * as Bootstrap from 'react-bootstrap'

function App() {
  return (
    <Router>
      <header className="App-header">
      <Bootstrap.Navbar className="container-fluid" bg="light" variant="light" expand="lg">
        <Bootstrap.Container>
          <Bootstrap.Navbar.Brand as ={Link} to="/home">
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
              <Bootstrap.Nav.Link as={Link} to="/login">Login</Bootstrap.Nav.Link>
              <Bootstrap.Nav.Link as={Link} to="/signup">Sign up</Bootstrap.Nav.Link>
              <Bootstrap.Nav.Link as={Link} to="/addproduct">Add product</Bootstrap.Nav.Link>
              <Bootstrap.Navbar.Brand as={Link} to="/checkout">
            <img
            src={blackandred_cart}
            width="40"
            height="40"
            className="highlight"
            alt="logo"
            />
              </Bootstrap.Navbar.Brand>
              {/* <Bootstrap.NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <Bootstrap.NavDropdown.Item href="#action/3.1">Action</Bootstrap.NavDropdown.Item>
                <Bootstrap.NavDropdown.Item href="#action/3.2">Another action</Bootstrap.NavDropdown.Item>
                <Bootstrap.NavDropdown.Item href="#action/3.3">Something</Bootstrap.NavDropdown.Item>
                <Bootstrap.NavDropdown.Divider />
                <Bootstrap.NavDropdown.Item href="#action/3.4">Separated link</Bootstrap.NavDropdown.Item>
              </Bootstrap.NavDropdown> */}
            </Bootstrap.Nav>
          </Bootstrap.Navbar.Collapse>
        </Bootstrap.Container>
      </Bootstrap.Navbar>
      </header>
      <div className="wrapper">
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/addproduct">
            <Product/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
