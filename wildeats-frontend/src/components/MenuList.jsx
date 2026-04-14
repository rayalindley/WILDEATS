import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import menuData from "../data/menu.json";
import { useCart } from "./CartProvider";

function MenuList() {
  const { shopId } = useParams();
  const { addToCart } = useCart();

  const menu = menuData.filter(item => item.shopId === Number(shopId));

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2 className="title">Menu</h2>

        <div className="grid">
          {menu.map(item => (
            <div key={item.id} className="card">

              <h3>{item.name}</h3>
              <p className="text-pink">₱{item.price}</p>

              <button
                className="btn btn-pink"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuList;