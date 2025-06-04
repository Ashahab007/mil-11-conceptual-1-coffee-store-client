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
import MyAddedCoffees from "./components/MyAddedCoffees.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import MyOrders from "./components/MyOrders.jsx";

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
      // 4.0 now my requirement is show the coffee details in on click in view button
      {
        path: "coffee/:id",
        // 4.3 use loader to fetch the specific coffee by id
        loader: ({ params }) =>
          axios(`http://localhost:3000/coffee/${params.id}`),

        element: (
          <PrivateRoute>
            <CoffeeDetails></CoffeeDetails>
          </PrivateRoute>
        ),
      },
      // 10.1 created a route but we do not use params we will do it in different way but we can use also params
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "updateCoffee/:id",

        element: (
          <PrivateRoute>
            <UpdateCoffee></UpdateCoffee>
          </PrivateRoute>
        ),
      },
      // 5.1 created a route for dynamic email
      {
        path: "my-added-coffees/:email",
        // 5.4 use loader to get the data from the server
        loader: ({ params }) =>
          fetch(`http://localhost:3000/my-added-coffees/${params.email}`),
        element: (
          <PrivateRoute>
            <MyAddedCoffees></MyAddedCoffees>,
          </PrivateRoute>
        ),
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
