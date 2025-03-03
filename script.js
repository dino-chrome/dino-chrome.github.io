function filterGames(category) {
  const cards = document.querySelectorAll('.game-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function searchGames() {
  const query = document.getElementById('search').value.toLowerCase();
  const cards = document.querySelectorAll('.game-card');
  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = title.includes(query) ? 'block' : 'none';
  });
}

function playGame(gameId) {
  const modal = document.getElementById('game-modal');
  const frame = document.getElementById('game-frame');
  // Replace with actual game URLs or embed your own games
  frame.src = `https://example.com/games/${gameId}`; // Placeholder URL
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('game-modal');
  modal.style.display = 'none';
  document.getElementById('game-frame').src = ''; // Reset iframe
}
