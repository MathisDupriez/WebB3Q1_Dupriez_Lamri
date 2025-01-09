import React from 'react';
import { useUser } from '../../contexts/UserContext'; // Import du UserContext
import { useLogin } from '../../contexts/LoginContext'; // Import du LoginContext
import BottomMenuBar from '../Menu/Menu'; // Import du composant de menu


const ProfilePage: React.FC = () => {
  const { user } = useUser(); // Récupère les données utilisateur
  const { logout } = useLogin(); // Permet la déconnexion

    if (!user) {
        return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <p className="text-gray-600">Chargement des informations utilisateur...</p>
        </div>
        );
    }

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Profil</h1>
                    <div className="mb-6">
                    <p className="text-lg text-gray-600">
                        <span className="font-semibold">ID :</span> {user.id}
                    </p>
                    <p className="text-lg text-gray-600">
                        <span className="font-semibold">Email :</span> {user.email}
                    </p>
                    </div>
                    <button
                    onClick={logout}
                    className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                    >
                    Déconnexion
                    </button>
                </div>
            </div>
            <BottomMenuBar /> {/* Menu toujours visible */}

        </div>
    );
};

export default ProfilePage;
