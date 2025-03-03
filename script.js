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

// Game Data (for 70 games)
const gamesData = {
  game1: {
    title: 'BloxD.io',
    developer: 'Erietto',
    rating: '9.2 (1,293,354 votes)',
    released: 'August 2023',
    technology: 'HTML5',
    platforms: 'Browser (desktop, mobile, tablet), App Store (Android)',
    tags: ['Casual', 'Shooting', 'Archery'],
    description: 'BloxD.io is an archery game featuring bow and arrow-equipped stickmen with ragdoll physics. Fire arrows at a range of opponents while earning points to upgrade your abilities and ammunition. Play two-player PVP against your friend or team up with them to defeat a range of foes!',
    instructions: 'Line up your shots carefully, and fire! Starting with the basic arrows and baseline stats, you will be faced with various enemies. Some of these enemies are trickier than others to beat due to armor, position, and other factors. Every now and then, you will face a giant enemy. This is like a mini-boss level, and you will earn lots of skills for defeating them.',
    embedCode: '<iframe src="https://example.com/game1" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    metaDescription: 'Play BloxD.io, an archery game with ragdoll physics. Fire arrows, upgrade abilities, and battle foes in two-player PVP or co-op mode!',
    metaTitle: 'BloxD.io - Play Now on Gaming Hub'
  },
  game2: {
    title: 'Mahjongg',
    developer: 'PuzzleMaster',
    rating: '8.9 (500,000 votes)',
    released: 'January 2022',
    technology: 'HTML5',
    platforms: 'Browser (desktop, mobile, tablet)',
    tags: ['Puzzle', 'Casual'],
    description: 'Mahjongg is a classic tile-matching puzzle game. Clear the board by matching identical tiles in this relaxing and challenging game.',
    instructions: 'Match identical tiles to remove them from the board. Clear all tiles to win. Use hints if you get stuck!',
    embedCode: '<iframe src="https://example.com/game2" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    metaDescription: 'Play Mahjongg, a classic tile-matching puzzle game. Clear the board by matching identical tiles in this relaxing challenge!',
    metaTitle: 'Mahjongg - Play Now on Gaming Hub'
  },
  // ... Add data for game3 to game70 similarly
  game3: {
    title: 'Count Masters',
    developer: 'ActionKing',
    rating: '9.0 (750,000 votes)',
    released: 'March 2023',
    technology: 'HTML5',
    platforms: 'Browser (desktop, mobile, tablet)',
    tags: ['Action', 'Casual'],
    description: 'Count Masters is an action-packed game where you lead a group of stickmen to victory. Multiply your army and overpower your enemies!',
    instructions: 'Run through gates to multiply your army, avoid obstacles, and defeat enemies by outnumbering them.',
    embedCode: '<iframe src="https://example.com/game3" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
    metaDescription: 'Play Count Masters, an action game where you lead stickmen to victory by multiplying your army and defeating enemies!',
    metaTitle: 'Count Masters - Play Now on Gaming Hub'
  },
  // Add remaining games (game4 to game70) similarly...
};

// Load game details based on URL query parameter
document.addEventListener('DOMContentLoaded', () => {
  // Get game ID from URL (e.g., game.html?id=game1)
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id') || 'game1'; // Default to game1 if no ID provided

  const game = gamesData[gameId];
  if (game) {
    // Set meta tags
    document.querySelector('meta[name="description"]').setAttribute('content', game.metaDescription);
    document.querySelector('meta[name="title"]').setAttribute('content', game.metaTitle);
    document.title = game.metaTitle;

    // Set game details
    document.getElementById('game-title').textContent = game.title;
    document.getElementById('game-developer').textContent = game.developer;
    document.getElementById('game-rating').textContent = game.rating;
    document.getElementById('game-released').textContent = game.released;
    document.getElementById('game-technology').textContent = game.technology;
    document.getElementById('game-platforms').textContent = game.platforms;
    document.getElementById('game-description').textContent = game.description;
    document.getElementById('game-instructions').textContent = game.instructions;

    // Set game tags
    const tagsContainer = document.getElementById('game-tags');
    game.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });

    // Set game iframe embed code
    document.getElementById('game-iframe').outerHTML = game.embedCode;
  }

  // Fetch recommended games from index.html
  fetch('index.html')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const gameRow = document.getElementById('recommended-games-row');
      const gameCards = doc.querySelectorAll('.game-row .game-card');

      // Limit to a subset of games (e.g., first 5 for recommended)
      const recommendedGames = Array.from(gameCards).slice(0, 5);
      recommendedGames.forEach((card, index) => {
        const clonedCard = card.cloneNode(true);
        clonedCard.style.setProperty('--delay', index);
        gameRow.appendChild(clonedCard);
      });

      // Trigger fade-in animation for recommended games
      recommendedGames.forEach(card => card.classList.add('visible'));
    })
    .catch(error => console.error('Error fetching games:', error));
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
