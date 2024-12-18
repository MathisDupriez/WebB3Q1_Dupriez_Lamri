import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.sass';

type FamilyMember = {
  name: string;
  isOnline: boolean;
};

type Movie = {
  id: number;
  title: string;
  posterUrl: string;
};

type DashboardProps = {
  familyMembers: FamilyMember[];
  upcomingMovies: Movie[]; // Nouvelle prop pour les films à venir
};

const Dashboard: React.FC<DashboardProps> = ({ familyMembers, upcomingMovies }) => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
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

  // Gestion de la sélection des membres de la famille
  const toggleMemberSelection = (name: string) => {
    setSelectedMembers((prev) =>
      prev.includes(name) ? prev.filter((member) => member !== name) : [...prev, name]
    );
  };

  // Lancer le jeu
  const handleStartGame = () => {
    if (selectedMembers.length > 0) {
      navigate('/game');
    } else {
      alert('Veuillez sélectionner au moins un membre avant de lancer le jeu.');
    }
  };

  return (
    <div className="dashboard">
      {/* Top Bar */}
      <div className="top-bar">
        <span className="time">{currentTime}</span>
        <button className="settings-button">
          ⚙️
        </button>
      </div>

      {/* Section des films à venir */}
      <section className="upcoming-movies">
        <h2>Films à venir</h2>
        <div className="movie-list-horizontal">
          {upcomingMovies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Section des membres de la famille */}
      <section className="family-status">
        <h2>Démarrer un nouveau jam </h2>
        <h3>Sélection des membres de la partie</h3>
        <ul>
          {familyMembers.map((member, index) => (
            <li
              key={index}
              className={`family-member ${member.isOnline ? 'online' : 'offline'} ${
                selectedMembers.includes(member.name) ? 'selected' : ''
              }`}
              onClick={() => toggleMemberSelection(member.name)}
            >
              <span className="member-name">{member.name}</span>
              <span className="status">
                {member.isOnline ? '🟢 En ligne' : '🔴 Hors ligne'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section pour lancer le jeu */}
      <section className="game-launcher">
        <button onClick={handleStartGame} className="start-game-button">
          Démarrer le jeu
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
