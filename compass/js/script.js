// ========================================
// Compass Polar Landing Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === Navbar Background on Scroll ===
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(10, 14, 26, 0.95)';
            nav.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.1)';
        } else {
            nav.style.background = 'rgba(10, 14, 26, 0.9)';
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // === Animated Compass Heading ===
    const headingNumber = document.querySelector('.heading-number');
    const headingDirection = document.querySelector('.heading-direction');

    if (headingNumber && headingDirection) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const angles = [0, 45, 90, 135, 180, 225, 270, 315];
        let currentIndex = 7; // Start at NW (315°)

        // Rotate through directions
        setInterval(() => {
            currentIndex = (currentIndex + 1) % directions.length;
            const newAngle = angles[currentIndex];
            const newDirection = directions[currentIndex];

            // Animate number change
            headingNumber.style.opacity = '0';
            headingDirection.style.opacity = '0';

            setTimeout(() => {
                headingNumber.textContent = newAngle + '°';
                headingDirection.textContent = newDirection;
                headingNumber.style.opacity = '1';
                headingDirection.style.opacity = '1';
            }, 150);

        }, 3000); // Change every 3 seconds
    }

    // === Scroll Reveal Animation ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.feature-card, .use-case-card, .design-content, .section-header'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // === Parallax Effect for Background Orbs ===
    const orb1 = document.querySelector('.glow-orb-1');
    const orb2 = document.querySelector('.glow-orb-2');

    if (orb1 && orb2) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate1 = scrolled * 0.3;
            const rate2 = scrolled * 0.5;

            orb1.style.transform = `translate(${rate1}px, ${rate1}px)`;
            orb2.style.transform = `translate(${-rate2}px, ${-rate2}px)`;
        });
    }

    // === Feature Card Hover Effect ===
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add extra glow on hover
            this.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            // Reset to normal glow
            this.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)';
        });
    });

    // === Button Click Effect ===
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 240, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // === Stats Counter Animation ===
    const stats = document.querySelectorAll('.stat-value');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateStats();
                statsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    function animateStats() {
        stats.forEach(stat => {
            const finalText = stat.textContent;
            stat.style.opacity = '0';

            setTimeout(() => {
                stat.style.transition = 'opacity 0.5s ease';
                stat.style.opacity = '1';

                // Add a pulse effect
                stat.style.animation = 'pulse 1s ease-in-out';
            }, 100);
        });
    }

    // === Compass Ring Rotation Speed Control ===
    const compassRing = document.querySelector('.compass-ring');
    if (compassRing) {
        let rotationSpeed = 30; // seconds per rotation

        // Speed up on hover
        const compassMockup = document.querySelector('.compass-mockup');
        if (compassMockup) {
            compassMockup.addEventListener('mouseenter', function() {
                compassRing.style.animationDuration = '10s';
            });

            compassMockup.addEventListener('mouseleave', function() {
                compassRing.style.animationDuration = '30s';
            });
        }
    }

    // === Randomize Compass on Load ===
    if (headingNumber && headingDirection) {
        const randomIndex = Math.floor(Math.random() * 8);
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const angles = [0, 45, 90, 135, 180, 225, 270, 315];

        headingNumber.textContent = angles[randomIndex] + '°';
        headingDirection.textContent = directions[randomIndex];
    }

    // === Keyboard Navigation Enhancement ===
    document.addEventListener('keydown', function(e) {
        // Press 'D' to jump to download section
        if (e.key === 'd' || e.key === 'D') {
            const downloadSection = document.querySelector('#download');
            if (downloadSection) {
                downloadSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Press 'F' to jump to features section
        if (e.key === 'f' || e.key === 'F') {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // === Console Easter Egg ===
    console.log('%c⬡ Compass Polar ⬡', 'color: #00F0FF; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00F0FF;');
    console.log('%cFuturistic Navigation at Your Fingertips', 'color: #B026FF; font-size: 14px;');
    console.log('%c\nKeyboard Shortcuts:\n• Press "F" to jump to Features\n• Press "D" to jump to Download', 'color: #8A9AC6; font-size: 12px;');

    // === Performance Optimization: Reduce Motion ===
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // === Dynamic Year in Footer ===
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
    }

});

// === Utility Functions ===

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
