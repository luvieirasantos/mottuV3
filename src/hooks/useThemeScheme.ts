import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'theme_scheme';

export const useThemeScheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme !== null) {
        setIsDarkTheme(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkTheme;
      setIsDarkTheme(newTheme);
      await AsyncStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  return { isDarkTheme, toggleTheme, isLoading };
};