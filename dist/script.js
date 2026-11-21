"use strict";
let users = [];
async function fetchUsers() {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    users = data.users;
    const userDiv = document.getElementById('user');
    users.forEach((user) => {
        const userElement = document.createElement('div');
        userElement.textContent = `${user.firstName} ${user.lastName}`;
        userDiv?.appendChild(userElement);
    });
    console.log(users);
}
function searchUsers() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', async (event) => {
        const query = event.target.value.toLowerCase();
        await fetchUsersByQuery(query);
    });
}
async function fetchUsersByQuery(query) {
    const response = await fetch(`https://dummyjson.com/users/search?q=${query}`);
    const data = await response.json();
    const userDiv = document.getElementById('user');
    if (userDiv) {
        userDiv.innerHTML = '';
    }
    data.users.forEach((user) => {
        const userElement = document.createElement('div');
        userElement.textContent = `${user.firstName} ${user.lastName}`;
        userDiv?.appendChild(userElement);
    });
}
fetchUsers();
searchUsers();
//# sourceMappingURL=script.js.map