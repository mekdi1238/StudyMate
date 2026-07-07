const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const createForm = document.getElementById('createForm');
const submitBtn = document.getElementById('submitBtn');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');

createForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    errorMessage.classList.add('hidden');

    const topic = document.getElementById('topic').value;
    const originalContent = document.getElementById('originalContent').value;

    submitBtn.disabled = true;
    loadingMessage.classList.remove('hidden');

    try {
        const response = await fetch('/api/studysets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ topic, originalContent })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.message;
            errorMessage.classList.remove('hidden');
            submitBtn.disabled = false;
            loadingMessage.classList.add('hidden');
            return;
        }

        window.location.href = 'study-detail.html?id=' + data.studySet.id;
    } catch (error) {
        console.log('Error creating study set:', error);
        errorMessage.textContent = 'Something went wrong. Try again.';
        errorMessage.classList.remove('hidden');
        submitBtn.disabled = false;
        loadingMessage.classList.add('hidden');
    }
});