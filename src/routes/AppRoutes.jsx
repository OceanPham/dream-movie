// src/AppRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/Route/PrivateRoute";

// import Profile from '../views/pages/Profile';
// import Settings from '../views/pages/Settings';
// import Support from '../views/pages/Support';
import Home from "../views/pages/Dashboard/Home";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import SignUp from "../Auth/SignUp";
import ExportTicket from "../views/pages/Dashboard/ExportTicket";
import ChairCategory from "../views/pages/Managers/ChairCategory";
import Producer from "../views/pages/Managers/Producer";
import Showtime from "../views/pages/Managers/Showtime";
import Employee from "../views/pages/Managers/employees";
import Room from "../views/pages/Managers/room";

const AppRouter = () => {
  return (
    // <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />
      <Route
        path="/exportTicket"
        element={
          <PrivateRoute>
            <ExportTicket />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/showtime"
        element={
          <PrivateRoute>
            <Showtime />
          </PrivateRoute>
        }
      />

      <Route
        path="/manager/showtime/:alias"
        element={
          <PrivateRoute>
            <Showtime />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/chairCategory"
        element={
          <PrivateRoute>
            <ChairCategory />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/chairCategory/:alias"
        element={
          <PrivateRoute>
            <ChairCategory />
          </PrivateRoute>
        }
      />

      <Route
        path="/manager/producer"
        element={
          <PrivateRoute>
            <Producer />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/producer/:alias"
        element={
          <PrivateRoute>
            <Producer />
          </PrivateRoute>
        }
      />


      <Route
        path="/manager/movie"
        element={
          <PrivateRoute>
            <ChairCategory />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/food"
        element={
          <PrivateRoute>
            <ChairCategory />
          </PrivateRoute>
        }
      />


      <Route
        path="/manager/employee"
        element={
          <PrivateRoute>
            <Employee />
          </PrivateRoute>
        }
      />

      <Route
        path="/manager/room"
        element={
          <PrivateRoute>
            <Room />
          </PrivateRoute>
        }
      />s
    </Routes>
    // </BrowserRouter>
  );
};

export default AppRouter;
