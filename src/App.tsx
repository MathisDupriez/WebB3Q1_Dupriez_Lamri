import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/Login';
import RegisterPage from './components/RegisterPage';
import MovieSwiper from './components/MovieSwiper';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSwiper />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
