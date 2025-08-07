document.addEventListener('DOMContentLoaded', () => {
    // --- Canvas Background Animation ---
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initializeOrbs();
    });

    let orbs = [];

    function initializeOrbs() {
        orbs = [
            { x: width * 0.5, y: height * 0.5, radiusX: width * 0.4, radiusY: height * 0.3, rotation: 0, speed: 0.002, tilt: 0.2, lineWidth: 0.8, color: 'rgba(100, 255, 218, 0.12)' },
            { x: width * 0.5, y: height * 0.5, radiusX: width * 0.25, radiusY: height * 0.45, rotation: 0, speed: -0.003, tilt: -0.5, lineWidth: 0.8, color: 'rgba(100, 255, 218, 0.12)' },
            { x: width * 0.5, y: height * 0.5, radiusX: width * 0.35, radiusY: height * 0.38, rotation: 0, speed: 0.0015, tilt: 1.2, lineWidth: 0.5, color: 'rgba(100, 255, 218, 0.08)' }
        ];
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        orbs.forEach(orb => {
            orb.rotation += orb.speed;
            ctx.save();
            ctx.translate(orb.x, orb.y);
            ctx.rotate(orb.tilt); 
            ctx.rotate(orb.rotation);
            ctx.beginPath();
            ctx.ellipse(0, 0, orb.radiusX, orb.radiusY, 0, 0, 2 * Math.PI);
            ctx.strokeStyle = orb.color;
            ctx.lineWidth = orb.lineWidth;
            ctx.stroke();
            ctx.restore();
        });
        requestAnimationFrame(animate);
    }

    initializeOrbs();
    animate();

    // --- Scroll Animations ---
    const animatedItems = document.querySelectorAll('.content-section, .timeline-block, .skill-category-card');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    animatedItems.forEach(item => {
        appearOnScroll.observe(item);
    });

    // --- START: New Copy-to-Clipboard Logic ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const feedbackSpan = document.querySelector('.copy-feedback');

    if (copyEmailBtn && feedbackSpan) {
        copyEmailBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevents the link from navigating

            const emailAddress = 'siddharthjainn07@gmail.com';

            navigator.clipboard.writeText(emailAddress).then(() => {
                // On success, show the feedback message
                feedbackSpan.classList.add('show');

                // Hide the feedback message after 2 seconds
                setTimeout(() => {
                    feedbackSpan.classList.remove('show');
                }, 2000);

            }).catch(err => {
                console.error('Failed to copy email: ', err);
                // Optionally, you could show an error message here
            });
        });
    }
    // --- END: New Copy-to-Clipboard Logic ---
});