// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const closeMenu = document.querySelector(".close-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (hamburger && closeMenu && mobileMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.add("active");
        });

        closeMenu.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });

        hamburger.addEventListener("touchstart", (e) => {
            e.preventDefault();
            mobileMenu.classList.add("active");
        }, { passive: true });

        closeMenu.addEventListener("touchstart", (e) => {
            e.preventDefault();
            mobileMenu.classList.remove("active");
        }, { passive: true });
    }
}

// Search Overlay
function setupSearch() {
    const searchIcon = document.querySelector(".search-icon");
    const searchOverlay = document.querySelector(".search-overlay");
    const searchInput = document.querySelector(".search-bar input");

    if (searchIcon && searchOverlay && searchInput) {
        searchIcon.addEventListener("click", () => {
            searchOverlay.style.display = "block";
            searchInput.focus();
        });

        document.addEventListener("click", (e) => {
            if (!searchOverlay.contains(e.target) && e.target !== searchIcon) {
                searchOverlay.style.display = "none";
            }
        });

        searchIcon.addEventListener("touchstart", (e) => {
            e.preventDefault();
            searchOverlay.style.display = "block";
            searchInput.focus();
        }, { passive: true });
    }
}

// Fullscreen Toggle with Landscape Mode
function setupFullscreen() {
    const iframeContainer = document.querySelector(".iframe-container");
    const fullscreenIcon = document.querySelector(".fullscreen-icon");

    if (iframeContainer && fullscreenIcon) {
        fullscreenIcon.addEventListener("click", () => {
            const iframe = iframeContainer.querySelector("iframe");
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
            }

            if (window.innerWidth <= 768 && screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch((error) => {
                    console.log('Landscape mode not supported or locked:', error);
                });
            }
        });

        fullscreenIcon.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const iframe = iframeContainer.querySelector("iframe");
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) {
                iframe.msRequestFullscreen();
            }

            if (window.innerWidth <= 768 && screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch((error) => {
                    console.log('Landscape mode not supported or locked:', error);
                });
            }
        }, { passive: true });
    }
}

// Share Game
function setupShare() {
    const shareIcon = document.querySelector(".share-icon");
    if (shareIcon) {
        shareIcon.addEventListener("click", shareGame);
        shareIcon.addEventListener("touchstart", (e) => {
            e.preventDefault();
            shareGame();
        }, { passive: true });
    }
}

function shareGame() {
    const shareUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('meta-title')?.textContent || document.title,
            text: document.getElementById('meta-description')?.content || 'Check out this page on Game Hub!',
            url: shareUrl
        }).then(() => console.log('Shared successfully'))
          .catch((error) => console.log('Error sharing:', error));
    } else {
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = shareUrl;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Link copied to clipboard: ' + shareUrl);
    }
}

// Debounce function to optimize filterGames performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized Filter Games
function filterGames() {
    const input = document.getElementById('searchInput');
    const gameCards = document.querySelectorAll('.game-card');
    const searchResults = document.getElementById('searchResults');

    if (!input || !searchResults || gameCards.length === 0) {
        return; // Skip if not on a page with game cards
    }

    const searchTerm = input.value.toLowerCase();
    searchResults.innerHTML = '';

    gameCards.forEach(card => {
        const title = card.querySelector('.game-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            const clone = card.cloneNode(true);
            searchResults.appendChild(clone);
        }
    });
}

const optimizedFilterGames = debounce(filterGames, 250);

// Attach filterGames to search input if it exists
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', optimizedFilterGames);
    }
});

// Initialize All Functions
document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupSearch();
    setupFullscreen();
    setupShare();
});
