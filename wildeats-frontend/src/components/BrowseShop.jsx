import { useEffect, useState } from "react";
import Navbar from "./NavBar";
// import ShopService from "../services/ShopService";

function BrowseShop() {
  const [products, setProducts] = useState([]);

//   useEffect(() => {
//     ShopService.getAllProducts()
//       .then(res => setProducts(res.data))
//       .catch(err => console.log(err));
//   }, []);

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center" }}>Browse Shop</h2>

      <div style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt="" style={styles.image} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₱{product.price}</p>
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
    justifyContent: "center"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px",
    width: "200px",
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover"
  }
};

export default BrowseShop;