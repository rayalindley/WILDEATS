import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // temporary mock data (replace with API later)
    setOrders([
      { id: 1, customer: "Juan", total: 150, status: "Pending" },
      { id: 2, customer: "Maria", total: 220, status: "Completed" },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-pink-500 mb-6">
          Shop Dashboard
        </h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id}
              className="bg-[#1a1a1a] p-4 rounded-2xl shadow-md flex justify-between"
            >
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-gray-400">Customer: {order.customer}</p>
              </div>

              <div className="text-right">
                <p className="text-pink-400 font-semibold">
                  ₱ {order.total}
                </p>
                <p className="text-sm">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;