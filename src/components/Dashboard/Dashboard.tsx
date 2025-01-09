import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenuBar from '../Menu/Menu'; // Import du composant de menu
import { useMovieContext } from '../../contexts/MovieContext'; // Import du MovieContext
import './Dashboard.sass';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();
  const { toggleFamilyMode, isFamily } = useMovieContext(); // Récupère la fonction pour basculer le mode famille et l'état actuel

  // Mettre à jour l'heure toutes les minutes
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage
  }, []);

  // Naviguer vers la page "Start Liking"
  const handleStartLiking = () => {
    if (isFamily) {
      toggleFamilyMode(); // Désactiver le mode famille si activé
    }
    navigate('/like'); // Naviguer vers la page de likage standard
  };

  // Naviguer vers la page "Family Choices" et activer le mode famille
  const handleFamilyChoices = () => {
    if (!isFamily) {
      toggleFamilyMode(); // Activer le mode famille si non activé
    }
    navigate('/swiperfamily'); // Naviguer vers la page des choix familiaux
  };

  return (
    <div>
      <div className="dashboard">
        {/* Top Bar */}
        <div className="top-bar">
          <span className="time">{currentTime}</span>
          <button className="settings-button">⚙️</button>
        </div>

        {/* Section pour lancer "Start Liking" */}
        <section className="liking-launcher flex flex-col gap-4">
          <button 
            onClick={handleStartLiking} 
            className="start-liking-button bg-blue-500 text-white text-base py-2 px-5 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Commencer à liker
          </button>

          <button 
            onClick={handleFamilyChoices} 
            className="start-liking-button bg-purple-500 text-white text-base py-2 px-5 rounded-md hover:bg-purple-700 transition-colors duration-200"
          >
            Voir les choix de la famille
          </button>
        </section>
      </div>
      <BottomMenuBar /> {/* Menu toujours visible */}
    </div>
  );
};

export default Dashboard;
