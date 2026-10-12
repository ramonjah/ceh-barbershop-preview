(() => {
  const portrait = document.querySelector('.portrait-motion');
  const photo = portrait?.querySelector('img');
  if (!photo || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  portrait.classList.add('portrait-intro');
  const reveal = async () => {
    try { await photo.decode(); } catch {}
    if (!photo.naturalWidth) {
      portrait.classList.remove('portrait-intro');
      return;
    }
    portrait.classList.add('portrait-ready');
  };
  if (photo.complete) reveal();
  else {
    photo.addEventListener('load', reveal, { once: true });
    photo.addEventListener('error', () => portrait.classList.remove('portrait-intro'), { once: true });
  }
})();
