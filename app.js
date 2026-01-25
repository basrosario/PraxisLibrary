document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const navScroller = document.querySelector('.nav-scroller');
    let navBackdrop = document.querySelector('.nav-backdrop');

    // Create backdrop if it doesn't exist
    if (!navBackdrop && navScroller) {
        navBackdrop = document.createElement('div');
        navBackdrop.className = 'nav-backdrop';
        navScroller.parentNode.insertBefore(navBackdrop, navScroller);
    }

    function closeMenu() {
        if (navToggle) navToggle.classList.remove('active');
        if (navScroller) navScroller.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
    }

    function openMenu() {
        if (navToggle) navToggle.classList.add('active');
        if (navScroller) navScroller.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
    }

    if (navToggle && navScroller) {
        // Toggle menu on hamburger click
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navToggle.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking on a nav item
        const navItems = navScroller.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking backdrop
        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeMenu);
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const isClickInsideNav = navScroller.contains(e.target);
            const isClickOnToggle = navToggle.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navToggle.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ==========================================
    // ACCORDION NAVIGATION
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.nav-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all other accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            if (isActive) {
                header.classList.remove('active');
                content.classList.remove('active');
            } else {
                header.classList.add('active');
                content.classList.add('active');
            }
        });
    });

    // Auto-expand accordion if child is active
    const activeNavItem = document.querySelector('.nav-accordion-content .nav-item.active');
    if (activeNavItem) {
        const accordionContent = activeNavItem.closest('.nav-accordion-content');
        const accordionHeader = accordionContent?.previousElementSibling;
        if (accordionHeader && accordionContent) {
            accordionHeader.classList.add('active');
            accordionContent.classList.add('active');
        }
    }

    // ==========================================
    // LIBRARY TAB NAVIGATION
    // Only runs if tabs exist (Library Page)
    // ==========================================
    const tabNavItems = document.querySelectorAll('.nav-item[data-tab]');
    
    if (tabNavItems.length > 0) {
        tabNavItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabId = item.dataset.tab;
                const targetTab = document.getElementById(tabId);

                if (!targetTab) return;

                // 1. Hide all tabs
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });

                // 2. Show the target tab
                targetTab.classList.add('active');

                // 3. Update active state on sidebar
                document.querySelectorAll('.nav-item[data-tab]').forEach(nav => {
                    nav.classList.remove('active');
                });
                item.classList.add('active');

                // 4. Scroll to top (if container exists)
                const scrollContainer = document.querySelector('.content-scroll');
                if (scrollContainer) {
                    scrollContainer.scrollTop = 0;
                }
            });
        });
    }

    // ==========================================
    // TOAST NOTIFICATION SYSTEM
    // ==========================================
    // Create toast container
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const iconSvg = type === 'success'
            ? '<svg class="toast-icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
            : '<svg class="toast-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

        toast.innerHTML = `${iconSvg}<span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // COPY TO CLIPBOARD LOGIC (Library)
    // ==========================================
    const copyButtons = document.querySelectorAll('.btn-copy');

    if (copyButtons.length > 0) {
        copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const block = e.target.closest('.example-block');
                if (block) {
                    const promptElement = block.querySelector('.prompt-text');
                    if (promptElement) {
                        navigator.clipboard.writeText(promptElement.innerText)
                            .then(() => {
                                showToast('Copied to clipboard!', 'success');
                            })
                            .catch(err => {
                                showToast('Failed to copy', 'error');
                            });
                    }
                }
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    // Create button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4l-8 8h5v8h6v-8h5z"/>
        </svg>
    `;
    document.body.appendChild(backToTopBtn);

    // Get scroll container (content-scroll or window)
    const scrollContainer = document.querySelector('.content-scroll') || window;
    const scrollElement = scrollContainer === window ? document.documentElement : scrollContainer;

    // Show/hide button based on scroll position
    function toggleBackToTop() {
        const scrollTop = scrollContainer === window
            ? window.pageYOffset || document.documentElement.scrollTop
            : scrollContainer.scrollTop;

        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        if (scrollContainer === window) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Listen for scroll events
    scrollContainer.addEventListener('scroll', toggleBackToTop);

    // Initial check
    toggleBackToTop();

    // ==========================================
    // IMAGE LIGHTBOX
    // ==========================================
    // Create lightbox overlay
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightboxOverlay);

    const lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
    const lightboxCaption = lightboxOverlay.querySelector('.lightbox-caption');
    const lightboxClose = lightboxOverlay.querySelector('.lightbox-close');

    // Add lightbox trigger to security test images
    const testImages = document.querySelectorAll('.test-image img');
    testImages.forEach(img => {
        img.classList.add('lightbox-trigger');
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = img.alt || '';
            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox functions
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ==========================================
    // THEME TOGGLE (Dark/Light Mode)
    // ==========================================
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.innerHTML = `
        <svg class="icon-moon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
        <svg class="icon-sun" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
        </svg>
    `;
    document.body.appendChild(themeToggle);

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        localStorage.setItem('theme', newTheme);
    });

    // ==========================================
    // FADE-IN ANIMATIONS ON SCROLL
    // ==========================================
    // Add fade-in class to animatable elements
    const animatableSelectors = [
        '.sec-section',
        '.sec-card',
        '.test-row',
        '.example-block',
        '.rationale-item'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });

    // Add stagger class to grid containers
    document.querySelectorAll('.sec-grid, .rationale-grid').forEach(grid => {
        grid.classList.add('fade-in-stagger');
    });

    // Create Intersection Observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // ==========================================
    // ANIMATED COUNTERS
    // ==========================================
    function animateCounter(element) {
        const target = parseInt(element.dataset.target, 10);
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(easeOut * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all counter elements
    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ==========================================
    // READING PROGRESS BAR
    // ==========================================
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    function updateProgress() {
        const scrollEl = document.querySelector('.content-scroll') || document.documentElement;
        const scrollTop = scrollEl.scrollTop || window.pageYOffset;
        const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }

    // Listen for scroll on the correct container
    const progressScrollContainer = document.querySelector('.content-scroll') || window;
    progressScrollContainer.addEventListener('scroll', updateProgress);

    // Initial update
    updateProgress();

    // ==========================================
    // COLLAPSIBLE PROMPT SECTIONS (DISABLED)
    // Feature disabled for consistent UX across all sections
    // All prompt content now flows naturally without height constraints
    // ==========================================

    // ==========================================
    // CHART DATA INITIALIZATION (CSP-Safe)
    // Reads data attributes and sets CSS custom properties
    // This replaces inline styles for security compliance
    // ==========================================

    // Initialize circular progress charts
    document.querySelectorAll('circle[data-progress]').forEach(circle => {
        const progress = circle.dataset.progress;
        circle.style.setProperty('--progress-offset', progress);
    });

    // Initialize bar chart fills
    document.querySelectorAll('.bar-fill[data-width]').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.setProperty('--bar-width', width + '%');
    });

    // Initialize stacked bar segments
    document.querySelectorAll('.stacked-segment[data-flex]').forEach(segment => {
        const flex = segment.dataset.flex;
        segment.style.setProperty('--segment-flex', flex);
    });
});