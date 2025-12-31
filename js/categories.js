/**
 * Categories Page Logic
 * Renders FAQ categories from data.js
 */

document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories-container');
    
    if (!categoriesContainer) return;

    // Clear loading state
    categoriesContainer.innerHTML = '';

    // Render categories
    faqData.categories.forEach(category => {
        const categoryCard = document.createElement('a');
        categoryCard.href = `faq.html?category=${category.id}`;
        categoryCard.className = 'category-card';
        
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h2>${category.title}</h2>
            <p>${category.description}</p>
        `;
        
        categoriesContainer.appendChild(categoryCard);
    });
});
