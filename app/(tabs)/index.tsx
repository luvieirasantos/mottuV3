import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MetricsCard } from '@/src/components/MetricsCard';
import { CostCard } from '@/src/components/CostCard';

export default function HomeScreen() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      color: theme.colors.onBackground,
      fontSize: 28,
      fontWeight: 'bold',
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 16,
      marginTop: 4,
    },
    card: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    cardContent: {
      padding: 20,
    },
    kpiContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    kpiItem: {
      alignItems: 'center',
      minWidth: '30%',
      marginBottom: 16,
    },
    kpiValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    kpiLabel: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Mottu - Pátio Digital</Title>
          <Paragraph style={styles.subtitle}>
            Sistema de trilateração BLE para motos
          </Paragraph>
        </View>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Title style={{ color: theme.colors.onSurface, marginBottom: 16 }}>
              KPIs Principais
            </Title>
            <View style={styles.kpiContainer}>
              <View style={styles.kpiItem}>
                <Title style={styles.kpiValue}>3</Title>
                <Paragraph style={styles.kpiLabel}>Motos Ativas</Paragraph>
              </View>
              <View style={styles.kpiItem}>
                <Title style={styles.kpiValue}>85%</Title>
                <Paragraph style={styles.kpiLabel}>Eficácia Média</Paragraph>
              </View>
              <View style={styles.kpiItem}>
                <Title style={styles.kpiValue}>2.1m</Title>
                <Paragraph style={styles.kpiLabel}>Erro P50</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <MetricsCard />
        <CostCard />
      </ScrollView>
    </SafeAreaView>
  );
}