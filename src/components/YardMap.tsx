import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import Svg, { 
  Rect, 
  Circle, 
  Text as SvgText, 
  G, 
  ClipPath, 
  Defs, 
  Line 
} from 'react-native-svg';
import type { Moto, Anchor, Position } from '../types';

interface YardMapProps {
  width: number;
  height: number;
  motos: Moto[];
  estimatedPositions: Map<string, Position>;
  anchors: Anchor[];
  showGrid?: boolean;
  showCoverage?: boolean;
  yardWidth: number;
  yardHeight: number;
  onMotoPress?: (moto: Moto) => void;
}

export const YardMap: React.FC<YardMapProps> = ({
  width,
  height,
  motos,
  estimatedPositions,
  anchors,
  showGrid = false,
  showCoverage = false,
  yardWidth,
  yardHeight,
  onMotoPress,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      overflow: 'hidden',
    },
    legend: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      backgroundColor: theme.colors.surfaceVariant,
      padding: 8,
      borderRadius: 4,
      minWidth: 120,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 2,
    },
    legendDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 8,
    },
    legendText: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
    },
  });

  const renderGrid = () => {
    if (!showGrid) return null;

    const lines: React.JSX.Element[] = [];
    const zoneWidth = yardWidth / 2;
    const zoneHeight = yardHeight / 4;

    // Linhas verticais
    for (let i = 1; i < 2; i++) {
      const x = i * zoneWidth;
      lines.push(
        <Line
          key={`v-${i}`}
          x1={x}
          y1={0}
          x2={x}
          y2={yardHeight}
          stroke={theme.colors.outline}
          strokeWidth="0.1"
          opacity={0.5}
        />
      );
    }

    // Linhas horizontais
    for (let i = 1; i < 4; i++) {
      const y = i * zoneHeight;
      lines.push(
        <Line
          key={`h-${i}`}
          x1={0}
          y1={y}
          x2={yardWidth}
          y2={y}
          stroke={theme.colors.outline}
          strokeWidth="0.1"
          opacity={0.5}
        />
      );
    }

    // Labels das zonas
    const labels = [];
    const zones = ['A', 'B', 'C', 'D'];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 2; col++) {
        const x = (col * zoneWidth + zoneWidth / 2);
        const y = (row * zoneHeight + zoneHeight / 2);
        labels.push(
          <SvgText
            key={`${zones[row]}${col + 1}`}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize="1"
            fill={theme.colors.onSurfaceVariant}
            opacity={0.7}
          >
            {zones[row]}{col + 1}
          </SvgText>
        );
      }
    }

    return [...lines, ...labels];
  };

  const renderCoverage = () => {
    if (!showCoverage) return null;

    const coverage: React.JSX.Element[] = [];
    anchors.forEach((anchor, index) => {
      for (let range = 5; range <= 20; range += 5) {
        coverage.push(
          <Circle
            key={`coverage-${index}-${range}`}
            cx={anchor.x}
            cy={anchor.y}
            r={range}
            fill="rgba(0, 200, 81, 0.08)"
            stroke="#1e2823"
            strokeWidth="0.05"
            clipPath="url(#yardClip)"
          />
        );
      }
    });

    return coverage;
  };

  const renderAnchors = () => {
    return anchors.map((anchor, index) => (
      <G key={anchor.id}>
        <Rect
          x={anchor.x - 0.6}
          y={anchor.y - 0.6}
          width="1.2"
          height="1.2"
          fill="#FF5C5C"
          rx="0.2"
        />
        <SvgText
          x={anchor.x}
          y={anchor.y - 1}
          textAnchor="middle"
          fontSize="1"
          fill={theme.colors.onSurface}
          fontWeight="bold"
        >
          {anchor.id}
        </SvgText>
      </G>
    ));
  };

  const renderMotos = () => {
    const elements: React.JSX.Element[] = [];

    motos.forEach((moto) => {
      // Moto real (verde)
      elements.push(
        <Circle
          key={`real-${moto.id}`}
          cx={moto.x}
          cy={moto.y}
          r="0.6"
          fill="#00C851"
          onPress={() => onMotoPress?.(moto)}
        />
      );

      // Moto estimada (amarelo)
      const estimated = estimatedPositions.get(moto.id);
      if (estimated) {
        elements.push(
          <Circle
            key={`estimated-${moto.id}`}
            cx={estimated.x}
            cy={estimated.y}
            r="0.6"
            fill="#FFD166"
            opacity={0.8}
          />
        );
      }

      // Label da moto
      elements.push(
        <SvgText
          key={`label-${moto.id}`}
          x={moto.x}
          y={moto.y - 1.2}
          textAnchor="middle"
          fontSize="1"
          fill={theme.colors.onSurface}
          fontWeight="bold"
        >
          {moto.id}
        </SvgText>
      );
    });

    return elements;
  };

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${yardWidth} ${yardHeight}`}>
        <Defs>
          <ClipPath id="yardClip">
            <Rect x="0" y="0" width={yardWidth} height={yardHeight} />
          </ClipPath>
        </Defs>

        <G clipPath="url(#yardClip)">
          {/* Fundo do pátio */}
          <Rect
            x="0"
            y="0"
            width={yardWidth}
            height={yardHeight}
            fill={theme.colors.surfaceVariant}
            stroke={theme.colors.outline}
            strokeWidth="0.2"
          />

          {/* Grade de zonas */}
          {renderGrid()}

          {/* Cobertura BLE */}
          {renderCoverage()}

          {/* Âncoras */}
          {renderAnchors()}

          {/* Motos */}
          {renderMotos()}
        </G>
      </Svg>

      {/* Legenda */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#00C851' }]} />
          <Text style={styles.legendText}>Real</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFD166' }]} />
          <Text style={styles.legendText}>Estimado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF5C5C', borderRadius: 0 }]} />
          <Text style={styles.legendText}>Âncora</Text>
        </View>
      </View>
    </View>
  );
};