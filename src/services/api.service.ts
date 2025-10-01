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

    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        // Se a resposta for um erro, o corpo pode não ser JSON.
        // Leia como texto para evitar o SyntaxError.
        const errorBody = await response.text();
        throw new Error(errorBody || `Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      debugResponse(response.status, data);
      return data;
    } catch (error) {
      console.error('--- ERRO DETALHADO DO FETCH ---');
      console.error('URL da tentativa:', url);
      console.error('Objeto de erro:', error);
      console.error('---------------------------------');
      
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

    // Verificar se os dados estão em response.data (formato novo) ou diretamente em response (formato antigo)
    let authData = response.data;
    if (!authData && (response as any).token && (response as any).nome && (response as any).email) {
      authData = response as any;
    }

    // Verificar se a resposta tem o formato esperado
    if (authData && authData.token && authData.nome && authData.email) {
      safeLog('Formato da API detectado corretamente', null, false);
      safeLog('authData.token:', authData.token, true);
      safeLog('authData.nome:', authData.nome, true);
      safeLog('authData.email:', authData.email, true);
      safeLog('authData.perfil:', authData.perfil, true);
      return authData;
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

    // Verificar se os dados estão em response.data (formato novo) ou diretamente em response (formato antigo)
    let authData = response.data;
    if (!authData && (response as any).token && (response as any).nome && (response as any).email) {
      authData = response as any;
    }

    // Verificar se a resposta tem o formato esperado
    if (authData && authData.token && authData.nome && authData.email) {
      safeLog('Formato da API detectado corretamente', null, false);
      return authData;
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
