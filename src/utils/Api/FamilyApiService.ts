import ApiService from '../ApiService';

class FamilyApiService {
    private apiService = ApiService.getInstance();

    // Créer une nouvelle famille
    public async createFamily(nom: string, providers: string[] = []): Promise<any> {
        return this.apiService.post('/families', { nom, providers });
    }

    // Récupérer une famille par ID
    public async getFamilyById(familyId: number): Promise<any> {
        return this.apiService.post('/families/get-by-id', { familyId });
    }

    // Supprimer une famille par ID
    public async deleteFamilyById(familyId: number): Promise<any> {
        return this.apiService.post('/families/delete', { familyId });
    }

    // Associer un utilisateur à une famille
    public async setUserFamily(userId: number, familyId: number): Promise<any> {
        return this.apiService.post('/families/set-user-family', { userId, familyId });
    }

    // Récupérer tous les utilisateurs d'une famille
    public async getUsersInFamily(familyId: number): Promise<any> {
        return this.apiService.post('/families/get-users', { familyId });
    }

    // Ajouter un provider à une famille
    public async addProviderToFamily(familyId: number, provider: string): Promise<any> {
        return this.apiService.post('/families/add-provider', { familyId, provider });
    }

    // Supprimer un provider d'une famille
    public async removeProviderFromFamily(familyId: number, provider: string): Promise<any> {
        return this.apiService.post('/families/remove-provider', { familyId, provider });
    }

    // Mettre à jour le booléen likeToRewatch
    public async updateLikeToRewatch(familyId: number, likeToRewatch: boolean): Promise<any> {
        return this.apiService.post('/families/update-like-to-rewatch', { familyId, likeToRewatch });
    }

    // Récupérer tous les fournisseurs uniques
    public async getAllUniqueProviders(): Promise<any> {
        return this.apiService.get('/providers/all-unique'); // Effectue un appel GET
    }
}

export default new FamilyApiService(); // Export une instance unique du service
