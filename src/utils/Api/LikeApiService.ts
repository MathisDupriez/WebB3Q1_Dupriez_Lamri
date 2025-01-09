import ApiService from '../ApiService';

class LikeApiService {
    private apiService = ApiService.getInstance();

    // Créer ou mettre à jour un like/dislike
    public async createLike(userId: number, movieId: number, like: boolean): Promise<any> {
        return this.apiService.post('/likes', { userId, movieId, like });
    }

    // Récupérer un like/dislike par ID
    public async getLikeById(likeId: number): Promise<any> {
        return this.apiService.post('/likes/get-by-id', { likeId });
    }

    // Récupérer tous les likes/dislikes d'un utilisateur
    public async getLikesByUser(userId: number): Promise<any> {
        return this.apiService.post('/likes/user-all', { userId });
    }

}

export default new LikeApiService(); // Export une instance unique du service
