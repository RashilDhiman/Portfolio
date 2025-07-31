// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background on scroll - Maintain dark background
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.boxShadow = 'none';
  }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections for animation
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const nameElement = document.querySelector('.name');
  if (nameElement) {
    const originalText = nameElement.textContent;
    typeWriter(nameElement, originalText, 150);
  }
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingCards = document.querySelectorAll('.floating-card');
  
  floatingCards.forEach((card, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    card.style.transform = `translateY(${yPos}px)`;
  });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-15px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-8px) scale(1.05)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0) scale(1)';
  });
});

// Contact form validation (if you add a form later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Scroll to top functionality
function createScrollToTopButton() {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollButton.className = 'scroll-to-top';
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
  `;
  
  document.body.appendChild(scrollButton);
  
  // Show/hide scroll button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollButton.style.opacity = '1';
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top on click
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.transform = 'scale(1.1)';
  });
  
  scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = 'scale(1)';
  });
}

// Initialize scroll to top button
createScrollToTopButton();

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--primary-color) !important;
  }
  
  .nav-link.active::after {
    width: 100% !important;
  }
  
  .scroll-to-top:hover {
    background: var(--primary-dark) !important;
  }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  // Navbar background effect - Maintain dark background
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.boxShadow = 'none';
  }
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Add focus management for accessibility
navLinks.forEach(link => {
  link.addEventListener('focus', () => {
    link.style.outline = '2px solid var(--primary-color)';
    link.style.outlineOffset = '2px';
  });
  
  link.addEventListener('blur', () => {
    link.style.outline = 'none';
  });
});

// Console welcome message
console.log(`
%cWelcome to Rashil Dhiman's Portfolio! 👋
%cBuilt with modern web technologies and ❤️
`, 'color: #6366f1; font-size: 16px; font-weight: bold;', 'color: #64748b; font-size: 14px;');
