import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * NoteDisplay - Shows the detected note name and octave.
 *
 * Props:
 *   note    {string}  - e.g. "A", "C#", "--"
 *   octave  {number}  - e.g. 4
 */
export default function NoteDisplay({ note = '--', octave = null }) {
  const hasNote = note !== '--' && note !== '';

  return (
    <View style={styles.container}>
      <Text style={[styles.note, !hasNote && styles.inactive]}>
        {note}
        {hasNote && octave !== null && (
          <Text style={styles.octave}>{octave}</Text>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  note: {
    fontSize: 80,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -2,
  },
  octave: {
    fontSize: 36,
    fontWeight: '400',
    color: '#9ca3af',
    lineHeight: 80,
  },
  inactive: {
    color: '#374151',
  },
});
