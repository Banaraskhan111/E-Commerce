
// Mobile menu toggle functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  
  // Update aria-expanded attribute for accessibility
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking on a menu item
document.querySelectorAll('#nav-menu a').forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Add to cart functionality
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', function() {
    const productCard = this.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;
    
    // In a real app, you would add to a cart array or send to server
    alert(`Added to cart: ${productName} (${productPrice})`);
    
    // Visual feedback
    this.textContent = 'Added!';
    this.style.backgroundColor = '#28a745';
    
    // Reset after 1.5 seconds
    setTimeout(() => {
      this.textContent = 'Add to Cart';
      this.style.backgroundColor = '';
    }, 1500);
  });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handling (already in HTML, but adding enhanced feedback)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    
    // Show personalized thank you message
    const thankYouMessage = `Thank you, ${name}! We'll contact you soon.`;
    alert(thankYouMessage);
    
    // Reset form
    this.reset();
  });
}

// Product card focus styles for keyboard navigation
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('focus', function() {
    this.style.transform = 'scale(1.02)';
    this.style.boxShadow = '0 15px 30px rgb(0 0 0 / 0.15)';
  });
  
  card.addEventListener('blur', function() {
    this.style.transform = '';
    this.style.boxShadow = '0 8px 20px rgb(0 0 0 / 0.1)';
  });
});

// Lazy loading for images (if you have many product images)
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
  
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});
