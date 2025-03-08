// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const closeMenu = document.querySelector(".close-menu");
    const mobileMenu = document.querySelector(".mobile-menu");

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

    // Touch support for mobile
    hamburger.addEventListener("touchstart", (e) => {
        e.preventDefault();
        mobileMenu.classList.add("active");
    }, { passive: false });

    closeMenu.addEventListener("touchstart", (e) => {
        e.preventDefault();
        mobileMenu.classList.remove("active");
    }, { passive: false });
}

// Search Overlay
function setupSearch() {
    const searchIcon = document.querySelector(".search-icon");
    const searchOverlay = document.querySelector(".search-overlay");
    const searchInput = document.querySelector(".search-bar input");

    searchIcon.addEventListener("click", () => {
        searchOverlay.style.display = "block";
        searchInput.focus();
    });

    document.addEventListener("click", (e) => {
        if (!searchOverlay.contains(e.target) && e.target !== searchIcon) {
            searchOverlay.style.display = "none";
        }
    });

    // Touch support for mobile
    searchIcon.addEventListener("touchstart", (e) => {
        e.preventDefault();
        searchOverlay.style.display = "block";
        searchInput.focus();
    }, { passive: false });
}

// Fullscreen Toggle with Landscape Mode
function setupFullscreen() {
    const iframeContainer = document.querySelector(".iframe-container");
    const fullscreenIcon = document.querySelector(".fullscreen-icon");

    fullscreenIcon.addEventListener("click", () => {
        const iframe = iframeContainer.querySelector("iframe");
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }

        // Lock to landscape mode on mobile
        if (window.innerWidth <= 768 && screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch((error) => {
                console.log('Landscape mode not supported or locked:', error);
            });
        }
    });

    // Touch support for mobile
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
    }, { passive: false });
}

// Share Game
function setupShare() {
    const shareIcon = document.querySelector(".share-icon");
    shareIcon.addEventListener("click", shareGame);

    // Touch support for mobile
    shareIcon.addEventListener("touchstart", (e) => {
        e.preventDefault();
        shareGame();
    }, { passive: false });
}

function shareGame() {
    const shareUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('meta-title').textContent,
            text: document.getElementById('meta-description').content,
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

// Initialize All Functions
document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupSearch();
    setupFullscreen();
    setupShare();
});
