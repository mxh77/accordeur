import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const THRESHOLD_PERFECT = 3;
const THRESHOLD_CLOSE = 10;

/**
 * TuningStatus - Coloured banner indicating tuning accuracy.
 *
 * Props:
 *   cents   {number}  - deviation in cents
 *   active  {boolean} - whether a note is being detected
 */
export default function TuningStatus({ cents = 0, active = false }) {
  if (!active) {
    return (
      <View style={[styles.container, styles.silent]}>
        <Text style={styles.text}>En attente de signal…</Text>
      </View>
    );
  }

  const abs = Math.abs(cents);
  let status, style;

  if (abs <= THRESHOLD_PERFECT) {
    status = 'Juste ✓';
    style = styles.inTune;
  } else if (abs <= THRESHOLD_CLOSE) {
    status = cents < 0 ? 'Légèrement bémol' : 'Légèrement dièse';
    style = styles.close;
  } else {
    status = cents < 0 ? `Bémol  −${abs}¢` : `Dièse  +${abs}¢`;
    style = styles.outOfTune;
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  silent: {
    backgroundColor: '#1f2937',
  },
  inTune: {
    backgroundColor: '#166534',
  },
  close: {
    backgroundColor: '#92400e',
  },
  outOfTune: {
    backgroundColor: '#7f1d1d',
  },
});
