const translatio = {
    'en': {
        'services.hero.title': 'Our Services',
        'services.hero.subtitle': 'Choose the optimal solution for your business',
        'services.search.placeholder': 'Search services...',
        'services.search.button': 'Search',
        'services.filter.category': 'All categories',
        'services.filter.sort.name': 'By name',
        'services.filter.sort.price': 'By price',
        'services.filter.sort.rating': 'By rating',
        'services.filter.sort.popularity': 'By popularity',
        'services.loading': 'Loading services...',
        'services.empty': 'Services not found. Try changing search parameters.',
        'services.category.invoices': 'Invoices',
        'services.category.quick': 'Quick Checkout',
        'services.category.api': 'API',
        
        'service.category': 'Category:',
        'service.price': 'Price:',
        'service.fee': 'Commission:',
        'service.rating': 'Rating:',
        'service.reviews': 'reviews',
        'service.features': 'Features:',
        
        'service.action.login': 'Login to order',
        'service.action.active': '✅ Service active',
        'service.action.completed': '✓ Completed',
        'service.action.review': '📝 Leave review',
        'service.action.order': '🛒 Order',
        
        'order.modal.title': 'Service Order',
        'order.modal.price': 'Price:',
        'order.modal.fee': 'Commission:',
        'order.modal.terms': 'Terms of use:',
        'order.modal.term1': '✅ No hidden fees',
        'order.modal.term2': '✅ Can be canceled at any time',
        'order.modal.term3': '✅ 24/7 technical support',
        'order.modal.term4': '✅ 14-day money-back guarantee',
        'order.modal.cancel': 'Cancel',
        'order.modal.confirm': 'Confirm order',
        
        'review.modal.title': 'Leave a review',
        'review.modal.subtitle': 'Share your experience using the service',
        'review.modal.rating': 'Rating:',
        'review.modal.title_input': 'Review title:',
        'review.modal.text': 'Review text:',
        'review.modal.title_placeholder': 'Brief description',
        'review.modal.text_placeholder': 'Tell us more about your experience...',
        'review.modal.publish': 'Publish review',
        
        'message.login_required': 'Please log in to place an order',
        'message.order_success': 'Service successfully ordered!',
        'message.order_error': 'Error placing order',
        'message.review_success': 'Thank you for your review!',
        'message.review_error': 'Error submitting review',
        'message.fill_all_fields': 'Please fill in all fields',
        'message.load_error': 'Failed to load services'
    },
    'ru': {
        'services.hero.title': 'Наши услуги',
        'services.hero.subtitle': 'Выберите оптимальное решение для вашего бизнеса',
        'services.search.placeholder': 'Поиск услуг...',
        'services.search.button': 'Найти',
        'services.filter.category': 'Все категории',
        'services.filter.sort.name': 'По названию',
        'services.filter.sort.price': 'По цене',
        'services.filter.sort.rating': 'По рейтингу',
        'services.filter.sort.popularity': 'По популярности',
        'services.loading': 'Загрузка услуг...',
        'services.empty': 'Услуги не найдены. Попробуйте изменить параметры поиска.',
        'services.category.invoices': 'Invoices',
        'services.category.quick': 'Quick Checkout',
        'services.category.api': 'API',
        
        'service.category': 'Категория:',
        'service.price': 'Цена:',
        'service.fee': 'Комиссия:',
        'service.rating': 'Рейтинг:',
        'service.reviews': 'отзывов',
        'service.features': 'Возможности:',
        
        'service.action.login': 'Войдите для заказа',
        'service.action.active': '✅ Услуга активна',
        'service.action.completed': '✓ Завершено',
        'service.action.review': '📝 Оставить отзыв',
        'service.action.order': '🛒 Оформить',
        
        'order.modal.title': 'Оформление услуги',
        'order.modal.price': 'Стоимость:',
        'order.modal.fee': 'Комиссия:',
        'order.modal.terms': 'Условия использования:',
        'order.modal.term1': '✅ Без скрытых платежей',
        'order.modal.term2': '✅ Можно отменить в любой момент',
        'order.modal.term3': '✅ Техническая поддержка 24/7',
        'order.modal.term4': '✅ Гарантия возврата в течение 14 дней',
        'order.modal.cancel': 'Отмена',
        'order.modal.confirm': 'Подтвердить заказ',
        
        'review.modal.title': 'Оставить отзыв',
        'review.modal.subtitle': 'Поделитесь вашим опытом использования услуги',
        'review.modal.rating': 'Оценка:',
        'review.modal.title_input': 'Заголовок отзыва:',
        'review.modal.text': 'Текст отзыва:',
        'review.modal.title_placeholder': 'Краткое описание',
        'review.modal.text_placeholder': 'Расскажите подробнее о вашем опыте...',
        'review.modal.publish': 'Опубликовать отзыв',
        
        'message.login_required': 'Пожалуйста, войдите в систему для оформления заказа',
        'message.order_success': 'Услуга успешно оформлена!',
        'message.order_error': 'Ошибка при оформлении заказа',
        'message.review_success': 'Спасибо за ваш отзыв!',
        'message.review_error': 'Ошибка при отправке отзыва',
        'message.fill_all_fields': 'Пожалуйста, заполните все поля',
        'message.load_error': 'Не удалось загрузить услуги'
    }
};
class ServicesManager {
    constructor() {
        this.services = [];
        this.filteredServices = [];
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.searchQuery = '';
        this.userOrders = [];
        this.allOrders = [];
        this.currentLang = localStorage.getItem('language') || 'ru';
    }

    async loadServices() {
        try {
            showLoading(true);
            const [servicesResponse, ordersResponse] = await Promise.all([
                fetch('http://localhost:3000/services'),
                fetch('http://localhost:3000/orders')
            ]);
            
            if (!servicesResponse.ok) throw new Error('Ошибка загрузки услуг');
            
            this.services = await servicesResponse.json();
            this.allOrders = await ordersResponse.json();
            this.filteredServices = [...this.services];
            this.renderServices();
        } catch (error) {
            console.error('Error:', error);
            showError('Не удалось загрузить услуги');
        } finally {
            showLoading(false);
        }
    }

    filterServices() {
        const category = document.getElementById('categoryFilter').value;
        this.currentCategory = category;
        
        this.filteredServices = this.services.filter(service => {
            const matchesCategory = category === 'all' || service.category === category;
            const matchesSearch = service.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                 service.shortDescription.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        
        this.sortServices();
    }

    sortServices() {
        const sortBy = document.getElementById('sortSelect').value;
        this.currentSort = sortBy;
        
        this.filteredServices.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'price':
                    return a.price.localeCompare(b.price);
                case 'rating':
                    return b.rating - a.rating;
                case 'popularity':
                    return b.reviewsCount - a.reviewsCount;
                default:
                    return 0;
            }
        });
        
        this.renderServices();
    }

    searchServices() {
        this.searchQuery = document.getElementById('searchInput').value.trim();
        this.filterServices();
    }

    getUserOrders(userId) {
        if (!userId) return [];
        return this.allOrders.filter(order => order.userId === userId);
    }

    async renderServices() {
        const container = document.getElementById('servicesContainer');
        const noResults = document.getElementById('noResults');
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const t = translatio[this.currentLang];
        
        if (this.filteredServices.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        const userOrders = this.getUserOrders(currentUser?.id);
        
        container.innerHTML = this.filteredServices.map(service => {
            const isLoggedIn = !!currentUser;
            const hasActiveOrder = userOrders.some(order => 
                order.serviceId === service.id && order.status === 'active'
            );
            const hasCompletedOrder = userOrders.some(order => 
                order.serviceId === service.id && order.status === 'completed'
            );
            const canReview = userOrders.some(order => 
                order.serviceId === service.id && order.status === 'completed' && order.canReview
            );

            return `
                <div class="service-card ${service.isPopular ? 'popular' : ''}">
                    <div class="service-header">
                        <img src="${service.icon}" alt="${service.title}">
                        <div>
                            <span class="service-category">${service.category}</span>
                            <h3 class="service-title">${service.title}</h3>
                        </div>
                    </div>
                    
                    <p class="service-description">${service.shortDescription}</p>
                    
                    <div class="service-features">
                        <h4 data-i18n="service.features">Возможности:</h4>
                        <ul>
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="service-footer">
                        <div>
                            <div class="service-price">
                                <span data-i18n="service.price">Цена:</span> ${service.price}
                            </div>
                            <small>
                                <span data-i18n="service.fee">Комиссия:</span> ${service.transactionFee}
                            </small>
                        </div>
                        <div class="service-rating">
                            <span>★ ${service.rating}</span>
                            <small>(${service.reviewsCount} <span data-i18n="service.reviews">отзывов</span>)</small>
                        </div>
                    </div>

                    <div class="service-actions">
                        ${!isLoggedIn ? `
                            <button class="order-btn disabled" onclick="showLoginAlert()" data-i18n="service.action.login">
                                Войдите для заказа
                            </button>
                        ` : hasActiveOrder ? `
                            <button class="order-btn active" disabled data-i18n="service.action.active">
                                ✅ Услуга активна
                            </button>
                        ` : hasCompletedOrder ? `
                            <button class="order-btn completed" disabled data-i18n="service.action.completed">
                                ✓ Завершено
                            </button>
                            ${canReview ? `
                                <button class="review-btn" onclick="showReviewModal('${service.id}')" data-i18n="service.action.review">
                                    📝 Оставить отзыв
                                </button>
                            ` : ''}
                        ` : `
                            <button class="order-btn" onclick="showOrderModal('${service.id}')" data-i18n="service.action.order">
                                🛒 Оформить
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');

        this.applytranslatioToServices();
    }

    applytranslatioToServices() {
        const t = translatio[this.currentLang];
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                element.textContent = t[key];
            }
        });
    }

    setupLanguageObserver() {
        document.addEventListener('languageChanged', () => {
            this.currentLang = localStorage.getItem('language') || 'ru';
            this.applytranslatioToServices();
            this.updateFilterLabels();
        });
    }

    updateFilterLabels() {
        const t = translatio[this.currentLang];
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput && t['services.search.placeholder']) {
            searchInput.placeholder = t['services.search.placeholder'];
        }
        
        const searchButton = document.querySelector('.search-box button');
        if (searchButton && t['services.search.button']) {
            searchButton.textContent = t['services.search.button'];
        }
    }

    async createOrder(serviceId) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return null;

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: currentUser.id,
                    serviceId: serviceId,
                    status: 'active',
                    orderDate: new Date().toISOString(),
                    price: this.services.find(s => s.id === serviceId)?.price || 'Бесплатно',
                    transactionFee: this.services.find(s => s.id === serviceId)?.transactionFee || '1%',
                    canReview: true
                })
            });

            if (response.ok) {
                const newOrder = await response.json();
                this.allOrders.push(newOrder); 
                return newOrder;
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
        return null;
    }
}

function showLoginAlert() {
    const t = translatio[servicesManager.currentLang];
    alert(t['message.login_required']);
    window.location.href = 'auth.html';
}

function showOrderModal(serviceId) {
    const service = servicesManager.services.find(s => s.id === serviceId);
    if (!service) return;

    const t = translatio[servicesManager.currentLang];

    const modalHTML = `
        <div class="modal-overlay" id="order-modal">
            <div class="modal order-modal">
                <div class="modal-header">
                    <h2 data-i18n="order.modal.title">Оформление услуги</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="order-service-info">
                        <h3>${service.title}</h3>
                        <p>${service.shortDescription}</p>
                        <div class="order-price">
                            <strong data-i18n="order.modal.price">Стоимость:</strong> ${service.price}
                            <br>
                            <strong data-i18n="order.modal.fee">Комиссия:</strong> ${service.transactionFee}
                        </div>
                    </div>
                    
                    <div class="order-terms">
                        <h4 data-i18n="order.modal.terms">Условия использования:</h4>
                        <ul>
                            <li data-i18n="order.modal.term1">✅ Без скрытых платежей</li>
                            <li data-i18n="order.modal.term2">✅ Можно отменить в любой момент</li>
                            <li data-i18n="order.modal.term3">✅ Техническая поддержка 24/7</li>
                            <li data-i18n="order.modal.term4">✅ Гарантия возврата в течение 14 дней</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" onclick="closeModal('order-modal')" data-i18n="order.modal.cancel">Отмена</button>
                    <button class="confirm-btn" onclick="confirmOrder('${serviceId}')" data-i18n="order.modal.confirm">Подтвердить заказ</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModal('order-modal');
    applytranslatioToElement(document.getElementById('order-modal'), servicesManager.currentLang);
}

function showReviewModal(serviceId) {
    const service = servicesManager.services.find(s => s.id === serviceId);
    if (!service) return;

    const t = translatio[servicesManager.currentLang];

    const modalHTML = `
        <div class="modal-overlay" id="review-modal">
            <div class="modal review-modal">
                <div class="modal-header">
                    <h2 data-i18n="review.modal.title">Оставить отзыв</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="review-service-info">
                        <h3>${service.title}</h3>
                        <p data-i18n="review.modal.subtitle">Поделитесь вашим опытом использования услуги</p>
                    </div>
                    
                    <form id="review-form">
                        <div class="form-group">
                            <label data-i18n="review.modal.rating">Оценка:</label>
                            <div class="rating-stars">
                                ${[1,2,3,4,5].map(star => `
                                    <span class="star" data-value="${star}">☆</span>
                                `).join('')}
                            </div>
                            <input type="hidden" id="review-rating" value="5">
                        </div>
                        
                        <div class="form-group">
                            <label for="review-title" data-i18n="review.modal.title_input">Заголовок отзыва:</label>
                            <input type="text" id="review-title" required 
                                   data-i18n-placeholder="review.modal.title_placeholder"
                                   placeholder="Краткое описание">
                        </div>
                        
                        <div class="form-group">
                            <label for="review-text" data-i18n="review.modal.text">Текст отзыва:</label>
                            <textarea id="review-text" required rows="4" 
                                      data-i18n-placeholder="review.modal.text_placeholder"
                                      placeholder="Расскажите подробнее о вашем опыте..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" onclick="closeModal('review-modal')" data-i18n="order.modal.cancel">Отмена</button>
                    <button class="confirm-btn" onclick="submitReview('${serviceId}')" data-i18n="review.modal.publish">Опубликовать отзыв</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModal('review-modal');
    setupStarRating();
    applytranslatioToElement(document.getElementById('review-modal'), servicesManager.currentLang);
}

function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('review-rating');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            ratingInput.value = value;
            
            stars.forEach(s => {
                const sValue = parseInt(s.dataset.value);
                s.textContent = sValue <= value ? '★' : '☆';
                s.style.color = sValue <= value ? '#FFD26F' : '#ccc';
            });
        });
        
        const currentValue = parseInt(ratingInput.value);
        const sValue = parseInt(star.dataset.value);
        star.textContent = sValue <= currentValue ? '★' : '☆';
        star.style.color = sValue <= currentValue ? '#FFD26F' : '#ccc';
    });
}

async function confirmOrder(serviceId) {
    const t = translatio[servicesManager.currentLang];
    
    try {
        const order = await servicesManager.createOrder(serviceId);
        if (order) {
            closeModal('order-modal');
            alert(t['message.order_success']);
            servicesManager.renderServices();
        } else {
            alert(t['message.order_error']);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(t['message.order_error']);
    }
}

async function submitReview(serviceId) {
    const t = translatio[servicesManager.currentLang];
    
    const title = document.getElementById('review-title').value;
    const text = document.getElementById('review-text').value;
    const rating = document.getElementById('review-rating').value;
    
    if (!title || !text) {
        alert(t['message.fill_all_fields']);
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    try {
        const reviewResponse = await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser.id,
                userName: `${currentUser.firstname} ${currentUser.lastname}`,
                company: currentUser.company || 'Частное лицо',
                serviceId: serviceId,
                category: servicesManager.services.find(s => s.id === serviceId)?.category,
                rating: parseInt(rating),
                title: title,
                text: text,
                date: new Date().toISOString()
            })
        });

        if (reviewResponse.ok) {
            const ordersResponse = await fetch(`http://localhost:3000/orders?userId=${currentUser.id}&serviceId=${serviceId}`);
            const orders = await ordersResponse.json();
            
            if (orders.length > 0) {
                const order = orders[0];
                await fetch(`http://localhost:3000/orders/${order.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        canReview: false
                    })
                });
                
                const orderIndex = servicesManager.allOrders.findIndex(o => o.id === order.id);
                if (orderIndex !== -1) {
                    servicesManager.allOrders[orderIndex].canReview = false;
                }
            }

            closeModal('review-modal');
            alert(t['message.review_success']);
            servicesManager.renderServices();
        }
    } catch (error) {
        console.error('Error:', error);
        alert(t['message.review_error']);
    }
}

function setupModal(modalId) {
    const modal = document.getElementById(modalId);
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => closeModal(modalId));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modalId);
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.remove();
}

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

function showError(message) {
    const t = translatio[servicesManager.currentLang];
    const container = document.getElementById('servicesContainer');
    container.innerHTML = `<div class="error">${t[message] || message}</div>`;
}

function filterServices() {
    servicesManager.filterServices();
}

function sortServices() {
    servicesManager.sortServices();
}

function searchServices() {
    servicesManager.searchServices();
}

function applytranslatioToElement(element, lang) {
    const elements = element.querySelectorAll('[data-i18n]');
    const t = translatio[lang];
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    const inputs = element.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            input.placeholder = t[key];
        }
    });
}

const servicesManager = new ServicesManager();

document.addEventListener('DOMContentLoaded', () => {
    servicesManager.loadServices();
    servicesManager.setupLanguageObserver();

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchServices();
        }
    });
});