import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Text as SvgText, Rect } from 'react-native-svg';

const STANDARD_STRINGS = [
  { name: 'E', gauge: 'grave', number: 6 },
  { name: 'A', gauge: 'grave', number: 5 },
  { name: 'D', gauge: 'médium', number: 4 },
  { name: 'G', gauge: 'médium', number: 3 },
  { name: 'B', gauge: 'aigu', number: 2 },
  { name: 'e', gauge: 'aigu', number: 1 },
];

/**
 * StringDiagram - Illustrative guitar-string diagram for the Learn screen.
 * Shows each string numbered from 1 (thinnest) to 6 (thickest) with its note.
 *
 * Props:
 *   strings   {array}  - override default string defs
 *   highlight {number} - string number (1-6) to highlight
 */
export default function StringDiagram({ strings = STANDARD_STRINGS, highlight = null }) {
  const W = 300;
  const H = strings.length * 36 + 20;
  const labelX = 28;
  const lineStart = 50;
  const lineEnd = W - 10;
  const noteX = W - 4;

  const gaugeToStroke = (gauge) => {
    switch (gauge) {
      case 'grave': return 4;
      case 'médium': return 2.5;
      default: return 1.5;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cordes de guitare</Text>
      <Svg width={W} height={H}>
        {strings.map((s, i) => {
          const y = 18 + i * 36;
          const isHl = highlight === s.number;
          const color = isHl ? '#4ade80' : '#6b7280';
          const stroke = gaugeToStroke(s.gauge);

          return (
            <React.Fragment key={s.number}>
              {/* String number */}
              <SvgText x={labelX - 8} y={y + 5} fill={color} fontSize="13" fontWeight="bold" textAnchor="end">
                {s.number}
              </SvgText>
              {/* String line */}
              <Line
                x1={lineStart} y1={y}
                x2={lineEnd} y2={y}
                stroke={color}
                strokeWidth={stroke}
              />
              {/* Note label */}
              <SvgText x={noteX} y={y + 5} fill={color} fontSize="14" fontWeight={isHl ? 'bold' : 'normal'} textAnchor="end">
                {s.name}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
  },
  heading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
