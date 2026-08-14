const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 42));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 24);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.7 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

const links = [...document.querySelectorAll('.top-nav a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });
sections.forEach(section => navObserver.observe(section));

const scrollTop = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('visible', window.scrollY > 600);
});
scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Email Copied';
    } catch {
      button.textContent = 'Copy manually';
    }
    setTimeout(() => button.textContent = original, 1600);
  });
});
