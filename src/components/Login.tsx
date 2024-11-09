import React, {useState, useEffect} from 'react';
import '../styles/login.sass';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO : after email and password are written, complete the code HERE
        console.log(email, password);
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
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <p className="register-link">Don't have an account? <a href="/register">Register</a></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;