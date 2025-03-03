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
