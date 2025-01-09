import ApiService from './ApiService'; // Import de ton ApiService

class LoginApiService {
    private apiService = ApiService.getInstance();

    public async login(email: string, password: string): Promise<{ token: string; user: { id: string; email: string } }> {
        return this.apiService.post<{ token: string; user: { id: string; email: string } }>('/login', { email, password });
        }

    public setToken(token: string): void {
        // Stocke le token dans localStorage via ApiService
        this.apiService.setToken(token);
    }

    public clearToken(): void {
        // Supprime le token de localStorage via ApiService
        this.apiService.clearToken();
    }

    public getToken(): string | null {
    // Récupère le token stocké via ApiService
        return this.apiService.getToken();
    }
}

export default new LoginApiService(); // Export une instance unique de LoginApiService
