(() => {
  const board = document.querySelector('.station-board span');
  const phrase = board.textContent;
  const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let lastTick = 0;
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    board.textContent = phrase;
  }
  function reload() {
    if (document.hidden || reduced.matches) return;
    reset();
    const start = performance.now();
    lastTick = 0;
    function tick(now) {
      const elapsed = now - start;
      if (elapsed >= 850 || document.hidden || reduced.matches) { reset(); return; }
      if (now - lastTick > 55) {
        lastTick = now;
        board.textContent = [...phrase].map((letter, index) => {
          if (letter === ' ' || letter === '—' || elapsed > 220 + index * 23) return letter;
          return alphabet[Math.floor(Math.random() * alphabet.length)];
        }).join('');
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }
  setInterval(reload, 4500);
  reduced.addEventListener('change', reset);
  document.addEventListener('visibilitychange', reset);
})();
