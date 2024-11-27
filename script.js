document.getElementById('toggle-form').addEventListener('click', toggleForm);
document.getElementById('submit-btn').addEventListener('click', submitForm);

let isRegistering = false;

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
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        displayMessage('Please fill in all fields', 'error');
        return;
    }

    const endpoint = isRegistering ? 'register.php' : 'login.php';

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayMessage(data.message, 'success');
            if (!isRegistering) window.location.href = 'welcome.html'; // Redirect after login
        } else {
            displayMessage(data.message, 'error');
        }
    })
    .catch(error => displayMessage('An error occurred', 'error'));
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'success' ? 'green' : 'red';
}
