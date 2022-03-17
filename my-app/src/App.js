import logo from './images/company name.png';
import blackandred_cart from './images/blackandred_cart.png'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Navbar from './Navbar'
import Home from './Home'
import Cart from './Cart'
import Orders from './Orders'
import AddProduct from './AddProduct'
import AboutUs from './AboutUs'
// import Product from './Product'
import * as Bootstrap from 'react-bootstrap'
//import { getAuth } from 'firebase/auth'
import { createContext, useReducer } from 'react';
import {initialState, reducer} from './reducer/useReducer';
import { AuthProvider } from './server/authContext';

export const UserContext = createContext();
function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <AuthProvider>
    <UserContext.Provider value={{state, dispatch}}>
    <Router>
      <header className="App-header">
      <Navbar />
      </header>
      <div className="wrapper">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/orders">
            <Orders/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/addproduct">
            <AddProduct/>
          </Route>
          <Route path="/aboutus">
            <AboutUs/>
          </Route>
        </Switch>
      </div>
    </Router>
    </UserContext.Provider>
    </AuthProvider>
    </>
  );
}

export default App;
