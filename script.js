// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Hub is ready!");

    // Add dark mode toggle functionality
    initializeDarkMode();

    // Add category filter functionality
    addCategoryFiltering();

    // Automatically update meta description based on game title
    updateMetaDescription();

    // Scroll continuity for scrolling games
    const scrollingContainer = document.querySelector(".scrolling-container");
    const cards = [...document.querySelectorAll(".scrolling-game-card")];

    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const totalWidth = (cardWidth + gap) * cards.length;

    let speed = 2;
    let isPaused = false;
    let isUserInteracting = false;
    let startX, scrollLeft;
    let interactionTimeout;
    let isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    function loop() {
        if (!isPaused && !isUserInteracting) {
            cards.forEach((card) => {
                const currentLeft = parseFloat(card.style.left || card.offsetLeft);
                const newLeft = currentLeft - speed;

                if (newLeft + cardWidth < 0) {
                    card.style.left = `${currentLeft + totalWidth}px`;
                } else {
                    card.style.left = `${newLeft}px`;
                }
            });
        }
        requestAnimationFrame(loop);
    }

    let initialLeft = 0;
    cards.forEach((card) => {
        card.style.position = "absolute";
        card.style.left = `${initialLeft}px`;
        initialLeft += cardWidth + gap;
    });

    loop();

    if (!isMobile) {
        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                isPaused = true;
            });
            card.addEventListener("mouseleave", () => {
                isPaused = false;
            });
        });
    }

    if (isMobile) {
        scrollingContainer.addEventListener("touchstart", (e) => {
            isUserInteracting = true;
            clearTimeout(interactionTimeout);
            startX = e.touches[0].pageX;
            scrollLeft = scrollingContainer.scrollLeft;
        });

        scrollingContainer.addEventListener("touchmove", (e) => {
            const x = e.touches[0].pageX;
            const walk = startX - x;
            scrollingContainer.scrollLeft = scrollLeft + walk;
        });

        scrollingContainer.addEventListener("touchend", () => {
            interactionTimeout = setTimeout(() => {
                isUserInteracting = false;
            }, 3000);
        });
    }

    // Scrollable description
    const descriptionSection = document.querySelector('.game-description');
    if (descriptionSection) {
        const wordLimit = 400;
        const words = descriptionSection.innerText.split(/\s+/).length;
        if (words > wordLimit) {
            descriptionSection.style.maxHeight = '200px';
            descriptionSection.style.overflowY = 'auto';
        }
    }
});

// Open Search Section
function openSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Close Search Section
function closeSearchSection() {
    const searchSection = document.getElementById("search-section");
    searchSection.style.display = "none";
    document.body.style.overflow = "auto";
}

// Filter Games in Overlay
function filterGamesOverlay() {
    const searchBar = document.getElementById("overlay-search-bar");
    const searchText = searchBar.value.toLowerCase();
    const gameCards = document.querySelectorAll(".game-card");
    const searchResultsGrid = document.getElementById("search-results-grid");

    searchResultsGrid.innerHTML = "";
    let hasResults = false;

    gameCards.forEach((card) => {
        const title = card.querySelector(".game-title").textContent.toLowerCase();
        if (title.includes(searchText)) {
            const clonedCard = card.cloneNode(true);
            searchResultsGrid.appendChild(clonedCard);
            hasResults = true;
        }
    });

    if (!hasResults) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.id = "no-results";
        noResultsMessage.textContent = "No games found.";
        noResultsMessage.style.textAlign = "center";
        noResultsMessage.style.color = "red";
        searchResultsGrid.appendChild(noResultsMessage);
    }
}

// Dark Mode Toggle
function initializeDarkMode() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

// Add Category Filtering
function addCategoryFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gameCards = document.querySelectorAll(".game-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            gameCards.forEach((card) => {
                const cardCategories = card.dataset.category ? card.dataset.category.split(" ") : [];
                if (category === "all" || cardCategories.includes(category)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
}

// Automatically update meta description
function updateMetaDescription() {
    const metaDescription = document.querySelector('meta[name="description"]');
    const gameTitleElement = document.querySelector('.game-title');
    if (metaDescription && gameTitleElement) {
        const gameTitle = gameTitleElement.innerText;
        metaDescription.content = `Play ${gameTitle} on Game Hub! Enjoy this exciting game and explore more.`;
    }
}

function makeFullscreen() {
    const iframe = document.querySelector('.iframe-container iframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

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

function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.style.left === '0px') {
        mobileMenu.style.left = '-100%';
    } else {
        mobileMenu.style.left = '0';
    }
}
