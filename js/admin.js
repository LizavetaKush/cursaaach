class AdminManager {
    constructor() {
        this.currentTab = 'users';
        this.users = [];
        this.services = [];
        this.reviews = [];
        this.filteredUsers = [];
        this.filteredServices = [];
        this.filteredReviews = [];
    }

    async init() {
        this.setupTabs();
        await this.loadAllData();
        this.setupEventListeners();
    }

    setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');

        switch(tab) {
            case 'users':
                this.renderUsers();
                break;
            case 'services':
                this.renderServices();
                break;
            case 'reviews':
                this.renderReviews();
                break;
        }
    }

    async loadAllData() {
        try {
            const [usersResponse, servicesResponse, reviewsResponse] = await Promise.all([
                fetch('http://localhost:3000/users'),
                fetch('http://localhost:3000/services'),
                fetch('http://localhost:3000/reviews')
            ]);

            if (!usersResponse.ok || !servicesResponse.ok || !reviewsResponse.ok) {
                throw new Error('Ошибка загрузки данных');
            }

            this.users = await usersResponse.json();
            this.services = await servicesResponse.json();
            this.reviews = await reviewsResponse.json();

            this.filteredUsers = [...this.users];
            this.filteredServices = [...this.services];
            this.filteredReviews = [...this.reviews];

            this.renderUsers();
            this.renderServices();
            this.renderReviews();

        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Не удалось загрузить данные');
        }
    }

    renderUsers() {
        const tbody = document.getElementById('usersTableBody');
        if (this.filteredUsers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="loading">Пользователи не найдены</td></tr>';
            return;
        }

        tbody.innerHTML = this.filteredUsers.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstname} ${user.lastname}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <select class="role-select" data-user-id="${user.id}">
                        <option value="user" ${user.role === 'user' ? 'selected' : ''}>Пользователь</option>
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Администратор</option>
                    </select>
                </td>
                <td>${new Date(user.registrationDate).toLocaleDateString('ru-RU')}</td>
                <td class="action-buttons">
                    <button class="btn-save" onclick="saveUserRole('${user.id}')">💾</button>
                </td>
            </tr>
        `).join('');

        document.querySelectorAll('.role-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const userId = e.target.dataset.userId;
                const newRole = e.target.value;
                this.updateUserRole(userId, newRole);
            });
        });
    }

    async updateUserRole(userId, newRole) {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });

            if (response.ok) {
                this.showSuccess('Роль пользователя обновлена');

                const userIndex = this.users.findIndex(u => u.id === userId);
                if (userIndex !== -1) {
                    this.users[userIndex].role = newRole;
                }
            } else {
                throw new Error('Ошибка обновления роли');
            }
        } catch (error) {
            console.error('Error updating role:', error);
            this.showError('Ошибка при обновлении роли');
            this.renderUsers(); 
        }
    }

    searchUsers() {
        const query = document.getElementById('usersSearch').value.toLowerCase();
        this.filteredUsers = this.users.filter(user =>
            user.firstname.toLowerCase().includes(query) ||
            user.lastname.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query)
        );
        this.renderUsers();
    }

    renderServices() {
        const tbody = document.getElementById('servicesTableBody');
        if (this.filteredServices.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="loading">Услуги не найдены</td></tr>';
            return;
        }

        tbody.innerHTML = this.filteredServices.map(service => `
            <tr>
                <td>${service.id}</td>
                <td>${service.title}</td>
                <td>${service.category}</td>
                <td>${service.price}</td>
                <td>${service.rating}</td>
                <td>${service.isPopular ? '✅' : '❌'}</td>
                <td class="action-buttons">
                    <button class="btn-edit" onclick="showEditServiceModal('${service.id}')">✏️</button>
                    <button class="btn-delete" onclick="deleteService('${service.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    searchServices() {
        const query = document.getElementById('servicesSearch').value.toLowerCase();
        this.filteredServices = this.services.filter(service =>
            service.title.toLowerCase().includes(query) ||
            service.category.toLowerCase().includes(query)
        );
        this.renderServices();
    }

    async deleteService(serviceId) {
        if (!confirm('Вы уверены, что хотите удалить эту услугу?')) return;

        try {
            const response = await fetch(`http://localhost:3000/services/${serviceId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showSuccess('Услуга удалена');
                this.services = this.services.filter(s => s.id !== serviceId);
                this.filteredServices = this.filteredServices.filter(s => s.id !== serviceId);
                this.renderServices();
            } else {
                throw new Error('Ошибка удаления услуги');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            this.showError('Ошибка при удалении услуги');
        }
    }

    renderReviews() {
        const tbody = document.getElementById('reviewsTableBody');
        if (this.filteredReviews.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="loading">Отзывы не найдены</td></tr>';
            return;
        }

        tbody.innerHTML = this.filteredReviews.map(review => `
            <tr>
                <td>${review.id}</td>
                <td>${review.userName}</td>
                <td>${review.category}</td>
                <td>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</td>
                <td title="${review.title}">${review.title.length > 30 ? review.title.substring(0, 30) + '...' : review.title}</td>
                <td>${new Date(review.date).toLocaleDateString('ru-RU')}</td>
                <td class="action-buttons">
                    <button class="btn-delete" onclick="deleteReview('${review.id}')">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    searchAdminReviews() {
        const query = document.getElementById('reviewsSearch').value.toLowerCase();
        this.filteredReviews = this.reviews.filter(review =>
            review.userName.toLowerCase().includes(query) ||
            review.title.toLowerCase().includes(query) ||
            review.text.toLowerCase().includes(query)
        );
        this.renderReviews();
    }

    async deleteReview(reviewId) {
        if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) return;

        try {
            const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.showSuccess('Отзыв удален');
                this.reviews = this.reviews.filter(r => r.id !== reviewId);
                this.filteredReviews = this.filteredReviews.filter(r => r.id !== reviewId);
                this.renderReviews();
            } else {
                throw new Error('Ошибка удаления отзыва');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            this.showError('Ошибка при удалении отзыва');
        }
    }

    showAddServiceModal() {
        const modalHTML = `
            <div class="modal-overlay" id="add-service-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2>Добавить новую услугу</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="add-service-form">
                            <div class="form-group">
                                <label for="service-title">Название услуги:</label>
                                <input type="text" id="service-title" required>
                            </div>
                            <div class="form-group">
                                <label for="service-category">Категория:</label>
                                <select id="service-category" required>
                                    <option value="Invoices">Invoices</option>
                                    <option value="Quick Checkout">Quick Checkout</option>
                                    <option value="API">API</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="service-description">Описание:</label>
                                <textarea id="service-description" required rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="service-price">Цена:</label>
                                <input type="text" id="service-price" value="Бесплатно" required>
                            </div>
                            <div class="form-group">
                                <label for="service-fee">Комиссия:</label>
                                <input type="text" id="service-fee" value="1%" required>
                            </div>
                            <div class="form-group">
                                <label for="service-rating">Рейтинг:</label>
                                <input type="number" id="service-rating" min="0" max="5" step="0.1" value="4.5" required>
                            </div>
                            <div class="form-group">
                                <label for="service-popular">Популярная услуга:</label>
                                <input type="checkbox" id="service-popular">
                            </div>
                            <div class="form-group">
                                <label>Особенности (через запятую):</label>
                                <textarea id="service-features" rows="3" placeholder="Без подписок, Учет налогов..."></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="cancel-btn" onclick="closeModal('add-service-modal')">Отмена</button>
                        <button class="confirm-btn" onclick="addService()">Добавить</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupModal('add-service-modal');
    }

    showEditServiceModal(serviceId) {
        const service = this.services.find(s => s.id === serviceId);
        if (!service) return;

        const modalHTML = `
            <div class="modal-overlay" id="edit-service-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2>Редактировать услугу</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="edit-service-form">
                            <div class="form-group">
                                <label for="edit-service-title">Название услуги:</label>
                                <input type="text" id="edit-service-title" value="${service.title}" required>
                            </div>
                            <div class="form-group">
                                <label for="edit-service-category">Категория:</label>
                                <select id="edit-service-category" required>
                                    <option value="Invoices" ${service.category === 'Invoices' ? 'selected' : ''}>Invoices</option>
                                    <option value="Quick Checkout" ${service.category === 'Quick Checkout' ? 'selected' : ''}>Quick Checkout</option>
                                    <option value="API" ${service.category === 'API' ? 'selected' : ''}>API</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="edit-service-description">Описание:</label>
                                <textarea id="edit-service-description" required rows="3">${service.shortDescription}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="edit-service-price">Цена:</label>
                                <input type="text" id="edit-service-price" value="${service.price}" required>
                            </div>
                            <div class="form-group">
                                <label for="edit-service-fee">Комиссия:</label>
                                <input type="text" id="edit-service-fee" value="${service.transactionFee}" required>
                            </div>
                            <div class="form-group">
                                <label for="edit-service-rating">Рейтинг:</label>
                                <input type="number" id="edit-service-rating" min="0" max="5" step="0.1" value="${service.rating}" required>
                            </div>
                            <div class="form-group">
                                <label for="edit-service-popular">Популярная услуга:</label>
                                <input type="checkbox" id="edit-service-popular" ${service.isPopular ? 'checked' : ''}>
                            </div>
                            <div class="form-group">
                                <label>Особенности (через запятую):</label>
                                <textarea id="edit-service-features" rows="3">${service.features.join(', ')}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="cancel-btn" onclick="closeModal('edit-service-modal')">Отмена</button>
                        <button class="confirm-btn" onclick="updateService('${serviceId}')">Сохранить</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.setupModal('edit-service-modal');
    }

    setupModal(modalId) {
        const modal = document.getElementById(modalId);
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => this.closeModal(modalId));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modalId);
        });
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.remove();
    }

    showSuccess(message) {
        alert('✅ ' + message);
    }

    showError(message) {
        alert('❌ ' + message);
    }

    setupEventListeners() {
        document.getElementById('usersSearch')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchUsers();
        });
        
        document.getElementById('servicesSearch')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchServices();
        });
        
        document.getElementById('reviewsSearch')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchAdminReviews();
        });
    }
}

const adminManager = new AdminManager();

async function saveUserRole(userId) {
    const select = document.querySelector(`[data-user-id="${userId}"]`);
    if (select) {
        await adminManager.updateUserRole(userId, select.value);
    }
}

function showAddServiceModal() {
    adminManager.showAddServiceModal();
}

function showEditServiceModal(serviceId) {
    adminManager.showEditServiceModal(serviceId);
}

async function addService() {
    const title = document.getElementById('service-title').value;
    const category = document.getElementById('service-category').value;
    const description = document.getElementById('service-description').value;
    const price = document.getElementById('service-price').value;
    const fee = document.getElementById('service-fee').value;
    const rating = parseFloat(document.getElementById('service-rating').value);
    const isPopular = document.getElementById('service-popular').checked;
    const features = document.getElementById('service-features').value.split(',').map(f => f.trim());

    if (!title || !category || !description) {
        alert('Пожалуйста, заполните обязательные поля');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                category,
                shortDescription: description,
                fullDescription: description,
                price,
                transactionFee: fee,
                rating,
                reviewsCount: 0,
                icon: '../img/default-service.png',
                isPopular,
                features
            })
        });

        if (response.ok) {
            adminManager.closeModal('add-service-modal');
            adminManager.showSuccess('Услуга добавлена');
            await adminManager.loadAllData();
        } else {
            throw new Error('Ошибка добавления услуги');
        }
    } catch (error) {
        console.error('Error adding service:', error);
        adminManager.showError('Ошибка при добавлении услуги');
    }
}

async function updateService(serviceId) {
    const title = document.getElementById('edit-service-title').value;
    const category = document.getElementById('edit-service-category').value;
    const description = document.getElementById('edit-service-description').value;
    const price = document.getElementById('edit-service-price').value;
    const fee = document.getElementById('edit-service-fee').value;
    const rating = parseFloat(document.getElementById('edit-service-rating').value);
    const isPopular = document.getElementById('edit-service-popular').checked;
    const features = document.getElementById('edit-service-features').value.split(',').map(f => f.trim());

    try {
        const response = await fetch(`http://localhost:3000/services/${serviceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                category,
                shortDescription: description,
                fullDescription: description,
                price,
                transactionFee: fee,
                rating,
                isPopular,
                features
            })
        });

        if (response.ok) {
            adminManager.closeModal('edit-service-modal');
            adminManager.showSuccess('Услуга обновлена');
            await adminManager.loadAllData();
        } else {
            throw new Error('Ошибка обновления услуги');
        }
    } catch (error) {
        console.error('Error updating service:', error);
        adminManager.showError('Ошибка при обновлении услуги');
    }
}

function deleteService(serviceId) {
    adminManager.deleteService(serviceId);
}

function deleteReview(reviewId) {
    adminManager.deleteReview(reviewId);
}

function searchUsers() {
    adminManager.searchUsers();
}

function searchServices() {
    adminManager.searchServices();
}

function searchAdminReviews() {
    adminManager.searchAdminReviews();
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Доступ запрещен. Требуются права администратора.');
        window.location.href = 'index.html';
        return;
    }

    adminManager.init();
});