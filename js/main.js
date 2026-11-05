
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    const header = document.querySelector('.topbar');
    const background = [...document.querySelectorAll('main, .footer, .mobile-sticky, .desktop-whatsapp')];
    const closeMenu = (restoreFocus = false) => {
      menu.classList.remove('show');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      background.forEach(element => { element.inert = false; });
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = !menu.classList.contains('show');
      if (!open) { closeMenu(true); return; }
      menu.classList.toggle('show', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', 'Close navigation');
      background.forEach(element => { element.inert = true; });
      menu.querySelector('a')?.focus();
    });
    header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('click', event => {
      if (menu.classList.contains('show') && !header.contains(event.target)) closeMenu(true);
    });
    document.addEventListener('keydown', event => {
      if (!menu.classList.contains('show')) return;
      if (event.key === 'Escape') { closeMenu(true); return; }
      if (event.key !== 'Tab') return;
      const controls = [...header.querySelectorAll('a, button')].filter(element => element.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  }

  document.querySelectorAll('.compare').forEach(compare => {
    const range = compare.querySelector('.compare-range');
    if (!range) return;
    const update = () => {
      compare.style.setProperty('--position', `${range.value}%`);
      range.setAttribute('aria-valuetext', `${range.value}% of the before photograph visible`);
    };
    range.addEventListener('input', update);
    update();
  });

  document.querySelectorAll('form[data-quote-form]').forEach(form => {
    const pageField = form.querySelector('input[name="source_page"]');
    if (pageField) pageField.value = document.title;

    const parameters = new URLSearchParams(window.location.search);
    const presetServices = {
      sanding: 'Floor sanding and refinishing',
      restoration: 'Floor restoration and repairs',
      engineered: 'Engineered wood installation',
      solid: 'Solid wood installation',
      laminate: 'Laminate installation',
      parquet: 'Parquet or herringbone installation'
    };
    const service = form.querySelector('select[name="service"]');
    const preset = presetServices[parameters.get('service')];
    if (service && preset && [...service.options].some(option => option.value === preset)) service.value = preset;

    const addSourceField = (name, value) => {
      if (!value) return;
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = name; input.value = value;
      form.append(input);
    };
    addSourceField('landing_page', window.location.origin + window.location.pathname);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(name => {
      const value = parameters.get(name);
      if (value) addSourceField(name, value.slice(0, 200));
    });

    const email = form.querySelector('input[type="email"]');
    const contact = form.querySelector('select[name="preferred_contact"]');
    const emailLabel = email && form.querySelector(`label[for="${email.id}"]`);
    const updateContact = () => {
      if (!email || !contact) return;
      email.required = contact.value === 'Email';
      if (emailLabel) emailLabel.textContent = email.required ? 'Email address *' : 'Email address';
    };
    contact?.addEventListener('change', updateContact);
    updateContact();

    const button = form.querySelector('button[type="submit"]');
    const originalLabel = button?.textContent;
    form.addEventListener('submit', event => {
      if (form.dataset.submitting === 'true') { event.preventDefault(); return; }
      if (!form.checkValidity()) return;
      form.dataset.submitting = 'true';
      form.setAttribute('aria-busy', 'true');
      if (button) { button.disabled = true; button.textContent = 'Sending your enquiry…'; }
    });
    window.addEventListener('pageshow', () => {
      delete form.dataset.submitting;
      form.removeAttribute('aria-busy');
      if (button) { button.disabled = false; button.textContent = originalLabel; }
    });
  });

  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      const service = document.querySelector('#service');
      if (service && [...service.options].some(option => option.value === link.dataset.service)) {
        service.value = link.dataset.service;
      }
    });
  });
});
