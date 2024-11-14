import React, { useState } from 'react';
import '../../styles/login.sass';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('TEST');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Optionnel : Affiche un état de chargement

        try {
            const response = await fetch('https://api.example.com/login', {
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
            // Ici, tu peux rediriger l'utilisateur ou stocker le token par exemple

        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            console.error(error);
        } finally {
            setLoading(false); // Fin du chargement
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <p className="register-link">Don't have an account? <a href="/register">Register</a></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
