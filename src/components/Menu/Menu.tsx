import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaUser } from 'react-icons/fa'; // Remplacement de FaCogs par FaUsers
import './Menu.sass'; // Import du fichier SASS

const BottomMenuBar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="bottom-menu-bar">
            {/* Bouton Home */}
            <Link to="/" className={`menu-item ${isActive('/') ? 'active' : ''}`}>
                <FaHome className="icon" />
                <span className="label">Home</span>
            </Link>

            {/* Bouton Famille */}
            <Link to="/family" className={`menu-item ${isActive('/family') ? 'active' : ''}`}>
                <FaUsers className="icon" /> {/* Icône pour famille */}
                <span className="label">Famille</span>
            </Link>

            {/* Bouton Profil */}
            <Link to="/profile" className={`menu-item ${isActive('/profile') ? 'active' : ''}`}>
                <FaUser className="icon" />
                <span className="label">Profil</span>
            </Link>
        </div>
    );
};

export default BottomMenuBar;
