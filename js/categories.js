/**
 * Categories Navigation Logic
 * Handles rendering of category cards and navigation to FAQ page
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('categories-container');
    
    if (!container) return;

    // Clear loading state
    container.innerHTML = '';

    // Render category cards
    faqData.categories.forEach(category => {
        const card = createCategoryCard(category);
        container.appendChild(card);
    });
});

/**
 * Creates a category card element
 * @param {Object} category - The category object from data.js
 * @returns {HTMLElement} The card element
 */
function createCategoryCard(category) {
    const card = document.createElement('a');
    card.href = `faq.html?category=${category.id}`;
    card.className = 'category-card';
    card.setAttribute('aria-label', `View ${category.title} questions`);

    card.innerHTML = `
        <div class="category-icon">${category.icon}</div>
        <div class="category-content">
            <h3>${category.title}</h3>
            <p>${category.description}</p>
        </div>
        <div class="category-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    `;

    // Navigation logic handled by the anchor tag's default behavior
    // But we can add extra feedback if needed
    card.addEventListener('click', (e) => {
        // We could add analytics or transitions here
        console.log(`Navigating to ${category.title}`);
    });

    return card;
}
