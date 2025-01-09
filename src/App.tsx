import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Login/ProtectedRoute';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import MovieSwiper from './components/Movie/MovieSwiper';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Profil/ProfilPage';
import { LoginProvider } from './contexts/LoginContext';
import { UserProvider } from './contexts/UserContext';
import { MovieProvider } from './contexts/MovieContext';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UserProvider>
      <MovieProvider>
        <LoginProvider>
        {children}
        </LoginProvider>
      </MovieProvider>
    </UserProvider>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <AppProviders>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/like"
            element={
              <ProtectedRoute>
                <MovieSwiper />
              </ProtectedRoute>
            }
          />
          <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AppProviders>
    </Router>
  );
};

export default App;
