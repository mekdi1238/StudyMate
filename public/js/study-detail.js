const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const urlParams = new URLSearchParams(window.location.search);
const studySetId = urlParams.get('id');

const viewMode = document.getElementById('viewMode');
const editForm = document.getElementById('editForm');
const topicDisplay = document.getElementById('topicDisplay');
const contentDisplay = document.getElementById('contentDisplay');
const notesDisplay = document.getElementById('notesDisplay');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const errorMessage = document.getElementById('errorMessage');

let currentStudySet = null;

async function loadStudySet() {
    try {
        const response = await fetch('/api/studysets/' + studySetId, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        currentStudySet = data.studySet;
        topicDisplay.textContent = currentStudySet.topic;
        contentDisplay.textContent = currentStudySet.original_content;
        notesDisplay.innerHTML = marked.parse(currentStudySet.generated_notes);
    } catch (error) {
        console.log('Error loading study set:', error);
        errorMessage.textContent = 'Something went wrong loading this study set.';
        errorMessage.classList.remove('hidden');
    }
}

editBtn.addEventListener('click', function() {
    document.getElementById('editTopic').value = currentStudySet.topic;
    document.getElementById('editContent').value = currentStudySet.original_content;
    viewMode.classList.add('hidden');
    editForm.classList.remove('hidden');
});

cancelEditBtn.addEventListener('click', function() {
    editForm.classList.add('hidden');
    viewMode.classList.remove('hidden');
});

editForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const topic = document.getElementById('editTopic').value;
    const originalContent = document.getElementById('editContent').value;

    try {
        const response = await fetch('/api/studysets/' + studySetId, {
            method: 'PUT',
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
            return;
        }

        window.location.reload();
    } catch (error) {
        console.log('Error updating study set:', error);
    }
});

deleteBtn.addEventListener('click', async function() {
    const confirmed = confirm('Delete this study set? This cannot be undone.');
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch('/api/studysets/' + studySetId, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!response.ok) {
            const data = await response.json();
            errorMessage.textContent = data.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        window.location.href = 'dashboard.html';
    } catch (error) {
        console.log('Error deleting study set:', error);
    }
});

loadStudySet();