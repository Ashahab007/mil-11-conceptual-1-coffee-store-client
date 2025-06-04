import React, { use, useEffect, useState } from "react";
import { data, useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const CoffeeDetails = () => {
  // 6.0 my requirement user likes other added coffees but cannot like his own added coffee in the home page

  // 6.1 get the user
  const { user } = use(AuthContext);

  // 4.4 get the data from the loader and directly destructure it
  const { data } = useLoaderData();
  console.log(data);

  // 9.0 Now my requirement is show the change quantity in ui thats why took a state
  const [coffee, setCoffee] = useState(data);
  console.log(coffee);

  // Note: this portion is declared before 9.0 coffee state and declared with data now commented because to show the data on ui we change the data to coffee  for ui state change purpose
  /* const { _id, photo, name, likeby, email, details, quantity } = data || {}; */
  const { _id, photo, name, likeby, email, details, quantity } = coffee || {};

  // 7.3 took two state one is liked if the user email is present or not and count the like i.e likeCount
  const [liked, setLiked] = useState(likeby.includes(user?.email));
  const [likeCount, setLikeCount] = useState(likeby.length);
  // console.log("is liked?", liked);
  // console.log(likeby);
  // console.log(user?.email);

  // 7.4 use useeffect
  useEffect(() => {
    setLiked(likeby.includes(user?.email));
  }, [likeby, user]);

  // 6.3 created handleLike function
  const handleLike = () => {
    // 6.4 user cannot like his own added coffee
    if (user?.email === email) return alert("Lojja korena");

    // 6.10 fetch the likes data from the db
    axios
      .patch(`http://localhost:3000/likes/${_id}`, {
        // 6.11 send the email which will get in data base req.body.email.
        email: user?.email,
      })
      .then((data) => {
        console.log(data?.data);
        const isLiked = data?.data?.liked;
        // 7.0 now my requirement is when user like or dislike it will show in ui and also count the likes
        setLiked(data?.data?.liked);

        // 7.4 update the like count i.e যদি data?.data.liked true হয় তাইলে prev value এর সাথে 1 যোগ করবে আর false হলে 1 minus করবে।
        setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      })
      .catch((err) => {
        console.log(err);
      });
    // 6.12 NOw from this step like in ui u will get like count in db
  };

  // 8.0 my requirement is user caan only order his added product. to do this first we check the quantity is more than 1 then decrease the quantity from the db using post method
  const handleOrder = () => {
    if (user?.email === email) return alert("tomar nijer coffee");

    // 8.4 get the data as object
    const orderInfo = {
      coffeeId: _id,
      customerEmail: user?.email,
    };
    // 8.5 send the data to the data base
    axios
      .post(`http://localhost:3000/place-order/${_id}`, orderInfo)
      .then((data) => {
        console.log(data);
        // 9.1
        setCoffee((prev) => {
          console.log(prev);

          return { ...prev, quantity: prev.quantity - 1 };
        });
      }); // 8.6 Now from this step if u order  a product it will decrease by reload
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
          <p>Quantity : {quantity}</p>
          <p>Like : {likeCount}</p>
        </div>
        <div>
          <button onClick={handleOrder} className="btn btn-primary">
            Order
          </button>
          {/* 6.2 set handleLike */}
          <button onClick={handleLike} className="btn btn-secondary">
            {/* 7.2 conditionally show the like and dislike in ui */}
            👍{liked ? "Dislike" : "Like"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetails;
