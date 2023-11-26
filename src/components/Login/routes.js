import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './Login.js';
import CreateAccountScreen from '../CreateLogin/CreateLogin.js';
import HomeScreen from '../Home/Home.js';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/create-account" element={<CreateAccountScreen />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
