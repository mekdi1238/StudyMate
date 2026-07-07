const token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

const studySetsList = document.getElementById('studySetsList');
const emptyMessage = document.getElementById('emptyMessage');
const logoutBtn = document.getElementById('logoutBtn');

async function loadStudySets() {
    try {
        const response = await fetch('/api/studysets', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!response.ok) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        const data = await response.json();

        if (data.studySets.length === 0) {
            emptyMessage.classList.remove('hidden');
            return;
        }

        data.studySets.forEach(function(studySet) {
            const card = document.createElement('div');
            card.className = 'study-set-card';
            card.innerHTML = `
                <h3>${studySet.topic}</h3>
                <p>${studySet.original_content.substring(0, 100)}...</p>
                <a href="study-detail.html?id=${studySet.id}">View</a>
            `;
            studySetsList.appendChild(card);
        });
    } catch (error) {
        console.log('Error loading study sets:', error);
    }
}

logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

loadStudySets();