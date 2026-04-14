import { useState } from "react";
import Navbar from "./NavBar";

function BrowseShop() {
  // sample foods (this would usually come from backend)
  const [products] = useState([
    {
      id: 1,
      name: "WildCats Burger",
      description: "Beef burger with cheese",
      price: 120,
      image: "burger.jpg"
    },
    {
      id: 2,
      name: "WildCats Pizza",
      description: "Cheesy pepperoni pizza",
      price: 250,
      image: "pizza.jpg"
    },
    {
      id: 3,
      name: "WildCats Fries",
      description: "Crispy golden fries",
      price: 80,
      image: "fries.jpg"
    },
    {
      id: 4,
      name: "WildCats Fries",
      description: "Crispy golden fries",
      price: 80,
      image: "fries.jpg"
    }
  ]);

  // simple cart (optional)
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart`);
  };

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center" }}>Browse Food Shop</h2>

      {/* PRODUCT GRID */}
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold" }}>₱{product.price}</p>

            <button style={styles.button} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px"
  },

  card: {
    border: "1px solid #ddd",
    padding: "15px",
    width: "220px",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px"
  },

  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#ff6600",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default BrowseShop;