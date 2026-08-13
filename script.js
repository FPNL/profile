(() => {
  const body = document.body;
  const langBtns = document.querySelectorAll('[data-lang-btn]');
  const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
  const sectionIds = ['about', 'experience', 'skills', 'education'];

  function setLang(lang) {
    body.classList.toggle('lang-en', lang === 'en');
    langBtns.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.langBtn === lang);
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
  }

  langBtns.forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
  });

  setLang('zh');

  function onScroll() {
    let active = '';
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top <= 140 && r.bottom > 140) active = id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.nav === active);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
