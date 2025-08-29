import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { useThemeScheme } from '@/src/hooks/useThemeScheme';
import { paperThemeDark } from '@/src/theme/paperThemeDark';
import { paperThemeLight } from '@/src/theme/paperThemeLight';

export default function AuthLayout() {
  const { isDarkTheme } = useThemeScheme();
  const theme = isDarkTheme ? paperThemeDark : paperThemeLight;

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
      </Stack>
    </PaperProvider>
  );
}