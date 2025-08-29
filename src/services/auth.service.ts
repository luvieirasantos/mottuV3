import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from './api.service';
import type { User } from '../types';

const USER_KEY = 'user_data';
const TOKEN_KEY = 'auth_token';

interface StoredUser {
  uid: string;
  email: string;
  displayName?: string;
}

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    try {
      const authResponse = await ApiService.login({ email, senha: password });
      
      const user: User = {
        uid: authResponse.email, // Usando email como UID temporariamente
        email: authResponse.email,
        displayName: authResponse.nome,
      };

      // Salvar usuário e token no AsyncStorage
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      await AsyncStorage.setItem(TOKEN_KEY, authResponse.token);

      return user;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  static async register(name: string, email: string, password: string): Promise<User> {
    try {
      const authResponse = await ApiService.register({ 
        nome: name, 
        email, 
        senha: password 
      });
      
      const user: User = {
        uid: authResponse.email, // Usando email como UID temporariamente
        email: authResponse.email,
        displayName: authResponse.nome,
      };

      // Salvar usuário e token no AsyncStorage
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      await AsyncStorage.setItem(TOKEN_KEY, authResponse.token);

      return user;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(TOKEN_KEY);
  }

  static async getCurrentUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  }

  static async isTokenValid(): Promise<boolean> {
    const token = await this.getAuthToken();
    if (!token) return false;

    // Verificar se o token não expirou (2 meses = 5184000000 ms)
    try {
      // Aqui você pode implementar uma verificação mais robusta do token
      // Por enquanto, vamos apenas verificar se existe
      return true;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return false;
    }
  }

  static onAuthStateChanged(callback: (user: User | null) => void) {
    const loadUser = async () => {
      const currentUser = await this.getCurrentUser();
      const isTokenValid = await this.isTokenValid();
      
      if (currentUser && isTokenValid) {
        callback(currentUser);
      } else {
        // Se o token não for válido, fazer logout
        if (currentUser) {
          await this.logout();
        }
        callback(null);
      }
    };

    loadUser();
    return () => {};
  }
}