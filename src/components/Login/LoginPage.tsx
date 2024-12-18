import React from 'react';
import './login.sass';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <LoginForm />
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
