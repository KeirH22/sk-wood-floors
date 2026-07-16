
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove('show');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = !menu.classList.contains('show');
      menu.classList.toggle('show', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  document.querySelectorAll('.compare').forEach(compare => {
    const range = compare.querySelector('.compare-range');
    if (!range) return;
    const update = () => compare.style.setProperty('--position', `${range.value}%`);
    range.addEventListener('input', update);
    update();
  });

  document.querySelectorAll('form[data-quote-form]').forEach(form => {
    const pageField = form.querySelector('input[name="source_page"]');
    if (pageField) pageField.value = document.title;
  });
});
