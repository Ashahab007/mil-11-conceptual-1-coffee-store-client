import React from "react";
import { useLoaderData } from "react-router";

const CoffeeDetails = () => {
  // 4.3 get the data from the loader
  const coffee = useLoaderData();
  console.log(coffee);
  console.log(coffee.data);

  const {
    _id,
    taste,
    supplier,
    quantity,
    price,
    photo,
    name,
    likeby,
    email,
    details,
  } = coffee.data;
  return (
    <div>
      <div className="flex gap-12">
        <div className="flex-1">
          <img src={photo} alt="" srcset="" />
        </div>
        <div className="flex-1">
          <p>Name : {name}</p>
          <p>Details : {details}</p>
          <p>Like : {likeby.length}</p>
        </div>
        <div>
          <button className="btn btn-primary">Order</button>
          <button className="btn btn-secondary">Like</button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
