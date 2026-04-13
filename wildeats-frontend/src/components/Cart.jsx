import React, { useState } from 'react';
import '../App.css';
import NavBar from './NavBar';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const addItem = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeItem = (index) => {
        setCartItems(cartItems.filter((_, i) => i !== index));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <>
            <NavBar />

            <div className="cart-container">
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <ul className="cart-items">
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <span>{item.name} - ${item.price}</span>
                                    <button onClick={() => removeItem(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-total">
                            <strong>Total: ${getTotalPrice()}</strong>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}