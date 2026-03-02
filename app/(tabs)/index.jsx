import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

import NeedleDisplay from '../../components/tuner/NeedleDisplay';
import NoteDisplay from '../../components/tuner/NoteDisplay';
import FrequencyDisplay from '../../components/tuner/FrequencyDisplay';
import TuningStatus from '../../components/tuner/TuningStatus';
import StringVisualizer from '../../components/tunings/StringVisualizer';
import usePitchDetector from '../../hooks/usePitchDetector';
import { TUNINGS } from '../../constants/tunings';

export default function TunerScreen() {
  const { pitch, active, start, stop } = usePitchDetector();
  const [selectedTuning] = useState(TUNINGS[0]);

  const handleToggle = () => (active ? stop() : start());

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      bounces={false}
    >
      <Text style={styles.tuningLabel}>{selectedTuning.name}</Text>

      {/* Note name */}
      <NoteDisplay note={pitch.note} octave={pitch.octave} />

      {/* Needle */}
      <NeedleDisplay cents={pitch.cents} />

      {/* Frequency */}
      <FrequencyDisplay frequency={pitch.frequency} />

      {/* Status */}
      <View style={styles.statusRow}>
        <TuningStatus cents={pitch.cents} active={active && pitch.note !== '--'} />
      </View>

      {/* String visualizer */}
      <StringVisualizer
        strings={selectedTuning.strings}
        activeString={null}
        cents={pitch.cents}
      />

      {/* Mic toggle */}
      <Pressable
        style={({ pressed }) => [styles.btn, active && styles.btnActive, pressed && styles.btnPressed]}
        onPress={handleToggle}
      >
        <Text style={styles.btnText}>{active ? '⏹  Arrêter' : '🎤  Démarrer'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    gap: 16,
  },
  tuningLabel: {
    fontSize: 13,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '600',
  },
  statusRow: {
    marginVertical: 4,
  },
  btn: {
    marginTop: 24,
    backgroundColor: '#1e3a5f',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#3b82f6',
  },
  btnActive: {
    backgroundColor: '#4c1d1d',
    borderColor: '#ef4444',
  },
  btnPressed: {
    opacity: 0.7,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
