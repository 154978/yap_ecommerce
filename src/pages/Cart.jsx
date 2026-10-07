
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Cart({ cart, updateQuantity, removeFromCart }) {
  
  const overallTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty.</h2>
        <Link to="/">Go buy something!</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-list">
        {cart.map((item) => {
          const subtotal = item.price * item.quantity;
          return (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="80" />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span> {item.quantity} </span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
              </div>
              <div className="cart-item-subtotal">
                <p>Subtotal: ${subtotal}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-total">
        <h3>Total: ${overallTotal}</h3>
        <Link to="/checkout">
          <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default Cart;