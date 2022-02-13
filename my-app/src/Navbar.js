import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Ecommerce Website</h1>
            <div className="links">
            <Link to="/home">
            <Button variant="outline-dark">
              Home 
            </Button>
            </Link>
            <Link to="/login">
            <Button variant="outline-dark">
              Login 
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline-dark">
              Sign up 
            </Button>
          </Link>
          <Link to="/checkout">
            <Button variant="outline-dark">
              Checkout
            </Button>
          </Link>
          <Link to="/addproduct">
            <button>
              Add Product
            </button>
          </Link>
            </div>
        </nav>
    )
}

export default Navbar;