import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import TutorialStep from '../../components/learn/TutorialStep';
import StringDiagram from '../../components/learn/StringDiagram';

const STEPS = [
  {
    title: 'Positionner votre guitare',
    body: 'Tenez la guitare confortablement. La table d\'harmonie face à vous, le manche vers la gauche.',
  },
  {
    title: 'Ouvrir l\'accordeur',
    body: 'Allez sur l\'onglet "Accordeur" et appuyez sur "Démarrer" pour activer le microphone.',
  },
  {
    title: 'Jouer une corde',
    body: 'Pincez une corde à vide (sans appuyer sur une case) et regardez l\'aiguille.',
  },
  {
    title: 'Lire l\'aiguille',
    body: 'Si l\'aiguille est à gauche → corde trop bémol, serrez la cheville. À droite → trop dièse, desserrez.',
  },
  {
    title: 'Répéter pour chaque corde',
    body: 'Accordez les 6 cordes dans l\'ordre : E grave (6) → A (5) → D (4) → G (3) → B (2) → e aiguë (1).',
  },
];

export default function LearnScreen() {
  const [doneSteps, setDoneSteps] = useState(new Set());

  const toggleStep = (i) => {
    setDoneSteps((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Apprendre à s'accorder</Text>
      <Text style={styles.subtitle}>Guide pas à pas pour débutants</Text>

      <StringDiagram />

      <Text style={styles.sectionTitle}>Comment s'accorder</Text>

      {STEPS.map((step, i) => (
        <TutorialStep
          key={i}
          step={i + 1}
          title={step.title}
          body={step.body}
          done={doneSteps.has(i)}
          onPress={() => toggleStep(i)}
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
    paddingBottom: 40,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e5e7eb',
    marginTop: 28,
    marginBottom: 20,
  },
});
