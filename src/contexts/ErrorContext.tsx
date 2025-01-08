import React, { createContext, useState, useContext, ReactNode } from 'react';

type ErrorContextType = {
  setError: (message: string | null) => void; // Méthode pour définir l'erreur
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  // Composant pour afficher l'erreur (inline dans le contexte)
  const ErrorDisplay = () => {
    if (!error) return null;

    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'red',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        <p>{error}</p>
        <button onClick={() => setError(null)} style={{ marginTop: '10px', background: 'white', color: 'black' }}>
          Fermer
        </button>
      </div>
    );
  };

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
      <ErrorDisplay /> {/* Le composant est automatiquement rendu avec le contexte */}
    </ErrorContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
