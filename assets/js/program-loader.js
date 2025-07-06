// Program data loader for Commit 250
document.addEventListener('DOMContentLoaded', function () {
    loadProgramData();
});

async function loadProgramData() {
    try {
        // Fetch the JSON data
        const response = await fetch('/assets/data/program.json');
        if (!response.ok) {
            throw new Error('Failed to load program data');
        }

        const data = await response.json();

        // Populate all sections
        populateAllSections(data.program_structure);
        populateDesignCards(data.program_design);
        populateFaqCards(data.program_faq);

    } catch (error) {
        console.error('Error loading program data:', error);
        // Fallback to static content if JSON fails to load
    }
}

function populateAllSections(sections) {
    const programContent = document.getElementById('program-content');
    if (!programContent) return;

    // Clear existing content
    programContent.innerHTML = '';

    // Sort sections by ID to ensure proper order
    const sortedSections = sections.sort((a, b) => a.id - b.id);

    // Create cards for all sections
    sortedSections.forEach((section, index) => {
        const card = createSectionCard(section, index);
        programContent.appendChild(card);
    });
}

function createSectionCard(section, index) {
    const card = document.createElement('div');

    // Determine if this is the final section (ID 8) or a regular section

    card.className = 'gh-section-card';
    card.setAttribute('data-section', section.id);

    // Add animation delay based on ID
    card.style.animationDelay = `${section.id * 0.1}s`;

            card.innerHTML = `
            <div class="gh-section-content">
                ${section.image && section.image.trim() !== '' ? `
                <div class="gh-section-image">
                    <img src="${section.image}" alt="${section.title}" class="gh-section-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="gh-section-placeholder" style="display: none;"></div>
                </div>
                ` : ''}
                <div class="gh-section-text">
                    <h3 class="gh-section-title">${section.title}</h3>
                    <p class="gh-section-description">${section.description}</p>
                    <span class="gh-section-duration">${section.duration}</span>
                    ${section.url ? `<a href="${section.url}" target="_blank" rel="noopener noreferrer" class="gh-learn-more-btn">Learn More</a>` : ''}
                </div>
            </div>
        `;

    return card;
}

function populateDesignCards(designs) {
    const designContainer = document.getElementById('design-cards');
    if (!designContainer || !designs) return;

    // Clear existing content
    designContainer.innerHTML = '';

    // Sort designs by ID to ensure proper order
    const sortedDesigns = designs.sort((a, b) => a.id - b.id);

    // Create cards for all designs
    sortedDesigns.forEach((design, index) => {
        const card = createSectionCard(design, index);
        designContainer.appendChild(card);
    });
}

function populateFaqCards(faqs) {
    const faqContainer = document.getElementById('faq-cards');
    if (!faqContainer || !faqs) return;

    // Clear existing content
    faqContainer.innerHTML = '';

    // Sort FAQs by ID to ensure proper order
    const sortedFaqs = faqs.sort((a, b) => a.id - b.id);

    // Create cards for all FAQs
    sortedFaqs.forEach((faq, index) => {
        const card = createSectionCard(faq, index);
        faqContainer.appendChild(card);
    });
}
