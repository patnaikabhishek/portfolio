const cursor = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  if (cursor) {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-counter]').forEach(counter => {
  const target = Number(counter.dataset.counter);
  let started = false;
  const counterObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 36));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 28);
      counterObserver.disconnect();
    }
  }, {threshold: .6});
  counterObserver.observe(counter);
});

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      const old = btn.textContent;
      btn.textContent = 'Email Copied';
      setTimeout(() => btn.textContent = old, 1500);
    } catch {
      btn.textContent = 'Copy manually';
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
