import { API_CONFIG, HTTP_STATUS } from '../utils/api.constants';
import { debugRequest, debugResponse, debugError, safeLog } from '../config/debug';
import type { 
  ApiResponse, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse 
} from '../types/api.types';

const API_BASE_URL = API_CONFIG.BASE_URL;

class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const defaultOptions: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      debugRequest(options.method || 'GET', url, defaultOptions);
      safeLog('Opções da requisição:', defaultOptions, true);

      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      debugResponse(response.status, data);

      if (!response.ok) {
        throw new Error(data.message || `Erro ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      debugError('API Request', error);
      throw error;
    }
  }

  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    // Log detalhado para debug
    safeLog('Resposta completa da API (login):', response, true);
    safeLog('response.token:', response.token, true);
    safeLog('response.nome:', response.nome, true);
    safeLog('response.email:', response.email, true);
    safeLog('response.perfil:', response.perfil, true);

    // Verificar se a resposta tem o formato esperado
    if (response.token && response.nome && response.email) {
      safeLog('Formato da API detectado corretamente', null, false);
      return response as AuthResponse;
    }

    // Se nenhum formato for reconhecido, logar o erro e lançar exceção
    debugError('Formato de resposta não reconhecido', response);
    throw new Error(`Formato de resposta não reconhecido: ${JSON.stringify(response)}`);
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Log detalhado para debug
    safeLog('Resposta completa da API (register):', response, true);

    // Verificar se a resposta tem o formato esperado
    if (response.token && response.nome && response.email) {
      safeLog('Formato da API detectado corretamente', null, false);
      return response as AuthResponse;
    }

    // Se nenhum formato for reconhecido, logar o erro e lançar exceção
    debugError('Formato de resposta não reconhecido', response);
    throw new Error(`Formato de resposta não reconhecido: ${JSON.stringify(response)}`);
  }

  static async makeAuthenticatedRequest<T>(
    endpoint: string,
    token: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export default ApiService;
