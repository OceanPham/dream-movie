// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './assets/style/root.scss'
import MainLayout from './components/SideBar/MainLayout';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Bọc ứng dụng với QueryClientProvider */}
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
