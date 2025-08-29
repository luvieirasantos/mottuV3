import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, List, Chip, useTheme } from 'react-native-paper';
import { TrilatereacaoService } from '../utils/trilateracao';
import type { Moto, Position, RSSIReading } from '../types';

interface MotoListProps {
  motos: Moto[];
  estimatedPositions: Map<string, Position>;
  rssiReadings: Map<string, RSSIReading[]>;
}

export const MotoList: React.FC<MotoListProps> = ({
  motos,
  estimatedPositions,
  rssiReadings,
}) => {
  const theme = useTheme();

  const getError = (moto: Moto): number => {
    const estimated = estimatedPositions.get(moto.id);
    if (!estimated) return 0;
    return TrilatereacaoService.calculateError(moto, estimated);
  };

  const getZone = (x: number, y: number): string => {
    return TrilatereacaoService.getZone(x, y, 40, 30);
  };

  const styles = StyleSheet.create({
    card: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 12,
    },
    listItem: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
      paddingVertical: 8,
    },
    statusChip: {
      marginTop: 4,
    },
    errorChip: {
      marginTop: 4,
      marginLeft: 8,
    },
    description: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  });

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Title style={styles.title}>Motos Monitoradas</Title>
        {motos.map((moto) => {
          const error = getError(moto);
          const zone = getZone(moto.x, moto.y);
          const readings = rssiReadings.get(moto.id) || [];

          return (
            <List.Item
              key={moto.id}
              title={moto.id}
              description={() => (
                <View style={styles.description}>
                  <Chip 
                    style={[
                      styles.statusChip,
                      { 
                        backgroundColor: moto.status === 'ativa' 
                          ? theme.colors.primary 
                          : theme.colors.surfaceVariant 
                      }
                    ]}
                    textStyle={{ 
                      color: moto.status === 'ativa' 
                        ? theme.colors.onPrimary 
                        : theme.colors.onSurfaceVariant 
                    }}
                    compact
                  >
                    {moto.status}
                  </Chip>
                  <Chip 
                    style={[
                      styles.errorChip,
                      { 
                        backgroundColor: error <= 2 
                          ? theme.colors.primary 
                          : error <= 5 
                            ? theme.colors.secondary 
                            : theme.colors.error
                      }
                    ]}
                    textStyle={{ 
                      color: error <= 2 
                        ? theme.colors.onPrimary 
                        : error <= 5 
                          ? theme.colors.onSecondary 
                          : theme.colors.onError
                    }}
                    compact
                  >
                    Erro: {error.toFixed(1)}m
                  </Chip>
                </View>
              )}
              style={styles.listItem}
              left={(props) => <List.Icon {...props} icon="motorcycle" />}
              onPress={() => {
                console.log('Moto:', moto.id);
                console.log('Zona:', zone);
                console.log('RSSIs:', readings);
                console.log('Erro:', error);
              }}
            />
          );
        })}
      </View>
    </Card>
  );
};