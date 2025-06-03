import { useState } from "react";
import { useLoaderData } from "react-router";
import CoffeeCard from "./CoffeeCard";

const Home = () => {
  // 3.1 get the data
  const data = useLoaderData();
  // 3.2 create a state
  const [coffees, setCoffees] = useState(data?.data || []);
  console.log(coffees);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
        {/* Coffee Cards */}
        {coffees.map((coffee) => (
          // 3.4 show each coffee data in a CoffeeCard
          <CoffeeCard key={coffee._id} coffee={coffee}></CoffeeCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
