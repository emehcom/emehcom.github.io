// Contact form submission with Formspree
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const spinner = document.getElementById('spinner');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(this);
    
    try {
        // Send to Formspree
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Success
            formMessage.innerHTML = '<div style="color: #2ecc71; background: rgba(46, 204, 113, 0.1); padding: 10px; border-radius: 5px; border-left: 4px solid #2ecc71;">Thank you! Your message has been sent. I\'ll reply to you within 24 hours.</div>';
            formMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Scroll to show success message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Error
        formMessage.innerHTML = '<div style="color: #e74c3c; background: rgba(231, 76, 60, 0.1); padding: 10px; border-radius: 5px; border-left: 4px solid #e74c3c;">Sorry, there was an error sending your message. Please email me directly at contact@ecompany.com</div>';
        formMessage.style.display = 'block';
    } finally {
        // Reset button state
        btnText.style.display = 'block';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
        
        // Hide message after 10 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 10000);
    }
});