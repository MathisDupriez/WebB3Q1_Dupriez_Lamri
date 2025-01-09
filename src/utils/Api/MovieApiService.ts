import ApiService from '../ApiService'; // Import de ton ApiService
import Movie from '../../model/Movie';

class MovieApiService {
    private apiService = ApiService.getInstance();
    private offset = 0;
    private limit = 20;

    public async fetchMovies(): Promise<Movie[]> {
        const response = await this.apiService.get<{ movies: Movie[] }>('/movies/', {
            offset: this.offset,
            limit: this.limit,
        });
        this.offset += this.limit; // Incrémente l'offset après chaque appel
        return response.movies;
    }

        // Récupérer les films likés par tous les membres d'une famille
    public async fetchFamilyMovies(familyId: number): Promise<Movie[]> {
        const response = await this.apiService.post<{ movies: Movie[] }>(`/movies/family-likes`, { familyId });
        return response.movies;
    }

}

export default new MovieApiService(); // Export une instance unique de MovieApiService
