
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery"
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const overallTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }
    
    
    if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }
    
    if (!formData.address.trim()) newErrors.address = "Delivery address is required";

    setErrors(newErrors);
    
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (validateForm()) {
      setSuccess(true);
      clearCart(); 
      
    
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  if (cart.length === 0 && !success) {
    return <h2>Your cart is empty. Add items before checkout.</h2>;
  }

  if (success) {
    return (
      <div className="success-screen">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you, {formData.fullName}. Your items will be delivered soon.</p>
        <p>Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p>Total to Pay: <strong>${overallTotal}</strong></p>
      
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange} 
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Delivery Address:</label>
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>Payment Method:</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Place Order</button>
      </form>
    </div>
  );
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default Checkout;