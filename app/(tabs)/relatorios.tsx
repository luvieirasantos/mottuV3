import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card, Title, Paragraph, DataTable } from 'react-native-paper';

export default function RelatoriosScreen() {
  const theme = useTheme();

  const reportData = [
    { id: 'M001', zona: 'A1', precisao: '2.1m', status: 'Ativa' },
    { id: 'M002', zona: 'B2', precisao: '1.8m', status: 'Ativa' },
    { id: 'M003', zona: 'C1', precisao: '3.2m', status: 'Ativa' },
  ];

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
    cardTitle: {
      color: theme.colors.onSurface,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
    },
    metricsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginVertical: 16,
    },
    metricItem: {
      alignItems: 'center',
      minWidth: '30%',
      marginBottom: 12,
    },
    metricValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    metricLabel: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      marginTop: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Relatórios</Title>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Resumo Geral</Title>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Paragraph style={styles.metricValue}>3</Paragraph>
                <Paragraph style={styles.metricLabel}>Motos Ativas</Paragraph>
              </View>
              <View style={styles.metricItem}>
                <Paragraph style={styles.metricValue}>2.1m</Paragraph>
                <Paragraph style={styles.metricLabel}>P50 Geral</Paragraph>
              </View>
              <View style={styles.metricItem}>
                <Paragraph style={styles.metricValue}>4.2m</Paragraph>
                <Paragraph style={styles.metricLabel}>P90 Geral</Paragraph>
              </View>
              <View style={styles.metricItem}>
                <Paragraph style={styles.metricValue}>85%</Paragraph>
                <Paragraph style={styles.metricLabel}>Eficácia</Paragraph>
              </View>
              <View style={styles.metricItem}>
                <Paragraph style={styles.metricValue}>R$ 1.160</Paragraph>
                <Paragraph style={styles.metricLabel}>Custo Total</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Detalhes por Moto</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>Zona</DataTable.Title>
                <DataTable.Title>Precisão</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
              </DataTable.Header>

              {reportData.map((row) => (
                <DataTable.Row key={row.id}>
                  <DataTable.Cell>{row.id}</DataTable.Cell>
                  <DataTable.Cell>{row.zona}</DataTable.Cell>
                  <DataTable.Cell>{row.precisao}</DataTable.Cell>
                  <DataTable.Cell>{row.status}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Análise por Topologia</Title>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Topologia</DataTable.Title>
                <DataTable.Title>P50</DataTable.Title>
                <DataTable.Title>P90</DataTable.Title>
                <DataTable.Title>Custo</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>A (3 âncoras)</DataTable.Cell>
                <DataTable.Cell>2.8m</DataTable.Cell>
                <DataTable.Cell>5.1m</DataTable.Cell>
                <DataTable.Cell>R$ 1.160</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>B (5 âncoras)</DataTable.Cell>
                <DataTable.Cell>2.1m</DataTable.Cell>
                <DataTable.Cell>4.2m</DataTable.Cell>
                <DataTable.Cell>R$ 1.520</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>C (5 âncoras)</DataTable.Cell>
                <DataTable.Cell>1.9m</DataTable.Cell>
                <DataTable.Cell>3.8m</DataTable.Cell>
                <DataTable.Cell>R$ 1.520</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}