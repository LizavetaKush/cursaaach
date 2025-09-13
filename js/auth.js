document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('login-form') && !document.getElementById('register-form')) {
        return; 
    }

    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const passwordTypeRadios = document.querySelectorAll('input[name="password-type"]');
    const manualPasswordFields = document.querySelectorAll('.manual-password');
    const generateUsernameBtn = document.getElementById('generate-username');
    const usernameInput = document.getElementById('username');
    const generateAttemptsSpan = document.getElementById('generate-attempts');
    const agreementCheckbox = document.getElementById('agreement');
    const registerBtn = document.getElementById('register-btn');

    let generateAttempts = 5;
    let manualUsernameAllowed = false;

    const commonPasswords = [
        'password', '123456', '12345678', '123456789', '12345',
        'qwerty', 'abc123', 'password1', '1234567', '1234567890',
        'iloveyou', 'admin', 'welcome', 'monkey', '123123',
        'sunshine', 'letmein', '1234', 'password123', 'shadow'
    ];

    initAuthPage();
    
    function initAuthPage() {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                authTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                authForms.forEach(form => form.classList.remove('active'));
                document.getElementById(`${tabName}-form`).classList.add('active');
            });
        });

        passwordTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                manualPasswordFields.forEach(field => {
                    field.classList.toggle('hidden', this.value !== 'manual');
                });
                
                if (this.value === 'manual') {
                    document.getElementById('password').setAttribute('required', 'true');
                    document.getElementById('confirm-password').setAttribute('required', 'true');
                } else {
                    document.getElementById('password').removeAttribute('required');
                    document.getElementById('confirm-password').removeAttribute('required');
                }
                
                validateRegisterForm();
            });
        });

        if (generateUsernameBtn) {
            generateUsernameBtn.addEventListener('click', generateUsername);
        }

        if (registerForm) {
            registerForm.addEventListener('input', function(e) {
                validateField(e.target);
                validateRegisterForm();
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegistration);
        }

        generateUsername();
    }

    function validateField(field) {
        if (!field || !field.parentElement) return false;
        
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
        field.classList.remove('error');
        
        switch(field.name) {
            case 'phone':
                return validatePhone(field, errorElement);
            case 'email':
                return validateEmail(field, errorElement);
            case 'birthdate':
                return validateBirthdate(field, errorElement);
            case 'password':
                return validatePassword(field, errorElement);
            case 'confirm-password':
                return validateConfirmPassword(field, errorElement);
            case 'lastname':
            case 'firstname':
            case 'middlename':
                return validateName(field, errorElement);
            case 'username':
                return validateUsername(field, errorElement);
            default:
                return true;
        }
    }
    
    function validatePhone(field, errorElement) {
        const phone = field.value.trim();
        const belarusRegex = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
        
        if (!phone) {
            if (errorElement) errorElement.textContent = 'Номер телефона обязателен';
            field.classList.add('error');
            return false;
        }
        
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        
        if (!belarusRegex.test(cleanPhone)) {
            if (errorElement) errorElement.textContent = 'Введите корректный номер телефона РБ';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateEmail(field, errorElement) {
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            if (errorElement) errorElement.textContent = 'Email обязателен';
            field.classList.add('error');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            if (errorElement) errorElement.textContent = 'Введите корректный email';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateBirthdate(field, errorElement) {
        const birthdate = new Date(field.value);
        const today = new Date();
        const minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 16);
        
        if (!field.value) {
            if (errorElement) errorElement.textContent = 'Дата рождения обязательна';
            field.classList.add('error');
            return false;
        }
        
        if (birthdate > minAgeDate) {
            if (errorElement) errorElement.textContent = 'Вам должно быть не менее 16 лет';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validatePassword(field, errorElement) {
        const password = field.value;
        
        if (!password) {
            if (errorElement) errorElement.textContent = 'Пароль обязателен';
            field.classList.add('error');
            return false;
        }
        
        if (password.length < 8 || password.length > 20) {
            if (errorElement) errorElement.textContent = 'Пароль должен быть от 8 до 20 символов';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*[a-z])/.test(password)) {
            if (errorElement) errorElement.textContent = 'Добавьте строчную букву';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*[A-Z])/.test(password)) {
            if (errorElement) errorElement.textContent = 'Добавьте заглавную букву';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*\d)/.test(password)) {
            if (errorElement) errorElement.textContent = 'Добавьте цифру';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
            if (errorElement) errorElement.textContent = 'Добавьте специальный символ';
            field.classList.add('error');
            return false;
        }
        
        if (commonPasswords.includes(password.toLowerCase())) {
            if (errorElement) errorElement.textContent = 'Пароль слишком распространен';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateConfirmPassword(field, errorElement) {
        const password = document.getElementById('password')?.value || '';
        const confirmPassword = field.value;
        
        if (!confirmPassword) {
            if (errorElement) errorElement.textContent = 'Подтверждение пароля обязательно';
            field.classList.add('error');
            return false;
        }
        
        if (password !== confirmPassword) {
            if (errorElement) errorElement.textContent = 'Пароли не совпадают';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateName(field, errorElement) {
        const name = field.value.trim();
        
        if (field.required && !name) {
            if (errorElement) errorElement.textContent = 'Это поле обязательно';
            field.classList.add('error');
            return false;
        }
        
        if (name && !/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name)) {
            if (errorElement) errorElement.textContent = 'Имя может содержать только буквы, пробелы и дефисы';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateUsername(field, errorElement) {
        const username = field.value.trim();
        
        if (!username) {
            if (errorElement) errorElement.textContent = 'Никнейм обязателен';
            field.classList.add('error');
            return false;
        }
        
        if (username.length < 3) {
            if (errorElement) errorElement.textContent = 'Никнейм должен быть не менее 3 символов';
            field.classList.add('error');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_\-]+$/.test(username)) {
            if (errorElement) errorElement.textContent = 'Никнейм может содержать только буквы, цифры, дефисы и подчеркивания';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }

    function generateUsername() {
        if (!usernameInput || !generateAttemptsSpan) return;
        
        if (generateAttempts <= 0 && !manualUsernameAllowed) {
            manualUsernameAllowed = true;
            usernameInput.removeAttribute('readonly');
            if (generateUsernameBtn) generateUsernameBtn.style.display = 'none';
            const usernameInfo = document.querySelector('.username-info');
            if (usernameInfo) usernameInfo.textContent = 'Теперь вы можете ввести никнейм вручную';
            return;
        }
        
        if (generateAttempts > 0) {
            generateAttempts--;
            if (generateAttemptsSpan) generateAttemptsSpan.textContent = generateAttempts;
        }
        
        const adjectives = ['Cool', 'Smart', 'Fast', 'Brave', 'Happy', 'Clever', 'Wise', 'Young', 'Great', 'Super'];
        const nouns = ['Tiger', 'Eagle', 'Lion', 'Wolf', 'Bear', 'Fox', 'Hawk', 'Shark', 'Dragon', 'Phoenix'];
        const numbers = Math.floor(Math.random() * 1000);
        
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        
        const username = `${randomAdjective}${randomNoun}${numbers}`.toLowerCase();
        usernameInput.value = username;
        
        if (generateAttempts === 0 && generateUsernameBtn) {
            generateUsernameBtn.textContent = 'Ввести вручную';
            const usernameInfo = document.querySelector('.username-info');
            if (usernameInfo) usernameInfo.textContent = 'Вы можете ввести никнейм вручную';
        }
        
        validateField(usernameInput);
        validateRegisterForm();
    }

    function validateRegisterForm() {
        if (!registerForm) return false;
        
        const fields = registerForm.querySelectorAll('input[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) isValid = false;
        });
        
        if (agreementCheckbox && !agreementCheckbox.checked) isValid = false;
        
        const passwordType = document.querySelector('input[name="password-type"]:checked');
        if (passwordType && passwordType.value === 'manual') {
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            
            if (password && !validateField(password)) isValid = false;
            if (confirmPassword && !validateField(confirmPassword)) isValid = false;
        }
        
        if (registerBtn) registerBtn.disabled = !isValid;
        return isValid;
    }
    
    async function handleLogin(e) {
        e.preventDefault();
        if (!loginForm) return;
        
        const formData = {
            email: document.getElementById('login-email')?.value || '',
            password: document.getElementById('login-password')?.value || ''
        };
        
        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            
            const user = users.find(u => 
                (u.email === formData.email || u.phone === formData.email) && 
                u.password === formData.password
            );
            
            if (user) {
                alert('Вход выполнен успешно!');
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                alert('Неверный email/телефон или пароль');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Ошибка при входе. Попробуйте позже.');
        }
    }
    
    async function handleRegistration(e) {
        e.preventDefault();
        if (!registerForm || !validateRegisterForm()) return;
        
        const passwordType = document.querySelector('input[name="password-type"]:checked');
        let password;
        
        if (passwordType && passwordType.value === 'manual') {
            password = document.getElementById('password')?.value || '';
        } else {
            password = generateRandomPassword();
            alert(`Ваш сгенерированный пароль: ${password}\nСохраните его в надежном месте!`);
        }
        
        const userData = {
            phone: document.getElementById('phone')?.value.replace(/[^\d+]/g, '') || '',
            email: document.getElementById('email')?.value || '',
            birthdate: document.getElementById('birthdate')?.value || '',
            lastname: document.getElementById('lastname')?.value || '',
            firstname: document.getElementById('firstname')?.value || '',
            middlename: document.getElementById('middlename')?.value || '',
            username: document.getElementById('username')?.value || '',
            password: password,
            role: 'user',
            registrationDate: new Date().toISOString()
        };
        
        try {
            const checkResponse = await fetch('http://localhost:3000/users');
            const users = await checkResponse.json();
            
            const existingUser = users.find(u => 
                u.email === userData.email || u.phone === userData.phone || u.username === userData.username
            );
            
            if (existingUser) {
                if (existingUser.email === userData.email) alert('Пользователь с таким email уже существует');
                else if (existingUser.phone === userData.phone) alert('Пользователь с таким телефоном уже существует');
                else alert('Пользователь с таким никнеймом уже существует');
                return;
            }
            
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                const newUser = await response.json();
                alert('Регистрация прошла успешно!');
                localStorage.setItem('currentUser', JSON.stringify(newUser));
                window.location.href = 'home.html';
            } else throw new Error('Registration failed');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Ошибка при регистрации. Попробуйте позже.');
        }
    }
    
    function generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
        let password = 'Aal!';
        
        for (let i = 4; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('375')) value = '+' + value;
            else if (value.startsWith('80')) value = '+375' + value.substring(2);
            
            if (value.length > 3) value = value.substring(0, 4) + ' ' + value.substring(4);
            if (value.length > 6) value = value.substring(0, 6) + ' ' + value.substring(6);
            if (value.length > 9) value = value.substring(0, 9) + ' ' + value.substring(9);
            if (value.length > 12) value = value.substring(0, 12) + ' ' + value.substring(12);
            
            e.target.value = value;
        });
    }
});