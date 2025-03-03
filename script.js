// Game data "database"
const gamesData = {
  game1: {
    id: "game1",
    title: "Leek Factory Tycoon",
    thumbnail: "https://via.placeholder.com/200x150?text=Leek+Factory+Tycoon",
    iframeUrl: "https://example.com/games/leek-factory-tycoon",
    category: "featured",
    tags: ["new"],
    details: {
      developer: "Unknown",
      rating: "8.7 (2,423 votes)",
      released: "February 2025",
      technology: "HTML5",
      platform: "Browser (desktop, mobile, tablet)"
    }
  },
  game2: {
    id: "game2",
    title: "BloxD.io",
    thumbnail: "https://via.placeholder.com/200x150?text=BloxD.io",
    iframeUrl: "https://example.com/games/bloxd-io",
    category: "hot",
    tags: ["multiplayer"],
    details: {
      developer: "Unknown",
      rating: "9.0 (5,000 votes)",
      released: "January 2024",
      technology: "HTML5",
      platform: "Browser (desktop, mobile, tablet)"
    }
  },
  game3: {
    id: "game3",
    title: "Color Fill 3D",
    thumbnail: "https://via.placeholder.com/200x150?text=Color+Fill+3D",
    iframeUrl: "https://example.com/games/color-fill-3d",
    category: "new",
    tags: ["casual"],
    details: {
      developer: "Famobi",
      rating: "8.7 (2,423 votes)",
      released: "February 2025",
      technology: "HTML5",
      platform: "Browser (desktop, mobile, tablet)"
    }
  },
  game4: {
    id: "game4",
    title: "Epic Empire",
    thumbnail: "https://via.placeholder.com/200x150?text=Epic+Empire",
    iframeUrl: "https://example.com/games/epic-empire",
    category: "originals",
    tags: [],
    details: {
      developer: "CrazyGames",
      rating: "8.5 (1,200 votes)",
      released: "March 2024",
      technology: "HTML5",
      platform: "Browser (desktop, mobile, tablet)"
    }
  }
  // Add more games as needed
};

// Populate homepage sections
function populateHomepage() {
  const sections = {
    featured: document.querySelector('#featured-games .game-row'),
    hot: document.querySelector('#hot-games .game-row'),
    new: document.querySelector('#new-games .game-row'),
    originals: document.querySelector('#originals .game-row')
  };

  Object.values(gamesData).forEach(game => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.innerHTML = `
      <a href="game.html?id=${game.id}">
        <img src="${game.thumbnail}" alt="${game.title}">
        <h3>${game.title}</h3>
        ${game.tags.includes('new') ? '<span class="badge new">NEW</span>' : ''}
        ${game.tags.includes('hot') ? '<span class="badge hot">HOT</span>' : ''}
      </a>
    `;
    if (sections[game.category]) {
      sections[game.category].appendChild(card);
    }
  });
}

// Populate game page dynamically
function populateGamePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');
  const game = gamesData[gameId];

  if (!game) {
    document.querySelector('.game-container').innerHTML = '<p>Game not found.</p>';
    return;
  }

  // Update game iframe and details
  document.querySelector('.game-iframe iframe').src = game.iframeUrl;
  document.querySelector('.game-page h1').textContent = game.title;
  const details = document.querySelector('.game-details');
  details.innerHTML = `
    <p><strong>Developer:</strong> ${game.details.developer}</p>
    <p><strong>Rating:</strong> ${game.details.rating}</p>
    <p><strong>Released:</strong> ${game.details.released}</p>
    <p><strong>Technology:</strong> ${game.details.technology}</p>
    <p><strong>Platform:</strong> ${game.details.platform}</p>
  `;
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

// Play Now button (reload iframe)
document.querySelectorAll('.play-now').forEach(btn => {
  btn.addEventListener('click', () => {
    const iframe = document.querySelector('.game-iframe iframe');
    if (iframe) iframe.src = iframe.src;
  });
});

// Initialize pages
if (document.querySelector('#featured-games')) {
  populateHomepage();
}
if (document.querySelector('.game-page')) {
  populateGamePage();
}
