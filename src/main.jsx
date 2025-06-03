import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./components/Home.jsx";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import CoffeeDetails from "./components/CoffeeDetails.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,

        // 3.0 my requirement is show the coffee data to the home page from 1.0 get method
        loader: () => axios("http://localhost:3000/coffees"),
        Component: Home,
      },

      {
        path: "addCoffee",
        Component: AddCoffee,
      },
      // 4.0 now my requirement is show the coffee details in coffee details page
      {
        path: "coffee/:id",
        // 4.2 use loader to fetch the specific coffee
        loader: ({ params }) =>
          axios(`http://localhost:3000/coffee/${params.id}`),

        Component: CoffeeDetails,
      },
      {
        path: "updateCoffee/:id",

        Component: UpdateCoffee,
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
