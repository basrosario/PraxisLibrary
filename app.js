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
            const tabId = header.dataset.tab;

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

            // If header has data-tab, show that tab content
            if (tabId) {
                const targetTab = document.getElementById(tabId);
                if (targetTab) {
                    // Hide all tabs
                    document.querySelectorAll('.tab-content').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    // Show target tab
                    targetTab.classList.add('active');
                    // Update nav-item active states
                    document.querySelectorAll('.nav-item[data-tab]').forEach(nav => {
                        nav.classList.remove('active');
                    });
                    // Scroll to top
                    const scrollContainer = document.querySelector('.content-scroll');
                    if (scrollContainer) {
                        scrollContainer.scrollTop = 0;
                    }
                }
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
    // PROMPT ACCORDION (Collapsible Example Blocks)
    // ==========================================
    const collapsibleBlocks = document.querySelectorAll('.example-block.collapsible');

    if (collapsibleBlocks.length > 0) {
        collapsibleBlocks.forEach(block => {
            const header = block.querySelector('.example-header');

            if (header) {
                header.addEventListener('click', (e) => {
                    // Don't toggle if clicking on the copy button
                    if (e.target.closest('.btn-copy')) return;

                    block.classList.toggle('expanded');
                });
            }
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

    // Initialize circular progress charts with animation
    // data-progress can be either a percentage (0-100) or an offset value (0-314)
    document.querySelectorAll('circle[data-progress]').forEach(circle => {
        const value = parseFloat(circle.dataset.progress);
        // If value is <= 100, treat it as a percentage and calculate offset
        // If value > 100, it's already an offset value
        const offset = value <= 100 ? 314 - (314 * value / 100) : value;
        circle.style.setProperty('--progress-offset', offset);
        // Trigger animation after a brief delay to ensure CSS is applied
        requestAnimationFrame(() => {
            circle.classList.add('animate');
        });
    });

    // Initialize bar chart fills with animation
    document.querySelectorAll('.bar-fill[data-width]').forEach(bar => {
        const width = bar.dataset.width;
        bar.style.setProperty('--bar-width', width + '%');
        // Trigger animation after a brief delay to ensure CSS is applied
        requestAnimationFrame(() => {
            bar.classList.add('animate');
        });
    });

    // Initialize stacked bar segments
    document.querySelectorAll('.stacked-segment[data-flex]').forEach(segment => {
        const flex = segment.dataset.flex;
        segment.style.setProperty('--segment-flex', flex);
    });

    // ==========================================
    // PRAXIS AI HERO ANIMATIONS
    // Neural Network / Code / Formula Visualization
    // ==========================================

    const canvas = document.getElementById('praxis-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let nodes = [];
        let codeElements = [];
        let animationId;
        let time = 0;

        // Neural Network Color Palette - Red Theme
        const colors = {
            red: { r: 230, g: 57, b: 70 },
            crimson: { r: 193, g: 18, b: 31 },
            coral: { r: 255, g: 77, b: 90 },
            rose: { r: 255, g: 99, b: 99 }
        };

        // Code/Formula snippets for floating text
        const codeSnippets = [
            'AI', 'ML', 'NLP', 'GPT', 'LLM',
            'f(x)', 'Σ', '∇', 'λ', 'θ',
            '{ }', '[ ]', '< >', '//',
            '01', '10', '11', '00',
            '→', '⟨ ⟩', '∂', '∞'
        ];

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function createNodes() {
            nodes = [];
            codeElements = [];
            const numberOfNodes = Math.floor((canvas.width * canvas.height) / 12000);

            // Create neural network nodes
            for (let i = 0; i < numberOfNodes; i++) {
                const colorKeys = Object.keys(colors);
                const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 3 + 1.5,
                    color: colors[colorKey],
                    pulsePhase: Math.random() * Math.PI * 2,
                    isHub: Math.random() < 0.15
                });
            }

            // Create floating code elements
            const numCodeElements = Math.floor(numberOfNodes / 4);
            for (let i = 0; i < numCodeElements; i++) {
                codeElements.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
                    opacity: Math.random() * 0.3 + 0.1,
                    size: Math.random() * 8 + 10
                });
            }
        }

        function drawNetwork() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.02;

            // Draw floating code/formula elements
            ctx.font = '12px "Courier New", monospace';
            codeElements.forEach(el => {
                const pulse = Math.sin(time + el.opacity * 10) * 0.1 + 0.9;
                ctx.fillStyle = `rgba(230, 57, 70, ${el.opacity * pulse})`;
                ctx.font = `${el.size}px "Courier New", monospace`;
                ctx.fillText(el.text, el.x, el.y);

                el.x += el.vx;
                el.y += el.vy;

                if (el.x < -20 || el.x > canvas.width + 20) el.vx *= -1;
                if (el.y < -20 || el.y > canvas.height + 20) el.vy *= -1;
            });

            // Draw neural network connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDist = nodes[i].isHub || nodes[j].isHub ? 200 : 120;

                    if (distance < maxDist) {
                        const opacity = (1 - distance / maxDist) * 0.4;
                        const pulse = Math.sin(time * 2 + i * 0.1) * 0.2 + 0.8;

                        // Gradient line effect
                        const gradient = ctx.createLinearGradient(
                            nodes[i].x, nodes[i].y,
                            nodes[j].x, nodes[j].y
                        );
                        gradient.addColorStop(0, `rgba(${nodes[i].color.r}, ${nodes[i].color.g}, ${nodes[i].color.b}, ${opacity * pulse})`);
                        gradient.addColorStop(1, `rgba(${nodes[j].color.r}, ${nodes[j].color.g}, ${nodes[j].color.b}, ${opacity * pulse})`);

                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = nodes[i].isHub || nodes[j].isHub ? 1.5 : 0.8;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            nodes.forEach(node => {
                const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.3 + 0.7;
                const glowSize = node.isHub ? 15 : 8;

                // Glow effect
                const glow = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, glowSize
                );
                glow.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${0.6 * pulse})`);
                glow.addColorStop(1, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0)`);

                ctx.beginPath();
                ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();

                // Core node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * (node.isHub ? 1.5 : 1), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${0.9 * pulse})`;
                ctx.fill();

                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            });

            animationId = requestAnimationFrame(drawNetwork);
        }

        resizeCanvas();
        createNodes();
        drawNetwork();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createNodes();
        });
    }

    // ==========================================
    // GLOBAL NEURAL NETWORK BACKGROUND
    // Subtle ambient animation for all pages
    // ==========================================

    // Only create global neural bg if not on hero page (no praxis-canvas)
    if (!document.getElementById('praxis-canvas') && !document.querySelector('.neural-bg')) {
        const neuralCanvas = document.createElement('canvas');
        neuralCanvas.id = 'neural-network-bg';
        neuralCanvas.className = 'neural-bg';
        document.body.insertBefore(neuralCanvas, document.body.firstChild);

        const nCtx = neuralCanvas.getContext('2d');
        let nNodes = [];
        let nTime = 0;

        const nColors = {
            red: { r: 230, g: 57, b: 70 },
            crimson: { r: 193, g: 18, b: 31 },
            coral: { r: 255, g: 77, b: 90 }
        };

        function resizeNeuralCanvas() {
            neuralCanvas.width = window.innerWidth;
            neuralCanvas.height = window.innerHeight;
        }

        function createNeuralNodes() {
            nNodes = [];
            const numNodes = Math.floor((neuralCanvas.width * neuralCanvas.height) / 25000);

            for (let i = 0; i < numNodes; i++) {
                const colorKeys = Object.keys(nColors);
                const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                nNodes.push({
                    x: Math.random() * neuralCanvas.width,
                    y: Math.random() * neuralCanvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 2 + 1,
                    color: nColors[colorKey]
                });
            }
        }

        function drawNeuralNetwork() {
            nCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);
            nTime += 0.01;

            // Draw connections
            for (let i = 0; i < nNodes.length; i++) {
                for (let j = i + 1; j < nNodes.length; j++) {
                    const dx = nNodes[i].x - nNodes[j].x;
                    const dy = nNodes[i].y - nNodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.3;
                        nCtx.strokeStyle = `rgba(230, 57, 70, ${opacity})`;
                        nCtx.lineWidth = 0.5;
                        nCtx.beginPath();
                        nCtx.moveTo(nNodes[i].x, nNodes[i].y);
                        nCtx.lineTo(nNodes[j].x, nNodes[j].y);
                        nCtx.stroke();
                    }
                }
            }

            // Draw nodes
            nNodes.forEach(node => {
                const pulse = Math.sin(nTime * 2 + node.x * 0.01) * 0.3 + 0.7;
                nCtx.beginPath();
                nCtx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
                nCtx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.6)`;
                nCtx.fill();

                // Update position
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > neuralCanvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > neuralCanvas.height) node.vy *= -1;
            });

            requestAnimationFrame(drawNeuralNetwork);
        }

        resizeNeuralCanvas();
        createNeuralNodes();
        drawNeuralNetwork();

        window.addEventListener('resize', () => {
            resizeNeuralCanvas();
            createNeuralNodes();
        });
    }

    // ==========================================
    // ANIMATED BRAND EFFECTS
    // Randomized cool animations for </Praxis Library>
    // ==========================================

    const animatedBrand = document.getElementById('animated-brand');
    if (animatedBrand) {
        const animChars = animatedBrand.querySelectorAll('.anim-char');
        const effects = ['glitch', 'float', 'pulse', 'shake', 'flip', 'color-shift'];

        // Random effect on individual characters
        function triggerRandomEffect() {
            const randomChar = animChars[Math.floor(Math.random() * animChars.length)];
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];

            // Remove any existing effect
            effects.forEach(e => randomChar.classList.remove(e));

            // Add new effect
            randomChar.classList.add(randomEffect);

            // Remove effect after animation completes
            setTimeout(() => {
                randomChar.classList.remove(randomEffect);
            }, 1000);
        }

        // Cascade effect - animate all characters in sequence
        function cascadeEffect() {
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            animChars.forEach((char, index) => {
                setTimeout(() => {
                    effects.forEach(e => char.classList.remove(e));
                    char.classList.add(randomEffect);
                    setTimeout(() => char.classList.remove(randomEffect), 600);
                }, index * 100);
            });
        }

        // Wave effect - characters float in sequence
        function waveEffect() {
            animChars.forEach((char, index) => {
                setTimeout(() => {
                    char.classList.add('float');
                    setTimeout(() => char.classList.remove('float'), 2000);
                }, index * 150);
            });
        }

        // Glitch storm - rapid glitches across all characters
        function glitchStorm() {
            let iterations = 0;
            const storm = setInterval(() => {
                const randomChar = animChars[Math.floor(Math.random() * animChars.length)];
                randomChar.classList.add('glitch');
                setTimeout(() => randomChar.classList.remove('glitch'), 300);
                iterations++;
                if (iterations > 10) clearInterval(storm);
            }, 100);
        }

        // Random interval for effects (between 2-5 seconds)
        function scheduleRandomEffect() {
            const delay = Math.random() * 3000 + 2000;
            setTimeout(() => {
                // Choose between different effect types
                const effectType = Math.random();
                if (effectType < 0.4) {
                    triggerRandomEffect();
                } else if (effectType < 0.6) {
                    cascadeEffect();
                } else if (effectType < 0.8) {
                    waveEffect();
                } else {
                    glitchStorm();
                }
                scheduleRandomEffect();
            }, delay);
        }

        // Start random animations after page load
        setTimeout(scheduleRandomEffect, 1000);

        // Hover effects - glitch on hover
        animChars.forEach(char => {
            char.addEventListener('mouseenter', () => {
                char.classList.add('glitch');
            });
            char.addEventListener('mouseleave', () => {
                setTimeout(() => char.classList.remove('glitch'), 300);
            });
        });
    }

    // Typing Effect for Tagline
    const taglineElement = document.getElementById('typed-tagline');
    if (taglineElement) {
        const taglines = [
            'Human knowledge + AI capability = Superior results',
            'Perfected through the power of collaboration',
            '50+ prompts across 4 sectors and 20+ industries',
            'From education to enterprise, built for everyone'
        ];
        let currentTagline = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function typeTagline() {
            const current = taglines[currentTagline];

            if (isDeleting) {
                taglineElement.textContent = current.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 40;
            } else {
                taglineElement.textContent = current.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 80;
            }

            if (!isDeleting && currentChar === current.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentTagline = (currentTagline + 1) % taglines.length;
                typingSpeed = 500; // Pause before next
            }

            setTimeout(typeTagline, typingSpeed);
        }

        setTimeout(typeTagline, 1000);
    }

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length > 0) {
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);

                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        };

        // Start counters with slight delay
        setTimeout(() => {
            statNumbers.forEach((stat, index) => {
                setTimeout(() => animateCounter(stat), index * 200);
            });
        }, 500);
    }
});