import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  useTheme, 
  Card, 
  Title, 
  List, 
  Switch, 
  Button,
  TextInput,
  Chip
} from 'react-native-paper';
import { useThemeContext } from '@/src/contexts/ThemeContext';
import { useAuth } from '@/src/hooks/useAuth';
import { DEFAULT_BLE_CONFIG } from '@/src/utils/constants';
import type { TopologyType } from '@/src/types';

export default function ConfigScreen() {
  const theme = useTheme();
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const { logout, user } = useAuth();
  
  console.log('ConfigScreen - isDarkTheme:', isDarkTheme);
  console.log('ConfigScreen - theme background:', theme.colors.background);
  
  const [bleConfig, setBleConfig] = useState(DEFAULT_BLE_CONFIG);
  const [defaultTopology, setDefaultTopology] = useState<TopologyType>('A');

  const handleSaveBLEConfig = () => {
    // Salvar configurações no AsyncStorage
    console.log('Salvando configurações BLE:', bleConfig);
  };

  const handleToggleTheme = () => {
    console.log('Switch clicado! Tema atual:', isDarkTheme);
    toggleTheme();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    header: {
      marginBottom: 16,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: 24,
      fontWeight: 'bold',
    },
    card: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 12,
    },
    input: {
      marginBottom: 12,
      backgroundColor: theme.colors.surfaceVariant,
    },
    topologyChips: {
      flexDirection: 'row',
      gap: 8,
      marginVertical: 12,
    },
    logoutButton: {
      backgroundColor: theme.colors.error,
      marginTop: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Configurações</Title>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Tema</Title>
            <List.Item
              title="Tema Escuro"
              description="Alterar entre tema claro e escuro"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={isDarkTheme}
                  onValueChange={handleToggleTheme}
                  thumbColor={isDarkTheme ? theme.colors.primary : theme.colors.outline}
                  trackColor={{ 
                    false: theme.colors.surfaceVariant, 
                    true: theme.colors.primaryContainer 
                  }}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Configurações BLE</Title>
            
            <TextInput
              label="TX Power (dBm)"
              value={String(bleConfig.txPower)}
              onChangeText={(text) => setBleConfig(prev => ({
                ...prev,
                txPower: parseInt(text) || -59
              }))}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Path Loss (n)"
              value={String(bleConfig.pathLoss)}
              onChangeText={(text) => setBleConfig(prev => ({
                ...prev,
                pathLoss: parseFloat(text) || 2.2
              }))}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Sigma (σ)"
              value={String(bleConfig.sigma)}
              onChangeText={(text) => setBleConfig(prev => ({
                ...prev,
                sigma: parseFloat(text) || 2
              }))}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Range Máximo (m)"
              value={String(bleConfig.rangeMax)}
              onChangeText={(text) => setBleConfig(prev => ({
                ...prev,
                rangeMax: parseInt(text) || 20
              }))}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Tick (ms)"
              value={String(bleConfig.tickMs)}
              onChangeText={(text) => setBleConfig(prev => ({
                ...prev,
                tickMs: parseInt(text) || 650
              }))}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Alpha (EMA)"
              value={String(bleConfig.alpha)}
              onChangeText={(text) => setBleConfig(prev => ({
                ...prev,
                alpha: parseFloat(text) || 0.25
              }))}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
            />

            <Button 
              mode="contained" 
              onPress={handleSaveBLEConfig}
              style={{ marginTop: 8 }}
            >
              Salvar Configurações BLE
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Topologia Padrão</Title>
            <View style={styles.topologyChips}>
              {(['A', 'B', 'C'] as TopologyType[]).map((topology) => (
                <Chip
                  key={topology}
                  selected={defaultTopology === topology}
                  onPress={() => setDefaultTopology(topology)}
                  style={{ 
                    backgroundColor: defaultTopology === topology 
                      ? theme.colors.primary 
                      : theme.colors.surfaceVariant 
                  }}
                  textStyle={{ 
                    color: defaultTopology === topology 
                      ? theme.colors.onPrimary 
                      : theme.colors.onSurfaceVariant 
                  }}
                >
                  Topologia {topology}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Conta</Title>
            <List.Item
              title={user?.displayName || "Usuário"}
              description={user?.email}
              left={(props) => <List.Icon {...props} icon="account" />}
            />
            <Button 
              mode="contained" 
              onPress={handleLogout}
              style={styles.logoutButton}
              buttonColor={theme.colors.error}
            >
              Fazer Logout
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}