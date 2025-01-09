import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export default class ApiService {
  private axiosInstance: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private setupInterceptors(): void {
    // Intercepteur pour les requêtes
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.getToken();
        if (token) {
          config.headers = config.headers || {}; // Assure que headers existe
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercepteur pour les réponses
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public clearToken(): void {
    localStorage.removeItem('authToken');
  }

  private handleUnauthorized(): void {
    console.warn('Utilisateur non autorisé, déconnexion...');
    this.clearToken();
    // Redirection ou gestion supplémentaire ici si nécessaire
  }

  // Méthodes HTTP
  public async get<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.request<T>({
      method: 'GET',
      url,
      data, // Ajout du body dans les requêtes GET
    });
    return response.data;
  }

  public async post<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  public async put<T>(url: string, data: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  public async delete<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.request<T>({
      method: 'DELETE',
      url,
      data, // Ajout du body dans les requêtes DELETE
    });
    return response.data;
  }
}
