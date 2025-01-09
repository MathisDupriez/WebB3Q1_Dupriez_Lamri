import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Login/ProtectedRoute';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import MovieSwiper from './components/Movie/MovieSwiper';
import Dashboard from './components/Dashboard/Dashboard';
import ProfilePage from './components/Profil/ProfilPage';
import FamilyDashboard from './components/Family/FamilyDashboard';

import { LoginProvider } from './contexts/LoginContext';
import { UserProvider } from './contexts/UserContext';
import { MovieProvider } from './contexts/MovieContext';
import { FamilyProvider } from './contexts/FamilyContext';
import FamilyMovieSwiper from './components/Movie/FamilyMovieSwiper';
import MovieDetails from './components/Movie/MovieDetails';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UserProvider>
      <FamilyProvider>
        <MovieProvider>
          <LoginProvider>
          {children}
          </LoginProvider>
        </MovieProvider>
      </FamilyProvider>
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
          <Route
              path="/family"
              element={
                <ProtectedRoute>
                  <FamilyDashboard />
                </ProtectedRoute>
              }
            />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/swiperfamily" 
            element={
              <ProtectedRoute>
                <FamilyMovieSwiper />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/movie-details" 
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AppProviders>
    </Router>
  );
};

export default App;
