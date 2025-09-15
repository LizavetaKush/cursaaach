const translations = {
    'en': {
        'pricing.hero.title': 'Transparent pricing for your business',
        'pricing.hero.subtitle': 'Choose the optimal plan that suits you',
        'pricing.switcher.monthly': 'Monthly',
        'pricing.switcher.yearly': 'Yearly <small>(−20%)</small>',
        'pricing.plan.startup': 'Startup',
        'pricing.plan.business': 'Business',
        'pricing.plan.premium': 'Premium',
        'pricing.plan.startup.desc': 'Perfect for small business and startups',
        'pricing.plan.business.desc': 'For growing business with increased needs',
        'pricing.plan.premium.desc': 'For enterprises with high payment volumes',
        'pricing.plan.popular': 'Popular',
        'pricing.features.title': 'What\'s included in all plans',
        'pricing.faq.title': 'Frequently asked questions',
        'pricing.cta.title': 'Ready to start?',
        'pricing.cta.subtitle': 'Join thousands of satisfied customers worldwide',
        'pricing.cta.create': 'Create account',
        'pricing.cta.contact': 'Contact sales department',
        'pricing.button.start': 'Start free',
        'pricing.button.choose': 'Choose plan',
        'pricing.button.contact': 'Contact sales',

        'pricing.feature.transactions': 'Up to {count} transactions per month',
        'pricing.feature.unlimited': 'Unlimited transactions',
        'pricing.feature.fee': '{percent}% commission per operation',
        'pricing.feature.support.basic': 'Basic technical support',
        'pricing.feature.support.priority': 'Priority support',
        'pricing.feature.support.personal': '24/7 personal support',
        'pricing.feature.invoices': 'Online invoices',
        'pricing.feature.multicurrency': 'Multi-currency',
        'pricing.feature.analytics': 'Advanced analytics',
        'pricing.feature.api': 'API integration',
        'pricing.feature.custom': 'Custom solutions',
        'pricing.feature.manager': 'Dedicated manager',
        'pricing.feature.white-label': 'White-label solutions',
        
        'pricing.faq.q1': 'Can I change the tariff later?',
        'pricing.faq.a1': 'Yes, you can switch to another tariff plan at any time. Changes will take effect from the next billing period.',
        'pricing.faq.q2': 'Are there any hidden commissions?',
        'pricing.faq.a2': 'No, all commissions are transparent and specified in the contract. There are no additional hidden payments.',
        'pricing.faq.q3': 'Is there a trial period?',
        'pricing.faq.a3': 'Yes, we provide a 14-day free trial period to test all functions.',
        'pricing.faq.q4': 'How does the connection happen?',
        'pricing.faq.a4': 'Connection takes less than 5 minutes. Just register, confirm your email and start accepting payments.',

        'pricing.savings': 'Save {savings}% with annual billing',
        'pricing.currency': '₽/month',

        'message.login_required': 'To choose a plan, you need to log in. Go to registration?',
        'message.plan_selected': 'Plan selected successfully'
    },
    'ru': {
        'pricing.hero.title': 'Прозрачные тарифы для вашего бизнеса',
        'pricing.hero.subtitle': 'Выберите оптимальный план, который подходит именно вам',
        'pricing.switcher.monthly': 'Ежемесячно',
        'pricing.switcher.yearly': 'Ежегодно <small>(−20%)</small>',
        'pricing.plan.startup': 'Стартовый',
        'pricing.plan.business': 'Бизнес',
        'pricing.plan.premium': 'Премиум',
        'pricing.plan.startup.desc': 'Идеально для малого бизнеса и стартапов',
        'pricing.plan.business.desc': 'Для растущего бизнеса с повышенными потребностями',
        'pricing.plan.premium.desc': 'Для предприятий с высокими объемами платежей',
        'pricing.plan.popular': 'Популярный',
        'pricing.features.title': 'Что входит во все тарифы',
        'pricing.faq.title': 'Частые вопросы',
        'pricing.cta.title': 'Готовы начать?',
        'pricing.cta.subtitle': 'Присоединяйтесь к тысячам довольных клиентов по всему миру',
        'pricing.cta.create': 'Создать аккаунт',
        'pricing.cta.contact': 'Связаться с отделом продаж',
        'pricing.button.start': 'Начать бесплатно',
        'pricing.button.choose': 'Выбрать тариф',
        'pricing.button.contact': 'Связаться с sales',

        'pricing.feature.transactions': 'До {count} транзакций в месяц',
        'pricing.feature.unlimited': 'Неограниченные транзакции',
        'pricing.feature.fee': 'Комиссия {percent}% за операцию',
        'pricing.feature.support.basic': 'Базовая техподдержка',
        'pricing.feature.support.priority': 'Приоритетная поддержка',
        'pricing.feature.support.personal': '24/7 персональная поддержка',
        'pricing.feature.invoices': 'Онлайн-инвойсы',
        'pricing.feature.multicurrency': 'Мультивалютность',
        'pricing.feature.analytics': 'Расширенная аналитика',
        'pricing.feature.api': 'Интеграция с API',
        'pricing.feature.custom': 'Кастомные решения',
        'pricing.feature.manager': 'Dedicated менеджер',
        'pricing.feature.white-label': 'White-label решения',
        
        'pricing.faq.q1': 'Можно ли изменить тариф позже?',
        'pricing.faq.a1': 'Да, вы можете в любой момент перейти на другой тарифный план. Изменения вступят в силу со следующего платежного периода.',
        'pricing.faq.q2': 'Есть ли скрытые комиссии?',
        'pricing.faq.a2': 'Нет, все комиссии прозрачны и указаны в договоре. Дополнительных скрытых платежей нет.',
        'pricing.faq.q3': 'Предоставляется ли тестовый период?',
        'pricing.faq.a3': 'Да, мы предоставляем 14-дневный бесплатный trial период для тестирования всех функций.',
        'pricing.faq.q4': 'Как происходит подключение?',
        'pricing.faq.a4': 'Подключение занимает менее 5 минут. Просто зарегистрируйтесь, подтвердите email и начните принимать платежи.',

        'pricing.savings': 'Экономия {savings}% при годовой оплате',
        'pricing.currency': '₽/мес',

        'message.login_required': 'Для выбора тарифа необходимо войти в систему. Перейти к регистрации?',
        'message.plan_selected': 'Тариф успешно выбран'
    }
};

class PricingManager {
    constructor() {
        this.isYearly = false;
        this.currentLang = localStorage.getItem('language') || 'ru';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFAQ();
        this.updatePrices();
        this.setupLanguageObserver();
    }

    setupEventListeners() {
        const toggle = document.getElementById('billingToggle');
        if (toggle) {
            toggle.addEventListener('change', () => {
                this.isYearly = toggle.checked;
                this.updatePrices();
            });
        }

        document.querySelectorAll('.pricing-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plan = e.target.closest('.pricing-card').querySelector('h3').textContent;
                this.handlePlanSelection(plan);
            });
        });

        document.querySelectorAll('.cta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.classList.contains('primary')) {
                    window.location.href = 'auth.html?action=signup';
                } else {
                    window.location.href = 'contact.html';
                }
            });
        });
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    setupLanguageObserver() {
        document.addEventListener('languageChanged', () => {
            this.currentLang = localStorage.getItem('language') || 'ru';
            this.applyTranslations();
            this.updatePrices();
        });
    }

    applyTranslations() {
        const t = translations[this.currentLang];
        if (!t) return;

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                let text = t[key];

                const params = element.getAttribute('data-i18n-params');
                if (params) {
                    try {
                        const paramObj = JSON.parse(params);
                        for (const param in paramObj) {
                            text = text.replace(`{${param}}`, paramObj[param]);
                        }
                    } catch (e) {
                        console.error('Error parsing i18n params:', e);
                    }
                }
                
                element.textContent = text;
            }
        });

        const buttons = document.querySelectorAll('.pricing-btn, .cta-btn');
        buttons.forEach(btn => {
            const key = btn.getAttribute('data-i18n');
            if (key && t[key]) {
                btn.textContent = t[key];
            }
        });
    }

    updatePrices() {
        const t = translations[this.currentLang];
        const priceElements = document.querySelectorAll('.price');
        
        priceElements.forEach(element => {
            const monthlyPrice = element.dataset.monthly;
            const yearlyPrice = element.dataset.yearly;
            
            const amountElement = element.querySelector('.amount');
            const currencyElement = element.querySelector('.currency');
            
            if (this.isYearly) {
                amountElement.textContent = yearlyPrice;
                if (currencyElement && t['pricing.currency']) {
                    currencyElement.textContent = t['pricing.currency'];
                }
                
                const savings = Math.round((monthlyPrice - yearlyPrice) / monthlyPrice * 100);
                if (t['pricing.savings']) {
                    element.setAttribute('title', t['pricing.savings'].replace('{savings}', savings));
                }
            } else {
                amountElement.textContent = monthlyPrice;
                if (currencyElement && t['pricing.currency']) {
                    currencyElement.textContent = t['pricing.currency'];
                }
                element.removeAttribute('title');
            }
        });
    }

    handlePlanSelection(plan) {
        const t = translations[this.currentLang];
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        
        if (currentUser) {
            localStorage.setItem('selectedPlan', plan);
            localStorage.setItem('billingType', this.isYearly ? 'yearly' : 'monthly');
            
            if (t['message.plan_selected']) {
                alert(t['message.plan_selected']);
            }
            window.location.href = 'payment.html';
        } else {
            if (t['message.login_required'] && confirm(t['message.login_required'])) {
                window.location.href = 'auth.html?action=signup';
            }
        }
    }
}

function applyTranslationsToElement(element, lang) {
    const t = translations[lang];
    if (!t || !element) return;
    
    const elements = element.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            let text = t[key];

            const params = el.getAttribute('data-i18n-params');
            if (params) {
                try {
                    const paramObj = JSON.parse(params);
                    for (const param in paramObj) {
                        text = text.replace(`{${param}}`, paramObj[param]);
                    }
                } catch (e) {
                    console.error('Error parsing i18n params:', e);
                }
            }
            
            el.textContent = text;
        }
    });
}

function showMonthlyPrices() {
    const t = translations[localStorage.getItem('language') || 'ru'];
    document.querySelectorAll('.price').forEach(element => {
        const monthlyPrice = element.dataset.monthly;
        const amountElement = element.querySelector('.amount');
        const currencyElement = element.querySelector('.currency');
        
        amountElement.textContent = monthlyPrice;
        if (currencyElement && t['pricing.currency']) {
            currencyElement.textContent = t['pricing.currency'];
        }
        element.removeAttribute('title');
    });
}

function showYearlyPrices() {
    const t = translations[localStorage.getItem('language') || 'ru'];
    document.querySelectorAll('.price').forEach(element => {
        const monthlyPrice = element.dataset.monthly;
        const yearlyPrice = element.dataset.yearly;
        const amountElement = element.querySelector('.amount');
        const currencyElement = element.querySelector('.currency');
        
        amountElement.textContent = yearlyPrice;
        if (currencyElement && t['pricing.currency']) {
            currencyElement.textContent = t['pricing.currency'];
        }
        
        const savings = Math.round((monthlyPrice - yearlyPrice) / monthlyPrice * 100);
        if (t['pricing.savings']) {
            element.setAttribute('title', t['pricing.savings'].replace('{savings}', savings));
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const pricingManager = new PricingManager();
    window.pricingManager = pricingManager;

    pricingManager.applyTranslations();

    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    const billing = urlParams.get('billing');
    
    if (plan && billing) {
        localStorage.setItem('selectedPlan', plan);
        localStorage.setItem('billingType', billing);

        if (billing === 'yearly') {
            const toggle = document.getElementById('billingToggle');
            if (toggle) {
                toggle.checked = true;
                pricingManager.isYearly = true;
                pricingManager.updatePrices();
            }
        }
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PricingManager, translations };
}