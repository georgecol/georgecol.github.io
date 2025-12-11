const toggleBtn = document.getElementById('toggleBtn');
const body = document.body;
const modeIcon = document.getElementById('icon');


// Load saved mode on page load
const savedMode = localStorage.getItem('mode');
if (savedMode) {
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedMode);
    updateIcons(savedMode);
}

// Toggle mode on button click
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    const currentMode = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('mode', currentMode);

    updateIcons(currentMode);
});

// Swap icons
function updateIcons(mode) {
    if (mode === 'dark-mode') {
        modeIcon.src = 'assets/sun-colour.png';
    } else {
        modeIcon.src = 'assets/moon-colour.png';
    }
}
