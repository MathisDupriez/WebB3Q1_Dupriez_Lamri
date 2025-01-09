import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import User from '../model/User'; // Import de la classe User
import FamilyApiService from '../utils/Api/FamilyApiService'; // Import du service API pour les familles
import { useUser } from './UserContext'; // Hook pour récupérer l'utilisateur

interface FamilyContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    familyUsers: User[];
    setFamilyUsers: (users: User[]) => void;
    providers: string[];
    setProviders: (providers: string[]) => void;
    likeToRewatch: boolean;
    setLikeToRewatch: (like: boolean) => void;
    isInFamily: boolean;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user: initialUser } = useUser(); // Récupère l'utilisateur depuis le contexte utilisateur
    const [user, setUser] = useState<User | null>(null);
    const [familyUsers, setFamilyUsers] = useState<User[]>([]);
    const [providers, setProviders] = useState<string[]>([]);
    const [likeToRewatch, setLikeToRewatch] = useState<boolean>(false);
    const [isInFamily, setIsInFamily] = useState<boolean>(true);

    useEffect(() => {
        // Configure l'utilisateur local dès que `initialUser` change
        setUser(initialUser);

        // Si l'utilisateur a un `familyId`, récupère les données de la famille
        if (initialUser?.familyId === -1) {
            // L'utilisateur n'est pas dans une famille
            setIsInFamily(false);
        } else if (initialUser?.familyId) {
            setIsInFamily(true);
            fetchFamilyData(initialUser.familyId);
        }
    }, [initialUser]);

    const fetchFamilyData = async (familyId: number) => {
        try {
            // Récupère les données de la famille via FamilyApiService
            const familyData = await FamilyApiService.getFamilyById(familyId);
            const familyUsers = await FamilyApiService.getUsersInFamily(familyId);
            console.log(familyData);
            console.log(familyUsers);
            console.log("data");
            // Met à jour les états locaux avec les données récupérées
            setFamilyUsers(familyUsers || []);
            setProviders(familyData.providers || []);
            setLikeToRewatch(familyData.likeToRewatch || false);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de la famille :', error);
        }
    };

    return (
        <FamilyContext.Provider
            value={{
                user,
                setUser,
                familyUsers,
                setFamilyUsers,
                providers,
                setProviders,
                likeToRewatch,
                setLikeToRewatch,
                isInFamily,
            }}
        >
            {children}
        </FamilyContext.Provider>
    );
};

export const useFamilyContext = () => {
    const context = useContext(FamilyContext);
    if (!context) {
        throw new Error('useFamilyContext must be used within a FamilyProvider');
    }
    return context;
};
