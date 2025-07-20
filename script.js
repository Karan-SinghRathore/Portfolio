
const EMAILJS_CONFIG = {
    serviceID: 'service_sdapz6n',
    templateID: 'template_1lmo93i', 
    publicKey: '1erorYLREvOzjM3Qz'
};


class TypeWriter {
    constructor(element, words, wait = 2000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.textContent = this.txt;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing-role');
    if (typingElement) {
        const words = ['digital experiences', 'web applications', 'user interfaces', 'innovative solutions'];
        new TypeWriter(typingElement, words, 2500);
    }
});


function initParallax() {
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
            const speed = layer.dataset.speed || 0.5;
            const yPos = scrolled * speed;
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        document.querySelectorAll('.element').forEach((element, index) => {
            const speed = 0.1 + (index * 0.02);
            const yPos = scrolled * speed;
            const rotation = scrolled * 0.02;
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}


function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate children with delay
                const children = entry.target.querySelectorAll('.skill-tag, .project-card, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('section:not(.hero-section)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

  
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

  
    document.querySelectorAll('.contact-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" style="margin-left: 10px; background: none; border: none; color: white; font-size: 18px; cursor: pointer;">&times;</button>
    `;
    
    const bgColor = type === 'success' ? 
        'linear-gradient(135deg, #4caf50, #45a049)' : 
        type === 'error' ? 
        'linear-gradient(135deg, #f44336, #d32f2f)' :
        'linear-gradient(135deg, #ff9800, #f57c00)';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-family: Inter, sans-serif;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Form Handling with EmailJS
function initFormHandling() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
           
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            
            if (EMAILJS_CONFIG.serviceID === 'YOUR_SERVICE_ID') {
                submitBtn.querySelector('span').textContent = 'Setup Required';
                showNotification('⚠️ EmailJS not configured yet. Check console for setup instructions.', 'warning');
                console.log(`
🔧 EMAILJS SETUP REQUIRED:

1. Go to https://www.emailjs.com/
2. Create a free account with your Gmail (ksinghrathore674@gmail.com)
3. Add Gmail service in EmailJS dashboard
4. Create an email template with these variables:
   - {{from_name}} - sender name
   - {{from_email}} - sender email  
   - {{message}} - message content
   - {{to_email}} - your email
5. Update these values in script.js:
   - serviceID: 'service_xxxxxxx'
   - templateID: 'template_xxxxxxx'
   - publicKey: 'your_public_key'

After setup, your contact form will send emails directly to ksinghrathore674@gmail.com!
                `);
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                }, 4000);
                return;
            }
          
            if (typeof emailjs !== 'undefined') {
                emailjs.init(EMAILJS_CONFIG.publicKey);
            }
            
           
            const formData = {
                from_name: form.from_name.value,
                from_email: form.from_email.value,
                message: form.message.value,
                to_email: 'ksinghrathore674@gmail.com'
            };
            
          
            emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    submitBtn.querySelector('span').textContent = 'Message Sent!';
                    form.reset();
                    showNotification('Message sent successfully! 🎉 Check your email.', 'success');
                    
                    setTimeout(() => {
                        submitBtn.querySelector('span').textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    submitBtn.querySelector('span').textContent = 'Failed to Send';
                    showNotification('Failed to send message. Please try again. ❌', 'error');
                    
                    setTimeout(() => {
                        submitBtn.querySelector('span').textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
}

function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(cursor);

    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorOutline = cursor.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    const cursorStyles = `
        .custom-cursor {
            pointer-events: none;
            position: fixed;
            z-index: 9999;
        }
        
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: var(--accent-color);
            border-radius: 50%;
            position: fixed;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
        }
        
        .cursor-outline {
            width: 30px;
            height: 30px;
            border: 2px solid rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9998;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);
}

function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

function initSkillTagsEffect() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'var(--gradient-tech)';
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.color = 'var(--text-secondary)';
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}
function initButtonRipple() {
    document.querySelectorAll('.btn-primary, .btn-secondary, .submit-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    const rippleStyles = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = rippleStyles;
    document.head.appendChild(styleSheet);
}

document.addEventListener('DOMContentLoaded', function() {
    initParallax();
    initSmoothScrolling();
    initActiveNav();
    initScrollAnimations();
    initFormHandling();
    initMobileNav();
    initNavbarScroll();
    initSkillTagsEffect();
    initButtonRipple();

    if (window.innerWidth > 768) {
        initCursorEffect();
    }
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize cursor effect based on screen size
        const existingCursor = document.querySelector('.custom-cursor');
        if (window.innerWidth <= 768 && existingCursor) {
            existingCursor.remove();
        } else if (window.innerWidth > 768 && !existingCursor) {
            initCursorEffect();
        }
    }, 250);
});
