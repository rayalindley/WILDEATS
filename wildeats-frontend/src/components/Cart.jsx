import { useState } from "react";
import Navbar from "./NavBar";

function Cart() {
  // sample cart data (later this comes from BrowseShop / context / localStorage)
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Burger",
      price: 120,
      quantity: 1
    },
    {
      id: 2,
      name: "Pizza",
      price: 250,
      quantity: 2
    }
  ]);

  // increase quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // remove item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // compute total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // checkout
  const checkout = () => {
    alert("Order placed successfully! 🎉");
    setCart([]);
  };

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: "center" }}>🛒 Your Cart</h2>

      <div style={styles.container}>
        {cart.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>Cart is empty 😢</h3>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={styles.card}>
                <div>
                  <h3>{item.name}</h3>
                  <p>₱{item.price}</p>
                </div>

                <div style={styles.controls}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <div>
                  <strong>₱{item.price * item.quantity}</strong>
                </div>

                <button
                  style={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* TOTAL SECTION */}
            <div style={styles.totalBox}>
              <h2>Total: ₱{total}</h2>
              <button style={styles.checkoutBtn} onClick={checkout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    marginTop: "20px"
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "white"
  },

  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  removeBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  totalBox: {
    marginTop: "20px",
    textAlign: "right"
  },

  checkoutBtn: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Cart;