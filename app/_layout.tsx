import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useThemeScheme } from '@/src/hooks/useThemeScheme';
import { useAuth } from '@/src/hooks/useAuth';
import { paperThemeDark } from '@/src/theme/paperThemeDark';
import { paperThemeLight } from '@/src/theme/paperThemeLight';

const queryClient = new QueryClient();

function AppContent() {
  const { isDarkTheme } = useThemeScheme();
  const { isLoading, isAuthenticated } = useAuth();
  const theme = isDarkTheme ? paperThemeDark : paperThemeLight;

  if (isLoading) {
    return null; // Ou um componente de loading
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <AppContent />
        <StatusBar style="auto" />
      </PaperProvider>
    </QueryClientProvider>
  );
}