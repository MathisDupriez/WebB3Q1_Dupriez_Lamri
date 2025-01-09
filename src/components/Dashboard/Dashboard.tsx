import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenuBar from '../Menu/Menu'; // Import du composant de menu
import './Dashboard.sass';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();

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
    navigate('/like');
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
        <section className="liking-launcher">
          <button onClick={handleStartLiking} className="start-liking-button">
            Start Liking
          </button>
        </section>
      </div>
      <BottomMenuBar /> {/* Menu toujours visible */}
    </div>
  );
};

export default Dashboard;
