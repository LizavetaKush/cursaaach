document.addEventListener('DOMContentLoaded', function() {
    const translations = {
        'en': {
            'title': 'Payment Gateway - Accept Payments Easily',
            'header.email': 'email@mail.com',
            'header.phone': '(000) 888-88',
            'nav.home': 'Home',
            'nav.products': 'Products',
            'nav.pages': 'Pages',
            'nav.blog': 'Blog',
            'nav.contact': 'Contact us',
            'header.language': 'English',
            'header.signup': 'Sign Up',
            
            'hero.title': 'Start accepting payments in 3 minutes',
            'hero.subtitle': 'Integrate xyz payment gateway without any technical knowledge.',
            'hero.start': 'Start now',
            'hero.docs': 'Read the developer docs',
            'hero.rating': 'top rated on trustpilot',
            
            'features.codefree': 'code free setup',
            'features.codefree.desc': 'One click integration',
            'features.lowprice': 'lowest price',
            'features.lowprice.desc': '1% transaction fee, lowest in Industry',
            'features.global': 'global withdrawals',
            'features.global.desc': 'Instant transfer to your bank account',
            
            'accepting.title': 'Accepting payments should not be hard',
            'accepting.subtitle': 'Accept payment using invoice, quick checkout, API\'s and payment buttons',
            'accepting.invoices': 'Invoices',
            'accepting.invoices.title': 'One click invoice with full accounting setup',
            'accepting.invoices.desc': 'Lorem ipsum dol amet, consecte adipisicing elit sed do. Some text will be here.',
            'accepting.quick': 'quick checkout',
            'accepting.quick.title': 'No website? No issues',
            'accepting.quick.desc': 'Lorem ipsum dol amet, consecte adipisicing elit sed do. Some text will be here.',
            'accepting.commission': 'no-nonsense commission',
            'accepting.commission.title': 'Just pay 1% of transaction amount',
            'accepting.commission.desc': 'Lorem ipsum dol amet, consecte adipisicing elit sed do. Some text will be here.',
            'accepting.issues': 'Having issues with integration and setup',
            'accepting.help': 'Let us know',
            
            'trusted.title': '20000+ trusted by thousands of sellers',
            'trusted.subtitle': 'Your money and customer data is in safe hands. Best in class security and encryption.',
            'trusted.growing': 'Fastest growing gateway',
            'trusted.manager': 'Your personal success manager',
            'trusted.manager.desc': 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            'trusted.integration': 'Hassle free integration',
            
            'another.title': 'Another money heading goes here',
            'another.desc': 'Ask CDCR San Quintin State Prison 2008. We installed Purex dispensers throughout the prison to combat diseases…and it was a Roaring Success (as in Roaring Drunk) I mean we had Long lines of prisoners fist fighting to use them.',
            'another.signup': 'Sign up now',
            
            'slider.title': 'Don\'t trust us. Trust the industry leaders',
            'slider.subtitle': 'See what our users are saying about our services and support',
            
            'faq.title': 'Enter your custom title here',
            'faq.subtitle': 'For more information, please visit the Help Center, also find all FAQs on our FAQ page',
            'faq.button': 'Go to FAQs',
            'faq.section1': 'First section',
            'faq.section1.content1': 'Maccenas tincidunt lacus at velit.',
            'faq.section1.content2': 'Phasellus id sapien in sapien laculis congue.',
            'faq.section2': 'Second section',
            'faq.section2.content1': 'Maccenas tincidunt lacus at velit.',
            'faq.section2.content2': 'Donec semper sapien a libero.',
            'faq.section3': 'Third section',
            'faq.section3.content1': 'Maccenas tincidunt lacus at velit.',
            'faq.section3.content2': 'Phasellus id sapien in sapien laculis congue.',
            'faq.section4': 'Fourth section',
            'faq.section5': 'Fifth section',
            'faq.section6': 'Sixth section',
            
            'callback.title': 'Request call back',
            'callback.subtitle': 'Morbi non quam nec dui luctus rutrum.',
            'callback.product': 'Product',
            'callback.invoices': 'Invoices',
            'callback.email': 'Email',
            'callback.callme': 'CALL ME',
            'callback.footer': 'Add anything here to make it look good.',
            'callback.questions': 'Have questions in your mind?',
            'callback.questions.desc': 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat.',
            'callback.contact': 'Feel free to contact us here',
            'callback.contact.phone': 'Call: 1.888.888.888',
            
            'news.title': 'News & Updates',
            'news.subtitle': 'We talk about finance',
            'news.readmore': 'Read More',
            
            'cta.title': 'Your payment is just a click away',
            'cta.desc': 'Ut vel sapien molestie, accumsan dui eu, imperdiet nulla.',
            'cta.button': 'Create an account',
            
            'footer.email': 'support@9.com',
            'footer.phone': '+888-888-88',
            'footer.links': 'Links',
            'footer.home': 'Home',
            'footer.product': 'Product',
            'footer.pricing': 'Pricing',
            'footer.about': 'About us',
            'footer.careers': 'Careers',
            'footer.features': 'Features',
            'footer.help': 'Help & Support',
            'footer.faq': 'FAQ',
            'footer.blog': 'Blog',
            'footer.contact': 'Contact Us',
            'footer.support': 'Support',
            'footer.address.title': 'Our Address',
            'footer.address': '4517 Washington Ave. Manchester, Kentucky 39495',
            'footer.newsletter': 'SIGN UP FOR NEWSLETTER',
            'footer.subscribe': 'Subscribe',
            'footer.copyright': '© Copyright 2021 Your company name'
        },
        'ru': {
            'title': 'Платежный шлюз - Принимайте платежи легко',
            'header.email': 'email@mail.com',
            'header.phone': '(000) 888-88',
            'nav.home': 'Главная',
            'nav.products': 'Продукты',
            'nav.pages': 'Страницы',
            'nav.blog': 'Блог',
            'nav.contact': 'Свяжитесь с нами',
            'header.language': 'Русский',
            'header.signup': 'Регистрация',
            
            'hero.title': 'Начните принимать платежи за 3 минуты',
            'hero.subtitle': 'Интегрируйте платежный шлюз xyz без технических знаний.',
            'hero.start': 'Начать сейчас',
            'hero.docs': 'Документация для разработчиков',
            'hero.rating': 'высший рейтинг на trustpilot',
            
            'features.codefree': 'настройка без кода',
            'features.codefree.desc': 'Интеграция в один клик',
            'features.lowprice': 'самая низкая цена',
            'features.lowprice.desc': 'Комиссия 1%, самая низкая в отрасли',
            'features.global': 'глобальные выплаты',
            'features.global.desc': 'Мгновенный перевод на ваш банковский счет',
            
            'accepting.title': 'Прием платежей не должен быть сложным',
            'accepting.subtitle': 'Принимайте платежи с помощью счетов, быстрой оплаты, API и платежных кнопок',
            'accepting.invoices': 'Счета',
            'accepting.invoices.title': 'Счет в один клик с полной бухгалтерской настройкой',
            'accepting.invoices.desc': 'Текст-заполнитель для описания функционала счетов.',
            'accepting.quick': 'быстрая оплата',
            'accepting.quick.title': 'Нет сайта? Без проблем',
            'accepting.quick.desc': 'Текст-заполнитель для описания быстрой оплаты.',
            'accepting.commission': 'прозрачная комиссия',
            'accepting.commission.title': 'Платите всего 1% от суммы транзакции',
            'accepting.commission.desc': 'Текст-заполнитель для описания комиссионной политики.',
            'accepting.issues': 'Возникли проблемы с интеграцией и настройкой?',
            'accepting.help': 'Сообщите нам',
            
            'trusted.title': '20000+ доверяют тысячи продавцов',
            'trusted.subtitle': 'Ваши деньги и данные клиентов в надежных руках. Лучшая в своем классе безопасность и шифрование.',
            'trusted.growing': 'Самый быстрорастущий шлюз',
            'trusted.manager': 'Ваш персональный менеджер по успеху',
            'trusted.manager.desc': 'Описание преимуществ персонального менеджера и его помощи в работе с платежами.',
            'trusted.integration': 'Беспроблемная интеграция',
            
            'another.title': 'Еще один заголовок о деньгах',
            'another.desc': 'Пример описания преимуществ системы и успешных кейсов использования.',
            'another.signup': 'Зарегистрироваться сейчас',
            
            'slider.title': 'Не верьте нам на слово. Доверьтесь лидерам отрасли',
            'slider.subtitle': 'Посмотрите, что наши пользователи говорят о наших услугах и поддержке',
            
            'faq.title': 'Введите ваш заголовок здесь',
            'faq.subtitle': 'Для получения дополнительной информации посетите Центр помощи, также найдите все часто задаваемые вопросы на нашей странице FAQ',
            'faq.button': 'Перейти к FAQ',
            'faq.section1': 'Первый раздел',
            'faq.section1.content1': 'Maccenas tincidunt lacus at velit.',
            'faq.section1.content2': 'Phasellus id sapien in sapien laculis congue.',
            'faq.section2': 'Второй раздел',
            'faq.section2.content1': 'Maccenas tincidunt lacus at velit.',
            'faq.section2.content2': 'Donec semper sapien a libero.',
            'faq.section3': 'Третий раздел',
            'faq.section3.content1': 'Maccenas tincidunt lacus at velit.',
            'faq.section3.content2': 'Phasellus id sapien in sapien laculis congue.',
            'faq.section4': 'Четвертый раздел',
            'faq.section5': 'Пятый раздел',
            'faq.section6': 'Шестой раздел',
            
            'callback.title': 'Заказать обратный звонок',
            'callback.subtitle': 'Morbi non quam nec dui luctus rutrum.',
            'callback.product': 'Продукт',
            'callback.invoices': 'Счета',
            'callback.email': 'Эл. почта',
            'callback.callme': 'ПОЗВОНИТЕ МНЕ',
            'callback.footer': 'Добавьте что-нибудь здесь, чтобы это выглядело хорошо.',
            'callback.questions': 'Есть вопросы?',
            'callback.questions.desc': 'Краткое описание поддержки и помощи, которую мы предоставляем нашим клиентам.',
            'callback.contact': 'Свяжитесь с нами здесь',
            'callback.contact.phone': 'Телефон: 1.888.888.888',
            
            'news.title': 'Новости и обновления',
            'news.subtitle': 'Мы говорим о финансах',
            'news.readmore': 'Читать далее',
            
            'cta.title': 'Ваш платеж всего в одном клике',
            'cta.desc': 'Ut vel sapien molestie, accumsan dui eu, imperdiet nulla.',
            'cta.button': 'Создать аккаунт',
            
            'footer.email': 'support@9.com',
            'footer.phone': '+888-888-88',
            'footer.links': 'Ссылки',
            'footer.home': 'Главная',
            'footer.product': 'Продукты',
            'footer.pricing': 'Цены',
            'footer.about': 'О нас',
            'footer.careers': 'Карьера',
            'footer.features': 'Функции',
            'footer.help': 'Помощь и поддержка',
            'footer.faq': 'ЧаВо',
            'footer.blog': 'Блог',
            'footer.contact': 'Связаться с нами',
            'footer.support': 'Поддержка',
            'footer.address.title': 'Наш адрес',
            'footer.address': '4517 Washington Ave. Manchester, Kentucky 39495',
            'footer.newsletter': 'ПОДПИСАТЬСЯ НА РАССЫЛКУ',
            'footer.subscribe': 'Подписаться',
            'footer.copyright': '© Copyright 2021 Ваше название компании'
        }
    };

    const translationMap = {
        '[data-i18n="title"]': 'title',

        '.header-top-right p': 'header.email',
        '.header-top-right-phone p': 'header.phone',
        '.header-bottom nav a:nth-child(1)': 'nav.home',
        '.header-bottom nav a:nth-child(2)': 'nav.products',
        '.header-bottom nav a:nth-child(3)': 'nav.pages',
        '.header-bottom nav a:nth-child(4)': 'nav.blog',
        '.header-bottom nav a:nth-child(5)': 'nav.contact',
        '.header-bottom-right-language': 'header.language',
        '.header-bottom-right-auth': 'header.signup',

        '.section-start-text h2': 'hero.title',
        '.section-start-text p': 'hero.subtitle',
        '.section-start-text-buttons button:nth-child(1)': 'hero.start',
        '.section-start-text-buttons button:nth-child(2)': 'hero.docs',
        '.section-start-text-rating-stars p': 'hero.rating',

        '.block-absolut-block:nth-child(1) span': 'features.codefree',
        '.block-absolut-block:nth-child(1) p': 'features.codefree.desc',
        '.block-absolut-block:nth-child(2) span': 'features.lowprice',
        '.block-absolut-block:nth-child(2) p': 'features.lowprice.desc',
        '.block-absolut-block:nth-child(3) span': 'features.global',
        '.block-absolut-block:nth-child(3) p': 'features.global.desc',

        '.accepting-bottom-title': 'accepting.title',
        '.accepting-bottom-title-bottom': 'accepting.subtitle',
        '.accepting-block:nth-child(3) b': 'accepting.invoices',
        '.accepting-block:nth-child(3) h2': 'accepting.invoices.title',
        '.accepting-block:nth-child(3) p': 'accepting.invoices.desc',
        '.accepting-block:nth-child(4) b': 'accepting.quick',
        '.accepting-block:nth-child(4) h2': 'accepting.quick.title',
        '.accepting-block:nth-child(4) p': 'accepting.quick.desc',
        '.accepting-block:nth-child(5) b': 'accepting.commission',
        '.accepting-block:nth-child(5) h2': 'accepting.commission.title',
        '.accepting-block:nth-child(5) p': 'accepting.commission.desc',
        '.accepting-bottom h3': 'accepting.issues',
        '.accepting-button': 'accepting.help',

        '.trusted-title h2': 'trusted.title',
        '.trusted-title p': 'trusted.subtitle',
        '.trusted-block:nth-child(1) h3': 'trusted.growing',
        '.trusted-block:nth-child(2) h3': 'trusted.manager',
        '.trusted-block:nth-child(2) p': 'trusted.manager.desc',
        '.trusted-block:nth-child(3) h3': 'trusted.integration',

        '.another-text h2': 'another.title',
        '.another-text p': 'another.desc',
        '.another-text button': 'another.signup',

        '.slider h2': 'slider.title',
        '.slider p': 'slider.subtitle',

        '.enter-left h2': 'faq.title',
        '.enter-left p': 'faq.subtitle',
        '.enter-left button': 'faq.button',
        '#section1 + label': 'faq.section1',
        '#section1 ~ .accordion-content p:nth-child(1)': 'faq.section1.content1',
        '#section1 ~ .accordion-content p:nth-child(2)': 'faq.section1.content2',
        '#section2 + label': 'faq.section2',
        '#section2 ~ .accordion-content p:nth-child(1)': 'faq.section2.content1',
        '#section2 ~ .accordion-content p:nth-child(2)': 'faq.section2.content2',
        '#section3 + label': 'faq.section3',
        '#section3 ~ .accordion-content p:nth-child(1)': 'faq.section3.content1',
        '#section3 ~ .accordion-content p:nth-child(2)': 'faq.section3.content2',
        '#section4 + label': 'faq.section4',
        '#section5 + label': 'faq.section5',
        '#section6 + label': 'faq.section6',

        '.form-section h1': 'callback.title',
        '.subtitle': 'callback.subtitle',
        '#product + label': 'callback.product',
        '#invoices + label': 'callback.invoices',
        '#email + label': 'callback.email',
        '.form-section button': 'callback.callme',
        '.form-section > p': 'callback.footer',
        '.have-absolut-text h2': 'callback.questions',
        '.have-absolut-text p': 'callback.questions.desc',
        '.have-absolut-text-bottom span': 'callback.contact',
        '.have-absolut-text-bottom p': 'callback.contact.phone',

        '.wetalk-about p': 'news.title',
        '.wetalk-about h2': 'news.subtitle',
        '.wetalk-about-block button': 'news.readmore',

        '.your-absolut-text h2': 'cta.title',
        '.your-absolut-text p': 'cta.desc',
        '.your-absolut button': 'cta.button',

        '.footer-top-col:nth-child(1) p:nth-child(2)': 'footer.email',
        '.footer-top-col:nth-child(1) p:nth-child(3)': 'footer.phone',
        '.footer-top-col:nth-child(2) b': 'footer.links',
        '.footer-top-col:nth-child(2) li:nth-child(1)': 'footer.home',
        '.footer-top-col:nth-child(2) li:nth-child(2)': 'footer.product',
        '.footer-top-col:nth-child(2) li:nth-child(3)': 'footer.pricing',
        '.footer-top-col:nth-child(2) li:nth-child(4)': 'footer.about',
        '.footer-top-col:nth-child(2) li:nth-child(5)': 'footer.careers',
        '.footer-top-col:nth-child(2) li:nth-child(6)': 'footer.features',
        '.footer-top-col:nth-child(3) b': 'footer.help',
        '.footer-top-col:nth-child(3) li:nth-child(1)': 'footer.faq',
        '.footer-top-col:nth-child(3) li:nth-child(2)': 'footer.blog',
        '.footer-top-col:nth-child(3) li:nth-child(3)': 'footer.contact',
        '.footer-top-col:nth-child(3) li:nth-child(4)': 'footer.support',
        '.footer-top-col:nth-child(4) h2': 'footer.address.title',
        '.footer-top-col:nth-child(4) p': 'footer.address',
        '.footer-top-col-inp p': 'footer.newsletter',
        '.footer-top-col-input-button button': 'footer.subscribe',
        '.footer-bottom p': 'footer.copyright'
    };

    let currentLang = localStorage.getItem('language') || 'en';

    function applyTranslations(lang) {
        for (const selector in translationMap) {
            const key = translationMap[selector];
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(element => {
                if (translations[lang][key]) {
                    if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                        element.placeholder = translations[lang][key];
                    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    } else {
                        element.textContent = translations[lang][key];
                    }
                }
            });
        }

        const langButton = document.querySelector('.header-bottom-right-language');
        if (langButton) {
            const img = langButton.querySelector('img');
            langButton.innerHTML = '';
            if (img) langButton.appendChild(img);
            langButton.appendChild(document.createTextNode(translations[lang]['header.language']));
        }

        document.documentElement.lang = lang;

        localStorage.setItem('language', lang);
        currentLang = lang;
    }

    function setupLanguageSwitcher() {
        const langButton = document.querySelector('.header-bottom-right-language');
        if (langButton) {
            langButton.addEventListener('click', function() {
                const newLang = currentLang === 'en' ? 'ru' : 'en';
                applyTranslations(newLang);
            });
        }
    }

    applyTranslations(currentLang);
    setupLanguageSwitcher();
});