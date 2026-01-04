const body = document.body;

// Load shared header
fetch(`/header.html`)
    .then(res => res.text())
    .then(data => {
        document.getElementById("shared-header").innerHTML = data;


        initThemeToggle();
        initLastEdited();
    })
    .catch(err => console.error("Header load failed:", err));

function initThemeToggle() {
    const toggleBtn = document.getElementById('toggleBtn');
    const modeIcon = document.getElementById('icon');

    if (!toggleBtn || !modeIcon) return;

    // Load saved mode
    const savedMode = localStorage.getItem('mode') || 'light-mode';
    body.classList.remove('light-mode', 'dark-mode');
    body.classList.add(savedMode);
    updateIcons(savedMode, modeIcon);

    // Toggle on click
    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');

        const currentMode = body.classList.contains('dark-mode')
            ? 'dark-mode'
            : 'light-mode';

        localStorage.setItem('mode', currentMode);
        updateIcons(currentMode, modeIcon);
    });
}

function updateIcons(mode, icon) {
    icon.src =
        mode === 'dark-mode'
            ? 'assets/sun-colour.png'
            : 'assets/moon-colour.png';
}

function initLastEdited() {
    const lastEdited = document.getElementById('lastedited');
        lastEdited.textContent = `Last edited: ${document.lastModified.toLocaleDateString}`;
    }

