
(function () {
  const projects = window.SK_PROJECTS || [];
  const escapeHtml = value => String(value || '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const card = project => `
    <article class="card project-card" data-category="${escapeHtml(project.categories.join(' '))}">
      <a class="card-image" href="${escapeHtml(project.url || `project.html?id=${encodeURIComponent(project.id)}`)}" aria-label="View ${escapeHtml(project.title)}">
        <img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.title)}" loading="lazy" width="1400" height="900">
      </a>
      <div class="card-body">
        <div class="project-meta">${escapeHtml(project.service)}</div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.summary)}</p>
        <a class="btn btn-dark" href="${escapeHtml(project.url || `project.html?id=${encodeURIComponent(project.id)}`)}">View project</a>
      </div>
    </article>`;

  document.querySelectorAll('[data-project-grid]').forEach(grid => {
    const filter = grid.dataset.projectFilter || 'all';
    const limit = Number(grid.dataset.projectLimit || projects.length);
    const selected = projects.filter(p => filter === 'all' || p.categories.includes(filter)).slice(0, limit);
    grid.innerHTML = selected.map(card).join('');
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length) {
    filterButtons.forEach(button => button.addEventListener('click', () => {
      filterButtons.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed','false'); });
      button.classList.add('active'); button.setAttribute('aria-pressed','true');
      const filter = button.dataset.filter;
      document.querySelectorAll('.project-card').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && !item.dataset.category.split(' ').includes(filter));
      });
    }));
  }

  const detail = document.querySelector('[data-project-detail]');
  if (detail) {
    const id = new URLSearchParams(location.search).get('id');
    const project = projects.find(p => p.id === id);
    if (!project) {
      detail.innerHTML = '<div class="empty-state"><h1>Project not found</h1><p>The project link may be outdated.</p><a class="btn btn-dark" href="projects.html">Return to our work</a></div>';
      return;
    }
    document.title = `${project.title} | S&K Wood Floor Specialists`;
    const work = project.work.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    const gallery = project.gallery.map((src, i) => `<img src="${escapeHtml(src)}" alt="${escapeHtml(project.title)} photograph ${i+1}" loading="lazy" width="1400" height="900">`).join('');
    detail.innerHTML = `
      <section class="hero hero-small" style="background-image:url('${escapeHtml(project.cover)}')">
        <div class="container"><div class="hero-panel">
          <span class="eyebrow">Completed flooring project</span>
          <h1>${escapeHtml(project.title)}</h1>
          <p>${escapeHtml(project.summary)}</p>
          <div class="btn-row"><a class="btn btn-gold" href="#quote">Request a similar quote</a><a class="btn btn-outline" href="projects.html">Back to gallery</a></div>
        </div></div>
      </section>
      <section class="section section-white"><div class="container">
        <div class="project-facts">
          <div class="fact"><span>Service</span>${escapeHtml(project.service)}</div>
          <div class="fact"><span>Floor type</span>${escapeHtml(project.floorType)}</div>
          <div class="fact"><span>Finish</span>${escapeHtml(project.finish)}</div>
          <div class="fact"><span>Timescale</span>${escapeHtml(project.duration)}</div>
        </div>
        <div class="two-column">
          <div class="content-panel"><div class="kicker" style="text-align:left">Scope of work</div><h2>How the floor was improved</h2><p>${escapeHtml(project.summary)}</p><ul class="service-list">${work}</ul></div>
          <div class="compare" aria-label="Before and after comparison">
            <img src="${escapeHtml(project.after)}" alt="After ${escapeHtml(project.title)}" width="1400" height="900">
            <img class="compare-before" src="${escapeHtml(project.before)}" alt="Before ${escapeHtml(project.title)}" width="1400" height="900">
            <span class="compare-label before-label">Before</span><span class="compare-label after-label">After</span>
            <span class="compare-line"></span><span class="compare-handle">↔</span>
            <input class="compare-range" type="range" min="0" max="100" value="50" aria-label="Move to compare before and after">
          </div>
        </div>
      </div></section>
      <section class="section section-soft"><div class="container"><div class="kicker">Project gallery</div><h2 class="section-title">Before, progress and completed work</h2><div class="project-gallery">${gallery}</div></div></section>`;
    // Reinitialize the comparison inserted dynamically.
    const compare = detail.querySelector('.compare');
    const range = compare && compare.querySelector('.compare-range');
    if (compare && range) range.addEventListener('input', () => compare.style.setProperty('--position', `${range.value}%`));
  }
})();
