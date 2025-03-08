// Toggle Mobile Menu
function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("active");
    console.log("Mobile menu toggled:", mobileMenu.classList.contains("active") ? "Opened" : "Closed");
}

// Search Overlay Functions
function openSearchOverlay() {
    const overlay = document.getElementById("searchOverlay");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeSearchOverlay() {
    const overlay = document.getElementById("searchOverlay");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}

function filterGames() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card, .scrolling-game-card");
    const searchResults = document.getElementById("searchResults");

    searchResults.innerHTML = "";

    let hasResults = false;

    gameCards.forEach(card => {
        const title = card.querySelector(".game-title").textContent.toLowerCase();
        if (title.includes(searchInput)) {
            const clonedCard = card.cloneNode(true);
            searchResults.appendChild(clonedCard);
            hasResults = true;
        }
    });

    if (!hasResults) {
        const noResults = document.createElement("p");
        noResults.textContent = "No games found.";
        noResults.style.color = "#fff";
        noResults.style.textAlign = "center";
        noResults.style.padding = "20px";
        searchResults.appendChild(noResults);
    }
}

// Auto-scroll for Scrolling Games
let scrollPosition = 0;
const scrollSpeed = 1;
const container = document.getElementById("scrollingContainer");

function autoScroll() {
    if (container) { // Check if container exists
        scrollPosition += scrollSpeed;
        if (scrollPosition >= container.scrollWidth - container.clientWidth) {
            scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
        requestAnimationFrame(autoScroll);
    } else {
        console.error("Scrolling container not found!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, starting autoScroll...");
    autoScroll();
});

// Fullscreen Function
function makeFullscreen() {
    const iframe = document.querySelector('.iframe-container iframe');
    if (iframe) {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    } else {
        console.error("Iframe not found!");
    }
}

// Share Function
function shareGame() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: "Check out this amazing game on Game Hub!",
            url: window.location.href
        }).then(() => console.log('Game shared successfully'))
          .catch((error) => console.error('Error sharing the game:', error));
    } else {
        alert('Sharing is not supported in this browser.');
    }
}
