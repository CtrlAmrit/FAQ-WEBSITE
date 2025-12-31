/**
 * FAQ Questions Logic
 * Handles rendering of questions based on category and accordion functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');
    const categoryTitle = document.getElementById('category-title');
    const categoryDescription = document.getElementById('category-description');

    if (!faqContainer) return;

    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');

    // Find category data
    const category = faqData.categories.find(c => c.id === categoryId);
    const questions = faqData.questions[categoryId];

    if (!category || !questions) {
        showError('Category not found.');
        return;
    }

    // Update header
    categoryTitle.textContent = category.title;
    categoryDescription.textContent = category.description;

    // Render questions
    renderQuestions(questions, faqContainer);
});

/**
 * Renders the list of questions as an accordion
 * @param {Array} questions - Array of question objects
 * @param {HTMLElement} container - The container element
 */
function renderQuestions(questions, container) {
    container.innerHTML = '';

    if (questions.length === 0) {
        container.innerHTML = '<div class="loading">No questions found for this category.</div>';
        return;
    }

    questions.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <button class="faq-question" aria-expanded="false">
                <span>${item.question}</span>
                <span class="icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
            <div class="faq-answer">
                <div class="faq-answer-content">
                    <p>${item.answer}</p>
                </div>
            </div>
        `;

        // Add click event for accordion
        const button = faqItem.querySelector('.faq-question');
        button.addEventListener('click', () => {
            const isActive = faqItem.classList.contains('active');
            
            // Close all other items (optional, but common for accordions)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });

        container.appendChild(faqItem);
    });
}

/**
 * Displays an error message in the container
 * @param {string} message - The error message
 */
function showError(message) {
    const container = document.getElementById('faq-container');
    container.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <a href="index.html" class="back-link" style="margin-top: 1rem; display: inline-flex;">Return to categories</a>
        </div>
    `;
}
