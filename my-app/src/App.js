import logo from './images/company name.png';
import blackandred_cart from './images/blackandred_cart.png'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Navbar from './Navbar'
import Home from './Home'
import Checkout from './Checkout'
import Product from './AddProduct'
import * as Bootstrap from 'react-bootstrap'
import { getAuth } from 'firebase/auth'
import { handleLogout, logout } from './server/logout'

function App() {

  // const auth = getAuth();
  // const currentUser = auth.currentUser
  // let msg = ""; 
  // if (currentUser !== null){
  //   msg = "Welcome back, " + currentUser.email;
  // }
//    const history = useHistory();
// history.push("/");

//   async function handleLogout() {
//     try{
//         await logout();
//         history.push("/");
//     }
//     catch{
//         alert("Failed to log out");
//     }
// }

  return (
    <Router>
      <header className="App-header">
      <Navbar />
      </header>
      <div className="wrapper">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          {/* <Route path="/home">
            <Home/>
          </Route> */}
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
