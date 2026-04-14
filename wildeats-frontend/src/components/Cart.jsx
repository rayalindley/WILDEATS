import React from "react";
import NavBar from "./NavBar";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <NavBar />

      <div className="cart-container">
        <h2 className="title"> Cart </h2>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item flex-between">
                <div className="cart-left">
                  <img src={item.image} className="cart-img"/>

                  <div>
                    <h3>{item.name}</h3>
                    <p className="text-pink">₱{item.price}</p>
                  </div>
                </div>
                

                <div className="cart-controls flex">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <div className="flex">
                  <p>₱{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-remove-cart"
                  >
                    <svg fill="#F4C522" width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>
                  </button>
                </div>

              </div>
            ))}

            <div className="cart-total">
              <strong>Total: ₱{total}</strong>
            </div>

            <button className="btn btn-pink btn-checkout"> Checkout Order </button>
          </>
        )}
      </div>
    </>
  );
}