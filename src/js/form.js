/* Form handling - Sandstone Development
   Clean, dignified form interactions */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('[data-contact-form]');
  const statusEl = document.querySelector('[data-form-status]');

  if (!contactForm) return;

  // ===== FORM SUBMISSION =====
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.style.color = 'inherit';
    }

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Success
      if (statusEl) {
        statusEl.textContent = 'Thank you. We will be in touch shortly.';
        statusEl.style.color = '#8a6a4f'; // Sandalwood accent
      }
      
      contactForm.reset();
      
      // Re-enable after brief delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
      }, 2000);
      
    } catch (error) {
      // Error handling
      if (statusEl) {
        statusEl.textContent = 'Something went wrong. Please try again.';
        statusEl.style.color = '#9c7356';
      }
      
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
    }
  });

  // ===== INPUT FOCUS STATES =====
  // Subtle visual feedback on focus
  
  const inputs = contactForm.querySelectorAll('.form-input');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('is-focused');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('is-focused');
      
      // Add filled class if has value
      if (input.value.trim()) {
        input.parentElement.classList.add('is-filled');
      } else {
        input.parentElement.classList.remove('is-filled');
      }
    });
  });

  // ===== TEXTAREA AUTO-RESIZE =====
  // Gentle expansion as user types
  
  const textarea = contactForm.querySelector('textarea');
  
  if (textarea) {
    const minHeight = textarea.offsetHeight;
    
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(minHeight, textarea.scrollHeight) + 'px';
    });
  }

});
