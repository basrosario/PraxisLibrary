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
        if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        if (navScroller) navScroller.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
    }

    function openMenu() {
        if (navToggle) {
            navToggle.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
        }
        if (navScroller) navScroller.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');

        // Focus first nav item for keyboard users
        const firstNavItem = navScroller.querySelector('.nav-item');
        if (firstNavItem) {
            setTimeout(() => firstNavItem.focus(), 100);
        }
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

        // Keyboard Navigation - Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navToggle.classList.contains('active')) {
                closeMenu();
                navToggle.focus(); // Return focus to toggle button
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

                // 1. Hide all tabs and update ARIA
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                    tab.setAttribute('hidden', '');
                });

                // 2. Show the target tab and update ARIA
                targetTab.classList.add('active');
                targetTab.removeAttribute('hidden');

                // 3. Update active state and ARIA on sidebar
                document.querySelectorAll('.nav-item[data-tab]').forEach(nav => {
                    nav.classList.remove('active');
                    nav.setAttribute('aria-selected', 'false');
                });
                item.classList.add('active');
                item.setAttribute('aria-selected', 'true');

                // 4. Scroll to top (if container exists)
                const scrollContainer = document.querySelector('.content-scroll');
                if (scrollContainer) {
                    scrollContainer.scrollTop = 0;
                }

                // 5. Announce tab change for screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'status');
                announcement.setAttribute('aria-live', 'polite');
                announcement.className = 'visually-hidden';
                announcement.textContent = `${item.textContent} section loaded`;
                document.body.appendChild(announcement);
                setTimeout(() => announcement.remove(), 1000);
            });
        });

        // Keyboard Navigation for Tabs - Arrow keys
        tabNavItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                let newIndex;

                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    newIndex = (index + 1) % tabNavItems.length;
                    tabNavItems[newIndex].focus();
                    tabNavItems[newIndex].click();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    newIndex = (index - 1 + tabNavItems.length) % tabNavItems.length;
                    tabNavItems[newIndex].focus();
                    tabNavItems[newIndex].click();
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    tabNavItems[0].focus();
                    tabNavItems[0].click();
                } else if (e.key === 'End') {
                    e.preventDefault();
                    tabNavItems[tabNavItems.length - 1].focus();
                    tabNavItems[tabNavItems.length - 1].click();
                }
            });
        });
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
                                btn.innerText = "COPIED";
                                setTimeout(() => { btn.innerText = "Copy"; }, 2000);
                            })
                            .catch(err => { btn.innerText = "FAILED"; });
                    }
                }
            });
        });
    }
});