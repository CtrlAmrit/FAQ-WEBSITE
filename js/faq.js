/**
 * FAQ Page Logic
 * Renders questions based on category and handles accordion behavior
 */

document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');
    const categoryTitle = document.getElementById('category-title');
    const categoryDescription = document.getElementById('category-description');
    
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category') || 'general';

    // Find category data
    const category = faqData.categories.find(c => c.id === categoryId);
    const questions = faqData.questions[categoryId] || [];

    if (category) {
        categoryTitle.textContent = `${category.icon} ${category.title}`;
        categoryDescription.textContent = category.description;
        document.title = `${category.title} FAQ | Help Center`;
    }

    // Render Questions
    if (questions.length === 0) {
        faqContainer.innerHTML = '<p class="no-results">No questions found in this category.</p>';
        return;
    }

    faqContainer.innerHTML = '';
    questions.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <button class="faq-question">
                ${item.question}
                <span class="icon">▼</span>
            </button>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        
        faqContainer.appendChild(faqItem);

        // Add Click Event for Accordion
        const button = faqItem.querySelector('.faq-question');
        button.addEventListener('click', () => {
            const isActive = faqItem.classList.contains('active');
            
            // Close all other items (optional, but cleaner)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});
