import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenuBar from '../Menu/Menu';
import { useMovieContext } from '../../contexts/MovieContext';
import { FaClock, FaCog } from 'react-icons/fa'; // Import des icônes pour une meilleure apparence
import './Dashboard.sass';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();
  const { toggleFamilyMode, isFamily } = useMovieContext();

  // Mettre à jour l'heure toutes les minutes
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Naviguer vers "Start Liking"
  const handleStartLiking = () => {
    if (isFamily) {
      toggleFamilyMode(); // Désactiver le mode famille si activé
    }
    navigate('/like');
  };

  // Naviguer vers "Family Choices" et activer le mode famille
  const handleFamilyChoices = () => {
    if (!isFamily) {
      toggleFamilyMode(); // Activer le mode famille si non activé
    }
    navigate('/swiperfamily');
  };

  return (
    <div className="dashboard-container bg-gray-100 min-h-screen flex flex-col justify-between">
      {/* Barre du haut */}
      <div className="top-bar bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="time flex items-center gap-2 text-gray-600 text-lg font-medium">
          <FaClock />
          {currentTime}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="main-content flex flex-col items-center justify-center flex-grow gap-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Bienvenue dans votre Dashboard
        </h1>
        <div className="button-container flex flex-col items-center gap-6">
          <button
            onClick={handleStartLiking}
            className="start-liking-button w-64 bg-blue-500 text-white text-lg py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
          >
            Commencer à liker
          </button>

          <button
            onClick={handleFamilyChoices}
            className="family-choices-button w-64 bg-purple-500 text-white text-lg py-3 rounded-full shadow-md hover:bg-purple-600 transition duration-200"
          >
            Voir les choix de la famille
          </button>
        </div>
      </div>

      {/* Barre de menu inférieure */}
      <BottomMenuBar />
    </div>
  );
};

export default Dashboard;
