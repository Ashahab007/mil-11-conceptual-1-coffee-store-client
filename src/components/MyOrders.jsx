import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { data } from "react-router";

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

  return (
    <div>
      {orders.map((order) => (
        <>
          <p>Order Id: {order._id}</p>
          <p>Order Coffee Id: {order.coffeeId}</p>
          <p>Customer Email: {order.customerEmail}</p>
        </>
      ))}
    </div>
  );
};

export default MyOrders;
