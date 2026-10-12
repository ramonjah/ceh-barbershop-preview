(() => {
  const selector = '[class^="dikidi-"][class$="-modal"]';
  const booking = document.querySelector('.booking');
  const enhance = modal => {
    if (modal.dataset.cehEnhanced) return;
    const close = modal.querySelector('[class$="-close"]');
    const frame = modal.querySelector('iframe');
    if (!close || !frame) return;
    modal.dataset.cehEnhanced = 'true';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Онлайн-запись в ЦЕХ');
    frame.title = 'Выбор услуги, мастера и времени в ЦЕХ';
    close.setAttribute('role', 'button');
    close.setAttribute('aria-label', 'Закрыть запись и вернуться на сайт');
    close.tabIndex = 0;
    close.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        close.click();
      }
    });
    const visibility = new MutationObserver(() => {
      if (modal.style.display === 'none') booking?.focus({ preventScroll: true });
      else close.focus({ preventScroll: true });
    });
    visibility.observe(modal, { attributes: true, attributeFilter: ['style'] });
    if (modal.style.display !== 'none') close.focus({ preventScroll: true });
  };
  new MutationObserver(() => document.querySelectorAll(selector).forEach(enhance))
    .observe(document.body, { childList: true, subtree: true });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const modal = [...document.querySelectorAll(selector)].find(m => m.style.display !== 'none');
    modal?.querySelector('[class$="-close"]')?.click();
  });
})();
