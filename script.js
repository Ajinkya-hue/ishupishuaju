/* =============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Interactive Features & Functionality
   ============================================= */

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

navToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================================
// 2. SMOOTH SCROLL NAVIGATION
// ============================================

/**
 * Handle smooth scroll navigation
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            updateActiveLink();
        }
    });
});

// ============================================
// 3. ACTIVE LINK HIGHLIGHTING ON SCROLL
// ============================================

/**
 * Update active navigation link based on current scroll position
 */
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// 4. NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');

/**
 * Add scroll effect to navbar
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scroll-active');
    } else {
        navbar.classList.remove('scroll-active');
    }
});

// ============================================
// 5. SCROLL REVEAL ANIMATION
// ============================================

/**
 * Reveal elements as they come into view using Intersection Observer API
 */
const revealElements = () => {
    const reveals = document.querySelectorAll('.project-card, .experience-card, .skill-category, .about-content, .resume-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
};

// Run on page load
document.addEventListener('DOMContentLoaded', revealElements);

// ============================================
// 6. FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('formMessage');

/**
 * Validate email format using regex
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error message for a form field
 */
function showError(input, errorElement, message) {
    input.parentElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

/**
 * Clear error message for a form field
 */
function clearError(input, errorElement) {
    input.parentElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

/**
 * Validate form inputs
 */
function validateForm() {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, document.getElementById('nameError'), 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(nameInput, document.getElementById('nameError'));
    }

    // Validate email
    if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, document.getElementById('emailError'), 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailInput, document.getElementById('emailError'));
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, document.getElementById('messageError'), 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError(messageInput, document.getElementById('messageError'));
    }

    return isValid;
}

/**
 * Handle form submission
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Simulate form submission
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
    };

    // Show success message
    formMessage.textContent = `Thank you ${formData.name}! I'll get back to you soon.`;
    formMessage.classList.add('show', 'success');

    // Clear form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);

    // In a real application, you would send this data to a server
    console.log('Form submitted with data:', formData);
});

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, document.getElementById('nameError'), 'Name must be at least 2 characters');
    } else {
        clearError(nameInput, document.getElementById('nameError'));
    }
});

emailInput.addEventListener('blur', () => {
    if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, document.getElementById('emailError'), 'Please enter a valid email address');
    } else {
        clearError(emailInput, document.getElementById('emailError'));
    }
});

messageInput.addEventListener('blur', () => {
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, document.getElementById('messageError'), 'Message must be at least 10 characters');
    } else {
        clearError(messageInput, document.getElementById('messageError'));
    }
});

// ============================================
// 7. KEYBOARD NAVIGATION
// ============================================

/**
 * Handle keyboard navigation for accessibility
 */
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ============================================
// 8. PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Debounce function to optimize scroll event listeners
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
window.addEventListener('scroll', debounce(updateActiveLink, 100));

// ============================================
// 9. PROJECT FILTERING (Optional Enhancement)
// ============================================

/**
 * Filter projects by technology tags
 */
function initProjectFilters() {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('[data-filter]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const tags = card.getAttribute('data-tags');
                if (filter === 'all' || tags.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Optional: Uncomment to enable project filtering
// document.addEventListener('DOMContentLoaded', initProjectFilters);

// ============================================
// 10. DARK/LIGHT MODE TOGGLE (Optional)
// ============================================

/**
 * Toggle between dark and light mode
 * Store preference in localStorage
 */
function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Optional: Call on page load
// document.addEventListener('DOMContentLoaded', initThemeToggle);

// ============================================
// 11. SMOOTH ANCHOR LINKS WITH OFFSET
// ============================================

/**
 * Handle anchor links with navbar offset for sticky navigation
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Offset for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 12. PAGE LOAD ANIMATIONS
// ============================================

/**
 * Initialize page load animations
 */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ============================================
// 13. SOCIAL LINKS TRACKING (Optional Analytics)
// ============================================

/**
 * Track social link clicks for analytics
 */
document.querySelectorAll('a[href*="github.com"], a[href*="linkedin.com"], a[href*="twitter.com"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const platform = link.href.includes('github') ? 'GitHub' 
                       : link.href.includes('linkedin') ? 'LinkedIn' 
                       : link.href.includes('twitter') ? 'Twitter' 
                       : 'Other';
        
        // Log for analytics (optional)
        console.log(`Social link clicked: ${platform}`);
    });
});

// ============================================
// 14. RESUME DOWNLOAD TRACKING
// ============================================

/**
 * Track resume downloads
 */
const resumeButton = document.querySelector('[href*="resume.pdf"]');
if (resumeButton) {
    resumeButton.addEventListener('click', () => {
        console.log('Resume download initiated');
        // Can be used for analytics tracking
    });
}

// ============================================
// 15. UTILITY FUNCTIONS
// ============================================

/**
 * Scroll to top function
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// ============================================
// 16. ACCESSIBILITY ENHANCEMENTS
// ============================================

/**
 * Add skip to main content link (accessibility)
 */
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
document.body.prepend(skipLink);

// ============================================
// 17. INITIALIZATION ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully');
    
    // Initialize all features
    updateActiveLink();
    
    // Add animation to elements on load
    const animations = document.querySelectorAll('.project-card, .experience-card, .skill-category');
    animations.forEach((element, index) => {
        element.style.animation = `slideInUp 0.6s ease ${index * 0.1}s forwards`;
        element.style.opacity = '0';
    });
});

// ============================================
// 18. PERFORMANCE MONITORING
// ============================================

/**
 * Log performance metrics (optional)
 */
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

// ============================================
// 19. ERROR HANDLING
// ============================================

/**
 * Global error handler
 */
window.addEventListener('error', (error) => {
    console.error('An error occurred:', error);
    // In a real application, you might send this to an error tracking service
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // In a real application, you might send this to an error tracking service
});

// ============================================
// 20. END OF SCRIPT
// ============================================

console.log('All portfolio features initialized');