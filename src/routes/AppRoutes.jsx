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
import Voucher from "../views/pages/Managers/Voucher";
import FoodCategory from "../views/pages/Managers/FoodCategory";
import Profile from "../views/pages/Dashboard/Profile";
import Movie from "../views/pages/Managers/movie";
import DefaultAlert from "../views/components/DefaultAlert";
import Films from "../views/pages/Managers/Films";

const AppRouter = ({ setSelectedKey }) => {
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
            <Home setSelectedKey={setSelectedKey} />
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
            <ExportTicket setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/showtime"
        element={
          <PrivateRoute>
            <Showtime setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/showtime/:alias"
        element={
          <PrivateRoute>
            <Showtime setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/chairCategory"
        element={
          <PrivateRoute>
            <ChairCategory setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/chairCategory/:alias"
        element={
          <PrivateRoute>
            <ChairCategory setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/voucher"
        element={
          <PrivateRoute>
            <Voucher setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/voucher/:alias"
        element={
          <PrivateRoute>
            <Voucher setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/producer"
        element={
          <PrivateRoute>
            <Producer setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/producer/:alias"
        element={
          <PrivateRoute>
            <Producer setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/movie"
        element={
          <PrivateRoute>
            <Movie setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/food"
        element={
          <PrivateRoute>
            <ChairCategory setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/employee"
        element={
          <PrivateRoute>
            <Employee setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/foodCategory/:alias"
        element={
          <PrivateRoute>
            <FoodCategory setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />

      <Route
        path="/manager/foodCategory"
        element={
          <PrivateRoute>
            <FoodCategory setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/room"
        element={
          <PrivateRoute>
            <Room setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/briefCase/userinfo"
        element={
          <PrivateRoute>
            <Profile setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/briefCase/custome"
        element={
          <PrivateRoute>
            <DefaultAlert />
          </PrivateRoute>
        }
      />
      <Route
        path="/support"
        element={
          <PrivateRoute>
            <DefaultAlert />
          </PrivateRoute>
        }
      />
      <Route
        path="/setting"
        element={
          <PrivateRoute>
            <DefaultAlert />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/movie"
        element={
          <PrivateRoute>
            <Films setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/movie/:alias"
        element={
          <PrivateRoute>
            <Films setSelectedKey={setSelectedKey} />
          </PrivateRoute>
        }
      />
    </Routes>


    // </BrowserRouter>
  );
};

export default AppRouter;
