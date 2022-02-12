//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Navbar from './Navbar'
import Home from './Home'
import Checkout from './Checkout'
import Product from './Product'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar/>
        </header>
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
