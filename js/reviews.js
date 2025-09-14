class ReviewsManager {
    constructor() {
        this.reviews = [];
        this.filteredReviews = [];
        this.currentService = 'all';
        this.currentRating = 'all';
        this.currentSort = 'date';
        this.searchQuery = '';
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

    renderReviews() {
        const container = document.getElementById('reviewsContainer');
        const noResults = document.getElementById('noReviews');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (this.filteredReviews.length === 0) {
            container.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        container.innerHTML = this.filteredReviews.map(review => {
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
                            <div class="review-date">${new Date(review.date).toLocaleDateString('ru-RU')}</div>
                            <div class="review-category">${review.category}</div>
                        </div>
                    </div>
                    
                    <div class="review-content">
                        <h5>${review.title}</h5>
                        <p class="review-text">${review.text}</p>
                        
                        ${canReviewThisService ? `
                            <div class="review-actions">
                                <button class="helpful-btn" onclick="markHelpful('${review.id}')">
                                    👍 Помогло (${review.helpful || 0})
                                </button>
                            </div>
                        ` : ''}
                        
                        ${isUsersReview ? `
                            <div class="review-actions">
                                <button class="edit-review-btn" onclick="editReview('${review.id}')">
                                    ✏️ Редактировать
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
}

async function editReview(reviewId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Пожалуйста, войдите в систему');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`);
        if (!response.ok) {
            alert('Отзыв не найден');
            return;
        }
        
        const review = await response.json();
        
        if (review.userId !== currentUser.id) {
            alert('Вы можете редактировать только свои отзывы');
            return;
        }

        showEditReviewModal(review);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Ошибка при загрузке отзыва');
    }
}

function showEditReviewModal(review) {
    const modalHTML = `
        <div class="modal-overlay" id="edit-review-modal">
            <div class="modal review-modal">
                <div class="modal-header">
                    <h2>Редактировать отзыв</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="review-service-info">
                        <h3>Редактирование вашего отзыва</h3>
                    </div>
                    
                    <form id="edit-review-form">
                        <div class="form-group">
                            <label>Оценка:</label>
                            <div class="rating-stars">
                                ${[1,2,3,4,5].map(star => `
                                    <span class="star" data-value="${star}">☆</span>
                                `).join('')}
                            </div>
                            <input type="hidden" id="edit-review-rating" value="${review.rating}">
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-review-title">Заголовок отзыва:</label>
                            <input type="text" id="edit-review-title" value="${review.title}" required placeholder="Краткое описание">
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-review-text">Текст отзыва:</label>
                            <textarea id="edit-review-text" required rows="4" placeholder="Расскажите подробнее о вашем опыте...">${review.text}</textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="cancel-btn" onclick="closeModal('edit-review-modal')">Отмена</button>
                    <button class="delete-btn" onclick="deleteReview('${review.id}')" style="background: #dc3545;">Удалить</button>
                    <button class="confirm-btn" onclick="updateReview('${review.id}')">Сохранить изменения</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupModal('edit-review-modal');
    setupEditStarRating(review.rating);
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
    const title = document.getElementById('edit-review-title').value;
    const text = document.getElementById('edit-review-text').value;
    const rating = document.getElementById('edit-review-rating').value;
    
    if (!title || !text) {
        alert('Пожалуйста, заполните все поля');
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
            alert('Отзыв успешно обновлен!');
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
    if (!confirm('Вы уверены, что хотите удалить этот отзыв?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            closeModal('edit-review-modal');
            alert('Отзыв успешно удален!');

            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const reviewsResponse = await fetch(`http://localhost:3000/reviews/${reviewId}`);
            const review = await reviewsResponse.json();
            
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
    if (!currentUser) {
        alert('Пожалуйста, войдите в систему');
        return;
    }

    try {
        alert('Спасибо за вашу оценку!');
    } catch (error) {
        console.error('Error:', error);
    }
}

function showReviewsLoading(show) {
    document.getElementById('reviewsLoading').style.display = show ? 'block' : 'none';
}

function showReviewsError(message) {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = `<div class="error">${message}</div>`;
}

const reviewsManager = new ReviewsManager();

function filterReviews() {
    reviewsManager.filterReviews();
}

function sortReviews() {
    reviewsManager.sortReviews();
}

function searchReviews() {
    reviewsManager.searchReviews();
}

document.addEventListener('DOMContentLoaded', () => {
    reviewsManager.loadReviews();

    document.getElementById('reviewsSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchReviews();
        }
    });
});