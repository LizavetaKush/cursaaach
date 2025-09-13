document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });

            const emailField = document.getElementById('email');
            if (emailField.value && !isValidEmail(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = 'red';
            }
            
            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const mapButton = document.querySelector('.map-button');
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            window.open('https://www.google.com/maps?q=4517+Washington+Ave+Manchester+Kentucky+39495', '_blank');
        });
    }
});