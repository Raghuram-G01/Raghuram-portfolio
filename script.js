document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = menuToggle.querySelector('i');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            menuIcon.classList.replace('bx-menu', 'bx-x');
        } else {
            menuIcon.classList.replace('bx-x', 'bx-menu');
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Active Navbar Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        let scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // 3. Scroll Reveal Animation
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 4. Project Modal Logic
    const projectData = {
        'health-hub': {
            title: 'Campus Health Hub',
            img: 'proj1.png',
            desc: 'A comprehensive health management system built with Spring Boot and MySQL to efficiently manage vaccination records within a campus environment. The application features secure user registration, vaccination record tracking, admin verification workflows, and compliance monitoring. Students can update their health status, upload vaccination certificates, and receive automated reminders. Administrators can generate reports, monitor campus health trends, and ensure regulatory compliance through an intuitive dashboard.',
            tech: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS'],
            features: [
                'User registration & authentication',
                'Vaccination record management',
                'Admin verification workflow',
                'Compliance monitoring'
            ],
            github: 'https://github.com/Raghuram-G01', // Replace with actual link if available
            demo: '#'
        },
        'rating-pred': {
            title: 'LeetCode Rating Prediction',
            img: 'proj2.png',
            desc: 'A machine learning-powered web application that predicts LeetCode contest ratings based on user performance metrics. The system analyzes solving patterns, problem difficulty preferences, and historical contest data to forecast future ratings. Features an intuitive HTML/CSS interface where users can input their statistics and receive personalized rating predictions. The ML model uses regression algorithms trained on extensive LeetCode user data to provide accurate forecasts.',
            tech: ['Python', 'Machine Learning', 'HTML', 'CSS', 'JavaScript'],
            features: [
                'Data analysis & preprocessing',
                'Model training & evaluation',
                'Interactive predictions',
                'Insightful visualizations'
            ],
            github: 'https://github.com/Raghuram-G01',
            demo: '#'
        },
        'placement-system': {
            title: 'Campus Placement System',
            img: 'proj3.png',
            desc: 'A comprehensive web application designed to streamline campus recruitment processes. The system connects students, recruiters, and administrators on a unified platform. Students can register, upload resumes, and apply for job opportunities. Recruiters can post job listings, review applications, and schedule interviews. The platform includes automated notifications, application tracking, and detailed analytics for placement coordinators.',
            tech: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS'],
            features: [
                'Student & company management',
                'Placement drive management',
                'Application tracking',
                'Admin dashboard'
            ],
            github: 'https://github.com/Raghuram-G01',
            demo: '#'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-dynamic-content');
    const closeBtn = document.querySelector('.modal-close');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        const techBadges = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
        const featuresList = data.features.map(f => `<li><i class='bx bx-check'></i> ${f}</li>`).join('');

        modalContent.innerHTML = `
            <img src="${data.img}" alt="${data.title}" class="modal-project-img">
            <h2 class="modal-title">${data.title}</h2>
            <div class="tech-stack">${techBadges}</div>
            
            <h3 class="modal-section-title">Overview</h3>
            <p class="modal-desc">${data.desc}</p>
            
            <h3 class="modal-section-title">Key Features</h3>
            <ul class="feature-list" style="margin-bottom: 2rem;">
                ${featuresList}
            </ul>
            
            <div style="display: flex; gap: 1rem;">
                <a href="${data.github}" target="_blank" class="btn btn-outline"><i class='bx bxl-github'></i> GitHub</a>
                <!-- <a href="${data.demo}" target="_blank" class="btn btn-primary">Live Demo <i class='bx bx-link-external'></i></a> -->
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(btn.getAttribute('data-project'));
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 5. Sparkles & Ambient Glow on Mouse Move
    let lastSparkleTime = 0;

    // Create ambient glow
    const glow = document.createElement('div');
    glow.classList.add('mouse-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        // Update glow position
        glow.style.opacity = '1';
        glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;

        const now = Date.now();
        if (now - lastSparkleTime < 50) return;
        lastSparkleTime = now;

        createSparkle(e.clientX, e.clientY);
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Unique shapes instead of plain dots
        const shapes = ['✦', '⋆', '✧', '✨'];
        sparkle.textContent = shapes[Math.floor(Math.random() * shapes.length)];

        const size = Math.random() * 12 + 8; // Random sizes
        sparkle.style.setProperty('--size', `${size}px`);

        // Offset to center the sparkle on cursor
        sparkle.style.left = `${x - size / 2}px`;
        sparkle.style.top = `${y - size / 2}px`;

        const colors = ['#7C3AED', '#3B82F6', '#06B6D4', '#A855F7'];
        sparkle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        sparkle.style.setProperty('--tx', `${tx}px`);
        sparkle.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 800);
    }

    // 6. Contact Form Messaging Integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            // The phone number provided by the user
            const phoneNumber = "6369153599";
            
            // Format the message for standard SMS
            const textMessage = `New Contact from Portfolio\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
            
            // Open the default SMS messaging app with the prefilled message
            const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(textMessage)}`;
            window.location.href = smsUrl;
            
            // Show a quick success alert and reset the form
            alert("Success! Your message app has been opened. Please hit send to deliver the message.");
            contactForm.reset();
        });
    }
});
