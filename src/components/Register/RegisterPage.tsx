import React, { useState } from 'react';
import '../../styles/register.sass';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstname:'',
        lastname:'',
        username:'',
        password:'',
        email:'',
        birthdate:'',
});


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value,
    }));
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO : here will be the logic of sending the register form !
    console.log("Form submitted", formData);
};

return(
    <div className="register-page">
        <div className="register-card">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <input
                    type="date"
                    placeholder="Birthdate"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Create account</button>
                <p className="login-link">Already have an account? <a href="/login">Login</a></p>
            </form>
        </div>
    </div>
);
};

export default RegisterPage;