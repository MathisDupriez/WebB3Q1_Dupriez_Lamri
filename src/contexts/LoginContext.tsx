import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type LoginContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  errorMessage: string | null;
  loading: boolean;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Vérifie si un token est présent dans localStorage au chargement
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log("token vérifié", token);
    if (token) {
      setIsAuthenticated(true);
      
      navigate('/');
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { token } = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        navigate('/'); // Redirection vers la page d'accueil après login
      } else {
        throw new Error('No token received.');
      }
    } catch (error: unknown) {
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.response?.data?.message || 'Login failed. Please check your credentials.'
          : 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login'); // Redirection vers la page de connexion après déconnexion
  };

  return (
    <LoginContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        errorMessage,
        loading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
