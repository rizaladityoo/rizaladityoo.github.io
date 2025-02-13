
        // Scroll Reveal Animation
    document.addEventListener("DOMContentLoaded", function () {
        const html = document.querySelector('html');
        const icon = themeToggle.querySelector('i');
        html.setAttribute('data-theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        const textArray = [
            "Quality Assurance.",
            "Fullstack Developer.",
            "Backend Developer."
        ];
        let index = 0;
        let charIndex = 0;
        const typingText = document.getElementById("typing-text");
    
        function typeEffect() {
            if (charIndex < textArray[index].length) {
                typingText.innerHTML += textArray[index].charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 100);
            } else {
                setTimeout(eraseEffect, 2000); // Tunggu sebelum menghapus
            }
        }
    
        function eraseEffect() {
            if (charIndex > 0) {
                typingText.innerHTML = textArray[index].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(eraseEffect, 50);
            } else {
                index = (index + 1) % textArray.length;
                setTimeout(typeEffect, 500);
            }
        }
    
        typeEffect();

        const slides = document.querySelectorAll('.quote-slide');
        let currentSlide = 0;
        
        // Show first slide initially
        slides[0].classList.add('active');
        
        function nextSlide() {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].style.transform = 'translateX(-100%)';
            
            // Update current slide index
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to next slide
            slides[currentSlide].style.transform = 'translateX(0)';
            slides[currentSlide].classList.add('active');
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Reset all slides except first one
        slides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.transform = 'translateX(100%)';
            }
        });
    })
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader-wrapper');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });

        // Theme Toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            const html = document.querySelector('html');
            const icon = themeToggle.querySelector('i');
            
            if (html.getAttribute('data-theme') === 'light') {
                html.setAttribute('data-theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                html.setAttribute('data-theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Back to Top
        const backToTop = document.querySelector('.back-to-top');
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

        // Skills Animation
        const skillBars = document.querySelectorAll('.skill-progress');
        const observerSkills = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = `scaleX(${entry.target.parentElement.previousElementSibling.lastElementChild.textContent.slice(0, -1) / 100})`;
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observerSkills.observe(bar));

        // Timeline Animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observerTimeline = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => observerTimeline.observe(item));
        function reveal() {
            var reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                var windowHeight = window.innerHeight;
                var elementTop = element.getBoundingClientRect().top;
                var elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', reveal);
        reveal(); // Initial check
        
        // Navbar Scroll Effect
        const nav = document.querySelector('nav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Project Cards Animation
        const projectCards = document.querySelectorAll('.project-card');
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        projectCards.forEach(card => {
            observer.observe(card);
        });