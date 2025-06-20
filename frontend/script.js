document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const responseMessage = document.getElementById('responseMessage');
    const viewSubmissionsButton = document.getElementById('viewSubmissions');
    const submissionsModal = document.getElementById('submissionsModal');
    const closeModal = document.querySelector('.close');
    const submissionsList = document.getElementById('submissionsList');

    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    function validateForm(formData) {
        const errors = {};
        
        if (!formData.name || formData.name.trim().length === 0) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }
        
        if (!formData.email || formData.email.trim().length === 0) {
            errors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = 'Please enter a valid email address';
            }
        }
        
        if (!formData.message || formData.message.trim().length === 0) {
            errors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }
        
        return errors;
    }

    function showResponseMessage(message, isSuccess) {
        responseMessage.textContent = message;
        responseMessage.className = `response-message ${isSuccess ? 'success' : 'error'}`;
        responseMessage.style.display = 'block';
        
        responseMessage.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            responseMessage.style.display = 'none';
        }, 5000);
    }

    function setLoadingState(isLoading) {
        submitButton.disabled = isLoading;
        if (isLoading) {
            submitButton.classList.add('loading');
        } else {
            submitButton.classList.remove('loading');
        }
    }

    function resetForm() {
        form.reset();
        clearErrors();
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        const validationErrors = validateForm(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            for (const [field, message] of Object.entries(validationErrors)) {
                showError(field, message);
            }
            return;
        }
        
        setLoadingState(true);
        
        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                showResponseMessage(result.message, true);
                resetForm();
            } else {
                if (result.errors && Array.isArray(result.errors)) {
                    result.errors.forEach(error => {
                        if (error.includes('Name')) showError('name', error);
                        else if (error.includes('Email')) showError('email', error);
                        else if (error.includes('Message')) showError('message', error);
                    });
                }
                showResponseMessage(result.message || 'An error occurred. Please try again.', false);
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showResponseMessage('Network error. Please check your connection and try again.', false);
        } finally {
            setLoadingState(false);
        }
    });

    viewSubmissionsButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/submissions');
            const result = await response.json();
            
            if (response.ok && result.success) {
                displaySubmissions(result.data);
                submissionsModal.style.display = 'block';
            } else {
                showResponseMessage('Failed to load submissions', false);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
            showResponseMessage('Network error while loading submissions', false);
        }
    });

    function displaySubmissions(submissions) {
        if (submissions.length === 0) {
            submissionsList.innerHTML = '<p>No submissions yet.</p>';
            return;
        }
        
        const submissionsHTML = submissions
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(submission => `
                <div class="submission-item">
                    <h3>${escapeHtml(submission.name)}</h3>
                    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
                    <p><strong>Message:</strong> ${escapeHtml(submission.message)}</p>
                    <p class="timestamp">Submitted: ${new Date(submission.timestamp).toLocaleString()}</p>
                </div>
            `).join('');
        
        submissionsList.innerHTML = submissionsHTML;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    closeModal.addEventListener('click', function() {
        submissionsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === submissionsModal) {
            submissionsModal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && submissionsModal.style.display === 'block') {
            submissionsModal.style.display = 'none';
        }
    });
});