document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links (keep this)
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple Contact Form Submission - now primarily for client-side validation
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', function(e) {
        // No e.preventDefault() here if you want Formspree to handle the submission directly.
        // Formspree will redirect to a success page or handle AJAX if you add 'data-formspree' attributes.
        // For simple use, just let the form submit normally after validation.

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim(); // Removed phone from required check for simplicity, adjust as needed.

        // --- Client-side Validation ---
        if (name === '' || email === '' || message === '') {
            displayFormMessage('Please fill in all required fields.', 'error');
            e.preventDefault(); // Prevent submission if validation fails
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            displayFormMessage('Please enter a valid email address.', 'error');
            e.preventDefault(); // Prevent submission if validation fails
            return;
        }
        // --- End Client-side Validation ---

        // If validation passes, the form will submit to Formspree normally.
        // You can remove the console.logs and the success message here as Formspree handles feedback.
        // Or, if you want client-side feedback *before* Formspree's response,
        // you'd need to use Formspree's AJAX submission method (more advanced setup).
        // For now, let's keep it simple:
        // displayFormMessage('Submitting your message...', 'info'); // Optional: show a submitting message
        // No form.reset() here, Formspree handles the post-submission.
    });

    function displayFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Hide message after a few seconds, only for client-side validation messages
        if (type !== 'info') { // Don't hide 'submitting' message automatically
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
});