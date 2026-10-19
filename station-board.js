(() => {
  const board = document.querySelector('.station-board span');
  if (!board) return;
  const phrases = ['СЛЕДУЮЩАЯ ОСТАНОВКА — ЦЕХ', 'МУЖСКОЙ СТИЛЬ. ТОЧНАЯ РАБОТА.'];
  const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЭЮЯ';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let frame = 0;
  function settle() {
    cancelAnimationFrame(frame);
    frame = 0;
    board.textContent = phrases[index];
    board.parentElement.setAttribute('aria-label', phrases[index]);
  }
  function next() {
    if (document.hidden) return;
    index = (index + 1) % phrases.length;
    settle();
    if (reduced.matches) return;
    const phrase = phrases[index];
    const start = performance.now();
    let lastTick = 0;
    function tick(now) {
      const elapsed = now - start;
      if (elapsed >= 950 || document.hidden || reduced.matches) { settle(); return; }
      if (now - lastTick > 55) {
        lastTick = now;
        board.textContent = [...phrase].map((letter, position) => {
          if (letter === ' ' || letter === '—' || letter === '.' || elapsed > 180 + position * 24) return letter;
          return alphabet[Math.floor(Math.random() * alphabet.length)];
        }).join('');
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
  }
  settle();
  setInterval(next, 4500);
  reduced.addEventListener('change', settle);
  document.addEventListener('visibilitychange', settle);
})();
