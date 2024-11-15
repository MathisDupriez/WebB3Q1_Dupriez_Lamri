import React from 'react';
import './register.sass';
import RegisterForm from './RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <div className="register-page">
            <div className="register-card">
                <h2>Create Account</h2>
                <RegisterForm />
                <p className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
