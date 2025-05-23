// Google Sheets configuration
const GOOGLE_SHEETS_URL = '';
const SECRET_KEY = '';

// Get form and message elements
const form = document.getElementById('applicationForm');
const messageDiv = document.getElementById('message');

// Function to show success message with animation
function showSuccessMessage() {
    // First fade out the form
    form.classList.add('fade-out');
    
    // After form fades out, show success message
    setTimeout(() => {
        form.style.display = 'none';
        messageDiv.classList.remove('hidden');
        messageDiv.classList.add('slide-down');
    }, 500); // Wait for fade-out animation to complete
}

// Function to show error message
function showErrorMessage(text) {
    messageDiv.classList.remove('hidden');
    messageDiv.innerHTML = `
        <div class="text-center">
            <div class="text-red-500 mx-auto mb-4">
                <svg class="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Submission Error</h3>
            <p class="text-gray-600">${text}</p>
        </div>
    `;
}

// Function to handle form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;

    try {
        // Get form data
        const formData = new FormData(form);
        const applicant_data = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            age: formData.get('age'),
            diploma: formData.get('diploma'),
            city: formData.get('city'),
            availability: formData.get('availability'),
            preferred_cohort: formData.get('preferred_cohort')
        };

        // Add secret key to data
        const data = {
            ...applicant_data,
            secretKey: SECRET_KEY
        };

        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        // Since we're using no-cors, we won't get response.ok
        // Instead, if we reach this point without an error, consider it successful
        showSuccessMessage();

    } catch (error) {
        // Handle specific error types
        let errorMessage = 'Error submitting application. Please try again.';
        
        if (error.name === 'AbortError') {
            errorMessage = 'Request timed out. Please try again.';
        } else if (!navigator.onLine) {
            errorMessage = 'No internet connection. Please check your connection and try again.';
        }

        showErrorMessage(errorMessage);
        console.error('Submission error:', error);
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}); 