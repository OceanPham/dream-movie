// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    // const { isAuthenticated } = useAuth();


    const isAuthenticated = true
    if (!isAuthenticated) {
        // If not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the requested route
    return children;
};

export default PrivateRoute;
