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
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

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

    // --- Contact Modal Logic ---
    const modal = document.getElementById('contact-modal');
    const overlay = document.getElementById('contact-modal-overlay');
    const openBtn = document.getElementById('open-modal-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-btn');

    function openModal() {
        modal.classList.add('is-open');
        overlay.classList.add('is-open');
    }

    function closeModal() {
        modal.classList.remove('is-open');
        overlay.classList.remove('is-open');
    }

    if (openBtn && modal && overlay && closeBtn) {
        openBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }

    // --- "FIRE AND FORGET" SUBMISSION LOGIC ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const url = contactForm.action;
            
            submitButton.disabled = true;
            submitButton.querySelector('span').textContent = 'Submitted!';

            try {
                // This mode bypasses CORS by not waiting for a response.
                fetch(url, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors' 
                });
            } catch (error) {
                console.error('Submission failed locally:', error);
            } finally {
                // Assume success and close the modal.
                setTimeout(() => {
                    closeModal();
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.querySelector('span').textContent = 'Submit';
                }, 1500);
            }
        });
    }
});
