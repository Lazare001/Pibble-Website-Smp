// Navigation and Section Switching
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('.section');
const cursorTrail = document.querySelector('.cursor-trail');
const scrollToTopBtn = document.createElement('button');

// Create scroll to top button
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
document.body.appendChild(scrollToTopBtn);

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active navigation link based on scroll position
function updateActiveLink() {
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

// Navbar scroll effect
function updateNavbar() {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.85)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = '#0d0d0d';
    }
}

// Mobile menu toggle (removed as no mobile menu in new nav)

// Copy IP functionality
function copyIP() {
    const ip = 'pibble.usga.me';
    navigator.clipboard.writeText(ip).then(() => {
        showToast('✅ IP copied! See you in-game.');
    }).catch(err => {
        console.error('Failed to copy IP: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('✅ IP copied! See you in-game.');
    });
}

// Toast notification function
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Intersection Observer for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Enhanced Cursor Trail - Always visible main cursor and particle trail
const mainCursor = document.querySelector('.cursor-trail');

document.addEventListener("mousemove", e => {
    // Move the main cursor trail
    mainCursor.style.left = `${e.clientX}px`;
    mainCursor.style.top = `${e.clientY}px`;

    // Create particle trail
    const particle = document.createElement("div");
    particle.className = "cursor-particle";
    particle.style.left = `${e.clientX}px`;
    particle.style.top = `${e.clientY}px`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
});

// Parallax effect for background and mouse interaction
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveLink();
    updateNavbar();
});

// Keyboard navigation (removed as no mobile menu)

// Performance optimization - throttle scroll events
let scrollTimeout;
function throttledScroll() {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateActiveLink();
            updateNavbar();
            scrollTimeout = null;
        }, 16);
    }
}

window.addEventListener('scroll', throttledScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add more floating particles dynamically
function createFloatingParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.width = (Math.random() * 8 + 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        heroParticles.appendChild(particle);
    }
}

// Add floating Pibbles and Pickaxes
function createFloatingElements() {
    const floatingElements = document.querySelector('.floating-elements');
    const elements = ['👽', '🔨', '👽', '🔨', '👽', '🔨', '👽', '🔨', '👽', '🔨'];

    elements.forEach((emoji, index) => {
        const element = document.createElement('div');
        element.className = emoji === '👽' ? 'floating-pibble' : 'floating-pickaxe';
        element.textContent = emoji;
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 20 + 's';
        floatingElements.appendChild(element);
    });
}

// Add falling images
function createFallingImages() {
    const images = [
        'st_small_507x507-pad_600x600_f8f8f8-removebg-preview.png',
        'png-transparent-minecraft-story-mode-season-two-pickaxe-video-game-pickaxe-angle-text-rectangle-thumbnail-removebg-preview.png'
    ];

    setInterval(() => {
        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)];
        img.className = 'falling-image';
        img.style.left = Math.random() * 100 + '%';
        img.style.animationDuration = (Math.random() * 5 + 5) + 's';
        document.body.appendChild(img);

        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, 10000);
    }, 1000);
}

createFloatingParticles();
createFallingImages();


