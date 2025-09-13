class TestimonialCarousel {
    constructor() {
        this.carouselTrack = document.querySelector('.carousel-track');
        this.cards = [];
        this.currentIndex = 0;
        this.isAnimating = false;
        this.testimonials = [
            {
                name: "Dani Daniels",
                initials: "DD",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
            },
            {
                name: "John Smith",
                initials: "JS",
                text: "Excellent service! The team went above and beyond to deliver exceptional results. Highly recommended for anyone looking for quality work."
            },
            {
                name: "Sarah Johnson",
                initials: "SJ",
                text: "Professional and reliable. They delivered exactly what was promised on time and within budget. Will definitely work with them again."
            },
            {
                name: "Mike Wilson",
                initials: "MW",
                text: "Outstanding quality and attention to detail. The final product exceeded my expectations. Great communication throughout the project."
            },
            {
                name: "Emily Davis",
                initials: "ED",
                text: "Transformative experience! They helped us achieve our goals with innovative solutions and expert guidance. Truly impressive work."
            },
            {
                name: "Alex Brown",
                initials: "AB",
                text: "Exceptional value for money. The results speak for themselves. A trusted partner that delivers consistent quality and reliability."
            }
        ];
        
        this.init();
        this.bindEvents();
    }
    
    init() {
        const totalSlides = this.testimonials.length;

        const startClones = this.testimonials.slice(-3); 
        const endClones = this.testimonials.slice(0, 3); 
        
        const allTestimonials = [...startClones, ...this.testimonials, ...endClones];
        
        allTestimonials.forEach((testimonial, index) => {
            const card = this.createCard(testimonial, index);
            this.carouselTrack.appendChild(card);
            this.cards.push(card);
        });

        this.currentIndex = 3; 
        this.updateCarousel(true); 
    }
    
    createCard(testimonial, index) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="testimonial-content">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.initials}</div>
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>Verified Customer</p>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }
    
    bindEvents() {
        document.querySelector('.prev-btn').addEventListener('click', () => {
            this.prevSlide();
        });
        
        document.querySelector('.next-btn').addEventListener('click', () => {
            this.nextSlide();
        });

        let startX, endX;
        
        this.carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.carouselTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });

        this.carouselTrack.addEventListener('mouseenter', () => {
            this.pauseAutoRotate();
        });
        
        this.carouselTrack.addEventListener('mouseleave', () => {
            this.resumeAutoRotate();
        });
    }
    
    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex++;

        if (this.currentIndex >= this.cards.length - 3) {
            setTimeout(() => {
                this.currentIndex = 3;
                this.updateCarousel(false); 
                this.isAnimating = false;
            }, 500);
        }
        
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    prevSlide() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentIndex--;

        if (this.currentIndex <= 2) {
            setTimeout(() => {
                this.currentIndex = this.cards.length - 6;
                this.updateCarousel(false); 
                this.isAnimating = false;
            }, 500);
        }
        
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    updateCarousel(instant = false) {
        if (instant) {
            this.carouselTrack.style.transition = 'none';
        } else {
            this.carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        this.cards.forEach((card, index) => {
            card.classList.remove('active');

            const diff = index - this.currentIndex;
            const absDiff = Math.abs(diff);

            if (diff === 0) {
                card.classList.add('active');
            }

            if (absDiff === 1 || absDiff === this.cards.length - 1) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else if (absDiff === 2 || absDiff === this.cards.length - 2) {
                card.style.opacity = '0.4';
                card.style.transform = 'scale(0.8)';
            } else {
                card.style.opacity = '0.3';
                card.style.transform = 'scale(0.7)';
            }
        });

        const trackWidth = this.carouselTrack.scrollWidth;
        const cardWidth = trackWidth / this.cards.length;
        const offset = -this.currentIndex * cardWidth;
        
        this.carouselTrack.style.transform = `translateX(${offset}px)`;

        if (instant) {
            setTimeout(() => {
                this.carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 50);
        }
    }
    
    pauseAutoRotate() {
        clearInterval(this.autoRotateInterval);
    }
    
    resumeAutoRotate() {
        this.pauseAutoRotate();
        this.autoRotateInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new TestimonialCarousel();
    carousel.resumeAutoRotate(); 
});