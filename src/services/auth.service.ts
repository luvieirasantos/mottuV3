import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types';

const USER_KEY = 'user_data';

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    // Simula um login bem-sucedido
    const user: User = {
      uid: 'simulated-uid-' + email,
      email: email,
      displayName: email.split('@')[0],
    };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }

  static async register(name: string, email: string, password: string): Promise<User> {
    // Simula um cadastro bem-sucedido
    const user: User = {
      uid: 'simulated-uid-' + email,
      email: email,
      displayName: name,
    };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }

  static async logout(): Promise<void> {
    await AsyncStorage.removeItem(USER_KEY);
  }

  static async getCurrentUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static onAuthStateChanged(callback: (user: User | null) => void) {
    // Simula o comportamento de onAuthStateChanged lendo do AsyncStorage
    const loadUser = async () => {
      const user = await this.getCurrentUser();
      callback(user);
    };

    loadUser();

    // Retorna uma função de "unsubscribe" vazia, já que não há um listener real
    return () => {};
  }
}