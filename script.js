const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.main-nav a, .nav-actions a');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (header.classList.contains('open')) {
      header.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim() || 'Cliente';
    const company = formData.get('company')?.toString().trim() || 'Sin empresa';
    const role = formData.get('role')?.toString().trim() || 'Sin cargo';
    const email = formData.get('email')?.toString().trim() || '[AGREGAR CORREO]';
    const message = formData.get('message')?.toString().trim() || 'Solicito información sobre MantIA.';

    const text = encodeURIComponent(
      `Hola, estoy interesado en conocer MantIA y quisiera solicitar una demostración.\n\nNombre: ${name}\nEmpresa: ${company}\nCargo: ${role}\nCorreo: ${email}\nMensaje: ${message}`
    );

    window.open(`https://wa.me/51913431552?text=${text}`, '_blank', 'noopener,noreferrer');
  });
}
