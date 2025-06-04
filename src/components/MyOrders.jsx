import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { data } from "react-router";
import OrderCoffee from "./OrderCoffee";

const MyOrders = () => {
  const { user } = use(AuthContext);

  // 10.3 created a state for using useEffect
  const [orders, setOrders] = useState([]);

  //   10.4
  useEffect(() => {
    axios(`http://localhost:3000/my-orders/${user?.email}`)
      .then((data) => {
        console.log(data?.data);
        setOrders(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  console.log(orders);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
        {orders.map((order) => (
          <OrderCoffee key={order._id} order={order}></OrderCoffee>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
