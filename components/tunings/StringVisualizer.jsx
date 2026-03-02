import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';

/**
 * StringVisualizer - Horizontal guitar-neck view showing each string's
 * target note and how close the current pitch is.
 *
 * Props:
 *   strings      {string[]}       - target notes, e.g. ["E2","A2","D3","G3","B3","E4"]
 *   activeString {number|null}    - index of the string currently ringing
 *   cents        {number}         - tuning deviation for the active string
 */
export default function StringVisualizer({ strings = [], activeString = null, cents = 0 }) {
  const W = 320;
  const stringSpacing = W / (strings.length + 1);

  const colorForString = (i) => {
    if (i !== activeString) return '#374151';
    if (Math.abs(cents) <= 5) return '#4ade80';
    if (Math.abs(cents) <= 15) return '#fbbf24';
    return '#f87171';
  };

  return (
    <View style={styles.container}>
      <Svg width={W} height={80}>
        {/* Fret line */}
        <Line x1={0} y1={40} x2={W} y2={40} stroke="#4b5563" strokeWidth={1} />

        {strings.map((note, i) => {
          const x = stringSpacing * (i + 1);
          const color = colorForString(i);
          const isActive = i === activeString;

          return (
            <React.Fragment key={i}>
              {/* String line */}
              <Line
                x1={x} y1={8}
                x2={x} y2={64}
                stroke={color}
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              {/* Note label */}
              <SvgText
                x={x} y={76}
                fill={color}
                fontSize={isActive ? '13' : '11'}
                fontWeight={isActive ? 'bold' : 'normal'}
                textAnchor="middle"
              >
                {note}
              </SvgText>
              {/* Active indicator dot */}
              {isActive && (
                <Circle cx={x} cy={40} r={5} fill={color} />
              )}
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
    paddingVertical: 8,
  },
});
