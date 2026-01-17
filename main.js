// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const header = document.querySelector('.header');
    const body = document.body;
    
    // Mobile Menu Toggle Functionality
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle classes
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            header.classList.toggle('menu-open');
            body.classList.toggle('menu-open');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.mobile-menu') && 
                !event.target.closest('.nav-toggle') &&
                mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Function to close mobile menu
        function closeMobileMenu() {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            header.classList.remove('menu-open');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip for # only
            if (href === '#' || href === '#0') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Add scroll effect to header
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    // Tool card hover effects (desktop only)
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Update desktop navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update mobile navigation
                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize on page load
    updateHeaderOnScroll();
    updateActiveNavLink();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on larger screens
            if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250);
    });
    
    // Add loading animation to tool cards
    function animateToolCards() {
        toolCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Animate tool cards on page load
    setTimeout(animateToolCards, 500);
});

