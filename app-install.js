(() => {
  const card = document.getElementById('install-card');
  const action = document.getElementById('install-action');
  const help = document.getElementById('install-help');
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /Android/.test(navigator.userAgent);
  let promptEvent = null;
  let dismissed = false;
  try { dismissed = Date.now() - Number(localStorage.getItem('ceh-install-dismissed') || 0) < 7 * 86400000; } catch {}
  const show = () => { if (!standalone() && !dismissed && (ios || android)) card.hidden = false; };
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); promptEvent = event; show();
  });
  window.addEventListener('appinstalled', () => { card.hidden = true; promptEvent = null; });
  document.getElementById('install-dismiss').addEventListener('click', () => {
    card.hidden = true; dismissed = true;
    try { localStorage.setItem('ceh-install-dismissed', String(Date.now())); } catch {}
  });
  action.addEventListener('click', async () => {
    if (promptEvent) {
      const event = promptEvent; promptEvent = null;
      try { await event.prompt(); const choice = await event.userChoice; if (choice.outcome === 'accepted') card.hidden = true; } catch {}
      return;
    }
    help.textContent = ios
      ? 'Откройте сайт в Safari → «Поделиться» → «На экран Домой». Если есть переключатель «Открывать как веб-приложение», включите его, затем нажмите «Добавить».'
      : 'Откройте сайт в Chrome → меню ⋮ → «Добавить на главный экран» или «Установить приложение». Подтвердите добавление.';
    help.hidden = false; action.hidden = true;
  });
  if (!standalone()) setTimeout(show, 8000);
})();
