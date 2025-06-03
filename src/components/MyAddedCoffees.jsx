import React, { useState } from "react";
import { useLoaderData } from "react-router";
import CoffeeCard from "./CoffeeCard";

// 5.0 my requirement is show the specific user's added coffees using email in ui so created a component MyAddedCoffees
const MyAddedCoffees = () => {
  // 5.5 get the data using useloader
  const data = useLoaderData();
  console.log(data);

  const [coffees, setCoffees] = useState(data || []);
  console.log(coffees);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
        {/* Coffee Cards */}
        {/* 5.6 send the data to the previously created  CoffeeCard Component*/}
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee._id} coffee={coffee}></CoffeeCard>
        ))}
      </div>
    </div>
  );
};

export default MyAddedCoffees;
