const token = localStorage.getItem('token');
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});
if (!token) {
    window.location.href = 'login.html';
}

const studySetsList = document.getElementById('studySetsList');
const emptyMessage = document.getElementById('emptyMessage');
const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');

async function loadStudySets(searchTerm) {
    try {
        let url = '/api/studysets';
        if (searchTerm) {
            url += '?search=' + encodeURIComponent(searchTerm);
        }

        const response = await fetch(url, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!response.ok) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
            return;
        }

        const data = await response.json();

        studySetsList.innerHTML = '';

        if (data.studySets.length === 0) {
            emptyMessage.classList.remove('hidden');
            return;
        }

        emptyMessage.classList.add('hidden');

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

let searchTimeout;
searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function() {
        loadStudySets(searchInput.value);
    }, 300);
});

logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

loadStudySets();