import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Card, Title, Chip, Switch, Text } from 'react-native-paper';
import { YardMap } from '@/src/components/YardMap';
import { MotoList } from '@/src/components/MotoList';
import { MetricsCard } from '@/src/components/MetricsCard';
import { CostCard } from '@/src/components/CostCard';
import { useBLESim } from '@/src/hooks/useBLESim';
import { DEFAULT_TOPOLOGIES, DEFAULT_BLE_CONFIG } from '@/src/utils/constants';
import type { TopologyType } from '@/src/types';

export default function MapaScreen() {
  const theme = useTheme();
  const [selectedTopology, setSelectedTopology] = useState<TopologyType>('A');
  const [showGrid, setShowGrid] = useState(true);
  const [showCoverage, setShowCoverage] = useState(false);

  // Motos de exemplo
  const motos = useMemo(() => [
    { id: 'M001', x: 10, y: 15, status: 'ativa' as const },
    { id: 'M002', x: 25, y: 8, status: 'ativa' as const },
    { id: 'M003', x: 32, y: 22, status: 'ativa' as const },
  ], []);

  const currentTopology = DEFAULT_TOPOLOGIES[selectedTopology];
  const { estimatedPositions, rssiReadings, metrics } = useBLESim(
    motos,
    currentTopology.anchors,
    DEFAULT_BLE_CONFIG
  );

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
      marginBottom: 8,
    },
    topologyChips: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
    controls: {
      marginBottom: 16,
    },
    controlRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    mapContainer: {
      marginBottom: 16,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface,
    },
    mapCard: {
      backgroundColor: theme.colors.surface,
      padding: 0,
      margin: 0,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Mapa do Pátio</Title>
          
          <View style={styles.topologyChips}>
            {(['A', 'B', 'C'] as TopologyType[]).map((topology) => (
              <Chip
                key={topology}
                selected={selectedTopology === topology}
                onPress={() => setSelectedTopology(topology)}
                style={{ 
                  backgroundColor: selectedTopology === topology 
                    ? theme.colors.primary 
                    : theme.colors.surfaceVariant 
                }}
                textStyle={{ 
                  color: selectedTopology === topology 
                    ? theme.colors.onPrimary 
                    : theme.colors.onSurfaceVariant 
                }}
              >
                Topologia {topology}
              </Chip>
            ))}
          </View>

          <Card style={styles.controls}>
            <Card.Content>
              <View style={styles.controlRow}>
                <Text>Mostrar Grade</Text>
                <Switch 
                  value={showGrid} 
                  onValueChange={setShowGrid}
                  thumbColor={showGrid ? theme.colors.primary : theme.colors.outline}
                  trackColor={{ 
                    false: theme.colors.surfaceVariant, 
                    true: theme.colors.primaryContainer 
                  }}
                />
              </View>
              <View style={styles.controlRow}>
                <Text>Mostrar Cobertura BLE</Text>
                <Switch 
                  value={showCoverage} 
                  onValueChange={setShowCoverage}
                  thumbColor={showCoverage ? theme.colors.primary : theme.colors.outline}
                  trackColor={{ 
                    false: theme.colors.surfaceVariant, 
                    true: theme.colors.primaryContainer 
                  }}
                />
              </View>
            </Card.Content>
          </Card>
        </View>

        <Card style={styles.mapCard}>
          <YardMap
            motos={motos}
            estimatedPositions={estimatedPositions}
            anchors={currentTopology.anchors}
            showGrid={showGrid}
            showCoverage={showCoverage}
            yardWidth={DEFAULT_BLE_CONFIG.yardWidth}
            yardHeight={DEFAULT_BLE_CONFIG.yardHeight}
            onMotoPress={(moto) => {
              console.log('Moto pressionada:', moto);
            }}
          />
        </Card>

        <MotoList 
          motos={motos}
          estimatedPositions={estimatedPositions}
          rssiReadings={rssiReadings}
        />

        <MetricsCard metrics={metrics} />
        <CostCard cost={metrics.totalCost} />
      </ScrollView>
    </SafeAreaView>
  );
}