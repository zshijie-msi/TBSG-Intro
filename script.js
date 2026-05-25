const revealEls = document.querySelectorAll('.reveal');
const topButton = document.querySelector('.back-to-top');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

window.addEventListener('scroll', () => {
  topButton.classList.toggle('is-visible', window.scrollY > 680);
});

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

// Subtle hero movement, closer to a refined portfolio interaction than an AI dashboard.
const hero = document.querySelector('.hero');
const portrait = document.querySelector('.hero-portrait img');

if (!reduceMotion && hero && portrait) {
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform = `scale(1.035) translate(${x * 8}px, ${y * 5}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    portrait.style.transform = 'scale(1) translate(0, 0)';
  });
}
