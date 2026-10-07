
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>Jean's Shop</h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItemCount})</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  cartItemCount: PropTypes.number.isRequired,
};

export default Navbar;