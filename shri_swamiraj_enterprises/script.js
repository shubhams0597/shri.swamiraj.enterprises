/* Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================================
       Navigation & Mobile Menu
    ================================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Show Menu
    if(navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Hide Menu
    if(navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Remove Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        if(window.scrollY >= 50) {
            header.classList.add('nav-scrolled');
        } else {
            header.classList.remove('nav-scrolled');
        }
    });


    /* ==================================
       Scroll Animations (IntersectionObserver)
    ================================== */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-element');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));


    /* ==================================
       Form Validation
    ================================== */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Elements
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const serviceSelect = document.getElementById('service');
            const messageInput = document.getElementById('message');
            
            // Error Spans
            const nameError = document.getElementById('nameError');
            const phoneError = document.getElementById('phoneError');
            
            let isValid = true;
            
            // Reset Errors
            nameError.textContent = '';
            phoneError.textContent = '';
            
            // Name Validation
            if (nameInput.value.trim().length < 3) {
                nameError.textContent = 'Please enter a valid name (min 3 chars).';
                isValid = false;
            }
            
            // Phone Validation (Indian Format: 10 digits, starts with 6-9)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phoneInput.value.replace(/\s/g, ''))) {
                phoneError.textContent = 'Please enter a valid 10-digit Indian mobile number.';
                isValid = false;
            }
            
            if (isValid) {
                // Prepare WhatsApp Message
                const name = nameInput.value.trim();
                const phone = phoneInput.value.trim();
                const service = serviceSelect.value;
                const message = messageInput.value.trim();
                
                const whatsappText = `*New Enquiry from Website*%0a%0a *Name:* ${name}%0a *Phone:* ${phone}%0a *Service:* ${service}%0a *Message:* ${message}`;
                
                // Open WhatsApp
                const whatsappUrl = `https://wa.me/919876543210?text=${whatsappText}`;
                window.open(whatsappUrl, '_blank');
                
                // Optional: Reset form
                contactForm.reset();
                alert('Thank you! Redirecting to WhatsApp to complete your enquiry.');
            }
        });
    }

});
