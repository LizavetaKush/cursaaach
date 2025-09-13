document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        currentTheme = theme;

        updateThemeButton();
    }

    function updateThemeButton() {
        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            const icon = themeButton.querySelector('i');
            if (icon) {
                icon.className = currentTheme === 'dark' ? 'theme-icon sun' : 'theme-icon moon';
            }
            themeButton.setAttribute('aria-label', 
                currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        }
    }

    function createThemeButton() {
        if (document.getElementById('theme-toggle')) return;
        
        const themeButton = document.createElement('button');
        themeButton.id = 'theme-toggle';
        themeButton.className = 'theme-toggle';
        themeButton.setAttribute('aria-label', 
            currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');

        const icon = document.createElement('i');
        icon.className = currentTheme === 'dark' ? 'theme-icon sun' : 'theme-icon moon';
        themeButton.appendChild(icon);

        const headerBottomRight = document.querySelector('.header-bottom-right');
        if (headerBottomRight) {
            headerBottomRight.prepend(themeButton);
        }

        themeButton.addEventListener('click', function() {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    applyTheme(currentTheme);
    createThemeButton();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});