import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import shops from "../data/shops.json";
import "../App.css"

function BrowseShop() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Browse Shops</h2>

        <div className="shop-container">
          {shops.map((shop) => (
            <div
              key={shop.id}
              className="shop-card"
              onClick={() => navigate(`/menu-list/${shop.id}`)}
            >
              <h3>{shop.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default BrowseShop;