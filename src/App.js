// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './assets/style/root.scss'
import MainLayout from './components/SideBar/MainLayout';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>


  );
};

export default App;
