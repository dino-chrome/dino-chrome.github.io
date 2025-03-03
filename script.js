// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Horizontal scrolling with touch support for mobile
document.querySelectorAll('.game-row').forEach(row => {
  let startX, scrollLeft;

  row.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
  });

  row.addEventListener('touchmove', e => {
    e.preventDefault();
    const x = e.touches[0].pageX - row.offsetLeft;
    const walk = (x - startX) * 2;
    row.scrollLeft = scrollLeft - walk;
  });
});

// Fade-in animation for sections and staggered game cards
const sections = document.querySelectorAll('.fade-section');
const observerOptions = {
  root: null,
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const cards = entry.target.querySelectorAll('.game-card');
      cards.forEach(card => card.classList.add('visible'));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});
