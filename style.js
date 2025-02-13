const PortfolioApp = {
    // State Management
    state: {
        theme: 'light',
        isLoading: true,
        activeFilter: 'all',
        skillsAnimated: false
    },

    // Initialization
    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeLoading();
            this.initializeTheme();
            this.initializeNavigation();
            this.initializeSkillsAnimation();
            this.initializeProjectFilters();
            this.initializeScrollAnimations();
            this.initializeBackToTop();
            this.initializeContactForm();
            this.initializeParallax();
        });
    },

    // Loading Screen
    initializeLoading() {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader-wrapper');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    this.state.isLoading = false;
                }, 500);
            }
        });
    },

    // Theme Switcher
    initializeTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const html = document.documentElement;
                const icon = themeToggle.querySelector('i');
                
                if (this.state.theme === 'light') {
                    html.setAttribute('data-theme', 'dark');
                    icon.classList.replace('fa-moon', 'fa-sun');
                    this.state.theme = 'dark';
                } else {
                    html.setAttribute('data-theme', 'light');
                    icon.classList.replace('fa-sun', 'fa-moon');
                    this.state.theme = 'light';
                }
                
                localStorage.setItem('portfolio-theme', this.state.theme);
            });

            // Load saved theme
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (savedTheme) {
                this.state.theme = savedTheme;
                document.documentElement.setAttribute('data-theme', savedTheme);
                const icon = themeToggle.querySelector('i');
                icon.classList.replace(
                    savedTheme === 'light' ? 'fa-sun' : 'fa-moon',
                    savedTheme === 'light' ? 'fa-moon' : 'fa-sun'
                );
            }
        }
    },

    // Navigation
    initializeNavigation() {
        const nav = document.querySelector('.portfolio__nav');
        if (nav) {
            // Smooth scroll for navigation links
            nav.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });

            // Navigation scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }
    },

    // Skills Animation
    initializeSkillsAnimation() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observerSkills = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.state.skillsAnimated) {
                    const percentage = entry.target.getAttribute('data-percentage');
                    entry.target.style.transform = `scaleX(${percentage / 100})`;
                    this.state.skillsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observerSkills.observe(bar));
    },

    // Project Filters
    initializeProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.state.activeFilter = filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projects.forEach(project => {
                    const projectCategory = project.getAttribute('data-category');
                    if (filter === 'all' || projectCategory === filter) {
                        project.style.display = 'block';
                        setTimeout(() => project.classList.add('visible'), 10);
                    } else {
                        project.classList.remove('visible');
                        setTimeout(() => project.style.display = 'none', 300);
                    }
                });
            });
        });
    },

    // Scroll Animations
    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Reveal animation for elements
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });

        // Timeline animation
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-item').forEach(el => {
            timelineObserver.observe(el);
        });
    },

    // Back to Top Button
    initializeBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    },

    // Contact Form
    initializeContactForm() {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Add your form submission logic here
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Example: Send data to server
                console.log('Form submitted:', data);
                
                // Show success message
                this.showNotification('Pesan telah terkirim!', 'success');
            });
        }
    },

    // Parallax Effect
    initializeParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(window.scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    },

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    },

    debounce(func, wait) {
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
};

// Initialize the app
PortfolioApp.init();

// Export for module usage
export default PortfolioApp;