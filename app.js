// Global variables
const typingRoles = [
    'Aspiring Data Scientist',
    'Machine Learning Enthusiast', 
    'AI/ML Student',
    'Problem Solver',
    'Research Enthusiast',
    'Innovation Seeker'
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const typingText = document.getElementById('typing-text');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeContactForm();
    initializeScrollBehavior();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call once to set initial state

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    if (!typingText) return;
    
    function typeRole() {
        const currentRole = typingRoles[currentRoleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % typingRoles.length;
            typingSpeed = 500; // Pause before typing next role
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    typeRole();
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in animation to various elements
    const animatedElements = [
        '.section-header',
        '.about-text',
        '.stats-grid',
        '.education-item',
        '.skill-category',
        '.project-card',
        '.publication-card',
        '.timeline-item',
        '.achievement-card',
        '.cert-card',
        '.connect-card',
        '.contact-info',
        '.contact-form',
        '.follow-item'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const subject = formData.get('subject').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Create mailto link to send email directly
        const mailtoLink = `mailto:thannirudharmanithin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message after a short delay
        setTimeout(() => {
            showFormMessage('Opening your email client to send the message...', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 500);
    });
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Scroll behavior improvements
function initializeScrollBehavior() {
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#'
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top functionality
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopButton.className = 'scroll-to-top';
    scrollToTopButton.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: var(--bg-navy);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            transition: var(--transition);
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: all;
        }
        
        .scroll-to-top:hover {
            background: var(--secondary-color);
            transform: translateY(-3px);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 1.5rem;
                right: 1.5rem;
                font-size: 1rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scrollToTopButton);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add enhanced loading animation
function addLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="neural-loader"></div>
            <p>Initializing Data Science Portfolio...</p>
            <div class="loading-progress"></div>
        </div>
    `;
    
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--bg-navy) 0%, #0d1929 50%, #112240 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        }
        
        .loading-spinner {
            text-align: center;
            color: var(--primary-color);
        }
        
        .neural-loader {
            width: 80px;
            height: 80px;
            position: relative;
            margin: 0 auto 2rem;
        }
        
        .neural-loader::before,
        .neural-loader::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            animation: neuralSpin 2s linear infinite;
        }
        
        .neural-loader::before {
            width: 80px;
            height: 80px;
            border: 4px solid rgba(100, 255, 218, 0.2);
            border-top: 4px solid var(--primary-color);
        }
        
        .neural-loader::after {
            width: 60px;
            height: 60px;
            top: 10px;
            left: 10px;
            border: 3px solid rgba(0, 212, 255, 0.2);
            border-top: 3px solid var(--secondary-color);
            animation-direction: reverse;
            animation-duration: 1.5s;
        }
        
        @keyframes neuralSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-progress {
            width: 200px;
            height: 3px;
            background: rgba(100, 255, 218, 0.2);
            border-radius: 2px;
            margin: 1rem auto 0;
            overflow: hidden;
            position: relative;
        }
        
        .loading-progress::after {
            content: '';
            position: absolute;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            animation: progressSlide 2s ease-in-out infinite;
        }
        
        @keyframes progressSlide {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .loading-overlay.fade-out {
            opacity: 0;
            pointer-events: none;
        }
        
        .loading-spinner p {
            font-size: 1.1rem;
            margin-bottom: 1rem;
            color: var(--text-lighter);
        }
    `;
    
    document.head.appendChild(loadingStyles);
    document.body.prepend(loadingOverlay);
    
    // Remove loading overlay after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Add enhanced scroll effects
function addEnhancedScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // Add floating animation to profile photo
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        let floatDirection = 1;
        setInterval(() => {
            profilePhoto.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 10}px)`;
        }, 16);
    }
}

// Initialize loading animation
addLoadingAnimation();

// Initialize enhanced scroll effects
addEnhancedScrollEffects();

// Performance optimization: Lazy load images if any are added later
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme switcher (optional enhancement)
function initializeThemeSwitcher() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        // Could add logic here to switch between light/dark themes
        // Currently, the portfolio is designed with a dark theme
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Console signature
console.log(`
    ╔══════════════════════════════════════╗
    ║                                      ║
    ║        Thanniru Dharma Nithin        ║
    ║   Data Science & AI/ML Portfolio     ║
    ║                                      ║
    ║        Powered by passion for        ║
    ║           data & AI innovation       ║
    ║                                      ║
    ╚══════════════════════════════════════╝
`);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        showFormMessage
    };
}