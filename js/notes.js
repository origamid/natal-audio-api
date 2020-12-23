function mathFrequency(number, total) {
  for (let i = 0; i < total; i++) {
    number = number + number;
  }
  return number;
}

const frequencies = {
  C: 16.35,
  'C#': 17.32,
  D: 18.35,
  Eb: 19.45,
  E: 20.6,
  F: 21.83,
  'F#': 23.12,
  G: 24.5,
  'G#': 25.96,
  A: 27.5,
  Bb: 29.14,
  B: 30.87,
};

let notes = {};

const keys = Object.keys(frequencies);
for (let i = 0; i <= 6; i++) {
  const newNotes = keys.reduce((prev, key) => {
    prev[key + i] = mathFrequency(frequencies[key], i);
    return prev;
  }, {});
  notes = { ...notes, ...newNotes };
}

export default notes;
