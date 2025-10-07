/* Mobile menu burger toggle */
(function () {
    const navigation = document.querySelector('.gh-navigation');
    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('is-open')) {
            navigation.classList.add('is-open');
            document.documentElement.style.overflowY = 'hidden';
        } else {
            navigation.classList.remove('is-open');
            document.documentElement.style.overflowY = null;
        }
    });
})();

/* Add lightbox to gallery images */
(function () {
    lightbox(
        '.kg-image-card > .kg-image[width][height], .kg-gallery-image > img'
    );
})();

/* Responsive video in post content */
(function () {
    const sources = [
        '.gh-content iframe[src*="youtube.com"]',
        '.gh-content iframe[src*="youtube-nocookie.com"]',
        '.gh-content iframe[src*="player.vimeo.com"]',
        '.gh-content iframe[src*="kickstarter.com"][src*="video.html"]',
        '.gh-content object',
        '.gh-content embed',
    ];
    reframe(document.querySelectorAll(sources.join(',')));
})();

/* Turn the main nav into dropdown menu when there are more than 5 menu items */
(function () {
    dropdown();
})();

/* Infinite scroll pagination */
(function () {
    if (!document.body.classList.contains('home-template') && !document.body.classList.contains('post-template')) {
        pagination();
    }
})();

/* Responsive HTML table */
(function () {
    const tables = document.querySelectorAll('.gh-content > table:not(.gist table)');
    
    tables.forEach(function (table) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gh-table';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
})();

/* Partners carousel */
(function () {
    function initCarousel() {
        const carousel = document.querySelector('.gh-partners-carousel');
        const track = document.querySelector('.gh-partners-track');
        
        if (!carousel || !track) {
            console.log('Carousel elements not found');
            return;
        }
        
        // Calculate the width of one partner item (including gap)
        const partnerItems = track.querySelectorAll('.gh-partner');
        if (partnerItems.length === 0) {
            console.log('No partner items found');
            return;
        }
        
        // Get the width of the first partner item
        const firstPartner = partnerItems[0];
        const partnerWidth = firstPartner.offsetWidth;
        const gap = 40; // This should match the CSS gap value
        const itemWidth = partnerWidth + gap;
        
        // Calculate total width for one complete set of partners
        const totalWidth = itemWidth * (partnerItems.length / 2); // Divide by 2 because we have duplicates
        
        // Set the animation duration based on 6 seconds per partner
        const duration = (partnerItems.length / 2) * 6; // 6 seconds per partner
        
        console.log('Carousel setup:', {
            partnerWidth,
            itemWidth,
            totalWidth,
            duration,
            partnerCount: partnerItems.length
        });
        
        // Create the keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes partnersScroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${totalWidth}px);
                }
            }
            .gh-partners-track {
                animation: partnersScroll ${duration}s linear infinite;
                animation-play-state: running;
            }
            .gh-partners-track:hover {
                animation-play-state: paused;
            }
        `;
        document.head.appendChild(style);
        
        // Handle window resize to recalculate dimensions
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Remove old style and recalculate
                style.remove();
                initCarousel();
            }, 250);
        });
    }
    
    // Wait for DOM to be ready and images to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit more for images to load
            setTimeout(initCarousel, 500);
        });
    } else {
        // DOM is already ready, wait for images
        setTimeout(initCarousel, 500);
    }
})();