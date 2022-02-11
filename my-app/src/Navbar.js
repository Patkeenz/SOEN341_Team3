import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Ecommerce Website</h1>
            <div className="links">
            <Link to="/home">
            <button>
              Home 
            </button>
            </Link>
            <Link to="/login">
            <button>
              Login 
            </button>
          </Link>
          <Link to="/signup">
            <button>
              Sign up 
            </button>
          </Link>
          <Link to="/checkout">
            <button>
              checkout
            </button>
          </Link>
            </div>
        </nav>
    )
}

export default Navbar;