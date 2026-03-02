import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

/**
 * TuningCard - Displays a guitar tuning with its string notes.
 *
 * Props:
 *   tuning      {object}  - { name, description, strings: string[] }
 *   selected    {boolean} - whether this tuning is active
 *   onSelect    {fn}      - called when the card is pressed
 */
export default function TuningCard({ tuning, selected = false, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
      onPress={() => onSelect?.(tuning)}
    >
      <View style={styles.header}>
        <Text style={[styles.name, selected && styles.nameSelected]}>
          {tuning.name}
        </Text>
        {selected && <Text style={styles.badge}>Actif</Text>}
      </View>

      {tuning.description ? (
        <Text style={styles.description}>{tuning.description}</Text>
      ) : null}

      <View style={styles.strings}>
        {tuning.strings.map((note, i) => (
          <View key={i} style={styles.stringChip}>
            <Text style={styles.stringNote}>{note}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#4ade80',
    backgroundColor: '#052e16',
  },
  pressed: {
    opacity: 0.75,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#e5e7eb',
    flex: 1,
  },
  nameSelected: {
    color: '#4ade80',
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4ade80',
    backgroundColor: '#14532d',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 10,
  },
  strings: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 8,
  },
  stringChip: {
    backgroundColor: '#374151',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stringNote: {
    fontSize: 14,
    fontWeight: '500',
    color: '#d1d5db',
  },
});
