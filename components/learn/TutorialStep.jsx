import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * TutorialStep - One step in a how-to tutorial.
 *
 * Props:
 *   step    {number} - step number (1-based)
 *   title   {string}
 *   body    {string}
 *   done    {boolean}
 */
export default function TutorialStep({ step, title, body, done = false }) {
  return (
    <View style={styles.row}>
      <View style={[styles.badge, done && styles.badgeDone]}>
        <Text style={styles.badgeText}>{done ? '✓' : step}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, done && styles.titleDone]}>{title}</Text>
        {body ? <Text style={styles.body}>{body}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  badgeDone: {
    backgroundColor: '#166534',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 2,
  },
  titleDone: {
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  body: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 19,
  },
});
