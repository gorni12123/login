document.getElementById('toggle-form').addEventListener('click', toggleForm);
document.getElementById('submit-btn').addEventListener('click', submitForm);

let isRegistering = false;

// Adres backendu na Render
const BACKEND_URL = 'https://go-backend.onrender.com';

function toggleForm() {
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-form');

    isRegistering = !isRegistering;

    formTitle.textContent = isRegistering ? 'Register' : 'Login';
    submitBtn.textContent = isRegistering ? 'Register' : 'Login';
    toggleText.textContent = isRegistering ? 'Already have an account? Login here' : "Don't have an account? Register here";
}

function submitForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        displayMessage('Please fill in all fields', 'error');
        return;
    }

    const endpoint = isRegistering ? `${BACKEND_URL}/register` : `${BACKEND_URL}/login`;

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                displayMessage(data.message, 'success');
                if (!isRegistering) {
                    // Przekierowanie po zalogowaniu
                    setTimeout(() => {
                        window.location.href = 'welcome.html';
                    }, 2000);
                }
            } else {
                displayMessage(data.message, 'error');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            displayMessage('An error occurred. Please try again.', 'error');
        });
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'success' ? 'green' : 'red';

    // Automatyczne ukrycie wiadomości po 3 sekundach
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000);
}
