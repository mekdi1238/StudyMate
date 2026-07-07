const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const errorMessage = document.getElementById('errorMessage');

loginTab.addEventListener('click', function() {
    loginTab.classList.add('tab-active');
    registerTab.classList.remove('tab-active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
});

registerTab.addEventListener('click', function() {
    registerTab.classList.add('tab-active');
    loginTab.classList.remove('tab-active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    errorMessage.classList.add('hidden');

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.log('Error logging in:', error);
        errorMessage.textContent = 'Something went wrong. Try again.';
        errorMessage.classList.remove('hidden');
    }
});

registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    errorMessage.classList.add('hidden');

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        loginTab.click();
        errorMessage.textContent = 'Account created! Please log in.';
        errorMessage.classList.remove('hidden');
    } catch (error) {
        console.log('Error registering:', error);
        errorMessage.textContent = 'Something went wrong. Try again.';
        errorMessage.classList.remove('hidden');
    }
});