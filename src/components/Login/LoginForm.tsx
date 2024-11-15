import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous que react-router-dom est installé et configuré
import axios from 'axios'; // Importation de la bibliothèque Axios

import './login.sass';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Utilisé pour la redirection

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const emailInput = (form.elements.namedItem("email") as HTMLInputElement).value;
        const passwordInput = (form.elements.namedItem("password") as HTMLInputElement).value;

        setEmail(emailInput);
        setPassword(passwordInput);
    };

    useEffect(() => {
        const login = async () => {
            if (!email || !password) return;

            setLoading(true);
            setErrorMessage('');

            try {
                const response = await axios.post('http://localhost:3000/login', {
                    email,
                    password,
                });

                const data = response.data; // Axios gère automatiquement le JSON
                console.log('Login successful:', data);

                // Stocker le token dans le localStorage
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                    console.log('Token stored in localStorage:', data.token);
                    navigate('/'); // Redirection vers la page d'accueil
                } else {
                    throw new Error('Un problème est survenu lors de la connexion, veuillez réessayer dans quelques instants.');
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    // Axios-specific error handling
                    setErrorMessage(
                        error.response?.data?.message || 'Login failed. Please check your credentials.'
                    );
                } else {
                    // Generic error handling
                    setErrorMessage('An unexpected error occurred.');
                    console.error('Unexpected error:', error);
                }
            }finally {
                setLoading(false);
            }
        };

        login();
    }, [email, password, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="email"
                placeholder="Email" 
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
};

export default LoginForm;
