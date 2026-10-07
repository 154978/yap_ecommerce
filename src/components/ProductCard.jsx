
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.shortDesc}</p>
      <p className="price">${product.price}</p>
      <Link to={`/product/${product.id}`}>
        <button className="view-btn">View Details</button>
      </Link>
    </div>
  );
}


ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    shortDesc: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;