// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './assets/style/root.scss'
import MainLayout from './components/SideBar/MainLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import useAuth from './hooks/useAuth';
import Login from './Auth/Login';

const queryClient = new QueryClient();
const AppContent = () => {
  const userLoggedIn = useAuth(); // Custom hook to check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    }
  }, [userLoggedIn, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<MainLayout />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Bọc ứng dụng với QueryClientProvider */}
      <BrowserRouter>
        <AppContent /> {/* Separate component where navigation logic happens */}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
