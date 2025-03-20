// Toggle Mobile Menu
function toggleMenu() {
    try {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) mobileMenu.classList.toggle('active');
    } catch (error) {
        console.error('Error toggling menu:', error);
    }
}

// Adjust Game Size
function adjustGameSize() {
    try {
        const iframe = document.querySelector("iframe");
        const iframeContainer = document.querySelector(".iframe-container");
        const adContainers = document.querySelectorAll('.ad-container');
        if (!iframe || !iframeContainer) return;

        if (!document.fullscreenElement) {
            const isMobile = window.innerWidth <= 768;
            const baseHeight = isMobile ? 290 : 720;
            iframe.style.height = `${baseHeight}px`;
            const containerWidth = baseHeight * (16 / 9);
            iframeContainer.style.maxWidth = `${containerWidth}px`;
            // Show ads based on device size when not in fullscreen
            adContainers.forEach(container => {
                if (isMobile) {
                    if (container.classList.contains('mobile-top-ad') || container.classList.contains('mobile-bottom-ad') || container.classList.contains('article-ad')) {
                        container.style.display = container.dataset.originalDisplay || 'block';
                    } else {
                        container.style.display = 'none';
                    }
                } else {
                    if (container.classList.contains('top-ad') || container.classList.contains('bottom-ad') || container.classList.contains('left-ad') || container.classList.contains('right-ad') || container.classList.contains('article-ad')) {
                        container.style.display = container.dataset.originalDisplay || 'block';
                    } else {
                        container.style.display = 'none';
                    }
                }
            });
        } else {
            iframeContainer.style.maxWidth = 'none';
            iframe.style.height = '100%';
            iframe.style.width = '100%';
            // Ensure ads remain hidden in fullscreen mode
            adContainers.forEach(container => {
                container.style.display = 'none';
            });
        }
    } catch (error) {
        console.error('Error adjusting game size:', error);
    }
}

// Open Search Overlay
function openSearchOverlay() {
    try {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay) searchOverlay.style.display = 'block';
    } catch (error) {
        console.error('Error opening search overlay:', error);
    }
}

// Close Search Overlay
function closeSearchOverlay() {
    try {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        if (searchOverlay) {
            searchOverlay.style.display = 'none';
            if (searchInput) searchInput.value = '';
            if (searchResults) searchResults.innerHTML = '';
        }
    } catch (error) {
        console.error('Error closing search overlay:', error);
    }
}

// Search Functionality
function filterGames() {
    try {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        if (!searchInput || !searchResults) return;

        const searchTerm = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (searchTerm === '') {
            searchResults.style.display = 'none';
            return;
        }

        const games = [
            { title: "Dino Chrome", url: "index.html", image: "images/trending/dino-chrome.webp" },
            { title: "Chrome Dino", url: "../../game/trending/dino-chrome.html", image: "../../images/trending/dino-chrome.webp" },
            { title: "1v1 LOL", url: "../../game/trending/1v1-lol.html", image: "../../images/trending/1v1.webp" },
            { title: "Capybara Clicker", url: "../../game/trending/capybara-clicker.html", image: "../../images/trending/Capybara Clicker .webp" },
            { title: "Age Of Arms-2", url: "../../game/trending/age-of-arms-2.html", image: "../../images/trending/Age Of Arms-2.webp" },
            { title: "Age of Tanks Warriors", url: "../../game/trending/age-of-tanks-warriors.html", image: "../../images/trending/Age of Tanks Warriors.webp" },
            { title: "Bonk.io", url: "../../game/trending/bonk-io.html", image: "../../images/trending/Bonk.io.webp" },
            { title: "Bridge Race", url: "../../game/trending/bridge-race.html", image: "../../images/trending/Bridge Race.webp" },
            { title: "Brutal Mania.io", url: "../../game/trending/brutal-mania-io.html", image: "../../images/trending/BrutalMania.io .webp" },
            { title: "Candy Clicker", url: "../../game/trending/candy-clicker.html", image: "../../images/trending/Candy Clicker .webp" },
            { title: "CarBall.io", url: "../../game/trending/car-ball-io.html", image: "../../images/trending/CarBall.io.webp" },
            { title: "Clash of Warriors", url: "../../game/trending/clash-of-warriors.html", image: "../../images/trending/Clash of Warriors.webp" },
            { title: "Corn Tycoon", url: "../../game/trending/corn-tycoon.html", image: "../../images/trending/Corn Tycoon.webp" },
            { title: "Craft Drill", url: "../../game/craft-drill.html", image: "../../images/Craft Drill .webp" },
            { title: "EpicBallz.io", url: "../../game/epic-balls-io.html", image: "../../images/EpicBallz.io .webp" },
            { title: "EvoWars.io", url: "../../game/evo-wars-io.html", image: "../../images/EvoWars.io.webp" },
            { title: "Flipped Chain Dunk", url: "../../game/flipped-chain-dunk.html", image: "../../images/Flipped Chain Dunk copy.webp" },
            { title: "Gridle", url: "../../game/gridle.html", image: "../../images/Gridle.webp" },
            { title: "Hexanaut.io", url: "../../game/hexanaut-io.html", image: "../../images/Hexanaut.io .webp" },
            { title: "Hoop World 3D", url: "../../game/hoop-world-3d.html", image: "../../images/Hoop World 3D.webp" },
            { title: "Idle Monster Slayer", url: "../../game/idle-monster-slayer.html", image: "../../images/Idle Monster Slayer.webp" },
            { title: "Jump Up 3D Mini Basketball", url: "../../game/jump-up-3d-mini-basketball.html", image: "../../images/Jump Up 3D Mini Basketball.webp" },
            { title: "Kirka.io", url: "../../game/kirka-io.html", image: "../../images/Kirka.io.webp" },
            { title: "Knife.io", url: "../../game/knife-io.html", image: "../../images/Knife.io.webp" },
            { title: "Park Town", url: "../../game/park-town.html", image: "../../images/Park Town.webp" },
            { title: "Pixel Warfare", url: "../../game/pixel-warfare.html", image: "../../images/Pixel Warfare .webp" },
            { title: "Planet Clicker", url: "../../game/planet-clicker.html", image: "../../images/Planet Clicker .webp" },
            { title: "Race Clicker", url: "../../game/race-clicker.html", image: "../../images/Race Clicker.webp" },
            { title: "Racing Limits", url: "../../game/racing-limits.html", image: "../../images/Racing Limits.webp" },
            { title: "Ragdoll Archers", url: "../../game/ragdoll-archers.html", image: "../../images/Ragdoll Archers .webp" },
            { title: "SandStrike.io", url: "../../game/sand-strike-io.html", image: "../../images/SandStrike.io.webp" },
            { title: "Planet Clicker2", url: "../../game/planet-clicker-2.html", image: "../../images/Planet Clicker 2.webp" },
            { title: "Shell Shockers", url: "../../game/shell-shockers.html", image: "../../images/Shell Shockers copy.webp" },
            { title: "Snake Shooter", url: "../../game/snake-shooters.html", image: "../../images/Snake Shooter .webp" },
            { title: "Space.io", url: "../../game/snake-io.html", image: "../../images/Space.io.webp" },
            { title: "Star Blast", url: "../../game/star-blast.html", image: "../../images/StarBlast .webp" },
            { title: "Stunt Paradise", url: "../../game/stunt-paradise.html", image: "../../images/Stunt Paradise.webp" },
            { title: "Tiny Auto Knights", url: "../../game/tiny-auto-knights.html", image: "../../images/Tiny Auto Knights .webp" },
            { title: "Zombie Crusher", url: "../../game/zombie-crusher.html", image: "../../images/Zombie Crusher .webp" },
            { title: "Taming Io", url: "../../game/taming-io.html", image: "../../images/Taming io.webp" },
        ];

        const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));

        if (filteredGames.length > 0) {
            filteredGames.forEach(game => {
                const gameCard = document.createElement('a');
                gameCard.className = 'game-card';
                gameCard.href = game.url;
                gameCard.innerHTML = `<img src="${game.image}" alt="${game.title}" loading="lazy"><div class="game-title">${game.title}</div>`;
                searchResults.appendChild(gameCard);
            });
            searchResults.style.display = 'grid';
        } else {
            searchResults.innerHTML = '<p>No games found.</p>';
            searchResults.style.display = 'block';
        }
    } catch (error) {
        console.error('Error filtering games:', error);
    }
}

// Fullscreen Control
const iframeContainer = document.querySelector('.iframe-container');
let isFullscreen = false;

function toggleFullscreen() {
    try {
        if (!iframeContainer) return;

        const adContainers = document.querySelectorAll('.ad-container');

        if (!isFullscreen) {
            // Store original display state and hide ads
            adContainers.forEach(container => {
                container.dataset.originalDisplay = container.style.display || 'block';
                container.style.display = 'none';
            });

            if (iframeContainer.requestFullscreen) {
                iframeContainer.requestFullscreen();
            } else if (iframeContainer.webkitRequestFullscreen) {
                iframeContainer.webkitRequestFullscreen();
            } else if (iframeContainer.msRequestFullscreen) {
                iframeContainer.msRequestFullscreen();
            }

            iframeContainer.classList.add('fullscreen');
            isFullscreen = true;
            adjustGameSize();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            iframeContainer.classList.remove('fullscreen');
            isFullscreen = false;
            adjustGameSize();
        }
    } catch (error) {
        console.error('Error toggling fullscreen:', error);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    try {
        const fullscreenIcon = document.querySelector('.fullscreen-icon');
        if (fullscreenIcon) {
            fullscreenIcon.addEventListener('click', toggleFullscreen);
        }

        document.addEventListener('fullscreenchange', () => {
            const adContainers = document.querySelectorAll('.ad-container');
            if (!document.fullscreenElement) {
                isFullscreen = false;
                if (iframeContainer) {
                    iframeContainer.classList.remove('fullscreen');
                }
                // Restore ads based on device size
                const isMobile = window.innerWidth <= 768;
                adContainers.forEach(container => {
                    if (isMobile) {
                        if (container.classList.contains('mobile-top-ad') || container.classList.contains('mobile-bottom-ad') || container.classList.contains('article-ad')) {
                            container.style.display = container.dataset.originalDisplay || 'block';
                        } else {
                            container.style.display = 'none';
                        }
                    } else {
                        if (container.classList.contains('top-ad') || container.classList.contains('bottom-ad') || container.classList.contains('left-ad') || container.classList.contains('right-ad') || container.classList.contains('article-ad')) {
                            container.style.display = container.dataset.originalDisplay || 'block';
                        } else {
                            container.style.display = 'none';
                        }
                    }
                });
                adjustGameSize();
            } else {
                isFullscreen = true;
                if (iframeContainer) {
                    iframeContainer.classList.add('fullscreen');
                }
                // Ensure ads are hidden in fullscreen
                adContainers.forEach(container => {
                    container.style.display = 'none';
                });
                adjustGameSize();
            }
        });

        // Debounce resize event
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(adjustGameSize, 100);
        });
    } catch (error) {
        console.error('Error setting up event listeners:', error);
    }
}

// Share Game
function shareGame() {
    try {
        const gameTitleElement = document.querySelector('.game-title');
        if (!gameTitleElement) return;

        const gameTitle = gameTitleElement.textContent;
        const gameUrl = window.location.href;
        const shareText = `Check out ${gameTitle}! Play it here: ${gameUrl}`;

        if (navigator.share) {
            navigator.share({
                title: gameTitle,
                text: shareText,
                url: gameUrl
            }).catch(err => console.error('Error sharing:', err));
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Game link copied to clipboard!');
            }).catch(err => {
                console.error('Error copying to clipboard:', err);
                alert('Failed to copy link. Please copy this URL: ' + gameUrl);
            });
        }
    } catch (error) {
        console.error('Error sharing game:', error);
    }
}

// Admin Panel Functions
function toggleAdminPanel() {
    try {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel) {
            adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
        }
    } catch (error) {
        console.error('Error toggling admin panel:', error);
    }
}

function cancelAdminPanel() {
    try {
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel) adminPanel.style.display = 'none';
    } catch (error) {
        console.error('Error canceling admin panel:', error);
    }
}

function setupAdminPanel() {
    try {
        const seoForm = document.getElementById('seo-form');
        if (seoForm) {
            seoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const metaTitleInput = document.getElementById('meta-title-input')?.value;
                const metaDescriptionInput = document.getElementById('meta-description-input')?.value;

                const metaTitle = document.querySelector('title');
                const metaDescription = document.querySelector('meta[name="description"]');
                const ogTitle = document.querySelector('meta[property="og:title"]');
                const ogDescription = document.querySelector('meta[property="og:description"]');

                if (metaTitleInput && metaTitle && ogTitle) {
                    metaTitle.textContent = metaTitleInput;
                    document.title = metaTitleInput;
                    ogTitle.setAttribute('content', metaTitleInput);
                }
                if (metaDescriptionInput && metaDescription && ogDescription) {
                    metaDescription.setAttribute('content', metaDescriptionInput);
                    ogDescription.setAttribute('content', metaDescriptionInput);
                }

                const adminPanel = document.getElementById('admin-panel');
                if (adminPanel) adminPanel.style.display = 'none';
            });
        }
    } catch (error) {
        console.error('Error setting up admin panel:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupAdminPanel();
    adjustGameSize();
});
