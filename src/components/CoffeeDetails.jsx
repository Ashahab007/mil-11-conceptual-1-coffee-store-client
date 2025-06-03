import React, { use, useState } from "react";
import { data, useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const CoffeeDetails = () => {
  // 6.0 my requirement user likes other added coffees but cannot like his own added coffee in the home page

  // 6.1 get the user
  const { user } = use(AuthContext);

  // 4.4 get the data from the loader
  const coffee = useLoaderData();
  console.log(coffee);
  console.log(coffee.data);

  const { _id, photo, name, likeby, email, details } = coffee.data;

  // 6.3 took two state one is like includes email and count the like
  const [liked, setLiked] = useState(likeby.includes(user?.email));

  const [likeCount, setLikeCount] = useState(likeby.length);

  // 6.5 created handleLike function

  const handleLike = () => {
    // 6.6 user cannot like his own added coffee
    if (user?.email === email) return;

    // 6.9 fetch the
    axios
      .patch(`http://localhost:3000/likes/${_id}`, {
        email: user?.email,
      })
      .then((data) => {
        console.log(data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          {/* 6.4 set handleLike */}
          <button onClick={handleLike} className="btn btn-secondary">
            Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
