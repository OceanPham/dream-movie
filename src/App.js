// src/App.js
import React from 'react';
import AppRouter from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './navigation/SideBar';
import Header from './views/components/Header';
import './assets/style/root.scss'

// const App = () => <Router />

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Sidebar />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
};

export default App;
