// Program data loader for Commit 250
document.addEventListener('DOMContentLoaded', function() {
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
        
        // Populate all sections (including evolutions and final section)
        populateAllSections(data.sections);
        
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
    
    // Determine if this is the final section (ID 8) or a regular evolution
    if (section.id === 8) {
        card.className = 'gh-final-section';
        card.setAttribute('data-evolution', section.id);
        
        // Add animation delay based on ID
        card.style.animationDelay = `${section.id * 0.1}s`;
        
        card.innerHTML = `
            <div class="gh-final-content">
                <div class="gh-final-image">
                    <img src="${section.image}" alt="${section.title}" class="gh-final-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="gh-evolution-placeholder" style="display: none;">Final Image</div>
                </div>
                <div class="gh-final-text">
                    <h3 class="gh-final-title">${section.title}</h3>
                    <p class="gh-final-description">${section.description}</p>
                    <span class="gh-final-duration">${section.duration}</span>
                </div>
            </div>
        `;
    } else {
        card.className = 'gh-evolution-card';
        card.setAttribute('data-evolution', section.id);
        
        // Add animation delay based on ID
        card.style.animationDelay = `${section.id * 0.1}s`;
        
        card.innerHTML = `
            <div class="gh-evolution-content">
                <div class="gh-evolution-image">
                    <img src="${section.image}" alt="${section.title}" class="gh-evolution-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="gh-evolution-placeholder" style="display: none;">Image ${section.id}</div>
                </div>
                <div class="gh-evolution-text">
                    <h3 class="gh-evolution-title">${section.title}</h3>
                    <p class="gh-evolution-description">${section.description}</p>
                    <span class="gh-evolution-duration">${section.duration}</span>
                </div>
            </div>
        `;
    }
    
    return card;
} 