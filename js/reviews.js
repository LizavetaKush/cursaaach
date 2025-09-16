const translations = {
    'en': {
        'reviews.hero.title': 'Customer Reviews',
        'reviews.hero.subtitle': 'See what our customers say about our services',
        'reviews.search.placeholder': 'Search reviews...',
        'reviews.search.button': 'Search',
        'reviews.filter.service': 'All services',
        'reviews.filter.rating': 'All ratings',
        'reviews.filter.sort.date': 'By date (newest)',
        'reviews.filter.sort.rating': 'By rating',
        'reviews.filter.sort.popular': 'By usefulness',
        'reviews.stats.average': 'Average rating',
        'reviews.stats.total': 'Total reviews',
        'reviews.stats.satisfied': 'Satisfied customers',
        'reviews.loading': 'Loading reviews...',
        'reviews.empty': 'No reviews found. Try changing search parameters.',
        'reviews.service.invoices': 'Invoices',
        'reviews.service.quick': 'Quick Checkout',
        'reviews.service.api': 'API',
        'reviews.rating.5': '5 stars',
        'reviews.rating.4': '4+ stars',
        'reviews.rating.3': '3+ stars',
        
        'review.verified': 'Verified Customer',
        'review.helpful': 'Helpful',
        'review.edit': '✏️ Edit',
        'review.delete': 'Delete',
        'review.save': 'Save changes',
        'review.cancel': 'Cancel',
        
        'modal.edit.title': 'Edit Review',
        'modal.edit.subtitle': 'Editing your review',
        'modal.edit.rating': 'Rating:',
        'modal.edit.title_input': 'Review title:',
        'modal.edit.text': 'Review text:',
        
        'message.login_required': 'Please log in to system',
        'message.review_updated': 'Review successfully updated!',
        'message.review_deleted': 'Review successfully deleted!',
        'message.review_not_found': 'Review not found',
        'message.not_your_review': 'You can only edit your own reviews',
        'message.fill_all_fields': 'Please fill in all fields',
        'message.thanks_feedback': 'Thank you for your feedback!',
        'message.confirm_delete': 'Are you sure you want to delete this review?'
    },
    'ru': {
        'reviews.hero.title': 'Отзывы наших клиентов',
        'reviews.hero.subtitle': 'Узнайте, что говорят о нас те, кто уже использует наши услуги',
        'reviews.search.placeholder': 'Поиск по отзывам...',
        'reviews.search.button': 'Найти',
        'reviews.filter.service': 'Все услуги',
        'reviews.filter.rating': 'Все оценки',
        'reviews.filter.sort.date': 'По дате (новые)',
        'reviews.filter.sort.rating': 'По оценке',
        'reviews.filter.sort.popular': 'По полезности',
        'reviews.stats.average': 'Средняя оценка',
        'reviews.stats.total': 'Всего отзывов',
        'reviews.stats.satisfied': 'Довольных клиентов',
        'reviews.loading': 'Загрузка отзывов...',
        'reviews.empty': 'Отзывы не найдены. Попробуйте изменить параметры поиска.',
        'reviews.service.invoices': 'Invoices',
        'reviews.service.quick': 'Quick Checkout',
        'reviews.service.api': 'API',
        'reviews.rating.5': '5 звезд',
        'reviews.rating.4': '4+ звезды',
        'reviews.rating.3': '3+ звезды',
        
        'review.verified': 'Проверенный клиент',
        'review.helpful': 'Помогло',
        'review.edit': '✏️ Редактировать',
        'review.delete': 'Удалить',
        'review.save': 'Сохранить изменения',
        'review.cancel': 'Отмена',
        
        'modal.edit.title': 'Редактировать отзыв',
        'modal.edit.subtitle': 'Редактирование вашего отзыва',
        'modal.edit.rating': 'Оценка:',
        'modal.edit.title_input': 'Заголовок отзыва:',
        'modal.edit.text': 'Текст отзыва:',
        
        'message.login_required': 'Пожалуйста, войдите в систему',
        'message.review_updated': 'Отзыв успешно обновлен!',
        'message.review_deleted': 'Отзыв успешно удален!',
        'message.review_not_found': 'Отзыв не найден',
        'message.not_your_review': 'Вы можете редактировать только свои отзывы',
        'message.fill_all_fields': 'Пожалуйста, заполните все поля',
        'message.thanks_feedback': 'Спасибо за вашу оценку!',
        'message.confirm_delete': 'Вы уверены, что хотите удалить этот отзыв?'
    }
};

class ReviewsManager {
    constructor() {
        this.reviews = [];
        this.filteredReviews = [];
        this.currentService = 'all';
        this.currentRating = 'all';
        this.currentSort = 'date';
        this.searchQuery = '';
        this.currentLang = localStorage.getItem('language') || 'ru';
        this.orders = [];
        this.currentPage = 1;
        this.itemsPerPage = 5;
    }

    async loadReviews() {
        try {
            showReviewsLoading(true);
            const [reviewsResponse, ordersResponse] = await Promise.all([
                fetch('http://localhost:3000/reviews'),
                fetch('http://localhost:3000/orders')
            ]);
            
            if (!reviewsResponse.ok) throw new Error('Ошибка загрузки отзывов');
            
            this.reviews = await reviewsResponse.json();
            this.orders = await ordersResponse.json();
            this.filteredReviews = [...this.reviews];
            this.renderReviews();
        } catch (error) {
            console.error('Error:', error);
            showReviewsError('Не удалось загрузить отзывы');
        } finally {
            showReviewsLoading(false);
        }
    }

    canUserReview(serviceId) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return false;

        return this.orders.some(order => 
            order.userId === currentUser.id && 
            order.serviceId === serviceId && 
            order.status === 'completed' &&
            order.canReview
        );
    }

    filterReviews() {
        const service = document.getElementById('serviceFilter').value;
        const rating = document.getElementById('ratingFilter').value;
        
        this.currentService = service;
        this.currentRating = rating;
        
        this.filteredReviews = this.reviews.filter(review => {
            const matchesService = service === 'all' || review.category === service;
            const matchesRating = rating === 'all' || review.rating >= parseInt(rating);
            const matchesSearch = review.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                 review.text.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                 review.userName.toLowerCase().includes(this.searchQuery.toLowerCase());
            return matchesService && matchesRating && matchesSearch;
        });
        
        this.sortReviews();
    }

    sortReviews() {
        const sortBy = document.getElementById('sortReviews').value;
        this.currentSort = sortBy;
        
        this.filteredReviews.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date) - new Date(a.date);
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                    return b.rating - a.rating; 
                default:
                    return 0;
            }
        });
        
        this.renderReviews();
    }

    searchReviews() {
        this.searchQuery = document.getElementById('reviewsSearch').value.trim();
        this.filterReviews();
    }

    async renderReviews() {
        const container = document.getElementById('reviewsContainer');
        const noResults = document.getElementById('noReviews');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const t = translations[this.currentLang];

        if (this.filteredReviews.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            this.renderPagination(); 
            return;
        }

        noResults.style.display = 'none';

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const reviewsToRender = this.filteredReviews.slice(startIndex, endIndex);

        container.innerHTML = reviewsToRender.map(review => {
            const canReviewThisService = this.canUserReview(review.serviceId);
            const isUsersReview = currentUser && review.userId === currentUser.id;

            return `
                <div class="review-card">
                    <div class="review-header">
                        <div class="review-user">
                            <div class="user-avatar">${review.userName.charAt(0)}</div>
                            <div class="user-info">
                                <h4>${review.userName}</h4>
                                <span class="company">${review.company}</span>
                            </div>
                        </div>
                        <div class="review-meta">
                            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                            <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                            <div class="review-category">${review.category}</div>
                        </div>
                    </div>
                    <div class="review-content">
                        <h5>${review.title}</h5>
                        <p class="review-text">${review.text}</p>
                        ${canReviewThisService ? `
                            <div class="review-actions">
                                <button class="helpful-btn" onclick="markHelpful('${review.id}')" data-i18n="review.helpful">
                                    👍 Помогло (${review.helpful || 0})
                                </button>
                            </div>
                        ` : ''}
                        ${isUsersReview ? `
                            <div class="review-actions">
                                <button class="edit-review-btn" onclick="editReview('${review.id}')" data-i18n="review.edit">
                                    ✏️ Редактировать
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

        this.applyTranslationsToReviews();
        this.renderPagination();
    }

    renderPagination() {
        const paginationContainer = document.getElementById('reviewsPagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.filteredReviews.length / this.itemsPerPage);
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '';

        if (this.currentPage > 1) {
            html += `<button onclick="reviewsManager.changePage(${this.currentPage - 1})">←</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="${i === this.currentPage ? 'active' : ''}" onclick="reviewsManager.changePage(${i})">${i}</button>`;
        }

        if (this.currentPage < totalPages) {
            html += `<button onclick="reviewsManager.changePage(${this.currentPage + 1})">→</button>`;
        }

        paginationContainer.innerHTML = html;
    }

    changePage(page) {
        this.currentPage = page;
        this.renderReviews();
    }

    applyTranslationsToReviews() {
        const t = translations[this.currentLang];
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
            this.applyTranslationsToReviews();
            this.updateFilterLabels();
        });
    }

updateFilterLabels() {
    const t = translations[this.currentLang];

    const searchInput = document.getElementById('reviewsSearch');
    if (searchInput && t['reviews.search.placeholder']) {
        searchInput.placeholder = t['reviews.search.placeholder'];
    }

    const searchButton = document.querySelector('.reviews-search button');
    if (searchButton && t['reviews.search.button']) {
        searchButton.textContent = t['reviews.search.button'];
    }

    const serviceFilter = document.getElementById('serviceFilter');
    if (serviceFilter) {
        serviceFilter.options[0].textContent = t['reviews.filter.service'];
    }

    const ratingFilter = document.getElementById('ratingFilter');
    if (ratingFilter) {
        ratingFilter.options[0].textContent = t['reviews.filter.rating'];
        ratingFilter.options[1].textContent = t['reviews.rating.5'];
        ratingFilter.options[2].textContent = t['reviews.rating.4'];
        ratingFilter.options[3].textContent = t['reviews.rating.3'];
    }

    const sortFilter = document.getElementById('sortReviews');
    if (sortFilter) {
        sortFilter.options[0].textContent = t['reviews.filter.sort.date'];
        sortFilter.options[1].textContent = t['reviews.filter.sort.rating'];
        sortFilter.options[2].textContent = t['reviews.filter.sort.popular'];
    }
}

}

async function editReview(reviewId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const t = translations[reviewsManager.currentLang];
    
    if (!currentUser) {
        alert(t['message.login_required']);
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`);
        if (!response.ok) {
            alert(t['message.review_not_found']);
            return;
        }
        
        const review = await response.json();
        
        if (review.userId !== currentUser.id) {
            alert(t['message.not_your_review']);
            return;
        }

        showEditReviewModal(review);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Ошибка при загрузке отзыва');
    }
}

function showEditReviewModal(review) {
    const t = translations[reviewsManager.currentLang];
    
    const modalHTML = `
        <div class="modal-overlay" id="edit-review-modal">
            <div class="modal review-modal">
                <div class="modal-header">
                    <h2 data-i18n="modal.edit.title">Редактировать отзыв</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="review-service-info">
                        <h3 data-i18n="modal.edit.subtitle">Редактирование вашего отзыва</h3>
                    </div>
                    
                    <form id="edit-review-form">
                        <div class="form-group">
                            <label data-i18n="modal.edit.rating">Оценка:</label>
                            <div class="rating-stars">
                                ${[1,2,3,4,5].map(star => `
                                    <span class="star" data-value="${star}">☆</span>
                                `).join('')}
                            </div>
                            <input type="hidden" id="edit-review-rating" value="${review.rating}">
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-review-title" data-i18n="modal.edit.title_input">Заголовок отзыва:</label>
                            <input type="text" id="edit-review-title" value="${review.title}" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-review-text" data-i18n="modal.edit.text">Текст отзыва:</label>
                            <textarea id="edit-review-text" required rows="4">${review.text}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" onclick="closeModal('edit-review-modal')" data-i18n="review.cancel">Отмена</button>
                    <button class="delete-btn" onclick="deleteReview('${review.id}')" style="background: #dc3545;" data-i18n="review.delete">Удалить</button>
                    <button class="confirm-btn" onclick="updateReview('${review.id}')" data-i18n="review.save">Сохранить изменения</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModal('edit-review-modal');
    setupEditStarRating(review.rating);
    applyTranslationsToElement(document.getElementById('edit-review-modal'), reviewsManager.currentLang);
}

function setupEditStarRating(initialRating) {
    const stars = document.querySelectorAll('#edit-review-modal .star');
    const ratingInput = document.getElementById('edit-review-rating');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            ratingInput.value = value;
            
            stars.forEach(s => {
                const sValue = parseInt(s.dataset.value);
                if (sValue <= value) {
                    s.textContent = '★';
                    s.style.color = '#FFD26F';
                    s.classList.add('active');
                } else {
                    s.textContent = '☆';
                    s.style.color = '#ddd';
                    s.classList.remove('active');
                }
            });
        });
        
        const sValue = parseInt(star.dataset.value);
        if (sValue <= initialRating) {
            star.textContent = '★';
            star.style.color = '#FFD26F';
            star.classList.add('active');
        } else {
            star.textContent = '☆';
            star.style.color = '#ddd';
            star.classList.remove('active');
        }
    });
}

async function updateReview(reviewId) {
    const t = translations[reviewsManager.currentLang];
    
    const title = document.getElementById('edit-review-title').value;
    const text = document.getElementById('edit-review-text').value;
    const rating = document.getElementById('edit-review-rating').value;
    
    if (!title || !text) {
        alert(t['message.fill_all_fields']);
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                text: text,
                rating: parseInt(rating),
                date: new Date().toISOString() 
            })
        });

        if (response.ok) {
            closeModal('edit-review-modal');
            alert(t['message.review_updated']);
            reviewsManager.loadReviews();
        } else {
            alert('Ошибка при обновлении отзыва');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ошибка при обновлении отзыва');
    }
}

async function deleteReview(reviewId) {
    const t = translations[reviewsManager.currentLang];
    
    if (!confirm(t['message.confirm_delete'])) {
        return;
    }

    try {
        const reviewResponse = await fetch(`http://localhost:3000/reviews/${reviewId}`);
        if (!reviewResponse.ok) {
            alert(t['message.review_not_found']);
            return;
        }
        const review = await reviewResponse.json();

        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            closeModal('edit-review-modal');
            alert(t['message.review_deleted']);

            const currentUser = JSON.parse(localStorage.getItem('currentUser'));

            const ordersResponse = await fetch(`http://localhost:3000/orders?userId=${currentUser.id}&serviceId=${review.serviceId}`);
            const orders = await ordersResponse.json();
            
            if (orders.length > 0) {
                const order = orders[0];
                await fetch(`http://localhost:3000/orders/${order.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        canReview: true
                    })
                });
            }

            reviewsManager.loadReviews();
        } else {
            alert('Ошибка при удалении отзыва');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ошибка при удалении отзыва');
    }
}


function setupModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
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

async function markHelpful(reviewId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const t = translations[reviewsManager.currentLang];
    
    if (!currentUser) {
        alert(t['message.login_required']);
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`);
        if (!response.ok) return;

        const review = await response.json();
        const updatedHelpful = (review.helpful || 0) + 1;

        await fetch(`http://localhost:3000/reviews/${reviewId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ helpful: updatedHelpful })
        });

        alert(t['message.thanks_feedback']);
        reviewsManager.loadReviews();
    } catch (error) {
        console.error('Error:', error);
    }
}


function applyTranslationsToElement(element, lang) {
    const t = translations[lang];
    if (!t || !element) return;
    
    const elements = element.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
}

function showReviewsLoading(show) {
    const element = document.getElementById('reviewsLoading');
    if (element) {
        element.style.display = show ? 'block' : 'none';
    }
}

function showReviewsError(message) {
    const container = document.getElementById('reviewsContainer');
    if (container) {
        container.innerHTML = `<div class="error">${message}</div>`;
    }
}

function filterReviews() {
    reviewsManager.filterReviews();
}

function sortReviews() {
    reviewsManager.sortReviews();
}

function searchReviews() {
    reviewsManager.searchReviews();
}

const reviewsManager = new ReviewsManager();

document.addEventListener('DOMContentLoaded', () => {
    reviewsManager.loadReviews();
    reviewsManager.setupLanguageObserver();

    const searchInput = document.getElementById('reviewsSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchReviews();
            }
        });
    }
});