// src/components/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import '../../styles/login.sass';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState(''); // Déclencheur de l'effet
    const [password, setPassword] = useState(''); // Déclencheur de l'effet
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

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
            setErrorMessage(''); // Réinitialise le message d'erreur

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    throw new Error('Failed to login');
                }

                const data = await response.json();
                console.log('Login successful:', data);
                // Gérer la redirection ou le stockage du token ici

            } catch (error) {
                setErrorMessage('Login failed. Please check your credentials.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        login();
    }, [email, password]);

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
