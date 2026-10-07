import { useState } from "react";
import ProductCard from "../components/ProductCard";
import PropTypes from "prop-types";

function Home({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4); 

  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount(visibleCount + 4);
  };

  return (
    <div>
      <h1>Our Products</h1>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
           <option value="All">All Categories</option>
           <option value="Paddles">Paddles</option>
           <option value="Apparel">Apparel</option>
           <option value="Footwear">Footwear</option>
        </select>
      </div>

      <div className="product-grid">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="view-more-container">
          <button onClick={handleViewMore} className="view-more-btn">
            View More
          </button>
        </div>
      )}
    </div>
  );
}

Home.propTypes = {
  products: PropTypes.array.isRequired,
};

export default Home;