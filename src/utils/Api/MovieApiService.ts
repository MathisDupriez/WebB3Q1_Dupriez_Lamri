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

    // Récupérer les films de la famille
    public async fetchFamilyMovies(page: number): Promise<Movie[]> {
        const response = await this.apiService.get<{ movies: Movie[] }>(`/movies/liked?page=${page}`);
        return response.movies;
    }
}

export default new MovieApiService(); // Export une instance unique de MovieApiService
