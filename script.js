(() => {
  'use strict';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });

  /* ---------- Lien actif au scroll ---------- */
  const sections = document.querySelectorAll('main section[id], main#accueil');
  const navLinks = document.querySelectorAll('.nav__link');
  const setActiveLink = () => {
    let current = 'accueil';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
  };
  document.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
  /* ---------- Animation d'apparition au scroll ---------- */
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ---------- Effet typewriter sur le H1 ---------- */
  const typewriterEl = document.getElementById('typewriter');
  const words = ['modernes,', 'simples', 'et', 'efficaces.'];
  const fullPhrase = 'modernes, simples et efficaces.';

  if (typewriterEl) {
    if (prefersReducedMotion) {
      typewriterEl.textContent = fullPhrase;
    } else {
      let i = 0;
      const type = () => {
        if (i <= fullPhrase.length) {
          typewriterEl.textContent = fullPhrase.slice(0, i);
          i++;
          setTimeout(type, 45);
        }
      };
      type();
    }
  }

  /* ---------- Retour en haut ---------- */
  const toTop = document.getElementById('to-top');
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Validation du formulaire de contact ---------- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('name-error') },
    email: { el: document.getElementById('email'), error: document.getElementById('email-error') },
    message: { el: document.getElementById('message'), error: document.getElementById('message-error') },
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (field, message) => {
    field.el.closest('.form-field').classList.toggle('has-error', Boolean(message));
    field.error.textContent = message || '';
  };

  const validate = () => {
    let valid = true;

    if (!fields.name.el.value.trim()) {
      setError(fields.name, 'Le nom est requis.');
      valid = false;
    } else {
      setError(fields.name, '');
    }

    if (!fields.email.el.value.trim()) {
      setError(fields.email, 'L\'email est requis.');
      valid = false;
    } else if (!emailRegex.test(fields.email.el.value.trim())) {
      setError(fields.email, 'Veuillez saisir un email valide.');
      valid = false;
    } else {
      setError(fields.email, '');
    }

    if (!fields.message.el.value.trim()) {
      setError(fields.message, 'Le message est requis.');
      valid = false;
    } else if (fields.message.el.value.trim().length < 10) {
      setError(fields.message, 'Le message doit contenir au moins 10 caractères.');
      valid = false;
    } else {
      setError(fields.message, '');
    }

    return valid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMsg.textContent = '';

    if (!validate()) return;

    // Simulation d'envoi (pas de backend connecté)
    successMsg.textContent = 'Votre message a bien été envoyé. Je vous répondrai rapidement.';
    form.reset();
  });

  Object.values(fields).forEach(({ el }) => {
    el.addEventListener('input', () => {
      if (el.closest('.form-field').classList.contains('has-error')) validate();
    });
  });

})();


