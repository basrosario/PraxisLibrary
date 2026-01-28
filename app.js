/**
 * Praxis - Mobile-First JavaScript
 * Clean, performant animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    let headerTicking = false;

    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        headerTicking = false;
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (!headerTicking) {
                requestAnimationFrame(updateHeader);
                headerTicking = true;
            }
        }, { passive: true });
        updateHeader();
    }

    // ==========================================
    // INTERACTIVE NEURAL NETWORK ANIMATION
    // ==========================================
    const neuralCanvas = document.getElementById('neural-network');

    if (neuralCanvas) {
        const ctx = neuralCanvas.getContext('2d');
        let width, height;
        let nodes = [];
        let aiTerms = [];
        let mouse = { x: null, y: null, radius: 150 };
        let animationId;

        // AI terms that float through the network - expanded list
        const AI_TERMS = [
            // Prompting Methods
            'CRISP', 'COSTAR', 'ReAct', 'CRISPE', 'Chain-of-Thought', 'Few-Shot',
            'Zero-Shot', 'Role Play', 'System Prompt', 'Meta Prompt',
            // Core Concepts
            'Prompt', 'Context', 'Token', 'Completion', 'Temperature', 'Top-P',
            'Hallucination', 'Grounding', 'Retrieval', 'RAG', 'Fine-tune',
            // AI Models & Tech
            'LLM', 'GPT', 'Claude', 'Gemini', 'Neural', 'Transformer',
            'Attention', 'BERT', 'Diffusion', 'Multimodal', 'Vision',
            // Technical Terms
            'Embedding', 'Vector', 'Semantic', 'Inference', 'Latent',
            'Tokenizer', 'Encoder', 'Decoder', 'Softmax', 'Gradient',
            // Process Terms
            'Generate', 'Train', 'Evaluate', 'Iterate', 'Optimize',
            'Query', 'Response', 'Output', 'Input', 'Reasoning',
            // Architecture
            'Parameters', 'Weights', 'Layers', 'Neurons', 'Activation',
            'Batch', 'Epoch', 'Loss', 'Backprop', 'Dropout',
            // Agent & Memory
            'Agent', 'Memory', 'Chain', 'Tool Use', 'Function Call',
            'Autonomous', 'Planning', 'Reflection', 'Self-Correct',
            // Safety & Ethics
            'Alignment', 'Safety', 'Bias', 'Fairness', 'RLHF',
            'Guardrails', 'Moderation', 'Responsible AI', 'Ethics'
        ];

        // Node class for neural network points
        class Node {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 3 + 1;
                this.baseSize = this.size;
                this.density = Math.random() * 30 + 1;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.brightness = Math.random() * 0.5 + 0.3;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }

            update(time) {
                // Pulse effect
                this.brightness = 0.3 + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.2;
                this.size = this.baseSize + Math.sin(time * this.pulseSpeed * 0.5 + this.pulseOffset) * 0.5;

                // Mouse repulsion - water-like effect
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        const pushX = Math.cos(angle) * force * 3;
                        const pushY = Math.sin(angle) * force * 3;
                        this.x -= pushX;
                        this.y -= pushY;
                    }
                }

                // Return to base position (spring effect)
                const dx = this.baseX - this.x;
                const dy = this.baseY - this.y;
                this.x += dx * 0.03;
                this.y += dy * 0.03;

                // Gentle drift
                this.baseX += this.vx;
                this.baseY += this.vy;

                // Boundary check for base position
                if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
                if (this.baseY < 0 || this.baseY > height) this.vy *= -1;
            }

            draw() {
                const alpha = this.brightness;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(230, 57, 70, ${alpha})`;
                ctx.fill();

                // Glow effect for larger nodes
                if (this.baseSize > 2.5) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(230, 57, 70, ${alpha * 0.15})`;
                    ctx.fill();
                }
            }
        }

        // Floating AI term class
        class AITerm {
            constructor() {
                this.reset();
            }

            reset() {
                this.text = AI_TERMS[Math.floor(Math.random() * AI_TERMS.length)];
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.fontSize = Math.random() * 10 + 10;
                this.brightness = 0;
                this.targetBrightness = Math.random() * 0.6 + 0.2;
                this.fadeSpeed = Math.random() * 0.01 + 0.005;
                this.phase = 'fadeIn';
                this.lifetime = Math.random() * 5000 + 3000;
                this.born = performance.now();
                this.flickerIntensity = Math.random() * 0.3;
                this.flickerSpeed = Math.random() * 0.1 + 0.05;
            }

            update(time) {
                // Movement
                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction - terms scatter from mouse
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius * 0.8) {
                        const force = (mouse.radius * 0.8 - distance) / (mouse.radius * 0.8);
                        const angle = Math.atan2(dy, dx);
                        this.x -= Math.cos(angle) * force * 2;
                        this.y -= Math.sin(angle) * force * 2;
                    }
                }

                // Boundary wrapping
                if (this.x < -100) this.x = width + 100;
                if (this.x > width + 100) this.x = -100;
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -50;

                // Lifecycle management
                const age = performance.now() - this.born;

                if (this.phase === 'fadeIn') {
                    this.brightness += this.fadeSpeed;
                    if (this.brightness >= this.targetBrightness) {
                        this.brightness = this.targetBrightness;
                        this.phase = 'visible';
                    }
                } else if (this.phase === 'visible') {
                    if (age > this.lifetime) {
                        this.phase = 'fadeOut';
                    }
                } else if (this.phase === 'fadeOut') {
                    this.brightness -= this.fadeSpeed;
                    if (this.brightness <= 0) {
                        this.reset();
                    }
                }

                // Flicker effect
                const flicker = Math.sin(time * this.flickerSpeed) * this.flickerIntensity;
                this.currentBrightness = Math.max(0, this.brightness + flicker);
            }

            draw() {
                if (this.currentBrightness <= 0) return;

                ctx.save();
                ctx.font = `${this.fontSize}px monospace`;
                ctx.fillStyle = `rgba(230, 57, 70, ${this.currentBrightness})`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Glow effect
                ctx.shadowColor = `rgba(230, 57, 70, ${this.currentBrightness})`;
                ctx.shadowBlur = 10 + this.currentBrightness * 20;
                ctx.fillText(this.text, this.x, this.y);

                ctx.restore();
            }
        }

        function resize() {
            width = neuralCanvas.width = neuralCanvas.offsetWidth;
            height = neuralCanvas.height = neuralCanvas.offsetHeight;
            initNodes();
            initTerms();
        }

        function initNodes() {
            nodes = [];
            // Calculate node count based on screen size (more for larger screens)
            const density = 0.00015;
            const nodeCount = Math.floor(width * height * density);
            const clampedCount = Math.min(Math.max(nodeCount, 80), 300);

            for (let i = 0; i < clampedCount; i++) {
                nodes.push(new Node(
                    Math.random() * width,
                    Math.random() * height
                ));
            }
        }

        function initTerms() {
            aiTerms = [];
            // More terms for richer animation - increased from 8/15 to 18/35
            const termCount = width < 768 ? 18 : 35;

            for (let i = 0; i < termCount; i++) {
                const term = new AITerm();
                // Stagger initial appearance
                term.born = performance.now() - Math.random() * 5000;
                aiTerms.push(term);
            }
        }

        // Dynamic connection state - connections can release and reconnect
        let connectionStates = new Map();
        let lastConnectionUpdate = 0;
        const connectionUpdateInterval = 2000; // Check for reconnections every 2 seconds

        function getConnectionKey(i, j) {
            return i < j ? `${i}-${j}` : `${j}-${i}`;
        }

        function updateConnectionStates(time) {
            // Periodically release some connections and form new ones
            if (time - lastConnectionUpdate > connectionUpdateInterval) {
                lastConnectionUpdate = time;

                // Randomly release 5-10% of existing connections
                connectionStates.forEach((state, key) => {
                    if (Math.random() < 0.08) {
                        connectionStates.set(key, {
                            active: false,
                            releaseTime: time,
                            reconnectDelay: Math.random() * 3000 + 1000 // 1-4 seconds to reconnect
                        });
                    }
                });
            }

            // Check for connections ready to reconnect
            connectionStates.forEach((state, key) => {
                if (!state.active && time - state.releaseTime > state.reconnectDelay) {
                    connectionStates.set(key, { active: true });
                }
            });
        }

        function drawConnections(time) {
            const maxDistance = 150; // Increased range for more connections

            updateConnectionStates(time);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const key = getConnectionKey(i, j);

                        // Initialize connection state if not exists
                        if (!connectionStates.has(key)) {
                            connectionStates.set(key, { active: true });
                        }

                        const state = connectionStates.get(key);

                        // Skip if connection is released
                        if (!state.active) {
                            // Draw fading connection during release
                            const fadeProgress = Math.min(1, (performance.now() - state.releaseTime) / 500);
                            if (fadeProgress < 1) {
                                const fadeAlpha = (1 - distance / maxDistance) * 0.5 * (1 - fadeProgress);
                                ctx.beginPath();
                                ctx.moveTo(nodes[i].x, nodes[i].y);
                                ctx.lineTo(nodes[j].x, nodes[j].y);
                                ctx.strokeStyle = `rgba(230, 57, 70, ${fadeAlpha})`;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                            continue;
                        }

                        // Brighter lines - increased from 0.15 to 0.5
                        const baseAlpha = (1 - distance / maxDistance) * 0.5;
                        // Add subtle pulse to connections
                        const pulse = Math.sin(time * 0.002 + i * 0.1) * 0.1;
                        const alpha = Math.max(0.1, baseAlpha + pulse);

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(230, 57, 70, ${alpha})`;
                        ctx.lineWidth = 1; // Thicker lines
                        ctx.stroke();
                    }
                }
            }
        }

        function animate(time) {
            ctx.clearRect(0, 0, width, height);

            // Draw connections (behind nodes)
            drawConnections(time);

            // Update and draw nodes
            nodes.forEach(node => {
                node.update(time);
                node.draw();
            });

            // Update and draw AI terms
            aiTerms.forEach(term => {
                term.update(time);
                term.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        // Mouse tracking
        function handleMouseMove(e) {
            const rect = neuralCanvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }

        function handleMouseLeave() {
            mouse.x = null;
            mouse.y = null;
        }

        // Touch support
        function handleTouchMove(e) {
            if (e.touches.length > 0) {
                const rect = neuralCanvas.getBoundingClientRect();
                mouse.x = e.touches[0].clientX - rect.left;
                mouse.y = e.touches[0].clientY - rect.top;
            }
        }

        function handleTouchEnd() {
            mouse.x = null;
            mouse.y = null;
        }

        // Initialize
        resize();
        animate(0);

        // Event listeners
        window.addEventListener('resize', resize);
        neuralCanvas.addEventListener('mousemove', handleMouseMove);
        neuralCanvas.addEventListener('mouseleave', handleMouseLeave);
        neuralCanvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        neuralCanvas.addEventListener('touchend', handleTouchEnd);

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationId);
        });
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a stagger container, animate children
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .fade-in-up, .stagger-children, .card, .feature-item, .pattern-chip, .cta-card').forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // COUNTER ANIMATIONS
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.dataset.count, 10);
                if (!isNaN(target)) {
                    entry.target.dataset.animated = 'true';
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    document.body.appendChild(backToTop);

    let backToTopTicking = false;

    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        backToTopTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!backToTopTicking) {
            requestAnimationFrame(updateBackToTop);
            backToTopTicking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ==========================================
    // THEME TOGGLE (Dark/Light Mode)
    // ==========================================
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Theme toggle button (if exists)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
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
    }

    // ==========================================
    // TOOL PAGE: PROMPT SCORER
    // ==========================================
    const scorerForm = document.getElementById('scorer-form');
    const promptInput = document.getElementById('prompt-input');
    const scoreDisplay = document.getElementById('score-display');

    if (scorerForm && promptInput && scoreDisplay) {
        scorerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const prompt = promptInput.value.trim();

            if (prompt.length < 10) {
                showToast('Please enter a longer prompt to analyze', 'error');
                return;
            }

            const scores = analyzePrompt(prompt);
            displayScores(scores);
        });
    }

    function analyzePrompt(prompt) {
        const words = prompt.split(/\s+/).filter(w => w.length > 0);
        const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0);

        // Clarity score (based on sentence structure and word length)
        const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
        const clarityBase = avgWordLength < 8 ? 70 : 50;
        const clarity = Math.min(100, clarityBase + (sentences.length > 1 ? 20 : 0) + (words.length > 10 ? 10 : 0));

        // Specificity score (based on detail indicators)
        const specificWords = ['specific', 'exactly', 'precisely', 'include', 'must', 'should', 'format', 'example', 'such as', 'like'];
        const specificCount = specificWords.filter(w => prompt.toLowerCase().includes(w)).length;
        const specificity = Math.min(100, 40 + specificCount * 15 + (words.length > 20 ? 20 : 0));

        // Structure score (based on organization indicators)
        const structureWords = ['first', 'second', 'then', 'finally', 'step', '1.', '2.', '-', ':', 'context', 'task', 'output'];
        const structureCount = structureWords.filter(w => prompt.toLowerCase().includes(w)).length;
        const structure = Math.min(100, 30 + structureCount * 20);

        // Context score (based on background information)
        const contextWords = ['background', 'context', 'situation', 'currently', 'working on', 'project', 'goal', 'purpose', 'need'];
        const contextCount = contextWords.filter(w => prompt.toLowerCase().includes(w)).length;
        const context = Math.min(100, 25 + contextCount * 20 + (words.length > 30 ? 25 : 0));

        // Overall score (weighted average)
        const overall = Math.round((clarity * 0.3 + specificity * 0.3 + structure * 0.2 + context * 0.2));

        return {
            overall,
            clarity: Math.round(clarity),
            specificity: Math.round(specificity),
            structure: Math.round(structure),
            context: Math.round(context),
            feedback: generateFeedback(clarity, specificity, structure, context, prompt)
        };
    }

    function generateFeedback(clarity, specificity, structure, context, prompt) {
        const improvements = [];
        const strengths = [];
        const examples = [];

        // Analyze what's actually in the prompt
        const hasNumbers = /\d+/.test(prompt);
        const hasFormat = /format|style|tone|write as|written in/i.test(prompt);
        const hasContext = /context|background|situation|because|since|currently/i.test(prompt);
        const hasAudience = /audience|reader|user|customer|for\s+(a|my|our|the)/i.test(prompt);
        const hasAction = /^(write|create|generate|explain|analyze|summarize|list|describe|compare|design)/i.test(prompt.trim());
        const hasExamples = /example|such as|like this|similar to|e\.g\.|for instance/i.test(prompt);
        const hasConstraints = /must|should|don't|avoid|only|never|always|limit|maximum|minimum/i.test(prompt);
        const hasSteps = /step|first|then|next|finally|1\.|2\.|3\.|-\s/i.test(prompt);

        // CLARITY feedback
        if (clarity >= 80) {
            strengths.push({ category: 'Clarity', text: 'Your prompt is well-written and easy to understand.' });
            if (hasAction) {
                strengths.push({ category: 'Clarity', text: 'Great use of an action verb to start your prompt!' });
            }
        } else if (clarity >= 60) {
            if (!hasAction) {
                improvements.push({
                    category: 'Clarity',
                    text: 'Your prompt is fairly clear, but could be more direct.',
                    tip: 'Try starting with an action verb (Write, Create, Explain, Analyze).'
                });
            }
        } else {
            improvements.push({
                category: 'Clarity',
                text: 'Your prompt may be confusing to the AI.',
                tip: 'Break long sentences into shorter ones. Remove filler words like "I was wondering if you could maybe..."'
            });
            examples.push({
                bad: 'I was wondering if you could maybe help me with writing something about...',
                good: 'Write a 300-word article about...'
            });
        }

        // SPECIFICITY feedback
        if (specificity >= 80) {
            strengths.push({ category: 'Specificity', text: 'Excellent detail! You\'ve clearly defined what you want.' });
        } else if (specificity >= 60) {
            if (!hasNumbers) {
                improvements.push({
                    category: 'Specificity',
                    text: 'Consider adding specific numbers or quantities.',
                    tip: 'Specify length (500 words), number of items (5 bullet points), or time (2-minute read).'
                });
            }
            if (!hasFormat) {
                improvements.push({
                    category: 'Specificity',
                    text: 'Define the format or style you want.',
                    tip: 'Add: "Write in a professional tone" or "Format as a bulleted list".'
                });
            }
        } else {
            improvements.push({
                category: 'Specificity',
                text: 'Your prompt is too vague. The AI will have to guess what you want.',
                tip: 'Tell the AI exactly what output you need: format, length, style, and key points to include.'
            });
            examples.push({
                bad: 'Write about marketing',
                good: 'Write a 500-word blog post about 5 email marketing tips for small e-commerce businesses. Use a conversational tone with practical examples.'
            });
        }

        // STRUCTURE feedback
        if (structure >= 80) {
            strengths.push({ category: 'Structure', text: 'Well-organized prompt with clear sections.' });
        } else if (structure >= 60) {
            if (!hasSteps) {
                improvements.push({
                    category: 'Structure',
                    text: 'Consider organizing with numbered steps or sections.',
                    tip: 'Use labels like "Context:", "Task:", "Format:" to separate parts of your prompt.'
                });
            }
        } else {
            improvements.push({
                category: 'Structure',
                text: 'Your prompt lacks organization, making it harder for the AI to follow.',
                tip: 'Structure your prompt: 1) Background/Context, 2) Main Task, 3) Specific Requirements, 4) Output Format.'
            });
            examples.push({
                bad: 'I need help with a presentation about our Q3 results and it should be for executives and include charts',
                good: 'Context: I\'m presenting Q3 sales results to our executive team.\n\nTask: Create an outline for a 10-minute presentation.\n\nInclude:\n- Key metrics with year-over-year comparison\n- 3 main achievements\n- Recommendations for Q4'
            });
        }

        // CONTEXT feedback
        if (context >= 80) {
            strengths.push({ category: 'Context', text: 'Great job providing background information!' });
        } else if (context >= 60) {
            if (!hasAudience) {
                improvements.push({
                    category: 'Context',
                    text: 'Specify who the output is for.',
                    tip: 'Add your audience: "for technical developers", "for beginners with no coding experience", "for C-level executives".'
                });
            }
        } else {
            improvements.push({
                category: 'Context',
                text: 'The AI doesn\'t know your situation, goals, or constraints.',
                tip: 'Start with: "I\'m a [role] working on [project]. I need [output] because [reason]."'
            });
            if (!hasContext && !hasAudience) {
                examples.push({
                    bad: 'Write a product description',
                    good: 'Context: I run a small handmade jewelry store on Etsy targeting young professionals.\n\nWrite a product description for our new minimalist gold necklace. Emphasize quality craftsmanship and versatility for both work and casual wear.'
                });
            }
        }

        // Add bonus tips based on missing elements
        if (!hasExamples && specificity < 80) {
            improvements.push({
                category: 'Pro Tip',
                text: 'Add an example of what you\'re looking for.',
                tip: 'Say "Similar to..." or "For example..." to show the AI exactly what style or format you want.'
            });
        }

        if (!hasConstraints && structure < 80) {
            improvements.push({
                category: 'Pro Tip',
                text: 'Add constraints to prevent unwanted content.',
                tip: 'Include what to avoid: "Don\'t use jargon", "Keep it under 200 words", "Focus only on..."'
            });
        }

        return { improvements, strengths, examples };
    }

    function displayScores(scores) {
        const { improvements, strengths, examples } = scores.feedback;

        let strengthsHTML = '';
        if (strengths.length > 0) {
            strengthsHTML = `
                <div class="feedback-section feedback-strengths">
                    <h4>What You Did Well</h4>
                    <ul class="feedback-list">
                        ${strengths.map(s => `<li><span class="feedback-category">${s.category}:</span> ${s.text}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        let improvementsHTML = '';
        if (improvements.length > 0) {
            improvementsHTML = `
                <div class="feedback-section feedback-improvements">
                    <h4>How to Improve</h4>
                    <div class="feedback-cards">
                        ${improvements.map(i => `
                            <div class="feedback-card">
                                <div class="feedback-card-header">
                                    <span class="feedback-category">${i.category}</span>
                                </div>
                                <p class="feedback-issue">${i.text}</p>
                                <p class="feedback-tip"><strong>Tip:</strong> ${i.tip}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        let examplesHTML = '';
        if (examples.length > 0) {
            examplesHTML = `
                <div class="feedback-section feedback-examples">
                    <h4>Before & After Examples</h4>
                    ${examples.map(ex => `
                        <div class="example-comparison">
                            <div class="example-before">
                                <span class="example-label-bad">Before</span>
                                <p>${ex.bad}</p>
                            </div>
                            <div class="example-after">
                                <span class="example-label-good">After</span>
                                <p>${ex.good.replace(/\n/g, '<br>')}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        let overallMessage = '';
        if (scores.overall >= 80) {
            overallMessage = '<p class="score-message score-message-great">Excellent! This prompt is well-crafted and should get great results.</p>';
        } else if (scores.overall >= 60) {
            overallMessage = '<p class="score-message score-message-good">Good start! A few improvements will make this prompt even better.</p>';
        } else if (scores.overall >= 40) {
            overallMessage = '<p class="score-message score-message-fair">This prompt needs work. Review the suggestions below to improve your results.</p>';
        } else {
            overallMessage = '<p class="score-message score-message-poor">This prompt is too vague. The AI will likely give generic or unhelpful results.</p>';
        }

        scoreDisplay.innerHTML = `
            <div class="score-main">
                <div class="score-circle ${getScoreClass(scores.overall)}">
                    <span class="score-value">${scores.overall}</span>
                    <span class="score-label">Overall</span>
                </div>
                ${overallMessage}
            </div>
            <div class="sub-scores">
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.clarity)}" style="width: ${scores.clarity}%"></div>
                    </div>
                    <span class="sub-score-label">Clarity</span>
                    <span class="sub-score-value">${scores.clarity}</span>
                </div>
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.specificity)}" style="width: ${scores.specificity}%"></div>
                    </div>
                    <span class="sub-score-label">Specificity</span>
                    <span class="sub-score-value">${scores.specificity}</span>
                </div>
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.structure)}" style="width: ${scores.structure}%"></div>
                    </div>
                    <span class="sub-score-label">Structure</span>
                    <span class="sub-score-value">${scores.structure}</span>
                </div>
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.context)}" style="width: ${scores.context}%"></div>
                    </div>
                    <span class="sub-score-label">Context</span>
                    <span class="sub-score-value">${scores.context}</span>
                </div>
            </div>
            ${strengthsHTML}
            ${improvementsHTML}
            ${examplesHTML}
            <div class="feedback-cta">
                <p>Want to learn more about writing effective prompts?</p>
                <a href="../learn/prompt-basics.html" class="btn btn-secondary">Learn Prompt Basics</a>
            </div>
        `;
        scoreDisplay.classList.add('visible');
    }

    function getScoreClass(score) {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        if (score >= 40) return 'score-fair';
        return 'score-poor';
    }

    // ==========================================
    // TOOL PAGE: PREFLIGHT CHECKLIST
    // ==========================================
    const checklistForm = document.getElementById('checklist-form');

    if (checklistForm) {
        const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]');
        const progressBar = document.querySelector('.checklist-progress-fill');
        const progressText = document.querySelector('.checklist-progress-text');

        function updateProgress() {
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            const percent = Math.round((checked / total) * 100);

            if (progressBar) progressBar.style.width = percent + '%';
            if (progressText) progressText.textContent = `${checked}/${total} Complete`;
        }

        checkboxes.forEach(cb => {
            cb.addEventListener('change', updateProgress);
        });

        updateProgress();
    }

    // ==========================================
    // TOOL PAGE: HALLUCINATION SPOTTER
    // ==========================================
    const hallucinationGame = document.getElementById('hallucination-game');

    if (hallucinationGame) {
        const statements = [
            { text: "The Great Wall of China is visible from space with the naked eye.", isTrue: false, explanation: "This is a common misconception. The Great Wall is not visible from space without aid." },
            { text: "Honey never spoils and edible honey has been found in ancient Egyptian tombs.", isTrue: true, explanation: "True! Honey's low moisture content and acidic pH make it resistant to bacteria." },
            { text: "Goldfish have a memory span of only 3 seconds.", isTrue: false, explanation: "False! Studies show goldfish can remember things for months." },
            { text: "Lightning never strikes the same place twice.", isTrue: false, explanation: "False! Tall buildings like the Empire State Building get struck multiple times per year." },
            { text: "The Eiffel Tower can grow up to 6 inches taller in summer due to thermal expansion.", isTrue: true, explanation: "True! Metal expands in heat, making the tower grow slightly in warm weather." },
            { text: "Humans only use 10% of their brains.", isTrue: false, explanation: "False! Brain imaging shows we use virtually all parts of our brain." },
            { text: "Octopuses have three hearts.", isTrue: true, explanation: "True! Two pump blood to the gills, one pumps it to the rest of the body." },
            { text: "The Amazon River is the longest river in the world.", isTrue: false, explanation: "False! The Nile River is generally considered the longest, though this is debated." }
        ];

        let currentIndex = 0;
        let score = 0;
        let shuffledStatements = [...statements].sort(() => Math.random() - 0.5);

        const statementText = hallucinationGame.querySelector('.statement-text');
        const trueBtn = hallucinationGame.querySelector('.btn-true');
        const falseBtn = hallucinationGame.querySelector('.btn-false');
        const resultDisplay = hallucinationGame.querySelector('.result-display');
        const scoreDisplay = hallucinationGame.querySelector('.game-score');
        const progressDisplay = hallucinationGame.querySelector('.game-progress');

        function showStatement() {
            if (currentIndex >= shuffledStatements.length) {
                showFinalScore();
                return;
            }

            const current = shuffledStatements[currentIndex];
            statementText.textContent = current.text;
            resultDisplay.classList.remove('visible', 'correct', 'incorrect');
            trueBtn.disabled = false;
            falseBtn.disabled = false;
            progressDisplay.textContent = `${currentIndex + 1}/${shuffledStatements.length}`;
        }

        function checkAnswer(userAnswer) {
            const current = shuffledStatements[currentIndex];
            const isCorrect = userAnswer === current.isTrue;

            if (isCorrect) {
                score++;
                resultDisplay.classList.add('correct');
                resultDisplay.innerHTML = `<strong>Correct!</strong> ${current.explanation}`;
            } else {
                resultDisplay.classList.add('incorrect');
                resultDisplay.innerHTML = `<strong>Incorrect.</strong> ${current.explanation}`;
            }

            resultDisplay.classList.add('visible');
            trueBtn.disabled = true;
            falseBtn.disabled = true;
            scoreDisplay.textContent = `Score: ${score}`;

            setTimeout(() => {
                currentIndex++;
                showStatement();
            }, 3000);
        }

        function showFinalScore() {
            const percent = Math.round((score / shuffledStatements.length) * 100);
            statementText.innerHTML = `
                <div class="final-score">
                    <h3>Game Complete!</h3>
                    <p class="score-big">${score}/${shuffledStatements.length}</p>
                    <p>${percent}% accuracy</p>
                    <button class="btn btn-primary" onclick="location.reload()">Play Again</button>
                </div>
            `;
            trueBtn.style.display = 'none';
            falseBtn.style.display = 'none';
        }

        if (trueBtn && falseBtn) {
            trueBtn.addEventListener('click', () => checkAnswer(true));
            falseBtn.addEventListener('click', () => checkAnswer(false));
            showStatement();
        }
    }

    // ==========================================
    // QUIZ: OPERATIONAL READINESS
    // ==========================================
    const quizContainer = document.getElementById('readiness-quiz');

    if (quizContainer) {
        const questions = [
            {
                question: "Before using AI for a task, you should first:",
                options: [
                    "Just start typing and see what happens",
                    "Think about what you want to achieve and what information the AI needs",
                    "Copy a prompt from the internet",
                    "Ask the AI what to ask it"
                ],
                correct: 1
            },
            {
                question: "When reviewing AI-generated content, you should:",
                options: [
                    "Trust it completely since AI doesn't make mistakes",
                    "Only check for spelling errors",
                    "Verify facts, check for consistency, and evaluate if it meets your needs",
                    "Publish it immediately to save time"
                ],
                correct: 2
            },
            {
                question: "If an AI gives you incorrect information, the best response is to:",
                options: [
                    "Assume your prompt was perfect and the AI is broken",
                    "Rephrase your prompt with more context and specific requirements",
                    "Give up on using AI",
                    "Accept the incorrect information anyway"
                ],
                correct: 1
            },
            {
                question: "The CRISP framework stands for:",
                options: [
                    "Context, Request, Instructions, Style, Parameters",
                    "Clear, Refined, Intelligent, Smart, Perfect",
                    "Create, Review, Iterate, Submit, Publish",
                    "Complex, Random, Interesting, Simple, Plain"
                ],
                correct: 0
            },
            {
                question: "When should you include examples in your prompt?",
                options: [
                    "Never - AI should figure it out",
                    "Only when writing code",
                    "When you want the AI to follow a specific format or style",
                    "Only for creative writing tasks"
                ],
                correct: 2
            }
        ];

        let currentQuestion = 0;
        let quizScore = 0;

        function renderQuestion() {
            if (currentQuestion >= questions.length) {
                showQuizResults();
                return;
            }

            const q = questions[currentQuestion];
            quizContainer.innerHTML = `
                <div class="quiz-progress">
                    <div class="quiz-progress-fill" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
                </div>
                <div class="quiz-question">
                    <span class="question-number">Question ${currentQuestion + 1} of ${questions.length}</span>
                    <h3>${q.question}</h3>
                </div>
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <button class="quiz-option" data-index="${i}">${opt}</button>
                    `).join('')}
                </div>
            `;

            quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
            });
        }

        function selectAnswer(index) {
            const q = questions[currentQuestion];
            const buttons = quizContainer.querySelectorAll('.quiz-option');

            buttons.forEach((btn, i) => {
                btn.disabled = true;
                if (i === q.correct) {
                    btn.classList.add('correct');
                } else if (i === index && i !== q.correct) {
                    btn.classList.add('incorrect');
                }
            });

            if (index === q.correct) {
                quizScore++;
            }

            setTimeout(() => {
                currentQuestion++;
                renderQuestion();
            }, 1500);
        }

        function showQuizResults() {
            const percent = Math.round((quizScore / questions.length) * 100);
            let level, message;

            if (percent >= 80) {
                level = 'Expert';
                message = 'Excellent! You have a strong understanding of AI prompting best practices.';
            } else if (percent >= 60) {
                level = 'Intermediate';
                message = 'Good foundation! Review our methodology guides to strengthen your skills.';
            } else {
                level = 'Beginner';
                message = 'Great start! Check out our Learn section to build your prompting skills.';
            }

            quizContainer.innerHTML = `
                <div class="quiz-results">
                    <div class="result-score">${quizScore}/${questions.length}</div>
                    <div class="result-percent">${percent}%</div>
                    <div class="result-level">${level} Level</div>
                    <p class="result-message">${message}</p>
                    <div class="result-actions">
                        <button class="btn btn-primary" onclick="location.reload()">Retake Quiz</button>
                        <a href="../learn/index.html" class="btn btn-secondary">Start Learning</a>
                    </div>
                </div>
            `;
        }

        renderQuestion();
    }

    // ==========================================
    // PATTERN LIBRARY FILTERING
    // ==========================================
    const patternFilter = document.querySelector('.pattern-filter');
    const patternCards = document.querySelectorAll('.pattern-card');

    if (patternFilter && patternCards.length > 0) {
        const filterButtons = patternFilter.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.filter;

                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter cards
                patternCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = '';
                        card.classList.add('visible');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // COPY TO CLIPBOARD
    // ==========================================
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const text = document.querySelector(target)?.textContent;

            if (text) {
                navigator.clipboard.writeText(text)
                    .then(() => showToast('Copied to clipboard!', 'success'))
                    .catch(() => showToast('Failed to copy', 'error'));
            }
        });
    });

    // ==========================================
    // ACCORDION
    // ==========================================
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other accordions in the same container
            const container = item.parentElement;
            container.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // TABS
    // ==========================================
    document.querySelectorAll('.tabs').forEach(tabContainer => {
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabPanels = tabContainer.querySelectorAll('.tab-panel');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.tab;

                // Update buttons
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update panels
                tabPanels.forEach(panel => {
                    panel.classList.toggle('active', panel.id === targetId);
                });
            });
        });
    });

    // ==========================================
    // KEYBOARD SHORTCUTS
    // ==========================================
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search (if search exists)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            // Future: open search modal
        }
    });

    console.log('Praxis initialized');
});
