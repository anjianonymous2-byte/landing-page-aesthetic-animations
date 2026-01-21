// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.animate-fade-up, .animate-slide-left, .animate-slide-right, .animate-scale-up'
);
animatedElements.forEach(el => observer.observe(el));

// ===========================
// FLOATING BAR ON SCROLL
// ===========================
let lastScroll = 0;
const floatingBar = document.getElementById('floatingBar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 300) {
        floatingBar.classList.add('visible');
    } else {
        floatingBar.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// FAQ ACCORDION
// ===========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

// ===========================
// SMOOTH SCROLL FOR CTA BUTTONS
// ===========================
const ctaButtons = document.querySelectorAll('.cta-btn');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Here you would add your payment/checkout logic
        // For now, we'll scroll to pricing or show an alert
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Example: Open payment page (replace with your actual payment URL)
        // window.location.href = 'https://your-payment-link.com';
    });
});

// ===========================
// VIDEO CARD INTERACTIONS
// ===========================
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        // Add pulse animation
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = '';
        }, 10);
        
        // Here you could open a modal with the video preview
        // For now, we'll just add a visual feedback
        const playButton = card.querySelector('.play-button');
        if (playButton) {
            playButton.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                playButton.style.transform = '';
            }, 300);
        }
    });
});

// ===========================
// PARALLAX EFFECT FOR HERO GLOW
// ===========================
const heroGlow = document.querySelector('.hero-glow');

if (heroGlow) {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        heroGlow.style.transform = `translateX(calc(-50% + ${mouseX * 50}px)) translateY(${mouseY * 30}px)`;
    });
}

// ===========================
// PERFORMANCE: LAZY LOAD IMAGES
// ===========================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===========================
// TESTIMONIAL CAROUSEL PAUSE ON HOVER
// ===========================
const carouselTrack = document.querySelector('.carousel-track');

if (carouselTrack) {
    carouselTrack.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
}

// ===========================
// MOBILE MENU TOUCH OPTIMIZATION
// ===========================
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// ===========================
// PREVENT ZOOM ON DOUBLE TAP (iOS)
// ===========================
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ===========================
// ANALYTICS & TRACKING (Optional)
// ===========================
// Track CTA button clicks
ctaButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // Example: Google Analytics event tracking
        // gtag('event', 'cta_click', {
        //     'button_location': button.className,
        //     'button_index': index
        // });
        
        console.log(`CTA Button clicked: ${button.textContent}`);
    });
});

// Track FAQ interactions
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        console.log(`FAQ opened: ${question.textContent}`);
    });
});

// Track video card clicks
videoCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        console.log(`Video card clicked: ${card.querySelector('.video-title').textContent}`);
    });
});

// ===========================
// PAGE LOAD OPTIMIZATIONS
// ===========================
window.addEventListener('load', () => {
    // Remove loading states if any
    document.body.classList.add('loaded');
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('.hero img, .samples img');
    criticalImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// ===========================
// EASTER EGG: KONAMI CODE
// ===========================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===========================
// ACCESSIBILITY IMPROVEMENTS
// ===========================
// Add keyboard navigation for video cards
videoCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', card.querySelector('.video-title').textContent);
    
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Add ARIA labels to CTA buttons
ctaButtons.forEach(button => {
    if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', button.textContent.trim());
    }
});

// ===========================
// ERROR HANDLING
// ===========================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could send this to an error tracking service
});

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🚀 2026 Viral Aesthetic Animations Bundle', 'font-size: 24px; font-weight: bold; color: #8b5cf6;');
console.log('%cBuilt with love ❤️ | Optimized for performance ⚡', 'font-size: 14px; color: #a0a0a0;');
console.log('%cDPK Digitals - Premium Digital Assets', 'font-size: 12px; color: #667eea;');

// ===========================
// SERVICE WORKER (Optional - for PWA)
// ===========================
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}
