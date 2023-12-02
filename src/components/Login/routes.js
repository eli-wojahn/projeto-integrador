import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login.js';
import CreateAccountScreen from '../CreateLogin/CreateLogin.js';
import HomeScreen from '../Home/Home.js';
import SharedHomeScreen from '../Home/SharedHomeScreen.js';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/create-account" element={<CreateAccountScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/minha-lista" element={<SharedHomeScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
