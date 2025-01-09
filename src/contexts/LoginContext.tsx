import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginApiService from '../utils/Api/loginApiService';
import { useUser } from './UserContext';
import User from '../model/User'; // Import de la classe User

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
  const { setUser } = useUser(); // Accès au UserContext

  // Vérifie si un token est présent au chargement
  useEffect(() => {
    const token = LoginApiService.getToken();
    if (token) {
      setIsAuthenticated(true);
      navigate('/'); // Redirection si l'utilisateur est déjà connecté
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const { token, user: userData } = await LoginApiService.login(email, password);

      if (token) {
        LoginApiService.setToken(token); // Stocke le token
        setIsAuthenticated(true);

        // Création d'une instance User
        const user = new User(userData.id, userData.email);
        setUser(user); // Mise à jour du UserContext

        navigate('/'); // Redirection après login
      } else {
        throw new Error('No token received.');
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    LoginApiService.clearToken(); // Supprime le token
    setIsAuthenticated(false);
    setUser(null); // Réinitialise les données utilisateur
    navigate('/login'); // Redirection après logout
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
