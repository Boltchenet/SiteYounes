const toggle = document.querySelector('.theme-toggle');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'light' || (!storedTheme && prefersLight)) {
  document.body.classList.add('light');
}

if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });
}

const langToggle = document.querySelector('.lang-toggle');
const storedLang = localStorage.getItem('lang') || 'fr';

if (storedLang === 'en') {
  document.body.classList.remove('lang-fr');
  document.body.classList.add('lang-en');
  document.documentElement.lang = 'en';
}

if (langToggle) {
  langToggle.textContent = document.body.classList.contains('lang-en') ? 'FR' : 'EN';
  langToggle.addEventListener('click', () => {
    const isEnglish = document.body.classList.toggle('lang-en');
    document.body.classList.toggle('lang-fr', !isEnglish);
    document.documentElement.lang = isEnglish ? 'en' : 'fr';
    localStorage.setItem('lang', isEnglish ? 'en' : 'fr');
    langToggle.textContent = isEnglish ? 'FR' : 'EN';
  });
}

const copyLinks = document.querySelectorAll('.copy-link');
copyLinks.forEach((link) => {
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    const value = link.getAttribute('data-copy');
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      window.prompt('Copier:', value);
    }

    link.classList.add('copied');
    setTimeout(() => link.classList.remove('copied'), 1500);
  });
});

// Auto-apply scroll animation to common blocks.
const autoAnimateSelectors = [
  '.section-title',
  '.card',
  '.skill-card',
  '.project-card',
  '.timeline-item',
  '.stack-item',
  '.contact-card',
  '.contact-panel',
  '.data-visual',
  '.profile-card',
  '.info-card',
  '.project-thumb'
];

const autoAnimateNodes = document.querySelectorAll(autoAnimateSelectors.join(','));
autoAnimateNodes.forEach((node) => node.classList.add('animate-on-scroll'));

function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  if (!('IntersectionObserver' in window)) {
    animateElements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  animateElements.forEach((el) => observer.observe(el));
}

function initFadeIns() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`;
  });
}

function createVisualChart() {
  const visualChart = document.getElementById('visual-chart');
  if (!visualChart) return;

  const chartData = [65, 80, 75, 90, 85, 95, 70];
  const barWidth = 20;
  const gap = 16;

  visualChart.innerHTML = '';

  chartData.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.classList.add('chart-bar');
    bar.style.left = `${index * (barWidth + gap)}px`;
    bar.style.height = `${value}%`;
    bar.style.animationDelay = `${index * 0.12}s`;
    visualChart.appendChild(bar);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initFadeIns();
  createVisualChart();
});

