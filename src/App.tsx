import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import ProtectedRoute from './components/Login/ProtectedRoute';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import MovieSwiper from './components/Movie/vieSwiper';
import Dashboard from './components/Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <LoginProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard
                  familyMembers={[
                    { name: 'Alice', isOnline: true },
                    { name: 'Bob', isOnline: false },
                    { name: 'Charlie', isOnline: true },
                  ]}
                  upcomingMovies={[
                    { id: 1, title: 'The Matrix', posterUrl: 'https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg' },
                    { id: 2, title: 'Inception', posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
                    { id: 3, title: 'Interstellar', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
                  ]}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <MovieSwiper />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </LoginProvider>
    </Router>
  );
};

export default App;
