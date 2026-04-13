import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="bg-[#1a1a1a] text-white p-4 rounded-2xl shadow-md flex justify-between items-center mb-3">
      
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-pink-400">₱ {item.price}</p>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => onDecrease(item.id)}
          className="bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button 
          onClick={() => onIncrease(item.id)}
          className="bg-gray-700 px-3 py-1 rounded-lg hover:bg-gray-600"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-semibold">₱ {item.price * item.quantity}</p>
        <button 
          onClick={() => onRemove(item.id)}
          className="text-sm text-red-400 hover:text-red-600"
        >
          Remove
        </button>
      </div>

    </div>
  );
};

export default CartItem;