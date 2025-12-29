// Function to handle smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        if (document.body.classList.contains('menu-open')) {
            toggleMenu();
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open'); // To prevent scrolling on mobile
}

menuToggle.addEventListener('click', toggleMenu);

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('.section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});


// Intersection Observer for Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Apply different classes based on initial class
            if (entry.target.classList.contains('animate-fade-in')) {
                entry.target.classList.add('in-view-fade');
            } else if (entry.target.classList.contains('animate-fade')) {
                entry.target.classList.add('in-view-fade');
            } else {
                entry.target.classList.add('in-view');
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe all elements that need animation
document.querySelectorAll('.animate-up, .animate-fade, .animate-slide-in, .animate-fade-in').forEach((el) => {
    observer.observe(el);
});

// Trigger Hero section animations immediately on load
document.querySelectorAll('#hero .animate-slide-in, #hero .animate-fade, #hero .animate-fade-in').forEach(el => {
    setTimeout(() => {
        // Use an immediate class for hero to bypass scroll check
        el.classList.add(el.classList.contains('animate-fade-in') || el.classList.contains('animate-fade') ? 'in-view-fade' : 'in-view');
    }, 50); // Small delay to ensure CSS is loaded
});

// Placeholder for Download Resume Button action
//document.querySelector('.download-btn').addEventListener('click', function(e) {
    //e.preventDefault();
    //alert('Download functionality is a placeholder. Please link this button to your actual PDF resume file.');
    // In a live environment, you would use: window.location.href = 'path/to/your/resume.pdf';);