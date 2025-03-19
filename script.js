// script.js

// Toggle Mobile Menu
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Adjust Game Size
function adjustGameSize() {
    const iframe = document.querySelector("iframe");
    const iframeContainer = document.querySelector(".iframe-container");
    if (iframe && iframeContainer) {
        // Only adjust if not in fullscreen mode
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
            const isMobile = window.innerWidth <= 768;
            const baseHeight = isMobile ? 350 : 610; // Use the heights: 200px for mobile, 350px for desktop
            iframe.style.height = `${baseHeight}px`;
            // Maintain a 16:9 aspect ratio for the iframe (width = height * 16/9)
            const containerWidth = baseHeight * (16 / 9);
            iframeContainer.style.maxWidth = `${containerWidth}px`;
        }
    }
}

// Open Search Overlay
function openSearchOverlay() {
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
        searchOverlay.style.display = 'block';
    }
}

// Close Search Overlay
function closeSearchOverlay() {
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
        searchOverlay.style.display = 'none';
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        if (searchInput) searchInput.value = ''; // Clear input
        if (searchResults) searchResults.innerHTML = ''; // Clear results
    }
}

// Search Functionality
function filterGames() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) return;

    const searchTerm = searchInput.value.toLowerCase().trim();

    // Game data from index.html
    const games = [
        { title: "Chrome Dino", url: "game/trending/dino-chrome.html", image: "images/trending/dino-chrome.webp" },
        { title: "1v1 LOL", url: "game/trending/1v1-lol.html", image: "images/trending/1v1.webp" },
        { title: "Capybara Clicker", url: "game/trending/capybara-clicker.html", image: "images/trending/Capybara Clicker .webp" },
        { title: "Age Of Arms-2", url: "game/trending/age-of-arms-2.html", image: "images/trending/Age Of Arms-2.webp" },
        { title: "Age of Tanks Warriors", url: "game/trending/age-of-tanks-warriors.html", image: "images/trending/Age of Tanks Warriors.webp" },
        { title: "Bonk.io", url: "game/trending/bonk-io.html", image: "images/trending/Bonk.io.webp" },
        { title: "Bridge Race", url: "game/trending/bridge-race.html", image: "images/trending/Bridge Race.webp" },
        { title: "Brutal Mania.io", url: "game/trending/brutal-mania-io.html", image: "images/trending/BrutalMania.io .webp" },
        { title: "Candy Clicker", url: "game/trending/candy-clicker.html", image: "images/trending/Candy Clicker .webp" },
        { title: "CarBall.io", url: "game/trending/car-ball-io.html", image: "images/trending/CarBall.io.webp" },
        { title: "Clash of Warriors", url: "game/trending/clash-of-warriors.html", image: "images/trending/Clash of Warriors.webp" },
        { title: "Corn Tycoon", url: "game/trending/corn-tycoon.html", image: "images/trending/Corn Tycoon.webp" },
        { title: "Craft Drill", url: "game/craft-drill.html", image: "images/Craft Drill .webp" },
        { title: "EpicBallz.io", url: "game/epic-balls-io.html", image: "images/EpicBallz.io .webp" },
        { title: "EvoWars.io", url: "game/evo-wars-io.html", image: "images/EvoWars.io.webp" },
        { title: "Flipped Chain Dunk", url: "game/flipped-chain-dunk.html", image: "images/Flipped Chain Dunk copy.webp" },
        { title: "Gridle", url: "game/gridle.html", image: "images/Gridle.webp" },
        { title: "Hexanaut.io", url: "game/hexanaut-io.html", image: "images/Hexanaut.io .webp" },
        { title: "Hoop World 3D", url: "game/hoop-world-3d.html", image: "images/Hoop World 3D.webp" },
        { title: "Idle Monster Slayer", url: "game/idle-monster-slayer.html", image: "images/Idle Monster Slayer.webp" },
        { title: "Jump Up 3D Mini Basketball", url: "game/jump-up-3d-mini-basketball.html", image: "images/Jump Up 3D Mini Basketball.webp" },
        { title: "Kirka.io", url: "game/kirka-io.html", image: "images/Kirka.io.webp" },
        { title: "Knife.io", url: "game/knife-io.html", image: "images/Knife.io.webp" },
        { title: "Park Town", url: "game/park-town.html", image: "images/Park Town.webp" },
        { title: "Pixel Warfare", url: "game/pixel-warfare.html", image: "images/Pixel Warfare .webp" },
        { title: "Planet Clicker", url: "game/planet-clicker.html", image: "images/Planet Clicker .webp" },
        { title: "Race Clicker", url: "game/race-clicker.html", image: "images/Race Clicker.webp" },
        { title: "Racing Limits", url: "game/racing-limits.html", image: "images/Racing Limits.webp" },
        { title: "Ragdoll Archers", url: "game/ragdoll-archers.html", image: "images/Ragdoll Archers .webp" },
        { title: "SandStrike.io", url: "game/sand-strike-io.html", image: "images/SandStrike.io.webp" },
        { title: "Planet Clicker2", url: "game/planet-clicker-2.html", image: "images/Planet Clicker 2.webp" },
        { title: "Shell Shockers", url: "game/shell-shockers.html", image: "images/Shell Shockers copy.webp" },
        { title: "Snake Shooter", url: "game/snake-shooters.html", image: "images/Snake Shooter .webp" },
        { title: "Space.io", url: "game/snake-io.html", image: "images/Space.io.webp" },
        { title: "Star Blast", url: "game/star-blast.html", image: "images/StarBlast .webp" },
        { title: "Stunt Paradise", url: "game/stunt-paradise.html", image: "images/Stunt Paradise.webp" },
        { title: "Tiny Auto Knights", url: "game/tiny-auto-knights.html", image: "images/Tiny Auto Knights .webp" },
        { title: "Zombie Crusher", url: "game/zombie-crusher.html", image: "images/Zombie Crusher .webp" },
        { title: "Taming Io", url: "game/taming-io.html", image: "images/Taming io.webp" },
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

// Auto-Ads Function
function injectAds() {
    // Determine if the device is mobile
    const isMobile = window.innerWidth <= 768;

    // Define ad configurations for desktop and mobile
    const adConfig = {
        topAd: isMobile ? `
            <script type="text/javascript">
                atOptions = {
                    'key' : 'YOUR_MOBILE_AD_KEY', // Replace with your mobile ad key
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/YOUR_MOBILE_AD_KEY/invoke.js"></script>
        ` : `
            <script type="text/javascript">
                atOptions = {
                    'key' : '41360cf0d57f3aa7d1abf42b0092caaa',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/41360cf0d57f3aa7d1abf42b0092caaa/invoke.js"></script>
        `,
        bottomAd: isMobile ? `
            <script type="text/javascript">
                atOptions = {
                    'key' : 'YOUR_MOBILE_AD_KEY', // Replace with your mobile ad key
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/YOUR_MOBILE_AD_KEY/invoke.js"></script>
        ` : `
            <script type="text/javascript">
                atOptions = {
                    'key' : '41360cf0d57f3aa7d1abf42b0092caaa',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/41360cf0d57f3aa7d1abf42b0092caaa/invoke.js"></script>
        `,
        articleAd: isMobile ? `
            <script type="text/javascript">
                atOptions = {
                    'key' : 'YOUR_MOBILE_AD_KEY', // Replace with your mobile ad key
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/YOUR_MOBILE_AD_KEY/invoke.js"></script>
        ` : `
            <script type="text/javascript">
                atOptions = {
                    'key' : '41360cf0d57f3aa7d1abf42b0092caaa',
                    'format' : 'iframe',
                    'height' : 90,
                    'width' : 728,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/41360cf0d57f3aa7d1abf42b0092caaa/invoke.js"></script>
        `,
        leftAd: `
            <script type="text/javascript">
                atOptions = {
                    'key' : '2828618d562a49bd24a0ed93745f6ad1',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/2828618d562a49bd24a0ed93745f6ad1/invoke.js"></script>
        `,
        rightAd: `
            <script type="text/javascript">
                atOptions = {
                    'key' : '2828618d562a49bd24a0ed93745f6ad1',
                    'format' : 'iframe',
                    'height' : 250,
                    'width' : 300,
                    'params' : {}
                };
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/2828618d562a49bd24a0ed93745f6ad1/invoke.js"></script>
        `
    };

    // Get existing ad containers
    const topAdContainer = document.querySelector('.ad-container.top-ad');
    const bottomAdContainer = document.querySelector('.ad-container.bottom-ad');
    const leftAdContainer = document.querySelector('.ad-container.left-ad');
    const rightAdContainer = document.querySelector('.ad-container.right-ad');

    // Create and insert the article ad container if it doesn't exist
    let articleAdContainer = document.querySelector('.ad-container.article-ad');
    if (!articleAdContainer) {
        const articleSection = document.querySelector('.article-section');
        if (articleSection) {
            articleAdContainer = document.createElement('div');
            articleAdContainer.className = 'ad-container article-ad';
            articleAdContainer.style.textAlign = 'center'; // Center the ad
            articleAdContainer.style.margin = '10px 0'; // Add some spacing
            articleSection.parentNode.insertBefore(articleAdContainer, articleSection);
        }
    }

    // Function to inject ad content
    function injectAd(container, adContent) {
        if (container && adContent) {
            // Only inject if not in full-screen mode
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
                container.innerHTML = adContent;
            }
        }
    }

    // Inject ads into containers
    injectAd(topAdContainer, adConfig.topAd);
    injectAd(bottomAdContainer, adConfig.bottomAd);
    injectAd(articleAdContainer, adConfig.articleAd);
    injectAd(leftAdContainer, adConfig.leftAd);
    injectAd(rightAdContainer, adConfig.rightAd);

    // Hide left and right ads on mobile
    if (isMobile) {
        if (leftAdContainer) leftAdContainer.style.display = 'none';
        if (rightAdContainer) rightAdContainer.style.display = 'none';
    }
}

// Fullscreen and Orientation Control
const iframeContainer = document.querySelector('.iframe-container');
const iframe = iframeContainer ? iframeContainer.querySelector('iframe') : null;
let isFullscreen = false;

// Toggle Fullscreen and Set Landscape Mode
function toggleFullscreen() {
    if (!iframeContainer) return; // Ensure iframe exists

    const adContainers = document.querySelectorAll('.ad-container');

    if (!isFullscreen) {
        // Hide all ad containers and clear their content when entering full-screen
        adContainers.forEach(container => {
            container.dataset.originalDisplay = container.style.display; // Store original display value
            container.style.display = 'none';
            container.innerHTML = ''; // Clear ad content to prevent any rendering
        });

        if (iframeContainer.requestFullscreen) {
            iframeContainer.requestFullscreen();
        } else if (iframeContainer.webkitRequestFullscreen) {
            iframeContainer.webkitRequestFullscreen();
        } else if (iframeContainer.msRequestFullscreen) {
            iframeContainer.msRequestFullscreen();
        }

        // Set landscape orientation
        if (screen.orientation && screen.orientation.lock) {
            screen.orientation.lock('landscape').catch(err => console.error('Orientation lock failed:', err));
        }
        iframeContainer.classList.add('fullscreen');
        isFullscreen = true;
    } else {
        // Exit full-screen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        screen.orientation.unlock();
        iframeContainer.classList.remove('fullscreen');
        iframeContainer.classList.add('portrait');
        isFullscreen = false;

        // Restore ad containers and re-inject ads
        adContainers.forEach(container => {
            container.style.display = container.dataset.originalDisplay || ''; // Restore original display value
        });
        injectAds(); // Re-inject ads when exiting full-screen
        adjustGameSize(); // Re-adjust iframe size after exiting fullscreen
    }
}

// Add Fullscreen Button Event Listener
function setupFullscreenButton() {
    const fullscreenIcon = document.querySelector('.fullscreen-icon');
    if (fullscreenIcon) {
        fullscreenIcon.addEventListener('click', toggleFullscreen);
    }
}

// Double Tap to Switch to Portrait Mode
function setupDoubleTap() {
    if (iframeContainer) {
        iframeContainer.addEventListener('dblclick', () => {
            if (isFullscreen && screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock(); // Unlock orientation
                iframeContainer.classList.remove('fullscreen');
                iframeContainer.classList.add('portrait');
                setTimeout(() => {
                    window.scrollTo(0, 0); // Reset scroll position
                }, 100);
                // Exit full-screen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    }
}

// Swipe Detection (simplified for vertical swipe)
let touchStartY = 0;
function setupSwipeDetection() {
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
                    // Exit full-screen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
                e.preventDefault(); // Prevent default scrolling
            }
        }, { passive: false });
    }
}

// Setup Full-Screen Event Listeners
function setupFullscreenListeners() {
    // Standard full-screen change event
    document.addEventListener('fullscreenchange', function() {
        const adContainers = document.querySelectorAll('.ad-container');
        if (!document.fullscreenElement) { // If exiting full-screen
            isFullscreen = false;
            if (iframeContainer) {
                iframeContainer.classList.remove('fullscreen');
                iframeContainer.classList.add('portrait');
            }
            screen.orientation.unlock();
            adContainers.forEach(container => {
                container.style.display = container.dataset.originalDisplay || '';
            });
            injectAds();
            adjustGameSize(); // Re-adjust iframe size after exiting fullscreen
        }
    });

    // Webkit-specific full-screen change event
    document.addEventListener('webkitfullscreenchange', function() {
        const adContainers = document.querySelectorAll('.ad-container');
        if (!document.webkitFullscreenElement) {
            isFullscreen = false;
            if (iframeContainer) {
                iframeContainer.classList.remove('fullscreen');
                iframeContainer.classList.add('portrait');
            }
            screen.orientation.unlock();
            adContainers.forEach(container => {
                container.style.display = container.dataset.originalDisplay || '';
            });
            injectAds();
            adjustGameSize(); // Re-adjust iframe size after exiting fullscreen
        }
    });

    // Mozilla-specific full-screen change event
    document.addEventListener('mozfullscreenchange', function() {
        const adContainers = document.querySelectorAll('.ad-container');
        if (!document.mozFullScreenElement) {
            isFullscreen = false;
            if (iframeContainer) {
                iframeContainer.classList.remove('fullscreen');
                iframeContainer.classList.add('portrait');
            }
            screen.orientation.unlock();
            adContainers.forEach(container => {
                container.style.display = container.dataset.originalDisplay || '';
            });
            injectAds();
            adjustGameSize(); // Re-adjust iframe size after exiting fullscreen
        }
    });
}

// Form Submission with Loading Spinner and Success/Error Message (from contact.html)
function setupContactForm() {
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
}

// Admin Panel Functions
function toggleAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
    }
}

function cancelAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
}

function setupAdminPanel() {
    const seoForm = document.getElementById('seo-form');
    if (seoForm) {
        seoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const metaTitleInput = document.getElementById('meta-title-input').value;
            const metaDescriptionInput = document.getElementById('meta-description-input').value;

            // Update meta tags
            const metaTitle = document.getElementById('meta-title');
            const metaDescription = document.getElementById('meta-description');
            const ogTitle = document.getElementById('og-title');
            const ogDescription = document.getElementById('og-description');

            if (metaTitleInput) {
                metaTitle.textContent = metaTitleInput;
                document.title = metaTitleInput;
                if (ogTitle) ogTitle.setAttribute('content', metaTitleInput);
            }
            if (metaDescriptionInput) {
                metaDescription.setAttribute('content', metaDescriptionInput);
                if (ogDescription) ogDescription.setAttribute('content', metaDescriptionInput);
            }

            // Hide admin panel after saving
            const adminPanel = document.getElementById('admin-panel');
            if (adminPanel) adminPanel.style.display = 'none';
        });
    }
}

// Share Game Function
function shareGame() {
    const gameTitle = document.querySelector('.game-title').textContent;
    const gameUrl = window.location.href;
    const shareText = `Check out ${gameTitle}! Play it here: ${gameUrl}`;

    if (navigator.share) {
        // Use Web Share API if available (mostly on mobile)
        navigator.share({
            title: gameTitle,
            text: shareText,
            url: gameUrl
        }).catch(err => console.error('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Game link copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
            alert('Failed to copy link. Please copy this URL: ' + gameUrl);
        });
    }
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Inject ads on page load
    injectAds();

    // Setup event listeners
    setupFullscreenButton();
    setupDoubleTap();
    setupSwipeDetection();
    setupFullscreenListeners();
    setupContactForm();
    setupAdminPanel();

    // Call adjustGameSize to ensure initial sizing
    adjustGameSize();
});

// Ensure adjustGameSize is called on window load and resize
window.onload = adjustGameSize;
window.onresize = adjustGameSize;
