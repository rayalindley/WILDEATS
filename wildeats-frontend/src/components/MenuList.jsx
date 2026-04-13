import { useEffect, useState } from "react";
import Navbar from "./NavBar";
import ShopService from "../services/ShopService";

function MenuList() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    ShopService.getAllProducts()
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Menu List</h2>

      <ul style={styles.list}>
        {menu.map(item => (
          <li key={item.id}>
            {item.name} - ₱{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  list: {
    textAlign: "center",
    listStyle: "none",
    padding: 0
  }
};

export default MenuList;