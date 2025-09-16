document.addEventListener('DOMContentLoaded', function() {
    updateHeaderAuthState();
    applyAccessibilitySettings(); 
});

const translation = {
    'en': {
        'ui.user.avatar': 'U',
        'ui.user.name': 'User',
        'ui.dropdown.profile': '👤 Profile',
        'ui.dropdown.admin': '⚙️ Admin panel',
        'ui.dropdown.settings': '⚙️ Settings',
        'ui.dropdown.logout': '🚪 Logout',
        
        'accessibility.title': '⚙️ Accessibility Settings',
        'accessibility.fontsize': 'Font size',
        'accessibility.fontsize.normal': 'Normal',
        'accessibility.fontsize.large': 'Large (+25%)',
        'accessibility.fontsize.xlarge': 'Very large (+50%)',
        'accessibility.colorscheme': 'Color scheme',
        'accessibility.colorscheme.default': 'Default',
        'accessibility.colorscheme.blackwhite': 'Black background / White text',
        'accessibility.colorscheme.blackgreen': 'Black background / Green text',
        'accessibility.colorscheme.beigebrown': 'Beige background / Brown text',
        'accessibility.colorscheme.bluedarkblue': 'Blue background / Dark blue text',
        'accessibility.images': 'Images',
        'accessibility.images.disable': 'Disable images',
        'accessibility.reset': 'Reset settings',
        'accessibility.save': 'Save',
        'accessibility.image.placeholder': 'Image disabled in accessibility settings',
        
        'modal.close': 'Х'
    },
    'ru': {
        'ui.user.avatar': 'П',
        'ui.user.name': 'Пользователь',
        'ui.dropdown.profile': '👤 Профиль',
        'ui.dropdown.admin': '⚙️ Админ панель',
        'ui.dropdown.settings': '⚙️ Настройки',
        'ui.dropdown.logout': '🚪 Выйти',
        
        'accessibility.title': '⚙️ Настройки доступности',
        'accessibility.fontsize': 'Размер шрифта',
        'accessibility.fontsize.normal': 'Обычный',
        'accessibility.fontsize.large': 'Большой (+25%)',
        'accessibility.fontsize.xlarge': 'Очень большой (+50%)',
        'accessibility.colorscheme': 'Цветовая схема',
        'accessibility.colorscheme.default': 'Стандартная',
        'accessibility.colorscheme.blackwhite': 'Черный фон / Белый текст',
        'accessibility.colorscheme.blackgreen': 'Черный фон / Зеленый текст',
        'accessibility.colorscheme.beigebrown': 'Бежевый фон / Коричневый текст',
        'accessibility.colorscheme.bluedarkblue': 'Голубой фон / Темно-синий текст',
        'accessibility.images': 'Изображения',
        'accessibility.images.disable': 'Отключить изображения',
        'accessibility.reset': 'Сбросить настройки',
        'accessibility.save': 'Сохранить',
        'accessibility.image.placeholder': 'Изображение отключено в настройках доступности',
        
        'modal.close': 'Х'
    }
};

function updateHeaderAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const authButton = document.querySelector('.header-bottom-right-auth');
    const headerBottomRight = document.querySelector('.header-bottom-right');
    
    if (!headerBottomRight) return;
    
    if (currentUser) {
        if (authButton) authButton.style.display = 'none';
        if (!document.getElementById('user-dropdown')) {
            createUserDropdown(currentUser, headerBottomRight);
        }
    } else {
        if (authButton) authButton.style.display = 'block';
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) dropdown.remove();
    }
}

function createUserDropdown(user, container) {
    const dropdown = document.createElement('div');
    dropdown.id = 'user-dropdown';
    dropdown.className = 'user-dropdown';
    
    const currentLang = localStorage.getItem('language') || 'ru';
    const t = translation[currentLang];
    
    dropdown.innerHTML = `
        <button class="user-menu-btn">
            <span class="user-avatar">${user.firstname?.charAt(0) || t['ui.user.avatar']}</span>
            <span class="user-name">${user.firstname || t['ui.user.name']}</span>
            <span class="dropdown-arrow">▼</span>
        </button>
        <div class="dropdown-menu hidden">
            ${user.role === 'admin' ? `<button class="dropdown-item admin-btn" data-i18n="ui.dropdown.admin">⚙️ Админ панель</button>` : ''}
            <button class="dropdown-item settings-btn" data-i18n="ui.dropdown.settings">⚙️ Настройки</button>
            <button class="dropdown-item logout-btn" data-i18n="ui.dropdown.logout">🚪 Выйти</button>
        </div>
    `;
    
    container.appendChild(dropdown);

    setTimeout(() => {
        applytranslationToElement(dropdown, currentLang);
    }, 0);
    
    const menuBtn = dropdown.querySelector('.user-menu-btn');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
    });

    dropdown.querySelector('.admin-btn')?.addEventListener('click', showAdminPanel);
    dropdown.querySelector('.settings-btn')?.addEventListener('click', showAccessibilitySettings);
    dropdown.querySelector('.logout-btn')?.addEventListener('click', handleLogout);
    
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.add('hidden');
        }
    });
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    updateHeaderAuthState();
    window.location.reload();
}

function showAccessibilitySettings() {
    const currentLang = localStorage.getItem('language') || 'ru';
    const t = translation[currentLang];
    
    const modalHTML = `
        <div class="modal-overlay" id="accessibility-modal">
            <div class="modal accessibility-modal">
                <div class="modal-header">
                    <h2 class="modal-title" data-i18n="accessibility.title">⚙️ Настройки доступности</h2>
                    <button class="modal-close" data-i18n="modal.close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="accessibility-section">
                        <h3 data-i18n="accessibility.fontsize">Размер шрифта</h3>
                        <div class="radio-group">
                            <label class="radio-container">
                                <input type="radio" name="font-size" value="normal" checked>
                                <span class="radiomark"></span>
                                <span data-i18n="accessibility.fontsize.normal">Обычный</span>
                            </label>
                            <label class="radio-container">
                                <input type="radio" name="font-size" value="large">
                                <span class="radiomark"></span>
                                <span data-i18n="accessibility.fontsize.large">Большой (+25%)</span>
                            </label>
                            <label class="radio-container">
                                <input type="radio" name="font-size" value="x-large">
                                <span class="radiomark"></span>
                                <span data-i18n="accessibility.fontsize.xlarge">Очень большой (+50%)</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h3 data-i18n="accessibility.colorscheme">Цветовая схема</h3>
                        <div class="color-schemes">
                            <label class="color-scheme-option">
                                <input type="radio" name="color-scheme" value="default" checked>
                                <span class="color-scheme-preview default-scheme"></span>
                                <span data-i18n="accessibility.colorscheme.default">Стандартная</span>
                            </label>
                            <label class="color-scheme-option">
                                <input type="radio" name="color-scheme" value="black-white">
                                <span class="color-scheme-preview black-white-scheme"></span>
                                <span data-i18n="accessibility.colorscheme.blackwhite">Черный фон / Белый текст</span>
                            </label>
                            <label class="color-scheme-option">
                                <input type="radio" name="color-scheme" value="black-green">
                                <span class="color-scheme-preview black-green-scheme"></span>
                                <span data-i18n="accessibility.colorscheme.blackgreen">Черный фон / Зеленый текст</span>
                            </label>
                            <label class="color-scheme-option">
                                <input type="radio" name="color-scheme" value="beige-brown">
                                <span class="color-scheme-preview beige-brown-scheme"></span>
                                <span data-i18n="accessibility.colorscheme.beigebrown">Бежевый фон / Коричневый текст</span>
                            </label>
                            <label class="color-scheme-option">
                                <input type="radio" name="color-scheme" value="blue-darkblue">
                                <span class="color-scheme-preview blue-darkblue-scheme"></span>
                                <span data-i18n="accessibility.colorscheme.bluedarkblue">Голубой фон / Темно-синий текст</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h3 data-i18n="accessibility.images">Изображения</h3>
                        <label class="checkbox-container">
                            <input type="checkbox" id="disable-images">
                            <span class="checkmark"></span>
                            <span data-i18n="accessibility.images.disable">Отключить изображения</span>
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="auth-submit-btn secondary" id="reset-settings" data-i18n="accessibility.reset">Сбросить настройки</button>
                    <button type="button" class="auth-submit-btn" id="save-accessibility" data-i18n="accessibility.save">Сохранить</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    applytranslationToElement(document.getElementById('accessibility-modal'), currentLang);
    
    loadAccessibilitySettings();
    
    const modal = document.getElementById('accessibility-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const saveBtn = modal.querySelector('#save-accessibility');
    const resetBtn = modal.querySelector('#reset-settings');
    
    const closeModal = () => modal.remove();
    
    closeBtn.addEventListener('click', closeModal);
    
    saveBtn.addEventListener('click', function() {
        saveAccessibilitySettings();
        applyAccessibilitySettings();
        closeModal();
    });
    
    resetBtn.addEventListener('click', function() {
        resetAccessibilitySettings();
        applyAccessibilitySettings();
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

function loadAccessibilitySettings() {
    const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');

    const fontSizeInput = document.querySelector(`input[name="font-size"][value="${settings.fontSize || 'normal'}"]`);
    if (fontSizeInput) {
        fontSizeInput.checked = true;
    }

    const colorSchemeInput = document.querySelector(`input[name="color-scheme"][value="${settings.colorScheme || 'default'}"]`);
    if (colorSchemeInput) {
        colorSchemeInput.checked = true;
    }

    if (settings.disableImages !== undefined) {
        document.getElementById('disable-images').checked = settings.disableImages;
    }
}

function saveAccessibilitySettings() {
    const fontSize = document.querySelector('input[name="font-size"]:checked').value;
    const colorScheme = document.querySelector('input[name="color-scheme"]:checked').value;
    const disableImages = document.getElementById('disable-images').checked;
    
    const settings = {
        fontSize,
        colorScheme,
        disableImages
    };
    
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
}

function resetAccessibilitySettings() {
    localStorage.removeItem('accessibilitySettings');

    localStorage.setItem('theme', 'light');
    localStorage.setItem('language', 'en');

    document.querySelector('input[name="font-size"][value="normal"]').checked = true;
    document.querySelector('input[name="color-scheme"][value="default"]').checked = true;
    document.getElementById('disable-images').checked = false;

    document.body.classList.remove('dark', 'light'); 
    document.body.classList.add('light');

    applytranslationToElement(document, 'en'); 
    location.reload();
}


function applyAccessibilitySettings() {
    const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');

    document.body.classList.remove(
        'accessibility-active',
        'font-normal', 'font-large', 'font-x-large',
        'color-default', 'color-black-white', 'color-black-green',
        'color-beige-brown', 'color-blue-darkblue',
        'images-disabled'
    );

    const hasCustomSettings = settings.fontSize !== 'normal' || 
                             settings.colorScheme !== 'default' || 
                             settings.disableImages;
    
    if (hasCustomSettings) {
        document.body.classList.add('accessibility-active');

        document.body.classList.add(`font-${settings.fontSize || 'normal'}`);

        if (settings.colorScheme && settings.colorScheme !== 'default') {
            document.body.classList.add(`color-${settings.colorScheme}`);
        }

        if (settings.disableImages) {
            document.body.classList.add('images-disabled');
        }
    }
    
    applyAccessibilityStyles();
}

function applyAccessibilityStyles() {
    const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
    const hasCustomSettings = settings.fontSize !== 'normal' || 
                             settings.colorScheme !== 'default' || 
                             settings.disableImages;
    
    if (hasCustomSettings) {
        const allParagraphs = document.querySelectorAll('p');
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        allParagraphs.forEach(p => {
            p.style.lineHeight = '1.6';
            p.style.textAlign = 'left';
            p.style.letterSpacing = '0.12em';
            p.style.wordSpacing = '0.16em';
            p.style.marginBottom = '1.5em';
        });
        
        allHeadings.forEach(h => {
            h.style.lineHeight = '1.5';
            h.style.marginBottom = '1.5em';
        });
    } else {
        const allParagraphs = document.querySelectorAll('p');
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        allParagraphs.forEach(p => {
            p.style.lineHeight = '';
            p.style.textAlign = '';
            p.style.letterSpacing = '';
            p.style.wordSpacing = '';
            p.style.marginBottom = '';
        });
        
        allHeadings.forEach(h => {
            h.style.lineHeight = '';
            h.style.marginBottom = '';
        });
    }

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const oldPlaceholder = img.previousElementSibling;
        if (oldPlaceholder && oldPlaceholder.classList.contains('image-placeholder')) {
            oldPlaceholder.remove();
        }
        
        if (settings.disableImages && hasCustomSettings) {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Изображение отключено в настройках доступности';
            placeholder.style.display = 'block';
            placeholder.style.padding = '2rem';
            placeholder.style.textAlign = 'center';
            placeholder.style.fontStyle = 'italic';
            placeholder.style.margin = '1rem 0';
            
            img.parentNode.insertBefore(placeholder, img);
            img.style.display = 'none';
        } else {
            img.style.display = '';
        }
    });
}

function applyAccessibilityStyles() {
    const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');

    const allParagraphs = document.querySelectorAll('p');
    const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    if (settings.fontSize === 'x-large' || settings.colorScheme !== 'default') {
        allParagraphs.forEach(p => {
            p.style.textAlign = 'left';
            p.style.letterSpacing = '0.12em';
            p.style.wordSpacing = '0.16em';
        });
        
    } else {
        allParagraphs.forEach(p => {
            p.style.lineHeight = '';
            p.style.textAlign = '';
            p.style.letterSpacing = '';
            p.style.wordSpacing = '';
            p.style.marginBottom = '';
        });
        
        allHeadings.forEach(h => {
            h.style.lineHeight = '';
            h.style.marginBottom = '';
        });
    }

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const oldPlaceholder = img.previousElementSibling;
        if (oldPlaceholder && oldPlaceholder.classList.contains('image-placeholder')) {
            oldPlaceholder.remove();
        }
        
        if (settings.disableImages) {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.textContent = 'Изображение отключено в настройках доступности';
            placeholder.style.display = 'block';
            placeholder.style.padding = '2rem';
            placeholder.style.textAlign = 'center';
            placeholder.style.fontStyle = 'italic';
            placeholder.style.margin = '1rem 0';
            
            img.parentNode.insertBefore(placeholder, img);
            img.style.display = 'none';
        } else {
            img.style.display = '';
        }
    });
}

function showAdminPanel() {
    window.location.href = 'admin.html';
}

function applytranslationToElement(element, lang) {
    const elements = element.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translation[lang][key]) {
            el.textContent = translation[lang][key];
        }
    });

    const inputs = element.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        if (translation[lang][key]) {
            input.placeholder = translation[lang][key];
        }
    });
}