import React, { useEffect, useState } from 'react';
import { useFamilyContext } from '../../contexts/FamilyContext';
import BottomMenuBar from '../Menu/Menu'; // Import du composant de menu
import FamilyApiService from '../../utils/Api/FamilyApiService'; // Import du service API pour les familles
import './FamilyDashboard.sass'; // Assurez-vous d'avoir un fichier CSS lié

const FamilyDashboard: React.FC = () => {
    const { user, familyUsers, providers, likeToRewatch, isInFamily, setLikeToRewatch, setProviders } = useFamilyContext();
    const [allProviders, setAllProviders] = useState<string[]>([]); // Liste de tous les providers uniques
    const [searchTerm, setSearchTerm] = useState<string>(''); // Terme de recherche pour filtrer les providers
    const [filteredProviders, setFilteredProviders] = useState<string[]>([]); // Providers filtrés
    const [loadingLike, setLoadingLike] = useState<boolean>(false); // État de chargement pour "likeToRewatch"

    // Récupère tous les providers uniques au montage du composant
    useEffect(() => {
        const fetchAllProviders = async () => {
            try {
                const uniqueProviders = await FamilyApiService.getAllUniqueProviders();
                setAllProviders(uniqueProviders);
                setFilteredProviders(uniqueProviders);
            } catch (error) {
                console.error('Error fetching all unique providers:', error);
            }
        };

        fetchAllProviders();
    }, []);

    // Filtre les providers en fonction du terme de recherche
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProviders(allProviders);
        } else {
            const filtered = allProviders.filter((provider) =>
                provider.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProviders(filtered);
        }
    }, [searchTerm, allProviders]);

    // Gère les changements des cases à cocher pour les providers
    const handleToggleProvider = async (provider: string) => {
        const isProviderSelected = providers.includes(provider);

        try {
            if (isProviderSelected && user !== null) {
                await FamilyApiService.removeProviderFromFamily(user.familyId, provider);
                setProviders(providers.filter((p) => p !== provider));
            } else if (user !== null) {
                await FamilyApiService.addProviderToFamily(user.familyId, provider);
                setProviders([...providers, provider]);
            }
        } catch (error) {
            console.error(`Error toggling provider ${provider}:`, error);
        }
    };

    // Gère le changement de la préférence "likeToRewatch"
    const handleToggleLikeToRewatch = async () => {
        setLoadingLike(true);
        try {
            if (user !== null) {
                await FamilyApiService.updateLikeToRewatch(user.familyId, !likeToRewatch);
                setLikeToRewatch(!likeToRewatch);
            }
        } catch (error) {
            console.error('Error updating likeToRewatch:', error);
        } finally {
            setLoadingLike(false);
        }
    };

    if (!isInFamily) {
        return (
            <div className="dashboard-container no-family">
                <h1 className="dashboard-title">Vous n'êtes pas encore dans une famille</h1>
                <p className="dashboard-message">
                    Pour rejoindre ou créer une famille, veuillez accéder à votre profil
                    et effectuer les modifications nécessaires.
                </p>
                <BottomMenuBar />
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Family Dashboard</h1>

            {/* Affichage des utilisateurs */}
            <section className="dashboard-section">
                <h2 className="section-title">Utilisateur actuel</h2>
                {user ? (
                    <p className="section-content">
                        <strong>Nom :</strong> {user.username}
                    </p>
                ) : (
                    <p className="section-content">Aucun utilisateur sélectionné.</p>
                )}
            </section>

            {/* Affichage des membres de la famille */}
            <section className="dashboard-section">
                <h2 className="section-title">Membres de la famille</h2>
                {familyUsers.length > 0 ? (
                    <ul className="family-list">
                        {familyUsers.map((member) => (
                            <li key={member.id} className="family-list-item">
                                <strong>Nom :</strong> {member.username}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="section-content">Aucun membre de la famille ajouté.</p>
                )}
            </section>

            {/* Préférence "Aime revoir" avec une case à cocher */}
            <section className="dashboard-section">
                <h2 className="section-title">Préférences</h2>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={likeToRewatch}
                        onChange={handleToggleLikeToRewatch}
                        disabled={loadingLike}
                    />
                    <span>
                        Notre famille aime revoir des films{' '}
                        {loadingLike && <span className="text-sm text-gray-500">(Mise à jour...)</span>}
                    </span>
                </label>
            </section>

            {/* Affichage des providers avec des cases à cocher */}
            <section className="dashboard-section">
                <h4 className="section-title">Rechercher les services de streaming de votre famille</h4>
                <input
                    type="text"
                    placeholder="Rechercher un provider..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
                />
                {filteredProviders.length > 0 ? (
                    <ul className="provider-list max-h-96 overflow-y-auto">
                        {filteredProviders.map((provider, index) => (
                            <li key={index} className="provider-list-item">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={providers.includes(provider)} // Coché si le provider appartient à la famille
                                        onChange={() => handleToggleProvider(provider)}
                                    />
                                    {provider}
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="section-content">Aucun provider disponible.</p>
                )}
            </section>

            <BottomMenuBar />
        </div>
    );
};

export default FamilyDashboard;
