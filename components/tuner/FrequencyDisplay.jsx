import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * FrequencyDisplay - Shows the detected frequency in Hz.
 *
 * Design choices to avoid UI freezes:
 *  - Accepts a pre-computed `frequency` prop; no audio processing here.
 *  - Uses a local ref to throttle display updates to 10 Hz (every 100 ms)
 *    so rapid audio callbacks don't cause excessive re-renders.
 *
 * Props:
 *   frequency {number|null} - frequency in Hz, or null when silent
 */
export default function FrequencyDisplay({ frequency = null }) {
  const [displayHz, setDisplayHz] = React.useState(null);
  const lastUpdateRef = useRef(0);
  const pendingRef = useRef(null);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastUpdateRef.current;

    if (elapsed >= 100) {
      // Enough time has passed — update immediately
      lastUpdateRef.current = now;
      setDisplayHz(frequency);
    } else {
      // Schedule a deferred update so we don't skip the last value
      clearTimeout(pendingRef.current);
      pendingRef.current = setTimeout(() => {
        lastUpdateRef.current = Date.now();
        setDisplayHz(frequency);
      }, 100 - elapsed);
    }

    return () => clearTimeout(pendingRef.current);
  }, [frequency]);

  const hasFreq = displayHz !== null && displayHz > 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.value, !hasFreq && styles.inactive]}>
        {hasFreq ? displayHz.toFixed(1) : '---'}
      </Text>
      <Text style={styles.unit}>Hz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: '300',
    color: '#e5e7eb',
    fontVariant: ['tabular-nums'],
  },
  inactive: {
    color: '#374151',
  },
  unit: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '400',
  },
});
