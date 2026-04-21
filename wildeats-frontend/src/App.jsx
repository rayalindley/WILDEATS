import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import BrowseShop from './components/BrowseShop';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { CartProvider } from "./components/CartProvider";
import MyOrders from './components/MyOrders';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse-shop" element={<BrowseShop />} />
          <Route path="/menu-list/:shopId" element={<MenuList />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;