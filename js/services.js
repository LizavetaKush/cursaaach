class ServicesManager {
    constructor() {
        this.services = [];
        this.filteredServices = [];
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.searchQuery = '';
        this.userOrders = []; 
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
                        <ul>
                            ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="service-footer">
                        <div>
                            <div class="service-price">${service.price}</div>
                            <small>Комиссия: ${service.transactionFee}</small>
                        </div>
                        <div class="service-rating">
                            <span>★ ${service.rating}</span>
                            <small>(${service.reviewsCount} отзывов)</small>
                        </div>
                    </div>

                    <div class="service-actions">
                        ${!isLoggedIn ? `
                            <button class="order-btn disabled" onclick="showLoginAlert()">
                                Войдите для заказа
                            </button>
                        ` : hasActiveOrder ? `
                            <button class="order-btn active" disabled>
                                ✅ Услуга активна
                            </button>
                        ` : hasCompletedOrder ? `
                            <button class="order-btn completed" disabled>
                                ✓ Завершено
                            </button>
                            ${canReview ? `
                                <button class="review-btn" onclick="showReviewModal('${service.id}')">
                                    📝 Оставить отзыв
                                </button>
                            ` : ''}
                        ` : `
                            <button class="order-btn" onclick="showOrderModal('${service.id}')">
                                🛒 Оформить
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');
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
    alert('Пожалуйста, войдите в систему для оформления заказа');
    window.location.href = 'auth.html';
}

function showOrderModal(serviceId) {
    const service = servicesManager.services.find(s => s.id === serviceId);
    if (!service) return;

    const modalHTML = `
        <div class="modal-overlay" id="order-modal">
            <div class="modal order-modal">
                <div class="modal-header">
                    <h2>Оформление услуги</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="order-service-info">
                        <h3>${service.title}</h3>
                        <p>${service.shortDescription}</p>
                        <div class="order-price">
                            <strong>Стоимость:</strong> ${service.price}
                            <br>
                            <strong>Комиссия:</strong> ${service.transactionFee}
                        </div>
                    </div>
                    
                    <div class="order-terms">
                        <h4>Условия использования:</h4>
                        <ul>
                            <li>✅ Без скрытых платежей</li>
                            <li>✅ Можно отменить в любой момент</li>
                            <li>✅ Техническая поддержка 24/7</li>
                            <li>✅ Гарантия возврата в течение 14 дней</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" onclick="closeModal('order-modal')">Отмена</button>
                    <button class="confirm-btn" onclick="confirmOrder('${serviceId}')">Подтвердить заказ</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModal('order-modal');
}

function showReviewModal(serviceId) {
    const service = servicesManager.services.find(s => s.id === serviceId);
    if (!service) return;

    const modalHTML = `
        <div class="modal-overlay" id="review-modal">
            <div class="modal review-modal">
                <div class="modal-header">
                    <h2>Оставить отзыв</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="review-service-info">
                        <h3>${service.title}</h3>
                        <p>Поделитесь вашим опытом использования услуги</p>
                    </div>
                    
                    <form id="review-form">
                        <div class="form-group">
                            <label>Оценка:</label>
                            <div class="rating-stars">
                                ${[1,2,3,4,5].map(star => `
                                    <span class="star" data-value="${star}">☆</span>
                                `).join('')}
                            </div>
                            <input type="hidden" id="review-rating" value="5">
                        </div>
                        
                        <div class="form-group">
                            <label for="review-title">Заголовок отзыва:</label>
                            <input type="text" id="review-title" required placeholder="Краткое описание">
                        </div>
                        
                        <div class="form-group">
                            <label for="review-text">Текст отзыва:</label>
                            <textarea id="review-text" required rows="4" placeholder="Расскажите подробнее о вашем опыте..."></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" onclick="closeModal('review-modal')">Отмена</button>
                    <button class="confirm-btn" onclick="submitReview('${serviceId}')">Опубликовать отзыв</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModal('review-modal');
    setupStarRating();
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
    try {
        const order = await servicesManager.createOrder(serviceId);
        if (order) {
            closeModal('order-modal');
            alert('Услуга успешно оформлена!');
            servicesManager.renderServices(); 
        } else {
            alert('Ошибка при оформлении заказа');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ошибка при оформлении заказа');
    }
}

async function submitReview(serviceId) {
    const title = document.getElementById('review-title').value;
    const text = document.getElementById('review-text').value;
    const rating = document.getElementById('review-rating').value;
    
    if (!title || !text) {
        alert('Пожалуйста, заполните все поля');
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
            alert('Спасибо за ваш отзыв!');
            servicesManager.renderServices(); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ошибка при отправке отзыва');
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
    const container = document.getElementById('servicesContainer');
    container.innerHTML = `<div class="error">${message}</div>`;
}

const servicesManager = new ServicesManager();

function filterServices() {
    servicesManager.filterServices();
}

function sortServices() {
    servicesManager.sortServices();
}

function searchServices() {
    servicesManager.searchServices();
}

document.addEventListener('DOMContentLoaded', () => {
    servicesManager.loadServices();

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchServices();
        }
    });
});