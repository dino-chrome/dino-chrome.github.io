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
}

// Fullscreen Toggle
function setupFullscreen() {
    const iframeContainer = document.querySelector(".iframe-container");
    const fullscreenPrompt = document.querySelector(".fullscreen-prompt");
    const fullscreenButton = fullscreenPrompt.querySelector("button");
    const iframe = iframeContainer.querySelector("iframe");
    const fullscreenIcon = document.querySelector(".fullscreen-icon");

    function openFullscreen() {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) { /* Safari */
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { /* IE11 */
            iframe.msRequestFullscreen();
        }
        fullscreenPrompt.style.display = "none";
    }

    fullscreenIcon.addEventListener("click", () => {
        fullscreenPrompt.style.display = "block";
    });

    fullscreenButton.addEventListener("click", openFullscreen);
}

// Initialize All Functions
document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupSearch();
    setupFullscreen();
});
