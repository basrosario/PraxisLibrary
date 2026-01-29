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

    // AI terms that float through the network
    const AI_TERMS = [
        'CRISP', 'COSTAR', 'ReAct', 'CRISPE', 'Chain-of-Thought', 'Few-Shot',
        'Zero-Shot', 'Role Play', 'System Prompt', 'Meta Prompt',
        'Prompt', 'Context', 'Token', 'Completion', 'Temperature', 'Top-P',
        'Hallucination', 'Grounding', 'Retrieval', 'RAG', 'Fine-tune',
        'LLM', 'GPT', 'Claude', 'Gemini', 'Neural', 'Transformer',
        'Attention', 'BERT', 'Diffusion', 'Multimodal', 'Vision',
        'Embedding', 'Vector', 'Semantic', 'Inference', 'Latent',
        'Generate', 'Train', 'Evaluate', 'Iterate', 'Optimize',
        'Agent', 'Memory', 'Chain', 'Tool Use', 'Function Call',
        'Alignment', 'Safety', 'Bias', 'Fairness', 'RLHF'
    ];

    // Neural Network class - supports multiple instances
    class NeuralNetwork {
        constructor(canvas, options = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = 0;
            this.height = 0;
            this.nodes = [];
            this.aiTerms = [];
            this.mouse = { x: null, y: null, radius: 100 };
            this.animationId = null;
            this.connectionStates = new Map();
            this.lastConnectionUpdate = 0;

            // Options for different canvas types
            this.showTerms = options.showTerms !== false;
            this.nodeDensity = options.nodeDensity || 0.00015;
            this.maxNodes = options.maxNodes || 300;
            this.minNodes = options.minNodes || 40;
            this.termCount = options.termCount || (window.innerWidth < 768 ? 12 : 25);

            // Data pulses traveling along connections (foreground - bright)
            this.dataPulses = [];
            this.lastPulseSpawn = 0;
            this.pulseSpawnInterval = 800; // Spawn new pulse every 800ms

            // Background pulses - dimmer, more frequent for 3D depth
            this.bgPulses = [];
            this.lastBgPulseSpawn = 0;
            this.bgPulseSpawnInterval = 300; // More frequent background activity

            this.init();
        }

        init() {
            this.resize();
            this.setupEventListeners();
            this.animate(0);
        }

        setupEventListeners() {
            // Resize handler
            this.resizeHandler = () => this.resize();
            window.addEventListener('resize', this.resizeHandler);

            // Mouse tracking
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });

            // Touch support
            this.canvas.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    const rect = this.canvas.getBoundingClientRect();
                    this.mouse.x = e.touches[0].clientX - rect.left;
                    this.mouse.y = e.touches[0].clientY - rect.top;
                }
            }, { passive: true });

            this.canvas.addEventListener('touchend', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        resize() {
            this.width = this.canvas.width = this.canvas.offsetWidth;
            this.height = this.canvas.height = this.canvas.offsetHeight;
            this.initNodes();
            this.dataPulses = []; // Clear pulses on resize
            this.bgPulses = []; // Clear background pulses
            if (this.showTerms) this.initTerms();
        }

        initNodes() {
            this.nodes = [];
            const nodeCount = Math.floor(this.width * this.height * this.nodeDensity);
            const clampedCount = Math.min(Math.max(nodeCount, this.minNodes), this.maxNodes);

            for (let i = 0; i < clampedCount; i++) {
                this.nodes.push(this.createNode(
                    Math.random() * this.width,
                    Math.random() * this.height
                ));
            }
        }

        createNode(x, y) {
            return {
                x, y,
                baseX: x,
                baseY: y,
                size: Math.random() * 1.5 + 0.5, // Smaller, subtle points
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                brightness: Math.random() * 0.3 + 0.2 // Subtle, consistent brightness
            };
        }

        initTerms() {
            this.aiTerms = [];
            for (let i = 0; i < this.termCount; i++) {
                this.aiTerms.push(this.createTerm());
            }
        }

        createTerm() {
            return {
                text: AI_TERMS[Math.floor(Math.random() * AI_TERMS.length)],
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                fontSize: Math.random() * 8 + 10, // Slightly smaller text
                brightness: 0,
                targetBrightness: Math.random() * 0.35 + 0.15, // More subtle
                fadeSpeed: Math.random() * 0.006 + 0.003, // Slower, smoother fade
                phase: 'fadeIn',
                lifetime: Math.random() * 8000 + 5000, // Longer visible time
                born: performance.now() - Math.random() * 5000
            };
        }

        updateNode(node, time) {
            // Mouse repulsion (subtle)
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    node.x -= Math.cos(angle) * force * 2;
                    node.y -= Math.sin(angle) * force * 2;
                }
            }

            // Spring back to base
            node.x += (node.baseX - node.x) * 0.03;
            node.y += (node.baseY - node.y) * 0.03;

            // Slow drift
            node.baseX += node.vx;
            node.baseY += node.vy;

            // Boundaries
            if (node.baseX < 0 || node.baseX > this.width) node.vx *= -1;
            if (node.baseY < 0 || node.baseY > this.height) node.vy *= -1;
        }

        drawNode(node) {
            // Simple, small point - no glow or pulsing
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(230, 57, 70, ${node.brightness})`;
            this.ctx.fill();
        }

        updateTerm(term, time) {
            // Normal movement
            term.x += term.vx;
            term.y += term.vy;

            // Mouse scatter
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - term.x;
                const dy = this.mouse.y - term.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius * 0.8) {
                    const force = (this.mouse.radius * 0.8 - distance) / (this.mouse.radius * 0.8);
                    const angle = Math.atan2(dy, dx);
                    term.x -= Math.cos(angle) * force * 2;
                    term.y -= Math.sin(angle) * force * 2;
                }
            }

            // Wrap boundaries
            if (term.x < -100) term.x = this.width + 100;
            if (term.x > this.width + 100) term.x = -100;
            if (term.y < -50) term.y = this.height + 50;
            if (term.y > this.height + 50) term.y = -50;

            // Lifecycle with smooth fade
            const age = performance.now() - term.born;
            if (term.phase === 'fadeIn') {
                // Gentle fade in
                term.brightness += term.fadeSpeed;
                if (term.brightness >= term.targetBrightness) {
                    term.brightness = term.targetBrightness;
                    term.phase = 'visible';
                }
            } else if (term.phase === 'visible' && age > term.lifetime) {
                term.phase = 'fadeOut';
            } else if (term.phase === 'fadeOut') {
                // Smooth fade out - just opacity, no movement changes
                term.brightness -= term.fadeSpeed * 0.8;

                if (term.brightness <= 0) {
                    Object.assign(term, this.createTerm());
                }
            }
        }

        drawTerm(term) {
            if (term.brightness <= 0) return;

            this.ctx.save();
            this.ctx.font = `${term.fontSize}px monospace`;
            this.ctx.fillStyle = `rgba(230, 57, 70, ${term.brightness})`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Subtle glow
            this.ctx.shadowColor = `rgba(230, 57, 70, ${term.brightness * 0.6})`;
            this.ctx.shadowBlur = 8;

            this.ctx.fillText(term.text, term.x, term.y);
            this.ctx.restore();
        }

        updateConnectionStates(time) {
            if (time - this.lastConnectionUpdate > 2000) {
                this.lastConnectionUpdate = time;
                this.connectionStates.forEach((state, key) => {
                    if (Math.random() < 0.08) {
                        this.connectionStates.set(key, {
                            active: false,
                            releaseTime: time,
                            reconnectDelay: Math.random() * 3000 + 1000
                        });
                    }
                });
            }

            this.connectionStates.forEach((state, key) => {
                if (!state.active && time - state.releaseTime > state.reconnectDelay) {
                    this.connectionStates.set(key, { active: true });
                }
            });
        }

        // Data pulse methods - information traveling along connections
        spawnDataPulse(time) {
            if (time - this.lastPulseSpawn < this.pulseSpawnInterval) return;
            if (this.dataPulses.length > 15) return; // Limit active pulses

            // Find active connections to spawn pulses on
            const activeConnections = [];
            const maxDistance = 150;

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const dx = this.nodes[i].x - this.nodes[j].x;
                    const dy = this.nodes[i].y - this.nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const key = `${i}-${j}`;
                        const state = this.connectionStates.get(key);
                        if (state && state.active) {
                            activeConnections.push({ i, j, distance });
                        }
                    }
                }
            }

            if (activeConnections.length > 0) {
                // Pick a random connection
                const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
                const reverse = Math.random() > 0.5;

                this.dataPulses.push({
                    startNode: reverse ? conn.j : conn.i,
                    endNode: reverse ? conn.i : conn.j,
                    progress: 0,
                    speed: 0.015, // Uniform speed - streamlined
                    size: 1.5, // Skinnier pulse
                    trailLength: 0.12 // Shorter trail
                });

                this.lastPulseSpawn = time;
            }
        }

        updateDataPulses() {
            this.dataPulses = this.dataPulses.filter(pulse => {
                pulse.progress += pulse.speed;

                // When pulse reaches end, chance to chain to next connection
                if (pulse.progress >= 1) {
                    if (Math.random() < 0.4) {
                        // Find connected nodes to continue the chain
                        const endNode = pulse.endNode;
                        const maxDistance = 150;
                        const nextNodes = [];

                        for (let i = 0; i < this.nodes.length; i++) {
                            if (i === endNode || i === pulse.startNode) continue;
                            const dx = this.nodes[endNode].x - this.nodes[i].x;
                            const dy = this.nodes[endNode].y - this.nodes[i].y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < maxDistance) {
                                const key = endNode < i ? `${endNode}-${i}` : `${i}-${endNode}`;
                                const state = this.connectionStates.get(key);
                                if (state && state.active) {
                                    nextNodes.push(i);
                                }
                            }
                        }

                        if (nextNodes.length > 0) {
                            const nextNode = nextNodes[Math.floor(Math.random() * nextNodes.length)];
                            this.dataPulses.push({
                                startNode: endNode,
                                endNode: nextNode,
                                progress: 0,
                                speed: 0.015, // Same uniform speed
                                size: 1.5, // Same size
                                trailLength: 0.12
                            });
                        }
                    }
                    return false;
                }
                return true;
            });
        }

        drawDataPulses() {
            this.dataPulses.forEach(pulse => {
                const startNode = this.nodes[pulse.startNode];
                const endNode = this.nodes[pulse.endNode];

                // Current position
                const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
                const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;

                // Streamlined trail - thin line effect
                const trailSteps = 4;
                for (let t = trailSteps; t >= 0; t--) {
                    const trailProgress = pulse.progress - (pulse.trailLength * t / trailSteps);
                    if (trailProgress < 0) continue;

                    const tx = startNode.x + (endNode.x - startNode.x) * trailProgress;
                    const ty = startNode.y + (endNode.y - startNode.y) * trailProgress;
                    const trailAlpha = (1 - t / trailSteps) * 0.5;

                    this.ctx.beginPath();
                    this.ctx.arc(tx, ty, pulse.size * 0.8, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha})`;
                    this.ctx.fill();
                }

                // Main pulse - small bright core
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.fill();

                // Subtle glow
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulse.size * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(230, 57, 70, 0.25)';
                this.ctx.fill();
            });
        }

        // Background pulses - dimmer layer for 3D depth effect
        spawnBgPulse(time) {
            if (time - this.lastBgPulseSpawn < this.bgPulseSpawnInterval) return;
            if (this.bgPulses.length > 30) return; // More background activity

            const activeConnections = [];
            const maxDistance = 150;

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const dx = this.nodes[i].x - this.nodes[j].x;
                    const dy = this.nodes[i].y - this.nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const key = `${i}-${j}`;
                        const state = this.connectionStates.get(key);
                        if (state && state.active) {
                            activeConnections.push({ i, j, distance });
                        }
                    }
                }
            }

            if (activeConnections.length > 0) {
                const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
                const reverse = Math.random() > 0.5;

                this.bgPulses.push({
                    startNode: reverse ? conn.j : conn.i,
                    endNode: reverse ? conn.i : conn.j,
                    progress: 0,
                    speed: 0.008 + Math.random() * 0.006, // Slower, varied (feels distant)
                    size: 0.8 + Math.random() * 0.4, // Smaller
                    opacity: 0.15 + Math.random() * 0.15, // Dimmer
                    trailLength: 0.08 + Math.random() * 0.06
                });

                this.lastBgPulseSpawn = time;
            }
        }

        updateBgPulses() {
            this.bgPulses = this.bgPulses.filter(pulse => {
                pulse.progress += pulse.speed;

                // Background pulses chain less frequently
                if (pulse.progress >= 1) {
                    if (Math.random() < 0.25) {
                        const endNode = pulse.endNode;
                        const maxDistance = 150;
                        const nextNodes = [];

                        for (let i = 0; i < this.nodes.length; i++) {
                            if (i === endNode || i === pulse.startNode) continue;
                            const dx = this.nodes[endNode].x - this.nodes[i].x;
                            const dy = this.nodes[endNode].y - this.nodes[i].y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < maxDistance) {
                                const key = endNode < i ? `${endNode}-${i}` : `${i}-${endNode}`;
                                const state = this.connectionStates.get(key);
                                if (state && state.active) {
                                    nextNodes.push(i);
                                }
                            }
                        }

                        if (nextNodes.length > 0) {
                            const nextNode = nextNodes[Math.floor(Math.random() * nextNodes.length)];
                            this.bgPulses.push({
                                startNode: endNode,
                                endNode: nextNode,
                                progress: 0,
                                speed: 0.008 + Math.random() * 0.006,
                                size: 0.8 + Math.random() * 0.4,
                                opacity: 0.15 + Math.random() * 0.15,
                                trailLength: 0.08 + Math.random() * 0.06
                            });
                        }
                    }
                    return false;
                }
                return true;
            });
        }

        drawBgPulses() {
            this.bgPulses.forEach(pulse => {
                const startNode = this.nodes[pulse.startNode];
                const endNode = this.nodes[pulse.endNode];

                const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
                const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;

                // Subtle trail for background
                const trailSteps = 3;
                for (let t = trailSteps; t >= 0; t--) {
                    const trailProgress = pulse.progress - (pulse.trailLength * t / trailSteps);
                    if (trailProgress < 0) continue;

                    const tx = startNode.x + (endNode.x - startNode.x) * trailProgress;
                    const ty = startNode.y + (endNode.y - startNode.y) * trailProgress;
                    const trailAlpha = (1 - t / trailSteps) * pulse.opacity * 0.6;

                    this.ctx.beginPath();
                    this.ctx.arc(tx, ty, pulse.size * 0.6, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(180, 50, 60, ${trailAlpha})`;
                    this.ctx.fill();
                }

                // Main background pulse - dim, reddish
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(200, 60, 70, ${pulse.opacity})`;
                this.ctx.fill();
            });
        }

        drawConnections(time) {
            const maxDistance = 150;
            this.updateConnectionStates(time);

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const dx = this.nodes[i].x - this.nodes[j].x;
                    const dy = this.nodes[i].y - this.nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const key = `${i}-${j}`;

                        if (!this.connectionStates.has(key)) {
                            this.connectionStates.set(key, { active: true });
                        }

                        const state = this.connectionStates.get(key);

                        if (!state.active) {
                            const fadeProgress = Math.min(1, (performance.now() - state.releaseTime) / 500);
                            if (fadeProgress < 1) {
                                const fadeAlpha = (1 - distance / maxDistance) * 0.5 * (1 - fadeProgress);
                                this.ctx.beginPath();
                                this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                                this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                                this.ctx.strokeStyle = `rgba(230, 57, 70, ${fadeAlpha})`;
                                this.ctx.lineWidth = 1;
                                this.ctx.stroke();
                            }
                            continue;
                        }

                        const baseAlpha = (1 - distance / maxDistance) * 0.5;
                        const pulse = Math.sin(time * 0.002 + i * 0.1) * 0.1;
                        const alpha = Math.max(0.1, baseAlpha + pulse);

                        this.ctx.beginPath();
                        this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                        this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                        this.ctx.strokeStyle = `rgba(230, 57, 70, ${alpha})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
        }

        animate(time) {
            this.ctx.clearRect(0, 0, this.width, this.height);

            // Layer 1: Background pulses (deepest - dim, behind everything)
            this.spawnBgPulse(time);
            this.updateBgPulses();
            this.drawBgPulses();

            // Layer 2: Connection lines
            this.drawConnections(time);

            // Layer 3: Foreground data pulses (bright, in front of connections)
            this.spawnDataPulse(time);
            this.updateDataPulses();
            this.drawDataPulses();

            // Layer 4: Nodes
            this.nodes.forEach(node => {
                this.updateNode(node, time);
                this.drawNode(node);
            });

            // Layer 5: Terms (topmost)
            if (this.showTerms) {
                this.aiTerms.forEach(term => {
                    this.updateTerm(term, time);
                    this.drawTerm(term);
                });
            }

            this.animationId = requestAnimationFrame((t) => this.animate(t));
        }

        destroy() {
            cancelAnimationFrame(this.animationId);
            window.removeEventListener('resize', this.resizeHandler);
        }
    }

    // Initialize all neural network canvases
    const neuralNetworks = [];

    // Main hero canvas with subtle floating terms that fade smoothly
    const mainCanvas = document.getElementById('neural-network');
    if (mainCanvas) {
        neuralNetworks.push(new NeuralNetwork(mainCanvas, {
            showTerms: true,
            termCount: window.innerWidth < 768 ? 6 : 12 // Fewer terms for cleaner look
        }));
    }

    // Secondary canvases (CTA cards, footer - lighter version without terms)
    document.querySelectorAll('.neural-canvas-secondary').forEach(canvas => {
        neuralNetworks.push(new NeuralNetwork(canvas, {
            showTerms: false,
            nodeDensity: 0.0002,
            maxNodes: 100,
            minNodes: 30
        }));
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        neuralNetworks.forEach(nn => nn.destroy());
    });

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
    // Version 2.0 - 10 balanced questions with pillar tracking
    // ==========================================
    const quizContainer = document.getElementById('readiness-quiz');

    if (quizContainer) {
        console.log('Quiz v2.0 loaded - 10 questions with pillar tracking');

        // 10 Questions with progressive difficulty and pillar mapping
        // All options balanced in length, plausible distractors, varied correct positions
        const questions = [
            // Q1: Basics / Communicate
            {
                question: "What's the most important first step when preparing to use AI for a task?",
                options: [
                    "Find a template prompt that worked for someone else",
                    "Clarify your goal and what information the AI needs",
                    "Choose between different AI models and platforms",
                    "Think about how to verify the AI's eventual output"
                ],
                correct: 1,
                difficulty: "basics",
                pillar: "communicate"
            },
            // Q2: Basics / Think
            {
                question: "Which statement about AI accuracy is correct?",
                options: [
                    "Well-structured prompts guarantee accurate responses",
                    "AI errors mainly come from user prompting mistakes",
                    "AI can be confidently wrong due to training limits",
                    "Premium AI subscriptions eliminate accuracy issues"
                ],
                correct: 2,
                difficulty: "basics",
                pillar: "think"
            },
            // Q3: CRISP / Communicate
            {
                question: "In the CRISP framework, 'Parameters' refers to:",
                options: [
                    "Technical settings like temperature and tokens",
                    "The AI's internal configuration and version",
                    "Constraints like format, length, and requirements",
                    "Variables the AI uses during text generation"
                ],
                correct: 2,
                difficulty: "crisp",
                pillar: "communicate"
            },
            // Q4: CRISP / Iterate
            {
                question: "Your prompt returns content that's too formal and wordy. The best approach is to:",
                options: [
                    "Add 'be casual' at the end of your prompt",
                    "Generate multiple responses and pick the best",
                    "Switch to a different AI model for casual content",
                    "Rewrite the prompt specifying tone and length upfront"
                ],
                correct: 3,
                difficulty: "crisp",
                pillar: "iterate"
            },
            // Q5: CRISPE / Communicate
            {
                question: "In CRISPE, assigning a Role to the AI helps because it:",
                options: [
                    "Sets the expertise level and perspective for responses",
                    "Gives the AI permission to access special knowledge",
                    "Makes the AI more confident in its answers",
                    "Unlocks advanced capabilities within the model"
                ],
                correct: 0,
                difficulty: "crispe",
                pillar: "communicate"
            },
            // Q6: CRISPE / Communicate
            {
                question: "Few-shot prompting (providing examples) is most valuable when:",
                options: [
                    "You want the AI to be more creative and original",
                    "The AI doesn't understand your topic area well",
                    "You need output in a specific format or style",
                    "Your prompt is too short and needs more content"
                ],
                correct: 2,
                difficulty: "crispe",
                pillar: "communicate"
            },
            // Q7: COSTAR / Think
            {
                question: "Why does COSTAR specifically include 'Audience' as an element?",
                options: [
                    "To help track who reads the content for analytics",
                    "Technical level affects how content should be written",
                    "To ensure the AI uses appropriately formal language",
                    "To comply with accessibility standards in outputs"
                ],
                correct: 1,
                difficulty: "costar",
                pillar: "think"
            },
            // Q8: COSTAR / Spot
            {
                question: "AI output includes technical jargon for a beginner audience. This happened because:",
                options: [
                    "The AI defaulted to its training data's typical style",
                    "Technical topics inherently require specialized terms",
                    "The prompt didn't specify the audience's knowledge level",
                    "The AI couldn't simplify the complex concepts enough"
                ],
                correct: 2,
                difficulty: "costar",
                pillar: "spot"
            },
            // Q9: Advanced / Spot
            {
                question: "AI states a specific statistic with confidence. Your best response is to:",
                options: [
                    "Trust it if the AI expressed high certainty",
                    "Verify it—AI can confidently fabricate details",
                    "Assume it's outdated and search for newer data",
                    "Ask the AI to cite the source for validation"
                ],
                correct: 1,
                difficulty: "advanced",
                pillar: "spot"
            },
            // Q10: Advanced / Iterate
            {
                question: "Chain-of-thought prompting improves AI output by:",
                options: [
                    "Making the AI process your request more slowly",
                    "Connecting your prompt to relevant training data",
                    "Allowing the AI to ask you clarifying questions",
                    "Revealing reasoning steps for easier verification"
                ],
                correct: 3,
                difficulty: "advanced",
                pillar: "iterate"
            }
        ];

        let currentQuestion = 0;
        let quizScore = 0;
        let pillarScores = {
            communicate: { correct: 0, total: 0 },
            think: { correct: 0, total: 0 },
            spot: { correct: 0, total: 0 },
            iterate: { correct: 0, total: 0 }
        };

        const pillarNames = {
            communicate: "Communicate Clearly",
            think: "Think Critically",
            spot: "Spot Problems",
            iterate: "Iterate & Improve"
        };

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

            // Track pillar scores
            pillarScores[q.pillar].total++;
            if (index === q.correct) {
                quizScore++;
                pillarScores[q.pillar].correct++;
            }

            setTimeout(() => {
                currentQuestion++;
                renderQuestion();
            }, 1500);
        }

        function showQuizResults() {
            const percent = Math.round((quizScore / questions.length) * 100);
            let level, message, recommendedPath;

            if (percent >= 90) {
                level = 'Expert';
                message = 'Excellent! You have mastered AI prompting. Explore advanced patterns to stay sharp.';
                recommendedPath = '../patterns/index.html';
            } else if (percent >= 70) {
                level = 'Proficient';
                message = 'Strong skills! Review advanced techniques like ReAct and chain-of-thought to reach expert level.';
                recommendedPath = '../learn/advanced.html';
            } else if (percent >= 50) {
                level = 'Intermediate';
                message = 'Good foundation! Study COSTAR and CRISPE frameworks to improve your structured prompting.';
                recommendedPath = '../learn/costar.html';
            } else {
                level = 'Beginner';
                message = 'Great starting point! Begin with Prompt Basics and work up to the CRISP method.';
                recommendedPath = '../learn/prompt-basics.html';
            }

            // Build pillar breakdown HTML
            let pillarBreakdown = '<div class="pillar-results"><h4>Performance by Skill Area</h4>';
            for (const [key, scores] of Object.entries(pillarScores)) {
                if (scores.total > 0) {
                    pillarBreakdown += `
                        <div class="pillar-result">
                            <span class="pillar-name">${pillarNames[key]}</span>
                            <span class="pillar-score">${scores.correct}/${scores.total}</span>
                        </div>
                    `;
                }
            }
            pillarBreakdown += '</div>';

            quizContainer.innerHTML = `
                <div class="quiz-results">
                    <div class="result-score">${quizScore}/${questions.length}</div>
                    <div class="result-percent">${percent}%</div>
                    <div class="result-level">${level} Level</div>
                    <p class="result-message">${message}</p>
                    ${pillarBreakdown}
                    <div class="result-actions">
                        <button class="btn btn-primary" onclick="location.reload()">Retake Quiz</button>
                        <a href="${recommendedPath}" class="btn btn-secondary">Start Learning</a>
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
