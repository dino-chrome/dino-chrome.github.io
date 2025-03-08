// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Game Hub is ready!");

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
            noResultsMessage.textContent = "No games found.";
            noResultsMessage.style.textAlign = "center";
            noResultsMessage.style.color = "red";
            searchResultsGrid.appendChild(noResultsMessage);
        }
    }
});
