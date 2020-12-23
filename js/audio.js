import notes from './notes.js';

const audioContext = (context) => (frequency, time) => {
  const o = context.createOscillator();
  const g = context.createGain();

  o.connect(g);
  o.type = 'sine';
  o.frequency.value = frequency;
  g.gain.value = 0.25;
  g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 2);
  g.connect(context.destination);
  o.start(0);
  setTimeout((o) => o.stop(context.currentTime + time));
};

window.tID = [];

function playSong(song) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const playNote = audioContext(context);
  for (let i = 0; i < song.length; i++) {
    const tID = setTimeout(() => {
      playNote(notes[song[i][0]], song[i][1]);
      const treeLi = document.querySelector(`[data-note="${song[i][0]}"]`);
      blink(treeLi);
    }, song[i][1]);
    window.tID.push(tID);
  }
}

document.getElementById('stop').addEventListener('click', () => {
  const tID = window.tID || [];
  tID.forEach((id) => clearTimeout(id));
  window.tID = [];
});

function notesTime(song) {
  const songTimed = [];
  let acc = 0;
  for (let i = 0; i < song.length; i++) {
    const time = (song[i - 1] ? song[i - 1][1] : 0) * 300;
    acc += time;
    songTimed.push([song[i][0], acc]);
  }
  return songTimed;
}

const song = [
  ['G3', 2],
  ['A3', 1],
  ['G3', 2],
  ['E3', 4],
  ['G3', 2],
  ['A3', 1],
  ['G3', 2],
  ['E3', 4],
  ['D4', 3],
  ['D4', 2],
  ['B3', 3],
  ['C4', 3],
  ['C4', 2],
  ['G3', 3],
  ['A3', 3],
  ['A3', 2],
  ['C4', 2],
  ['B3', 1],
  ['A3', 3],
  ['G3', 2],
  ['A3', 1],
  ['G3', 2],
  ['E3', 3],
  ['A3', 2],
  ['A3', 1],
  ['C4', 3],
  ['B3', 1],
  ['A3', 2],
  ['G3', 3],
  ['A3', 1],
  ['G3', 2],
  ['E3', 3],
  ['D4', 2],
  ['D4', 1],
  ['F4', 2],
  ['D4', 2],
  ['B3', 2],
  ['C4', 3],
  ['E4', 3],
  ['C4', 2],
  ['G3', 1],
  ['E3', 2],
  ['G3', 2],
  ['F3', 2],
  ['D3', 2],
  ['C3', 4],
];

function blink(el) {
  setTimeout(() => el.classList.add('blink'));
  setTimeout(() => el.classList.remove('blink'), 400);
}

window.playGlobalNote = (frequency) => {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const playNote = audioContext(context);
  playNote(frequency, 0);
};

function makeTree(song) {
  const tree = document.getElementById('tree');
  const uniqueNotes = [...new Set(song.map((n) => n[0]))];
  uniqueNotes.map((note) => {
    const f = notes[note];
    tree.innerHTML += `<li onClick="playGlobalNote(${f})" data-note="${note}">${note}</li>`;
  });
  const lis = document.querySelectorAll('#tree li');
  lis.forEach((li) => {
    li.addEventListener('click', () => blink(li));
  });
}

makeTree(song);
document
  .getElementById('play')
  .addEventListener('click', () => playSong(notesTime(song)));
