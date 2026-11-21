let users: any[] = [];
const userDiv = document.getElementById('user');

async function fetchUsers() {
    showStatus('Loading users...');

    try {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    users = data.users;
    const userDiv = document.getElementById('user'); 
    
    if (!userDiv) return;
    userDiv.innerHTML = ''; 

    users.forEach((user: any) => {
      const userElement = document.createElement('div');
      userElement.textContent= `${user.firstName} ${user.lastName}`;
      userDiv?.appendChild(userElement);
    });} catch (error) {
        console.error('Error fetching users:', error);
        showStatus('Failed to load users. Please try again.', true);
    }

    console.log(users);
}

function searchUsers() {
    const searchInput = document.getElementById('search') as HTMLInputElement;
    searchInput.addEventListener('input', async (event: Event) => {
        const query = (event.target as HTMLInputElement).value.toLowerCase();
        await fetchUsersByQuery(query);
    });}
    
async function fetchUsersByQuery(query: string) {

    showStatus('Loading users...');
    try{
    const response = await fetch(`https://dummyjson.com/users/search?q=${query}`);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    const userDiv = document.getElementById('user');
    if (data.users.length === 0) {
    showStatus('No users found.');
    return;
  } 

    if (userDiv) {
        userDiv.innerHTML = '';
    }
        data.users.forEach((user: any) => {
            const userElement = document.createElement('div');
            userElement.textContent = `${user.firstName} ${user.lastName}`;
            userDiv?.appendChild(userElement);
        })
    } catch (error) {
        console.error('Error fetching users:', error);
        showStatus('Failed to load users. Please try again.', true);
    }
}
function showStatus(message: string, isError = false) {
  if (!userDiv) return;
  userDiv.innerHTML = `<p class="${isError ? 'error' : 'loading'}">${message}</p>`;
}


fetchUsers();
searchUsers();