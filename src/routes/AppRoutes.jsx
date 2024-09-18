// src/AppRouter.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/Route/PrivateRoute';

// import Profile from '../views/pages/Profile';
// import Settings from '../views/pages/Settings';
// import Support from '../views/pages/Support';
import Home from '../views/pages/Dashboard/Home';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';
import SignUp from '../Auth/SignUp';
import ExportTicket from '../views/pages/Dashboard/ExportTicket';
import Employee from '../views/pages/Managers/employees';

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
                path="/manager/employee"
                element={
                    <PrivateRoute>
                        <Employee />
                    </PrivateRoute>
                }
            />
            <Route
                path="/manager/movie"
                element={
                    <PrivateRoute>
                        <Employee />
                    </PrivateRoute>
                }
            />
            <Route
                path="/manager/food"
                element={
                    <PrivateRoute>
                        <Employee />
                    </PrivateRoute>
                }
            />
        </Routes>
        // </BrowserRouter>
    );
};

export default AppRouter;
