/* Main JavaScript - Sandstone Development
   Architectural / Editorial Animation System */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===== UTILITIES =====
  
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===== 1. HERO FADE-UP ANIMATION =====
  // Staggered entrance for hero content on page load
  
  const heroElements = document.querySelectorAll('.hero h1, .hero-lead, .hero-cta');
  heroElements.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.animationDelay = `${0.1 + (i * 0.12)}s`;
  });

  // Also apply to page headers
  const pageHeaderElements = document.querySelectorAll('.page-header h1, .page-lead, .overline');
  pageHeaderElements.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.animationDelay = `${0.1 + (i * 0.1)}s`;
  });

  // ===== 2. SECTION REVEAL ON SCROLL =====
  // IntersectionObserver-based reveal (not scroll listeners)
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  });

  // Apply to major sections
  const revealSections = document.querySelectorAll(
    '.section-statement, .section-developments, .section-cta, ' +
    '.about-section, .contact-section, .detail-section, .detail-gallery, ' +
    '.developments-section'
  );
  
  revealSections.forEach(section => {
    section.classList.add('section-reveal');
    revealObserver.observe(section);
  });

  // ===== 3. IMAGE MASK REVEAL =====
  // Reveal images as they enter viewport
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        imageObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.2
  });

  const imageContainers = document.querySelectorAll(
    '.development-image, .gallery-item, .member-image, .card-image, .detail-hero'
  );
  
  imageContainers.forEach(container => {
    container.classList.add('image-reveal');
    imageObserver.observe(container);
  });

  // ===== 4. STICKY HEADER EASING =====
  // Subtle background and height transition
  
  const header = document.querySelector('.site-header');
  if (header && document.body.classList.contains('home-page')) {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ===== 5. DEVELOPMENT FILTERS =====
  // Clean filter transitions
  
  const filterBtns = document.querySelectorAll('.filter-btn');
  const devCards = document.querySelectorAll('.development-card');

  if (filterBtns.length && devCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Filter with gentle animation
        devCards.forEach((card, i) => {
          const shouldShow = filter === 'all' || card.dataset.status === filter;
          
          if (shouldShow) {
            card.style.display = '';
            card.style.animationDelay = `${i * 0.05}s`;
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
            setTimeout(() => {
              if (card.classList.contains('is-hidden')) {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  }

  // ===== 6. PAGE TRANSITIONS =====
  // Cross-fade between pages (like turning brochure pages)
  
  document.body.classList.add('page-loaded');
  
  // Fade out on internal link clicks
  const internalLinks = document.querySelectorAll('a[href$=".html"], a[href="index.html"]');
  
  internalLinks.forEach(link => {
    // Skip external links and anchor links
    if (link.hostname !== window.location.hostname) return;
    if (link.getAttribute('href').startsWith('#')) return;
    
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Don't intercept if modifier keys are pressed
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      
      e.preventDefault();
      document.body.classList.add('page-leaving');
      
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });

  // ===== 7. SMOOTH ANCHOR SCROLLING =====
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== 8. MOBILE NAV =====
  
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('is-open');
      document.body.classList.toggle('nav-open');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.click();
      }
    });
  }

});

// ===== ANIMATION CSS (injected for consistency) =====

const animationStyles = document.createElement('style');
animationStyles.textContent = `
  /* 1. Hero fade-up animation */
  .fade-up {
    opacity: 0;
    transform: translateY(12px);
    animation: fadeUp 0.7s cubic-bezier(.2,.6,.2,1) forwards;
  }
  
  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 2. Section reveal */
  .section-reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.6s cubic-bezier(.2,.6,.2,1), 
                transform 0.6s cubic-bezier(.2,.6,.2,1);
  }
  
  .section-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* 3. Image mask reveal */
  .image-reveal {
    overflow: hidden;
  }
  
  .image-reveal img {
    transform: translateY(8px);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(.2,.6,.2,1),
                opacity 0.8s cubic-bezier(.2,.6,.2,1);
  }
  
  .image-reveal.is-visible img {
    transform: translateY(0);
    opacity: 1;
  }
  
  /* 4. Development card hover (micro only) */
  .development-card img,
  .development-item img,
  .card-image img {
    transition: filter 0.4s ease;
  }
  
  .development-card:hover img,
  .development-item:hover img {
    filter: brightness(0.96);
  }
  
  .development-card h2,
  .development-item h3 {
    transition: transform 0.3s ease, color 0.25s ease;
  }
  
  .development-card:hover h2,
  .development-item:hover h3 {
    transform: translateY(-2px);
  }
  
  /* 5. Filter card hide animation */
  .development-card {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .development-card.is-hidden {
    opacity: 0;
    transform: translateY(8px);
  }
  
  /* 6. Page transitions */
  body {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  body.page-loaded {
    opacity: 1;
  }
  
  body.page-leaving {
    opacity: 0;
  }
  
  /* Header scroll state (refined, no blur) */
  .home-page .site-header {
    transition: background 0.4s ease, padding 0.4s ease;
  }
  
  .home-page .site-header.scrolled {
    background: rgba(255, 255, 255, 0.97);
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;
document.head.appendChild(animationStyles);
