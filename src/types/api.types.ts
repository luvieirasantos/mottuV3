// Tipos para as requisições de autenticação
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

// Tipos para as respostas da API
export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
  token?: string;
}

// Resposta real da API de login
export interface AuthResponse {
  token: string;
  tipo: string;
  nome: string;
  email: string;
  perfil: string;
}

// Tipos para erros da API
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Tipos para requisições autenticadas
export interface AuthenticatedRequestOptions extends RequestInit {
  requiresAuth?: boolean;
}
