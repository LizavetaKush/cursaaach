document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const headerBottom = document.querySelector('.header-bottom');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (mobileToggle && headerBottom) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            headerBottom.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                headerBottom.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header-bottom') && 
                !e.target.closest('.mobile-toggle') &&
                headerBottom.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                headerBottom.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && headerBottom.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                headerBottom.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            const mobileToggle = document.querySelector('.mobile-toggle');
            const headerBottom = document.querySelector('.header-bottom');
            
            if (mobileToggle && headerBottom) {
                mobileToggle.classList.remove('active');
                headerBottom.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); 
});

const style = document.createElement('style');
style.textContent = `
    body.menu-open {
        overflow: hidden;
    }
    
    body.menu-open::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }
    
    @media (max-width: 768px) {
        .header-bottom-right-auth {
            order: -1;
            margin-bottom: 1rem;
        }
    }
`;
document.head.appendChild(style);