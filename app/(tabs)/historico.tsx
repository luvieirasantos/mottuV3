import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  useTheme, 
  Card, 
  Title, 
  Button, 
  List, 
  IconButton, 
  FAB,
  Portal,
  Modal,
  Chip
} from 'react-native-paper';
import { MotoForm } from '@/src/components/MotoForm';
import { ZonePicker } from '@/src/components/ZonePicker';
import { TrilatereacaoService } from '@/src/utils/trilateracao';
import type { Moto } from '@/src/types';

export default function HistoricoScreen() {
  const theme = useTheme();
  const [motos, setMotos] = useState<Moto[]>([
    { id: 'M001', x: 10, y: 15, status: 'ativa' },
    { id: 'M002', x: 25, y: 8, status: 'ativa' },
    { id: 'M003', x: 32, y: 22, status: 'ativa' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [showZonePicker, setShowZonePicker] = useState(false);
  const [editingMoto, setEditingMoto] = useState<Moto | null>(null);

  const handleAddMoto = (data: Omit<Moto, 'id'>) => {
    const newMoto: Moto = {
      ...data,
      id: `M${String(Date.now()).slice(-3)}`,
    };
    setMotos(prev => [...prev, newMoto]);
    setShowForm(false);
  };

  const handleEditMoto = (data: Omit<Moto, 'id'>) => {
    if (!editingMoto) return;
    
    setMotos(prev => 
      prev.map(moto => 
        moto.id === editingMoto.id 
          ? { ...data, id: editingMoto.id }
          : moto
      )
    );
    setEditingMoto(null);
    setShowForm(false);
  };

  const handleMoveMoto = (moto: Moto) => {
    // Aplicar jitter (movimento aleatório) limitado ao pátio
    const jitterX = (Math.random() - 0.5) * 4; // ±2m
    const jitterY = (Math.random() - 0.5) * 4; // ±2m
    
    const newX = Math.max(0, Math.min(40, moto.x + jitterX));
    const newY = Math.max(0, Math.min(30, moto.y + jitterY));

    setMotos(prev =>
      prev.map(m => 
        m.id === moto.id 
          ? { ...m, x: newX, y: newY }
          : m
      )
    );
  };

  const handleRemoveMoto = (moto: Moto) => {
    Alert.alert(
      'Remover Moto',
      `Tem certeza que deseja remover a moto ${moto.id}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Remover', 
          style: 'destructive',
          onPress: () => {
            setMotos(prev => prev.filter(m => m.id !== moto.id));
          }
        }
      ]
    );
  };

  const handleZoneSelection = (zone: string) => {
    // Converter zona para coordenadas
    const col = zone.includes('1') ? 0 : 1;
    const row = zone.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
    
    const x = col * 20 + Math.random() * 20; // 0-20 ou 20-40
    const y = row * 7.5 + Math.random() * 7.5; // 0-7.5, 7.5-15, etc.

    const newMoto: Moto = {
      id: `M${String(Date.now()).slice(-3)}`,
      x: Math.max(0, Math.min(40, x)),
      y: Math.max(0, Math.min(30, y)),
      status: 'ativa',
    };

    setMotos(prev => [...prev, newMoto]);
    setShowZonePicker(false);
  };

  const getZone = (x: number, y: number) => {
    return TrilatereacaoService.getZone(x, y, 40, 30);
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
    listItem: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    statusChip: {
      marginTop: 4,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.primary,
    },
    modal: {
      backgroundColor: theme.colors.background,
      padding: 20,
      margin: 20,
      borderRadius: 8,
    },
    modalHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.onBackground,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Histórico de Motos</Title>
          <Button 
            mode="outlined" 
            onPress={() => setShowZonePicker(true)}
            style={{ marginTop: 8 }}
          >
            Adicionar por Zona
          </Button>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            {motos.map((moto) => (
              <List.Item
                key={moto.id}
                title={moto.id}
                description={`Zona ${getZone(moto.x, moto.y)} - (${moto.x.toFixed(1)}m, ${moto.y.toFixed(1)}m)`}
                style={styles.listItem}
                left={(props) => <List.Icon {...props} icon="motorcycle" />}
                right={() => (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    >
                      {moto.status}
                    </Chip>
                    <IconButton
                      icon="shuffle-variant"
                      onPress={() => handleMoveMoto(moto)}
                    />
                    <IconButton
                      icon="pencil"
                      onPress={() => {
                        setEditingMoto(moto);
                        setShowForm(true);
                      }}
                    />
                    <IconButton
                      icon="delete"
                      onPress={() => handleRemoveMoto(moto)}
                    />
                  </View>
                )}
              />
            ))}
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowForm(true)}
      />

      <Portal>
        <Modal
          visible={showForm}
          onDismiss={() => {
            setShowForm(false);
            setEditingMoto(null);
          }}
          contentContainerStyle={styles.modal}
        >
          <Title style={styles.modalHeader}>
            {editingMoto ? 'Editar Moto' : 'Nova Moto'}
          </Title>
          <MotoForm
            initialData={editingMoto}
            onSubmit={editingMoto ? handleEditMoto : handleAddMoto}
            onCancel={() => {
              setShowForm(false);
              setEditingMoto(null);
            }}
          />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={showZonePicker}
          onDismiss={() => setShowZonePicker(false)}
          contentContainerStyle={styles.modal}
        >
          <Title style={styles.modalHeader}>Escolher Zona</Title>
          <ZonePicker
            onZoneSelect={handleZoneSelection}
            onCancel={() => setShowZonePicker(false)}
          />
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}