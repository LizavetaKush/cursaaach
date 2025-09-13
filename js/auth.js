
document.addEventListener('DOMContentLoaded', function() {
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

        generateUsernameBtn.addEventListener('click', generateUsername);

        registerForm.addEventListener('input', function(e) {
            validateField(e.target);
            validateRegisterForm();
        });

        loginForm.addEventListener('submit', handleLogin);
        registerForm.addEventListener('submit', handleRegistration);

        generateUsername();
    }

    function validateField(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        errorElement.textContent = '';
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
        }
    }
    
    function validatePhone(field, errorElement) {
        const phone = field.value.trim();
        const belarusRegex = /^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
        
        if (!phone) {
            errorElement.textContent = 'Номер телефона обязателен';
            field.classList.add('error');
            return false;
        }

        const cleanPhone = phone.replace(/[^\d+]/g, '');
        
        if (!belarusRegex.test(cleanPhone)) {
            errorElement.textContent = 'Введите корректный номер телефона РБ';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateEmail(field, errorElement) {
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            errorElement.textContent = 'Email обязателен';
            field.classList.add('error');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            errorElement.textContent = 'Введите корректный email';
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
            errorElement.textContent = 'Дата рождения обязательна';
            field.classList.add('error');
            return false;
        }
        
        if (birthdate > minAgeDate) {
            errorElement.textContent = 'Вам должно быть не менее 16 лет';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validatePassword(field, errorElement) {
        const password = field.value;
        
        if (!password) {
            errorElement.textContent = 'Пароль обязателен';
            field.classList.add('error');
            return false;
        }
        
        if (password.length < 8 || password.length > 20) {
            errorElement.textContent = 'Пароль должен быть от 8 до 20 символов';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*[a-z])/.test(password)) {
            errorElement.textContent = 'Добавьте строчную букву';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*[A-Z])/.test(password)) {
            errorElement.textContent = 'Добавьте заглавную букву';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*\d)/.test(password)) {
            errorElement.textContent = 'Добавьте цифру';
            field.classList.add('error');
            return false;
        }
        
        if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
            errorElement.textContent = 'Добавьте специальный символ';
            field.classList.add('error');
            return false;
        }
        
        if (commonPasswords.includes(password.toLowerCase())) {
            errorElement.textContent = 'Пароль слишком распространен';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateConfirmPassword(field, errorElement) {
        const password = document.getElementById('password').value;
        const confirmPassword = field.value;
        
        if (!confirmPassword) {
            errorElement.textContent = 'Подтверждение пароля обязательно';
            field.classList.add('error');
            return false;
        }
        
        if (password !== confirmPassword) {
            errorElement.textContent = 'Пароли не совпадают';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateName(field, errorElement) {
        const name = field.value.trim();
        
        if (field.required && !name) {
            errorElement.textContent = 'Это поле обязательно';
            field.classList.add('error');
            return false;
        }
        
        if (name && !/^[a-zA-Zа-яА-ЯёЁ\s\-]+$/.test(name)) {
            errorElement.textContent = 'Имя может содержать только буквы, пробелы и дефисы';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }
    
    function validateUsername(field, errorElement) {
        const username = field.value.trim();
        
        if (!username) {
            errorElement.textContent = 'Никнейм обязателен';
            field.classList.add('error');
            return false;
        }
        
        if (username.length < 3) {
            errorElement.textContent = 'Никнейм должен быть не менее 3 символов';
            field.classList.add('error');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_\-]+$/.test(username)) {
            errorElement.textContent = 'Никнейм может содержать только буквы, цифры, дефисы и подчеркивания';
            field.classList.add('error');
            return false;
        }
        
        return true;
    }

    function generateUsername() {
        if (generateAttempts <= 0 && !manualUsernameAllowed) {
            manualUsernameAllowed = true;
            usernameInput.removeAttribute('readonly');
            generateUsernameBtn.style.display = 'none';
            document.querySelector('.username-info').textContent = 'Теперь вы можете ввести никнейм вручную';
            return;
        }
        
        if (generateAttempts > 0) {
            generateAttempts--;
            generateAttemptsSpan.textContent = generateAttempts;
        }
        
        const adjectives = ['Cool', 'Smart', 'Fast', 'Brave', 'Happy', 'Clever', 'Wise', 'Young', 'Great', 'Super'];
        const nouns = ['Tiger', 'Eagle', 'Lion', 'Wolf', 'Bear', 'Fox', 'Hawk', 'Shark', 'Dragon', 'Phoenix'];
        const numbers = Math.floor(Math.random() * 1000);
        
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        
        const username = `${randomAdjective}${randomNoun}${numbers}`.toLowerCase();
        usernameInput.value = username;
        
        if (generateAttempts === 0) {
            generateUsernameBtn.textContent = 'Ввести вручную';
            document.querySelector('.username-info').textContent = 'Вы можете ввести никнейм вручную';
        }
        
        validateField(usernameInput);
        validateRegisterForm();
    }

    function validateRegisterForm() {
        const fields = registerForm.querySelectorAll('input[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!agreementCheckbox.checked) {
            isValid = false;
        }

        const isManualPassword = document.querySelector('input[name="password-type"]:checked').value === 'manual';
        if (isManualPassword) {
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            
            if (!validateField(password) || !validateField(confirmPassword)) {
                isValid = false;
            }
        }
        
        registerBtn.disabled = !isValid;
        return isValid;
    }

    async function handleLogin(e) {
        e.preventDefault();
        
        const formData = {
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
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
                window.location.href = '../index.html';
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
        
        if (!validateRegisterForm()) return;
        
        const isManualPassword = document.querySelector('input[name="password-type"]:checked').value === 'manual';
        let password;
        
        if (isManualPassword) {
            password = document.getElementById('password').value;
        } else {
            password = generateRandomPassword();
            alert(`Ваш сгенерированный пароль: ${password}\nСохраните его в надежном месте!`);
        }
        
        const userData = {
            phone: document.getElementById('phone').value.replace(/[^\d+]/g, ''),
            email: document.getElementById('email').value,
            birthdate: document.getElementById('birthdate').value,
            lastname: document.getElementById('lastname').value,
            firstname: document.getElementById('firstname').value,
            middlename: document.getElementById('middlename').value || '',
            username: document.getElementById('username').value,
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
                if (existingUser.email === userData.email) {
                    alert('Пользователь с таким email уже существует');
                } else if (existingUser.phone === userData.phone) {
                    alert('Пользователь с таким телефоном уже существует');
                } else {
                    alert('Пользователь с таким никнеймом уже существует');
                }
                return;
            }

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            if (response.ok) {
                alert('Регистрация прошла успешно!');
                localStorage.setItem('currentUser', JSON.stringify(userData));
                window.location.href = '../index.html';
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Ошибка при регистрации. Попробуйте позже.');
        }
    }
    
    function generateRandomPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
        let password = '';

        password += 'A'; 
        password += 'a'; 
        password += '1'; 
        password += '!'; 

        for (let i = 4; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
 
        return password.split('').sort(() => 0.5 - Math.random()).join('');
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('375')) {
                value = '+' + value;
            } else if (value.startsWith('80')) {
                value = '+375' + value.substring(2);
            }

            if (value.length > 3) value = value.substring(0, 4) + ' ' + value.substring(4);
            if (value.length > 6) value = value.substring(0, 6) + ' ' + value.substring(6);
            if (value.length > 9) value = value.substring(0, 9) + ' ' + value.substring(9);
            if (value.length > 12) value = value.substring(0, 12) + ' ' + value.substring(12);
            
            e.target.value = value;
        });
    }
});