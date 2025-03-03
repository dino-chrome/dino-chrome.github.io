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
    const walk = (x - startX) * 2; // Adjust scroll speed
    row.scrollLeft = scrollLeft - walk;
  });
});

// Play Now button (reload iframe or redirect)
document.querySelectorAll('.play-now').forEach(btn => {
  btn.addEventListener('click', () => {
    const iframe = document.querySelector('.game-iframe iframe');
    if (iframe) iframe.src = iframe.src; // Reload iframe
  });
});
