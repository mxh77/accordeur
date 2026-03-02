export const TUNINGS = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'E A D G B e — accordage par défaut',
    strings: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  },
  {
    id: 'drop-d',
    name: 'Drop D',
    description: 'La corde grave abaissée d\'un ton',
    strings: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  },
  {
    id: 'open-g',
    name: 'Open G',
    description: 'Accordage ouvert Sol — idéal pour le slide',
    strings: ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
  },
  {
    id: 'open-e',
    name: 'Open E',
    description: 'Accordage ouvert Mi',
    strings: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
  },
  {
    id: 'dadgad',
    name: 'DADGAD',
    description: 'Accordage modal celtique',
    strings: ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
  },
  {
    id: 'half-step-down',
    name: '½ ton bas',
    description: 'Eb Ab Db Gb Bb eb',
    strings: ['Eb2', 'Ab2', 'Db3', 'Gb3', 'Bb3', 'Eb4'],
  },
];

export const NOTE_FREQUENCIES = {
  C0: 16.35, Db0: 17.32, D0: 18.35, Eb0: 19.45, E0: 20.60,
  F0: 21.83, Gb0: 23.12, G0: 24.50, Ab0: 25.96, A0: 27.50,
  Bb0: 29.14, B0: 30.87,
};

// Compute frequency for a note string like "A4", "Eb3", etc.
export function noteToFreq(noteStr) {
  const match = noteStr.match(/^([A-G]#?b?)(\d)$/);
  if (!match) return null;
  const [, note, octave] = match;
  const semitones = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
    'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
  };
  const n = semitones[note];
  if (n === undefined) return null;
  // A4 = 440 Hz, MIDI note = 12*(octave+1) + n
  const midi = 12 * (parseInt(octave) + 1) + n;
  return 440 * Math.pow(2, (midi - 69) / 12);
}
