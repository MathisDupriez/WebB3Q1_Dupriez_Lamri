import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useLogin } from '../../contexts/LoginContext';
import FamilyApiService from '../../utils/Api/FamilyApiService';
import BottomMenuBar from '../Menu/Menu';
import { FaUserCircle, FaSignOutAlt, FaPlus, FaSearch } from 'react-icons/fa';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useUser();
  const { logout } = useLogin();
  const [familyIdInput, setFamilyIdInput] = useState<string>('');
  const [familyNameInput, setFamilyNameInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-600">Chargement des informations utilisateur...</p>
      </div>
    );
  }

  const joinFamily = async () => {
    setLoading(true);
    setError(null);

    try {
      const familyId = parseInt(familyIdInput);
      if (isNaN(familyId)) {
        throw new Error("L'ID de la famille doit être un nombre.");
      }

      await FamilyApiService.setUserFamily(user.id, Number(familyId));
      setUser({ ...user, familyId });
      setFamilyIdInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inattendue s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  const createFamily = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!familyNameInput.trim()) {
        throw new Error("Le nom de la famille ne peut pas être vide.");
      }

      const response = await FamilyApiService.createFamily(familyNameInput, []);
      const newFamilyId = response.familyId;

      await FamilyApiService.setUserFamily(user.id, newFamilyId);
      setUser({ ...user, familyId: newFamilyId });
      setFamilyNameInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inattendue s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 pb-[100px]">
      <div className="flex flex-col items-center p-6 flex-grow">
        {/* Image et titre */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-gray-400 text-[150px]" />
          <h1 className="text-3xl font-bold text-gray-800 mt-4">{user.username}</h1>
        </div>

        {/* Contenu principal */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg text-center">
          <div className="mb-8">
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Famille :</span>{' '}
              {user.familyId === -1 ? 'Non assigné' : user.familyId}
            </p>
            {user.familyId !== -1 && (
              <p className="text-sm text-gray-500 mt-2">
                Partagez cette ID pour que les membres de votre famille puissent vous rejoindre.
              </p>
            )}
          </div>

          {user.familyId === -1 ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Gérer votre famille</h2>

              <div className="relative">
                <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ID de la famille"
                  value={familyIdInput}
                  onChange={(e) => setFamilyIdInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 pl-10 text-gray-800 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={joinFamily}
                  className="bg-blue-500 text-white px-6 py-2 mt-3 rounded-md shadow-md hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <FaPlus /> Rejoindre une famille
                </button>
              </div>

              <div className="relative">
                <FaUserCircle className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom de la famille"
                  value={familyNameInput}
                  onChange={(e) => setFamilyNameInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 pl-10 text-gray-800 shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                <button
                  onClick={createFamily}
                  className="bg-green-500 text-white px-6 py-2 mt-3 rounded-md shadow-md hover:bg-green-600 transition flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <FaPlus /> Créer une famille
                </button>
              </div>

              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </div>
          ) : null}
        </div>

        {/* Bouton Déconnexion centré */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-3 mt-8 rounded-md shadow-md hover:bg-red-600 transition flex items-center justify-center gap-2"
        >
          <FaSignOutAlt /> Déconnexion
        </button>
      </div>
      <BottomMenuBar />
    </div>
  );
};

export default ProfilePage;
