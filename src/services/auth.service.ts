import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types';

const USER_KEY = 'user_data';
const ALL_USERS_KEY = 'all_users_data'; // Nova chave para armazenar todos os usuários

interface StoredUser {
  uid: string;
  email: string;
  displayName?: string;
  password?: string; // Adiciona senha para simulação
}

export class AuthService {
  private static async getAllUsers(): Promise<StoredUser[]> {
    const usersData = await AsyncStorage.getItem(ALL_USERS_KEY);
    console.log('Dados de todos os usuários do AsyncStorage:', usersData);
    return usersData ? JSON.parse(usersData) : [];
  }

  private static async saveAllUsers(users: StoredUser[]): Promise<void> {
    await AsyncStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
  }

  static async login(email: string, password: string): Promise<User> {
    const allUsers = await this.getAllUsers();
    console.log('Todos os usuários no login:', allUsers);
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    console.log('Usuário encontrado no login:', foundUser);

    if (!foundUser) {
      throw new Error('Credenciais inválidas.');
    }

    const user: User = {
      uid: foundUser.uid,
      email: foundUser.email,
      displayName: foundUser.displayName,
    };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }

  static async register(name: string, email: string, password: string): Promise<User> {
    const allUsers = await this.getAllUsers();
    const existingUser = allUsers.find(u => u.email === email);

    if (existingUser) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const newUser: StoredUser = {
      uid: 'simulated-uid-' + Date.now(), // UID único
      email: email,
      displayName: name,
      password: password, // Salva a senha para simulação
    };

    allUsers.push(newUser);
    await this.saveAllUsers(allUsers);

    const user: User = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
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
    const loadUser = async () => {
      const user = await this.getCurrentUser();
      callback(user);
    };

    loadUser();
    return () => {};
  }
}