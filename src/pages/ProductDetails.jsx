
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

function ProductDetails({ products, addToCart }) {
  const { id } = useParams();
  const [addedMessage, setAddedMessage] = useState("");
  

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedMessage("Item added to cart!");
    setTimeout(() => setAddedMessage(""), 2000);
  };

  return (
    <div className="product-details">
      <div className="details-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-info">
        <h2>{product.name}</h2>
        <p className="category-tag">Category: {product.category}</p>
        <p className="price">${product.price}</p>
        <p>{product.fullDesc}</p>
        <p><strong>Stock Available:</strong> {product.stock}</p>
        
        <button onClick={handleAddToCart} className="add-btn">
          Add to Cart
        </button>
        {addedMessage && <p className="success-msg">{addedMessage}</p>}
        
        <br/><br/>
        <Link to="/">Back to Shopping</Link>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductDetails;