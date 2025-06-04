import React from "react";
// 10.5 created OrderCoffee component
const OrderCoffee = ({ order }) => {
  console.log(order);
  const { photo, name, price, quantity } = order;
  return (
    <div className="card card-side bg-base-100 shadow-sm border-2">
      <figure>
        <img src={photo} alt="Movie" />
      </figure>
      <div className="flex mt-8 w-full justify-around">
        <div>
          <h2 className="">{name}</h2>
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="join join-vertical space-y-2">
            <button className="btn join-item">Cancel OrderX</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCoffee;
