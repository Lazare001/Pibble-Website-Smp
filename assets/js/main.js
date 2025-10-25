// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Page Load Animation
gsap.from(".hero-bg", { duration: 2, opacity: 0, ease: "power2.out" });
gsap.from("#hero-title", { duration: 1.5, y: 50, opacity: 0, delay: 0.5, ease: "power2.out" });
gsap.from("p", { duration: 1, y: 30, opacity: 0, delay: 1, ease: "power2.out" });
gsap.from(".btn-glow, .btn-pink", { duration: 1, scale: 0.8, opacity: 0, delay: 1.5, stagger: 0.2, ease: "back.out(1.7)" });

// Floating Shapes Animation
gsap.to(".floating-shape", {
    y: "-20px",
    rotation: 360,
    duration: 20,
    ease: "none",
    repeat: -1,
    stagger: 2
});

// Particle Trails
gsap.to(".particle-trail", {
    y: "-100vh",
    duration: 15,
    ease: "none",
    repeat: -1,
    stagger: 1
});

// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Optional: Ambient Sound Toggle (placeholder)
// Add a button in header for sound toggle if desired

// Function to handle page-specific animations (to be called on each page)
function initPageAnimations() {
    // About page animations
    if (document.querySelector('h1') && document.querySelector('h1').textContent.includes('About')) {
        gsap.from("h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
        gsap.from(".max-w-4xl", { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: "power2.out" });
        gsap.from(".grid img", {
            scrollTrigger: { trigger: ".grid", start: "top 80%" },
            y: 50, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out"
        });
        gsap.from(".timeline-item", {
            scrollTrigger: { trigger: ".timeline-item", start: "top 80%" },
            x: -50, opacity: 0, stagger: 0.3, duration: 1, ease: "power2.out"
        });
        gsap.from(".bg-gray-800", {
            scrollTrigger: { trigger: ".bg-gray-800", start: "top 80%" },
            scale: 0.9, opacity: 0, duration: 1, ease: "power2.out"
        });
    }

    // Features page animations
    if (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Features')) {
        gsap.from("h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
        gsap.from(".feature-card", {
            scrollTrigger: { trigger: ".grid", start: "top 80%" },
            y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out"
        });
    }

    // Join page animations
    if (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Join')) {
        gsap.from("h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
        gsap.from(".step", {
            scrollTrigger: { trigger: ".max-w-4xl", start: "top 80%" },
            x: -50, opacity: 0, stagger: 0.3, duration: 1, ease: "power2.out"
        });
    }

    // Rules page animations
    if (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Rules')) {
        gsap.from("h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
        gsap.from(".bg-gray-800", {
            scrollTrigger: { trigger: ".bg-gray-800", start: "top 80%" },
            scale: 0.95, opacity: 0, duration: 1, ease: "power2.out"
        });
        gsap.from(".rule-item", {
            scrollTrigger: { trigger: ".rule-item", start: "top 80%" },
            x: -30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out"
        });
    }

    // Status page animations
    if (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Status')) {
        gsap.from("h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
        gsap.from(".status-card", {
            scrollTrigger: { trigger: ".status-card", start: "top 80%" },
            scale: 0.9, opacity: 0, duration: 1, ease: "power2.out"
        });
    }

    // Community page animations
    if (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Community')) {
        gsap.from("h1", { duration: 1, y: 50, opacity: 0, ease: "power2.out" });
        gsap.from("iframe", { duration: 1, scale: 0.9, opacity: 0, delay: 0.5, ease: "power2.out" });
        gsap.from(".carousel img", {
            scrollTrigger: { trigger: ".carousel", start: "top 80%" },
            x: 100, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out"
        });

        // Testimonials fade-in on scroll
        const testimonials = document.querySelectorAll('.testimonial');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });
        testimonials.forEach(testimonial => observer.observe(testimonial));
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageAnimations();
});

// Copy IP functionality for join page
if (document.getElementById('copy-ip')) {
    document.getElementById('copy-ip').addEventListener('click', function() {
        navigator.clipboard.writeText('pibblesmp.serv.cx').then(function() {
            alert('Server IP copied to clipboard!');
        });
    });
}

// Server status fetching for status page
async function fetchServerStatus() {
    const statusElement = document.getElementById('server-status');
    const playerElement = document.getElementById('player-count');
    const pingElement = document.getElementById('server-ping');

    if (!statusElement) return; // Not on status page

    statusElement.textContent = 'Loading...';
    statusElement.className = 'loading';

    try {
        const response = await fetch('https://api.mcsrvstat.us/2/pibblesmp.serv.cx');
        const data = await response.json();

        if (data.online) {
            statusElement.textContent = 'Online';
            statusElement.className = 'online';
            playerElement.textContent = `${data.players.online}/${data.players.max}`;
            pingElement.textContent = `${Math.floor(Math.random() * 50) + 10} ms`; // Simulated ping
        } else {
            statusElement.textContent = 'Offline';
            statusElement.className = 'offline';
            playerElement.textContent = '0/20';
            pingElement.textContent = '-- ms';
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        statusElement.textContent = 'Error';
        statusElement.className = 'offline';
    }
}

// Refresh status functionality
if (document.getElementById('refresh-status')) {
    document.getElementById('refresh-status').addEventListener('click', fetchServerStatus);
}

// Fetch status on page load for status page
if (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Status')) {
    fetchServerStatus();
}
