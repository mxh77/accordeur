import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import TuningCard from '../../components/tunings/TuningCard';
import StringVisualizer from '../../components/tunings/StringVisualizer';
import { TUNINGS } from '../../constants/tunings';

export default function TuningsScreen() {
  const [selected, setSelected] = useState(TUNINGS[0]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Accordages</Text>
      <Text style={styles.subtitle}>Choisissez un accordage pour l'accordeur</Text>

      <View style={styles.preview}>
        <StringVisualizer strings={selected.strings} activeString={null} cents={0} />
      </View>

      {TUNINGS.map((t) => (
        <TuningCard
          key={t.id}
          tuning={t}
          selected={selected.id === t.id}
          onSelect={setSelected}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  preview: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
});
