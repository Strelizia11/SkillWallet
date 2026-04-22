const fetchBtn = document.getElementById('fetchBtn');
const dataContainer = document.getElementById('dataContainer');
const loadingIndicator = document.getElementById('loading');

fetchBtn.addEventListener('click', () => {
    dataContainer.innerHTML = '';
    loadingIndicator.classList.remove('hidden');
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadingIndicator.classList.add('hidden');
            displayUsers(data);
        })
        .catch(error => {
            loadingIndicator.classList.add('hidden');
            dataContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        });
});

function displayUsers(users) {
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-card');
        
        const name = document.createElement('strong');
        name.textContent = user.name;
        
        const email = document.createElement('p');
        email.textContent = user.email;
        email.style.margin = "0";
        email.style.fontSize = "0.9rem";
        
        userDiv.appendChild(name);
        userDiv.appendChild(email);
        dataContainer.appendChild(userDiv);
    });
}