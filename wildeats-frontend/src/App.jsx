import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard"
import BrowseShop from './components/BrowseShop';
import MenuList from './components/MenuList';
import Cart from './components/Cart';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/browse-shop" element={<BrowseShop />} />
        <Route path="/menu-list" element={<MenuList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
