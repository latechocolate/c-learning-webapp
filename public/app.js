(() => {
  const STORAGE_KEY = 'c-kurs-progress-v1';
  const lessons = window.LESSONS || [];

  const nav = document.getElementById('lesson-nav');
  const view = document.getElementById('lesson-view');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const completeBtn = document.getElementById('complete-btn');
  const resetBtn = document.getElementById('reset-progress');
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menu-toggle');

  const loadProgress = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  };
  const saveProgress = (p) => localStorage.setItem(STORAGE_KEY, JSON.stringify(p));

  let progress = loadProgress();
  let currentIdx = 0;

  /* ----------------- Sidebar ----------------- */
  const renderNav = () => {
    nav.innerHTML = '';
    let lastSection = null;
    lessons.forEach((l, idx) => {
      if (l.section !== lastSection) {
        const h = document.createElement('div');
        h.className = 'section-title';
        h.textContent = l.section;
        nav.appendChild(h);
        lastSection = l.section;
      }
      const link = document.createElement('div');
      link.className = 'lesson-link';
      if (progress[l.id]) link.classList.add('done');
      if (idx === currentIdx) link.classList.add('active');
      link.dataset.idx = idx;
      link.innerHTML = `<span class="check"></span><span>${l.title}</span>`;
      link.addEventListener('click', () => goTo(idx));
      nav.appendChild(link);
    });
    updateProgressMeter();
  };

  const updateProgressMeter = () => {
    const total = lessons.length;
    const done = lessons.filter(l => progress[l.id]).length;
    progressText.textContent = `${done} / ${total} Lektionen`;
    progressFill.style.width = total ? `${(done / total) * 100}%` : '0%';
  };

  /* ----------------- View ----------------- */
  const escapeHtml = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

  const renderLesson = () => {
    const l = lessons[currentIdx];
    if (!l) return;

    const codeHtml = l.code ? `
      <div class="code-block">
        <div class="code-block-header">
          <span>beispiel.c</span>
          <button class="copy-btn">Kopieren</button>
        </div>
        <pre><code class="language-c">${escapeHtml(l.code)}</code></pre>
      </div>
      ${l.output ? `<div class="output-block">${escapeHtml(l.output)}</div>` : ''}
    ` : '';

    const quizHtml = l.quiz ? `
      <div class="quiz-block">
        <h3>Mini-Quiz</h3>
        <p>${l.quiz.question}</p>
        <div class="quiz-options">
          ${l.quiz.options.map((o, i) =>
            `<button class="quiz-option" data-i="${i}">${escapeHtml(o)}</button>`
          ).join('')}
        </div>
        <div class="quiz-feedback"></div>
      </div>
    ` : '';

    view.innerHTML = `
      <div class="breadcrumb">${l.section}</div>
      <h2>${l.title}</h2>
      ${l.body}
      ${codeHtml}
      ${quizHtml}
    `;

    // Highlight code blocks once highlight.js is ready
    if (window.hljs) view.querySelectorAll('pre code').forEach(el => window.hljs.highlightElement(el));

    // Copy button
    const copyBtn = view.querySelector('.copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(l.code).then(() => {
          copyBtn.textContent = 'Kopiert!';
          setTimeout(() => copyBtn.textContent = 'Kopieren', 1500);
        });
      });
    }

    // Quiz
    if (l.quiz) {
      const opts = view.querySelectorAll('.quiz-option');
      const feedback = view.querySelector('.quiz-feedback');
      opts.forEach(opt => {
        opt.addEventListener('click', () => {
          opts.forEach(o => o.disabled = true);
          const chosen = Number(opt.dataset.i);
          if (chosen === l.quiz.answer) {
            opt.classList.add('correct');
            feedback.textContent = 'Richtig!';
            feedback.style.color = 'var(--done)';
          } else {
            opt.classList.add('wrong');
            opts[l.quiz.answer].classList.add('correct');
            feedback.textContent = 'Leider falsch — die richtige Antwort ist markiert.';
            feedback.style.color = '#fca5a5';
          }
        });
      });
    }

    // Update nav buttons
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === lessons.length - 1;
    updateCompleteBtn();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCompleteBtn = () => {
    const l = lessons[currentIdx];
    const done = !!progress[l.id];
    completeBtn.classList.toggle('done-state', done);
    completeBtn.classList.toggle('primary', !done);
    completeBtn.textContent = done ? '✓ Erledigt' : 'Als erledigt markieren';
  };

  /* ----------------- Navigation ----------------- */
  const goTo = (idx) => {
    if (idx < 0 || idx >= lessons.length) return;
    currentIdx = idx;
    location.hash = `#${lessons[idx].id}`;
    renderNav();
    renderLesson();
    if (window.innerWidth <= 768) sidebar.classList.remove('open');
  };

  prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
  nextBtn.addEventListener('click', () => goTo(currentIdx + 1));

  completeBtn.addEventListener('click', () => {
    const l = lessons[currentIdx];
    progress[l.id] = !progress[l.id];
    saveProgress(progress);
    renderNav();
    updateCompleteBtn();
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('Wirklich allen Fortschritt zurücksetzen?')) {
      progress = {};
      saveProgress(progress);
      renderNav();
      updateCompleteBtn();
    }
  });

  menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

  // Hash routing on initial load and back/forward
  const hashToIdx = () => {
    const id = location.hash.slice(1);
    const idx = lessons.findIndex(l => l.id === id);
    return idx >= 0 ? idx : 0;
  };
  window.addEventListener('hashchange', () => {
    const idx = hashToIdx();
    if (idx !== currentIdx) {
      currentIdx = idx;
      renderNav();
      renderLesson();
    }
  });

  // Boot
  currentIdx = hashToIdx();
  renderNav();
  renderLesson();
})();
