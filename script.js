document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggler ---
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }
  themeToggle.addEventListener('click', () => {
    const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // --- Typing Effect ---
  const dynamicText = document.querySelector('.dynamic-text-heading span');
  if (dynamicText) {
    const words = ['Web Developer', 'Mobile Developer', 'Illustrator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      dynamicText.textContent = currentChar;
      dynamicText.classList.add('stop-blinking');

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 150);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
      } else {
        isDeleting = !isDeleting;
        dynamicText.classList.remove('stop-blinking');
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1200);
      }
    };
    typeEffect();
  }

  // --- Scroll Animation Observer ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.1 }
  );
  const animatedElements = document.querySelectorAll('.animated-item, .animated-card');
  animatedElements.forEach((el) => observer.observe(el));

  // --- Filter Logic ---
  function setupFilters(filterContainerId, cardContainerSelector) {
    const filterContainer = document.getElementById(filterContainerId);
    if (!filterContainer) return;

    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll(cardContainerSelector);

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterContainer.querySelector('.active').classList.remove('active');
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        cards.forEach((card) => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hide');
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }
  setupFilters('experience-filters', '#exp .animated-card');
  setupFilters('illustration-filters', '#ilus .animated-card');

  // --- 3D Card Tilt Effect ---
  document.querySelectorAll('.experience-card, .illustration-card, .project-item').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
    });
  });
});
