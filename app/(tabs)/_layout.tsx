import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { useThemeScheme } from '@/src/hooks/useThemeScheme';
import { paperThemeDark } from '@/src/theme/paperThemeDark';
import { paperThemeLight } from '@/src/theme/paperThemeLight';

export default function TabLayout() {
  const { isDarkTheme } = useThemeScheme();
  const theme = isDarkTheme ? paperThemeDark : paperThemeLight;

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mapa"
          options={{
            title: 'Mapa',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="historico"
          options={{
            title: 'Histórico',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="relatorios"
          options={{
            title: 'Relatórios',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="analytics" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: 'Config',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}