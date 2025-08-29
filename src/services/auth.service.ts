import { auth } from './firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import type { User } from '../types';

export class AuthService {
  static async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return this.mapFirebaseUser(userCredential.user);
  }

  static async register(name: string, email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return this.mapFirebaseUser(userCredential.user);
  }

  static async logout(): Promise<void> {
    await signOut(auth);
  }

  static onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, (firebaseUser) => {
      callback(firebaseUser ? this.mapFirebaseUser(firebaseUser) : null);
    });
  }

  private static mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || undefined,
    };
  }
}