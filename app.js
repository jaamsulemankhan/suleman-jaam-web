/**
 * Suleman Jaam - Web Portfolio Javascript Applications
 * Handles: Particles Background, Dynamic Typing, Project Filters, Tab Swapping, Navigation Tracking, and Contact Form.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 1. Mobile Menu Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                const isOpen = navMenu.classList.contains('open');
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });
    }

    // Close mobile menu when links are clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // 2. Scroll Header State & Link Highlights
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Sticky Header scroll state
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Section Highlighting
        let currentSection = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.clientHeight;
            if (window.scrollY >= (secTop - 250)) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Automated Typewriter Effect
    const roles = [
        'AI Engineer', 
        'Data Scientist', 
        'Full-Stack Developer', 
        'Ecom Specialist'
    ];
    const typewriterElem = document.getElementById('typewriter');
    
    if (typewriterElem) {
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let delay = 150;

        function type() {
            const currentRole = roles[roleIdx];
            
            if (isDeleting) {
                typewriterElem.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
                delay = 80;
            } else {
                typewriterElem.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
                delay = 150;
            }

            if (!isDeleting && charIdx === currentRole.length) {
                isDeleting = true;
                delay = 2000; // Pause at end of role
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                delay = 500; // Pause before typing next
            }

            setTimeout(type, delay);
        }

        setTimeout(type, 1000);
    }

    // 4. Interactive Skills Tab Panel Swapping
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Set active states on buttons
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Swap active panel
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${targetTab}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // 5. Interactive Project Cards Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update filter buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 6. Contact Form Processing
    const contactForm = document.getElementById('portfolio-contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all fields.';
                return;
            }

            // Simulate form submission success & mailto redirect
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Generating message redirect... Click to send if email client doesn\'t launch.';
            
            const mailtoLink = `mailto:sulemanjaam.digital@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
            
            setTimeout(() => {
                window.location.href = mailtoLink;
                contactForm.reset();
                formStatus.textContent = 'Email client launched! Thank you for reaching out.';
            }, 1000);
        });
    }

    // 7. Interactive Canvas Particle Background
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 100 };

        // Set dynamic sizes
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        
        // Tracking mouse movement
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
                this.color = color;
                this.baseSize = size;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Bounce on borders
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                // Mouse interaction physics
                if (mouse.x !== null && mouse.y !== null) {
                    const diffX = this.x - mouse.x;
                    const diffY = this.y - mouse.y;
                    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        // Repel particles from cursor
                        this.x += (diffX / distance) * force * 5;
                        this.y += (diffY / distance) * force * 5;
                        this.size = this.baseSize * 1.5;
                    } else {
                        if (this.size > this.baseSize) {
                            this.size -= 0.1;
                        }
                    }
                } else {
                    if (this.size > this.baseSize) {
                        this.size -= 0.1;
                    }
                }

                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            // Dynamically scale particle density based on screen space
            const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 100);
            
            // Modern accents colors matching the site variables
            const colors = [
                'rgba(59, 130, 246, 0.25)',   // Accent Blue
                'rgba(139, 92, 246, 0.25)',  // Accent Violet
                'rgba(16, 185, 129, 0.25)'   // Accent Emerald
            ];

            for (let i = 0; i < numParticles; i++) {
                const size = Math.random() * 3 + 1;
                const x = Math.random() * (canvas.width - size * 2) + size;
                const y = Math.random() * (canvas.height - size * 2) + size;
                const dx = (Math.random() - 0.5) * 0.8;
                const dy = (Math.random() - 0.5) * 0.8;
                const color = colors[Math.floor(Math.random() * colors.length)];

                particles.push(new Particle(x, y, dx, dy, size, color));
            }
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dist = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                                 ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    // Draw dynamic lines between close particles
                    if (dist < (canvas.width / 12) * (canvas.height / 12)) {
                        const alpha = 1 - (dist / ((canvas.width / 12) * (canvas.height / 12)));
                        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * 0.12})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connectParticles();
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        animate();
    }
});
