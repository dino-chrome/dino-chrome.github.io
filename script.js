// Toggle Mobile Menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}
function adjustGameSize() {
        var iframe = document.querySelector("iframe");
        iframe.style.width = window.innerWidth + "px";
        iframe.style.height = window.innerHeight + "px";
    }
    window.onload = adjustGameSize;
    window.onresize = adjustGameSize;
// Open Search Overlay
function openSearchOverlay() {
    const searchOverlay = document.getElementById('searchOverlay');
    searchOverlay.style.display = 'block';
}

// Close Search Overlay
function closeSearchOverlay() {
    const searchOverlay = document.getElementById('searchOverlay');
    searchOverlay.style.display = 'none';
    document.getElementById('searchInput').value = ''; // Clear input
    document.getElementById('searchResults').innerHTML = ''; // Clear results
}

// Search Functionality
function filterGames() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Example game data (replace with your actual game list)
    const games = [
        { title: "Action Game 1", url: "game1.html", image: "images/action-game-1.jpg" },
        { title: "Puzzle Game 2", url: "game2.html", image: "images/puzzle-game-2.jpg" },
        { title: "Sports Game 3", url: "game3.html", image: "images/sports-game-3.jpg" },
        // Add more games as needed
    ];

    // Clear previous results
    searchResults.innerHTML = '';

    if (searchTerm === '') {
        searchResults.style.display = 'none';
        return;
    }

    // Filter games based on search term
    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm)
    );

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
}

// Fullscreen and Orientation Control
const iframeContainer = document.querySelector('.iframe-container');
const iframe = iframeContainer ? iframeContainer.querySelector('iframe') : null;
let isFullscreen = false;

// Toggle Fullscreen and Set Landscape Mode
function toggleFullscreen() {
    if (!iframeContainer) return; // Ensure iframe exists

    if (!isFullscreen) {
        if (iframeContainer.requestFullscreen) {
            iframeContainer.requestFullscreen();
        }
        // Set landscape orientation
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(err => console.error('Orientation lock failed:', err));
        }
        iframeContainer.classList.add('fullscreen');
        isFullscreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        screen.orientation.unlock();
        iframeContainer.classList.remove('fullscreen');
        iframeContainer.classList.add('portrait');
        isFullscreen = false;
    }
}

// Add Fullscreen Button Event Listener
const fullscreenIcon = document.querySelector('.fullscreen-icon');
if (fullscreenIcon) {
    fullscreenIcon.addEventListener('click', toggleFullscreen);
}

// Double Tap to Switch to Portrait Mode
if (iframeContainer) {
    iframeContainer.addEventListener('dblclick', () => {
        if (isFullscreen && screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock(); // Unlock orientation
            iframeContainer.classList.remove('fullscreen');
            iframeContainer.classList.add('portrait');
            setTimeout(() => {
                window.scrollTo(0, 0); // Reset scroll position
            }, 100);
        }
    });
}

// Swipe Detection (simplified for vertical swipe)
let touchStartY = 0;
if (iframeContainer) {
    iframeContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    iframeContainer.addEventListener('touchmove', (e) => {
        const touchEndY = e.touches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        if (Math.abs(deltaY) > 50 && isFullscreen) { // Threshold for swipe detection
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock(); // Unlock orientation
                iframeContainer.classList.remove('fullscreen');
                iframeContainer.classList.add('portrait');
                setTimeout(() => {
                    window.scrollTo(0, 0); // Reset scroll position
                }, 100);
            }
            e.preventDefault(); // Prevent default scrolling
        }
    }, { passive: false });
}

// Form Submission with Loading Spinner and Success/Error Message (from contact.html)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const form = this;
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');
        const formMessage = document.getElementById('form-message');

        // Disable button and show loading spinner
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        formMessage.style.display = 'none';
        formMessage.className = 'form-message'; // Reset classes

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formMessage.textContent = 'Message sent successfully!';
                formMessage.classList.add('success');
                form.reset(); // Reset the form
            } else {
                // Error
                formMessage.textContent = 'Failed to send message. Please try again.';
                formMessage.classList.add('error');
            }
        } catch (error) {
            // Network or other error
            formMessage.textContent = 'An error occurred. Please try again later.';
            formMessage.classList.add('error');
            console.error('Form submission error:', error);
        } finally {
            // Re-enable button and hide spinner
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            formMessage.style.display = 'block';
        }
    });
}
