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

    // AI assistant names - permanently displayed in the network
    const AI_NAMES = [
        'ChatGPT',
        'CLAUDE CODE',
        'GEMINI',
        'CURSOR.AI',
        'COPILOT',
        'PERPLEXITY'
    ];

    // Neural Network class - 3D mesh style with glowing nodes
    class NeuralNetwork {
        constructor(canvas, options = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = 0;
            this.height = 0;
            this.nodes = [];
            this.aiTerms = [];
            this.animationId = null;

            // Cluster settings for organic grouping
            this.clusterCount = this.isMobile ? 3 : 5;
            this.clusterSpread = this.isMobile ? 150 : 200;

            // Mobile detection
            this.isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

            // Options - denser mesh for 3D effect
            this.showTerms = options.showTerms !== false;
            this.nodeDensity = this.isMobile ? 0.00012 : (options.nodeDensity || 0.00025);
            this.maxNodes = this.isMobile ? 80 : (options.maxNodes || 200);
            this.minNodes = this.isMobile ? 40 : (options.minNodes || 80);
            // All 6 AI names are always shown
            this.maxConnectionDistance = this.isMobile ? 120 : 180;

            // Data pulses traveling along connections
            this.dataPulses = [];
            this.lastPulseSpawn = 0;
            this.pulseSpawnInterval = this.isMobile ? 800 : 400;
            this.maxPulses = this.isMobile ? 8 : 25;

            // Frame throttling for mobile
            this.lastFrameTime = 0;
            this.targetFrameInterval = this.isMobile ? 33 : 16;

            // Connection cache for performance (avoids O(n²) per frame)
            this.cachedConnections = [];
            this.lastConnectionUpdate = 0;
            this.connectionUpdateInterval = 100; // Update connections every 100ms

            this.init();
        }

        init() {
            this.resize();
            this.setupEventListeners();
            this.animate(0);
        }

        setupEventListeners() {
            this.resizeHandler = () => this.resize();
            window.addEventListener('resize', this.resizeHandler);
            // No mouse/touch interaction - network animates on its own
        }

        resize() {
            this.width = this.canvas.width = this.canvas.offsetWidth;
            this.height = this.canvas.height = this.canvas.offsetHeight;
            this.initNodes();
            this.dataPulses = [];
            this.buildConnections(); // Build connection cache on resize
            if (this.showTerms) this.initTerms();
        }

        // Build connections cache - O(n²) but only runs periodically, not every frame
        buildConnections() {
            this.cachedConnections = [];
            const maxDist = this.maxConnectionDistance;

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const nodeA = this.nodes[i];
                    const nodeB = this.nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const avgZ = (nodeA.z + nodeB.z) / 2;
                        this.cachedConnections.push({
                            i, j, dist, avgZ,
                            // Pre-calculate line properties
                            lineWidth: 0.5 + avgZ * 1.5,
                            baseAlpha: (1 - dist / maxDist) * (0.15 + avgZ * 0.35)
                        });
                    }
                }
            }
        }

        initNodes() {
            this.nodes = [];
            const nodeCount = Math.floor(this.width * this.height * this.nodeDensity);
            const clampedCount = Math.min(Math.max(nodeCount, this.minNodes), this.maxNodes);

            // Create cluster centers spread across the canvas
            const clusters = [];
            for (let i = 0; i < this.clusterCount; i++) {
                clusters.push({
                    x: Math.random() * this.width * 0.8 + this.width * 0.1,
                    y: Math.random() * this.height * 0.8 + this.height * 0.1
                });
            }

            // Distribute nodes - 70% clustered, 30% scattered
            const clusteredCount = Math.floor(clampedCount * 0.7);
            const scatteredCount = clampedCount - clusteredCount;

            // Clustered nodes
            for (let i = 0; i < clusteredCount; i++) {
                const cluster = clusters[Math.floor(Math.random() * clusters.length)];
                // Gaussian-like distribution around cluster center
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * this.clusterSpread * (0.3 + Math.random() * 0.7);
                const x = cluster.x + Math.cos(angle) * radius;
                const y = cluster.y + Math.sin(angle) * radius;
                this.nodes.push(this.createNode(
                    Math.max(20, Math.min(this.width - 20, x)),
                    Math.max(20, Math.min(this.height - 20, y))
                ));
            }

            // Scattered nodes for organic feel
            for (let i = 0; i < scatteredCount; i++) {
                this.nodes.push(this.createNode(
                    Math.random() * (this.width - 40) + 20,
                    Math.random() * (this.height - 40) + 20
                ));
            }

            // Sort by z for depth layering
            this.nodes.sort((a, b) => a.z - b.z);
        }

        createNode(x, y) {
            // z represents depth (0 = far/dim, 1 = close/bright)
            const z = Math.random();
            return {
                x, y, z,
                // Size and brightness based on depth
                size: 1.5 + z * 3, // 1.5-4.5 range
                // Slow, gentle drift velocities
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                // Bright nodes glow orange-yellow, dim nodes are deep red
                glowIntensity: 0.3 + z * 0.7, // 0.3-1.0
                pulseOffset: Math.random() * Math.PI * 2
            };
        }

        initTerms() {
            this.aiTerms = [];
            // Create static labels for all AI names in a grid layout
            const names = AI_NAMES;
            const cols = this.isMobile ? 2 : 3;
            const rows = Math.ceil(names.length / cols);

            // Calculate spacing
            const paddingX = this.width * 0.15;
            const paddingY = this.height * 0.2;
            const spacingX = (this.width - paddingX * 2) / (cols - 1 || 1);
            const spacingY = (this.height - paddingY * 2) / (rows - 1 || 1);

            names.forEach((name, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                this.aiTerms.push({
                    text: name,
                    x: paddingX + col * spacingX,
                    y: paddingY + row * spacingY,
                    fontSize: this.isMobile ? 12 : 14,
                    pulseOffset: i * 0.5 // Stagger the pulse animation
                });
            });
        }

        updateNode(node, time) {
            // Slow organic drift - no mouse interaction
            node.x += node.vx;
            node.y += node.vy;

            // Gentle boundary handling - soft bounce
            const margin = 20;
            if (node.x < margin) {
                node.x = margin;
                node.vx *= -1;
            } else if (node.x > this.width - margin) {
                node.x = this.width - margin;
                node.vx *= -1;
            }
            if (node.y < margin) {
                node.y = margin;
                node.vy *= -1;
            } else if (node.y > this.height - margin) {
                node.y = this.height - margin;
                node.vy *= -1;
            }
        }

        drawNode(node, time) {
            // Pulsing glow based on depth
            const pulse = Math.sin(time * 0.003 + node.pulseOffset) * 0.15 + 0.85;
            const intensity = node.glowIntensity * pulse;

            // Simplified glow using concentric circles instead of expensive gradients
            // Skip glow entirely on mobile for far nodes (performance)
            if (!this.isMobile || node.z > 0.5) {
                const glowSize = node.size * (3 + node.z * 2);

                // Outer glow layer (most diffuse) - deep red
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
                if (node.z > 0.6) {
                    this.ctx.fillStyle = `rgba(230, 57, 70, ${intensity * 0.08})`;
                } else {
                    this.ctx.fillStyle = `rgba(150, 40, 50, ${intensity * 0.05})`;
                }
                this.ctx.fill();

                // Middle glow layer - pure red
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, glowSize * 0.5, 0, Math.PI * 2);
                if (node.z > 0.6) {
                    this.ctx.fillStyle = `rgba(255, 70, 70, ${intensity * 0.2})`;
                } else if (node.z > 0.3) {
                    this.ctx.fillStyle = `rgba(230, 57, 70, ${intensity * 0.15})`;
                } else {
                    this.ctx.fillStyle = `rgba(180, 50, 50, ${intensity * 0.1})`;
                }
                this.ctx.fill();

                // Inner glow layer (bright nodes only) - bright red/pink
                if (node.z > 0.5) {
                    this.ctx.beginPath();
                    this.ctx.arc(node.x, node.y, glowSize * 0.25, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 100, 100, ${intensity * 0.4})`;
                    this.ctx.fill();
                }
            }

            // Core of the node (bright center) - white/pink
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.size * 0.5, 0, Math.PI * 2);
            if (node.z > 0.6) {
                this.ctx.fillStyle = `rgba(255, 220, 220, ${intensity})`;
            } else {
                this.ctx.fillStyle = `rgba(255, 150, 150, ${intensity * 0.8})`;
            }
            this.ctx.fill();
        }

        updateTerm(term, time) {
            // Static labels - no movement, just subtle pulse animation
        }

        drawTerm(term, time) {
            // Subtle pulse effect for visual interest
            const pulse = Math.sin(time * 0.002 + term.pulseOffset) * 0.1 + 0.9;
            const brightness = 0.6 * pulse;

            this.ctx.save();
            this.ctx.font = `bold ${term.fontSize}px monospace`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Draw glow/background for readability
            if (!this.isMobile) {
                this.ctx.shadowColor = `rgba(230, 57, 70, ${brightness * 0.8})`;
                this.ctx.shadowBlur = 12;
            }

            // Main text - bright red
            this.ctx.fillStyle = `rgba(230, 57, 70, ${brightness})`;
            this.ctx.fillText(term.text, term.x, term.y);

            // Second pass for brighter center (no shadow)
            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = `rgba(255, 100, 100, ${brightness * 0.5})`;
            this.ctx.fillText(term.text, term.x, term.y);

            this.ctx.restore();
        }

        drawConnections(time) {
            // Periodically rebuild connections to account for node movement
            if (time - this.lastConnectionUpdate > this.connectionUpdateInterval) {
                this.buildConnections();
                this.lastConnectionUpdate = time;
            }

            this.ctx.lineCap = 'round';

            // Use cached connections - much faster than O(n²) every frame
            for (const conn of this.cachedConnections) {
                const nodeA = this.nodes[conn.i];
                const nodeB = this.nodes[conn.j];

                // Subtle pulse animation
                const pulse = Math.sin(time * 0.001 + conn.i * 0.05) * 0.1 + 0.9;
                const alpha = conn.baseAlpha * pulse;

                this.ctx.beginPath();
                this.ctx.moveTo(nodeA.x, nodeA.y);
                this.ctx.lineTo(nodeB.x, nodeB.y);

                // Color based on depth (pre-calculated avgZ)
                if (conn.avgZ > 0.6) {
                    this.ctx.strokeStyle = `rgba(200, 80, 70, ${alpha})`;
                } else if (conn.avgZ > 0.3) {
                    this.ctx.strokeStyle = `rgba(180, 60, 60, ${alpha})`;
                } else {
                    this.ctx.strokeStyle = `rgba(140, 50, 55, ${alpha})`;
                }

                this.ctx.lineWidth = conn.lineWidth;
                this.ctx.stroke();
            }
        }

        // Data pulses traveling along connections - uses cached connections
        spawnDataPulse(time) {
            if (time - this.lastPulseSpawn < this.pulseSpawnInterval) return;
            if (this.dataPulses.length >= this.maxPulses) return;
            if (this.cachedConnections.length === 0) return;

            // Use cached connections instead of recalculating O(n²)
            const conn = this.cachedConnections[Math.floor(Math.random() * this.cachedConnections.length)];
            const reverse = Math.random() > 0.5;

            this.dataPulses.push({
                startIdx: reverse ? conn.j : conn.i,
                endIdx: reverse ? conn.i : conn.j,
                progress: 0,
                speed: 0.008 + Math.random() * 0.012,
                size: 1.5 + conn.avgZ * 2,
                brightness: 0.6 + conn.avgZ * 0.4,
                z: conn.avgZ
            });

            this.lastPulseSpawn = time;
        }

        updateDataPulses() {
            this.dataPulses = this.dataPulses.filter(pulse => {
                pulse.progress += pulse.speed;

                if (pulse.progress >= 1) {
                    // Chain to next connection
                    if (Math.random() < (this.isMobile ? 0.3 : 0.5)) {
                        const endNode = this.nodes[pulse.endIdx];
                        // Null safety check
                        if (!endNode) return false;

                        // Use cached connections for chaining instead of O(n) loop
                        const nextConnections = this.cachedConnections.filter(conn =>
                            (conn.i === pulse.endIdx || conn.j === pulse.endIdx) &&
                            conn.i !== pulse.startIdx && conn.j !== pulse.startIdx
                        );

                        if (nextConnections.length > 0) {
                            const nextConn = nextConnections[Math.floor(Math.random() * nextConnections.length)];
                            const nextIdx = nextConn.i === pulse.endIdx ? nextConn.j : nextConn.i;

                            this.dataPulses.push({
                                startIdx: pulse.endIdx,
                                endIdx: nextIdx,
                                progress: 0,
                                speed: pulse.speed,
                                size: pulse.size * 0.95,
                                brightness: pulse.brightness * 0.9,
                                z: nextConn.avgZ
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
                const startNode = this.nodes[pulse.startIdx];
                const endNode = this.nodes[pulse.endIdx];

                const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
                const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;

                // Trail - red/pink
                const trailSteps = this.isMobile ? 3 : 6;
                for (let t = trailSteps; t >= 0; t--) {
                    const trailProg = pulse.progress - (0.15 * t / trailSteps);
                    if (trailProg < 0) continue;

                    const tx = startNode.x + (endNode.x - startNode.x) * trailProg;
                    const ty = startNode.y + (endNode.y - startNode.y) * trailProg;
                    const trailAlpha = (1 - t / trailSteps) * pulse.brightness * 0.5;

                    this.ctx.beginPath();
                    this.ctx.arc(tx, ty, pulse.size * 0.6, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 150, 150, ${trailAlpha})`;
                    this.ctx.fill();
                }

                // Glow - red
                if (!this.isMobile) {
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, pulse.size * 2.5, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 80, 80, ${pulse.brightness * 0.3})`;
                    this.ctx.fill();
                }

                // Core - bright white/pink
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 240, 240, ${pulse.brightness})`;
                this.ctx.fill();
            });
        }

        animate(time) {
            const elapsed = time - this.lastFrameTime;
            if (elapsed < this.targetFrameInterval) {
                this.animationId = requestAnimationFrame((t) => this.animate(t));
                return;
            }
            this.lastFrameTime = time;

            this.ctx.clearRect(0, 0, this.width, this.height);

            // Layer 1: Connections (behind everything)
            this.drawConnections(time);

            // Layer 2: Data pulses
            this.spawnDataPulse(time);
            this.updateDataPulses();
            this.drawDataPulses();

            // Layer 3: Nodes (sorted by z, far to near)
            this.nodes.forEach(node => {
                this.updateNode(node, time);
                this.drawNode(node, time);
            });

            // Layer 4: AI Labels (topmost) - static permanent labels
            if (this.showTerms) {
                this.aiTerms.forEach(term => {
                    this.updateTerm(term, time);
                    this.drawTerm(term, time);
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

    // Main hero canvas - self-animating neural network with static AI labels
    const mainCanvas = document.getElementById('neural-network');
    if (mainCanvas) {
        neuralNetworks.push(new NeuralNetwork(mainCanvas, {
            showTerms: true
        }));
    }

    // Secondary canvases (CTA cards, footer - lighter version)
    // Skip on mobile for better performance
    const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
    if (!isMobileDevice) {
        document.querySelectorAll('.neural-canvas-secondary').forEach(canvas => {
            neuralNetworks.push(new NeuralNetwork(canvas, {
                showTerms: false,
                nodeDensity: 0.00015,
                maxNodes: 80,
                minNodes: 30
            }));
        });
    }

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

    // Framework definitions with detection patterns
    const FRAMEWORKS = {
        CRISP: {
            name: 'CRISP',
            elements: {
                C: {
                    name: 'Context',
                    patterns: [
                        /\b(background|context|situation)\s*:/i,
                        /\b(launching|working on|building|creating|developing)\b/i,
                        /\b(our|my|the)\s+(brand|product|company|business|project|team)\b/i,
                        /\b(currently|because|since|given that)\b/i
                    ],
                    tip: 'Set the scene: "I\'m planning a family vacation to Italy..."',
                    example: 'I\'m planning a week-long family vacation to Italy with two teenagers.'
                },
                R: {
                    name: 'Role',
                    patterns: [
                        /\b(act as|you are|pretend to be|imagine you('re| are)|behave as)\b/i,
                        /\b(role|persona|expert|specialist|consultant|advisor)\s*:/i,
                        /\b(as (a|an) (senior|expert|professional|experienced))\b/i
                    ],
                    tip: 'Define the AI persona: "Act as an experienced travel agent..."',
                    example: 'Act as an experienced travel agent who specializes in family trips.'
                },
                I: {
                    name: 'Instructions',
                    patterns: [
                        /^(write|create|generate|explain|analyze|summarize|list|describe|compare|design|draft|develop|build|make)/im,
                        /\b(I need|I want|please|can you|could you|would you)\b/i,
                        /\b(include|ensure|make sure|cover|address)\b/i,
                        /\b(step\s*\d|first|second|then|next|finally)\b/i
                    ],
                    tip: 'Clearly state what you want done with examples if helpful',
                    example: 'Create a 7-day itinerary covering Rome and Florence with family-friendly activities.'
                },
                S: {
                    name: 'Specifics',
                    patterns: [
                        /\b(\d+)\s*(words?|sentences?|paragraphs?|bullet\s*points?|items?)\b/i,
                        /\b(format|output|structure)\s*(as|:)/i,
                        /\b(tone|voice|style)\s*:/i,
                        /\b(formal|casual|professional|friendly|urgent|persuasive)\b/i,
                        /\b(JSON|markdown|bullet|table|list)\b/i
                    ],
                    tip: 'Define format, length, tone: "Write 3 bullet points under 50 words"',
                    example: 'Write 3 bullet points, under 50 words each, in an urgent tone.'
                },
                P: {
                    name: 'Parameters',
                    patterns: [
                        /\b(don't|do not|avoid|exclude|without|never)\b/i,
                        /\b(must|should|shall|need to|required|important)\b/i,
                        /\b(maximum|minimum|at least|no more than|limit)\b/i,
                        /\b(include|use|add)\s+(\d+|three|two|five)\s+(hashtag|emoji|link)/i
                    ],
                    tip: 'Set constraints and what to avoid: "Include 3 hashtags. Avoid jargon."',
                    example: 'Include three hashtags. Avoid industry jargon. Keep it actionable.'
                }
            }
        },
        COSTAR: {
            name: 'COSTAR',
            elements: {
                C: {
                    name: 'Context',
                    patterns: [
                        /\b(background|context|situation)\s*:/i,
                        /\b(I am a|I'm a|as a|my role|I work)\b/i,
                        /\b(currently|working on|project|because|since)\b/i
                    ],
                    tip: 'Add background: "Context: I\'m a [role] working on [project]..."',
                    example: 'Context: I run a small e-commerce store selling handmade jewelry.'
                },
                O: {
                    name: 'Objective',
                    patterns: [
                        /\b(objective|goal|aim|purpose)\s*:/i,
                        /\b(goal is|objective is|aim to|purpose is|in order to|so that)\b/i,
                        /\b(I want to|we want to|trying to|hoping to|intend to|outcome|achieve|accomplish)\b/i
                    ],
                    tip: 'State your goal: "My objective is to..." or "I want to achieve..."',
                    example: 'My goal is to increase product page conversions by 15%.'
                },
                S: {
                    name: 'Style',
                    patterns: [
                        /\b(tone|voice|style)\s*:/i,
                        /\b(formal|casual|professional|friendly|technical|conversational)\b/i,
                        /\b(write (as|like|in)|in the style of|sound like)\b/i
                    ],
                    tip: 'Specify tone: "Use a professional/casual/friendly tone"',
                    example: 'Use a warm, conversational tone appropriate for Instagram.'
                },
                T: {
                    name: 'Tone',
                    patterns: [
                        /\b(tone)\s*:/i,
                        /\b(warm|cold|neutral|optimistic|pessimistic|urgent|relaxed)\b/i,
                        /\b(enthusiastic|reserved|confident|humble|empathetic|authoritative)\b/i,
                        /\b(serious|playful|inspiring|reassuring)\b/i
                    ],
                    tip: 'Define emotional quality: "Keep a confident but approachable tone"',
                    example: 'Keep a confident but not arrogant tone.'
                },
                A: {
                    name: 'Audience',
                    patterns: [
                        /\b(audience|reader|target)\s*:/i,
                        /\b(for (a|my|our|the)|targeted at|aimed at|intended for|targeting)\b/i,
                        /\b(beginners?|experts?|professionals?|executives?|children|students?|developers?|managers?)\b/i,
                        /\bwho (are|have|need|want)\b/i
                    ],
                    tip: 'Specify who: "For beginners with no experience" or "Targeting executives"',
                    example: 'Targeting young professionals aged 25-35 with disposable income.'
                },
                R: {
                    name: 'Response',
                    patterns: [
                        /\b(response|output|format|deliver)\s*:/i,
                        /\b(as a|in (a|the) form of|formatted as|structure as)\b/i,
                        /\b(email|article|report|summary|outline|script|code|list|table)\b/i,
                        /\b(return|provide|give me|deliver)\b.*\b(as|in)\b/i
                    ],
                    tip: 'Define output: "Format as a bulleted list" or "Return as JSON"',
                    example: 'Format as: headline, 2-sentence description, 3 bullet points.'
                }
            }
        },
        CRISPE: {
            name: 'CRISPE',
            elements: {
                C: {
                    name: 'Context',
                    patterns: [
                        /\b(background|context|situation)\s*:/i,
                        /\b(I am a|I'm a|as a|my role|I work)\b/i,
                        /\b(currently|working on|project|because|since)\b/i
                    ],
                    tip: 'Add background: "Context: I\'m planning a family trip to..."',
                    example: 'Context: I\'m planning a week-long family vacation to Italy with two teenagers.'
                },
                R: {
                    name: 'Role',
                    patterns: [
                        /\b(act as|you are|pretend to be|imagine you('re| are)|behave as)\b/i,
                        /\b(role|persona|character|expert|specialist)\s*:/i,
                        /\b(as (a|an) (expert|professional|specialist|consultant|advisor))\b/i
                    ],
                    tip: 'Assign a persona: "Act as an experienced travel planner..."',
                    example: 'Act as an experienced travel agent who specializes in family trips.'
                },
                I: {
                    name: 'Instruction',
                    patterns: [
                        /\b(include|ensure|make sure|cover|address)\b/i,
                        /\b(don't|do not|avoid|exclude|without)\b/i,
                        /\b(must|should|shall|need to|required|important)\b/i,
                        /\b(step\s*\d|first|second|then|next|finally)\b/i,
                        /(\d+\.\s|\*\s|-\s)/m
                    ],
                    tip: 'Add what to include/exclude: "Include X. Avoid Y."',
                    example: 'Include: kid-friendly activities, local restaurants, travel times. Avoid: overly touristy traps.'
                },
                S: {
                    name: 'Specifics',
                    patterns: [
                        /\b(\d+)\s*(words?|sentences?|paragraphs?|bullet\s*points?|items?)\b/i,
                        /\b(format|output|structure)\s*(as|:)/i,
                        /\b(tone|voice|style)\s*:/i,
                        /\b(formal|casual|professional|friendly|urgent|persuasive)\b/i,
                        /\b(JSON|markdown|bullet|table|list)\b/i
                    ],
                    tip: 'Define format, length, tone: "Write 3 bullet points under 50 words"',
                    example: 'Write 3 bullet points, under 50 words each, in an urgent tone.'
                },
                P: {
                    name: 'Parameters',
                    patterns: [
                        /\b(don't|do not|avoid|exclude|without|never)\b/i,
                        /\b(must|should|shall|need to|required|important)\b/i,
                        /\b(maximum|minimum|at least|no more than|limit)\b/i,
                        /\b(include|use|add)\s+(\d+|three|two|five)\s+(hashtag|emoji|link)/i
                    ],
                    tip: 'Set constraints and what to avoid: "Include 3 hashtags. Avoid jargon."',
                    example: 'Include three hashtags. Avoid industry jargon. Keep it actionable.'
                },
                E: {
                    name: 'Example',
                    patterns: [
                        /\b(example|for instance|such as|like this|similar to|e\.g\.|sample)\s*:/i,
                        /\b(here is|here's|below is|following is)\s*(an? )?(example|sample)/i,
                        /[""][^""]{10,}[""]/, // Quoted text as example
                        /\b(input|output)\s*:/i
                    ],
                    tip: 'Provide a sample: "Example: [show what you want]"',
                    example: 'Example output: "Day 1 - Rome: Start your morning at the Colosseum (arrive by 9am)..."'
                }
            }
        }
    };

    // Guided mode question definitions for each methodology
    const GUIDED_QUESTIONS = {
        CRISP: [
            { key: 'context', letter: 'C', label: 'Set the scene - what\'s the background?', placeholder: 'e.g., I\'m planning a family vacation to Italy with two teenagers...' },
            { key: 'role', letter: 'R', label: 'What role should the AI adopt?', placeholder: 'e.g., Act as an experienced travel agent specializing in family trips...', fullWidth: true },
            { key: 'instructions', letter: 'I', label: 'What do you want done? (the task)', placeholder: 'e.g., Create a 7-day itinerary covering Rome and Florence...' },
            { key: 'specifics', letter: 'S', label: 'Format, length, tone? (specifics)', placeholder: 'e.g., Day-by-day format, friendly tone, include estimated costs...' },
            { key: 'parameters', letter: 'P', label: 'Constraints and what to avoid?', placeholder: 'e.g., Budget of $5,000. No more than 2 museums per day...' }
        ],
        COSTAR: [
            { key: 'context', letter: 'C', label: 'What background info does the AI need?', placeholder: 'e.g., I\'m hosting a neighborhood potluck for 20 people...' },
            { key: 'objective', letter: 'O', label: 'What is your goal?', placeholder: 'e.g., Create a warm invitation that gets people excited to attend...', fullWidth: true },
            { key: 'style', letter: 'S', label: 'What writing style?', placeholder: 'e.g., Friendly, welcoming, like talking to a good neighbor...' },
            { key: 'tone', letter: 'T', label: 'What emotional tone?', placeholder: 'e.g., Enthusiastic, warm, community-focused...' },
            { key: 'audience', letter: 'A', label: 'Who is the audience?', placeholder: 'e.g., Neighbors of all ages, families with kids, elderly residents...' },
            { key: 'response', letter: 'R', label: 'What output format?', placeholder: 'e.g., Short invitation (100-150 words) for a printed flyer...' }
        ],
        CRISPE: [
            { key: 'context', letter: 'C', label: 'Set the scene - what\'s the background?', placeholder: 'e.g., I\'m a busy parent with two kids who wants to eat healthier...' },
            { key: 'role', letter: 'R', label: 'What role should the AI adopt?', placeholder: 'e.g., Act as a family nutritionist who helps picky eaters...', fullWidth: true },
            { key: 'instruction', letter: 'I', label: 'What do you want done? (the task)', placeholder: 'e.g., Create a 5-day weeknight dinner plan with kid-friendly recipes...' },
            { key: 'specifics', letter: 'S', label: 'Format, length, tone? (specifics)', placeholder: 'e.g., Friendly tone, include prep time, common grocery ingredients...' },
            { key: 'parameters', letter: 'P', label: 'Constraints and what to avoid?', placeholder: 'e.g., Under 45 minutes per meal. No seafood (allergies)...' },
            { key: 'example', letter: 'E', label: 'Example of desired output? (optional)', placeholder: 'e.g., Format like: "Monday: Veggie Tacos - Prep: 15 min - Hidden veggies: peppers"', optional: true }
        ]
    };

    // Scorer state management
    const ScorerState = {
        mode: 'standard',
        guidedMethodology: 'CRISP',
        guidedAnswers: {},
        lastAnalysis: null,
        selectedFramework: 'CRISP'
    };

    // Detect framework elements in a prompt
    function detectFrameworkElements(prompt) {
        const results = {};

        for (const [frameworkKey, framework] of Object.entries(FRAMEWORKS)) {
            results[frameworkKey] = {
                name: framework.name,
                detected: {},
                coverage: 0,
                total: Object.keys(framework.elements).length
            };

            for (const [letter, element] of Object.entries(framework.elements)) {
                const matchCount = element.patterns.filter(p => p.test(prompt)).length;
                const found = matchCount > 0;
                const confidence = matchCount / element.patterns.length;

                results[frameworkKey].detected[letter] = {
                    name: element.name,
                    found,
                    confidence,
                    tip: element.tip,
                    example: element.example
                };

                if (found) {
                    results[frameworkKey].coverage++;
                }
            }

            results[frameworkKey].percentage = Math.round(
                (results[frameworkKey].coverage / results[frameworkKey].total) * 100
            );
        }

        return results;
    }

    // Calculate scores based on framework detection
    function analyzePrompt(prompt) {
        const frameworkResults = detectFrameworkElements(prompt);

        // Find best matching framework
        const bestFramework = Object.entries(frameworkResults)
            .sort((a, b) => b[1].percentage - a[1].percentage)[0];

        const frameworkScore = bestFramework[1].percentage;

        // Sentence quality scoring
        const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = prompt.split(/\s+/).filter(w => w.length > 0);
        const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : words.length;

        // Ideal: 8-25 words per sentence
        let sentenceQuality;
        if (avgWordsPerSentence >= 8 && avgWordsPerSentence <= 25) {
            sentenceQuality = 100;
        } else if (avgWordsPerSentence >= 5 && avgWordsPerSentence <= 35) {
            sentenceQuality = 70;
        } else {
            sentenceQuality = 40;
        }

        // Intent clarity: based on clear request language (not labels)
        const hasActionVerb = /^(write|create|generate|explain|analyze|summarize|list|describe|compare|design|draft|help|act|you are|i need|i want|please|can you|could you)/im.test(prompt.trim());
        const hasClearRequest = /\b(write|create|generate|explain|analyze|summarize|list|describe|compare|design|draft|make|build|develop|produce|give me|provide|help me)\b/i.test(prompt);
        const intentClarity = (hasActionVerb ? 60 : 0) + (hasClearRequest ? 40 : 20);

        // Combined scoring: 50% framework, 25% sentence quality, 25% intent
        const overall = Math.round(frameworkScore * 0.5 + sentenceQuality * 0.25 + intentClarity * 0.25);

        // Generate feedback based on detected elements
        const feedback = generateFrameworkFeedback(bestFramework, frameworkResults);

        return {
            overall,
            frameworkCoverage: frameworkScore,
            sentenceQuality: Math.round(sentenceQuality),
            intentClarity: Math.round(intentClarity),
            bestFramework: bestFramework[0],
            frameworkResults,
            feedback
        };
    }

    // Generate feedback based on framework elements
    function generateFrameworkFeedback(bestFramework, allResults) {
        const improvements = [];
        const strengths = [];
        const frameworkName = bestFramework[0];
        const elements = bestFramework[1].detected;

        // Categorize found and missing elements
        for (const [letter, element] of Object.entries(elements)) {
            if (element.found) {
                if (element.confidence >= 0.5) {
                    strengths.push({
                        element: letter,
                        name: element.name,
                        text: `Strong ${element.name} - clearly defined`
                    });
                } else {
                    strengths.push({
                        element: letter,
                        name: element.name,
                        text: `${element.name} detected - could be more explicit`
                    });
                }
            } else {
                improvements.push({
                    element: letter,
                    name: element.name,
                    text: `Add ${element.name}`,
                    tip: element.tip,
                    example: element.example
                });
            }
        }

        // Sort improvements by importance (core elements first)
        const coreElements = ['R', 'C', 'I', 'O']; // Request/Role, Context, Instructions/Instruction, Objective
        improvements.sort((a, b) => {
            const aCore = coreElements.includes(a.element) ? 0 : 1;
            const bCore = coreElements.includes(b.element) ? 0 : 1;
            return aCore - bCore;
        });

        return { improvements, strengths, frameworkName };
    }

    // Display scores with framework elements
    function displayScores(scores) {
        const { improvements, strengths, frameworkName } = scores.feedback;

        // Store for framework switching
        ScorerState.lastAnalysis = scores.frameworkResults;

        // Framework elements HTML
        const frameworkElementsHTML = generateFrameworkElementsHTML(scores.frameworkResults, ScorerState.selectedFramework);

        // Strengths HTML
        let strengthsHTML = '';
        if (strengths.length > 0) {
            strengthsHTML = `
                <div class="feedback-section feedback-strengths">
                    <h4>What You Did Well</h4>
                    <ul class="feedback-list">
                        ${strengths.map(s => `
                            <li>
                                <span class="element-badge element-badge-success">${s.element}</span>
                                <span class="feedback-text">${s.text}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        // Improvements HTML
        let improvementsHTML = '';
        if (improvements.length > 0) {
            improvementsHTML = `
                <div class="feedback-section feedback-improvements">
                    <h4>How to Improve</h4>
                    <div class="feedback-cards">
                        ${improvements.slice(0, 4).map(i => `
                            <div class="feedback-card">
                                <div class="feedback-card-header">
                                    <span class="element-badge">${i.element}</span>
                                    <span class="feedback-category">${i.name}</span>
                                </div>
                                <p class="feedback-tip">${i.tip}</p>
                                <p class="feedback-example"><strong>Example:</strong> ${i.example}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Overall message
        let overallMessage = '';
        if (scores.overall >= 80) {
            overallMessage = '<p class="score-message score-message-great">Excellent prompt structure! You\'ve covered the key elements.</p>';
        } else if (scores.overall >= 60) {
            overallMessage = '<p class="score-message score-message-good">Good foundation! Adding a few more elements will strengthen your prompt.</p>';
        } else if (scores.overall >= 40) {
            overallMessage = '<p class="score-message score-message-fair">Your prompt has some elements but is missing key components.</p>';
        } else {
            overallMessage = '<p class="score-message score-message-poor">Your prompt needs more structure. Try adding the suggested elements below.</p>';
        }

        scoreDisplay.innerHTML = `
            <div class="score-main">
                <div class="score-circle ${getScoreClass(scores.overall)}">
                    <span class="score-value">${scores.overall}</span>
                    <span class="score-label">Overall</span>
                </div>
                ${overallMessage}
            </div>

            ${frameworkElementsHTML}

            <div class="sub-scores">
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.frameworkCoverage)}" style="width: ${scores.frameworkCoverage}%"></div>
                    </div>
                    <span class="sub-score-label">Framework Coverage</span>
                    <span class="sub-score-value">${scores.frameworkCoverage}%</span>
                </div>
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.sentenceQuality)}" style="width: ${scores.sentenceQuality}%"></div>
                    </div>
                    <span class="sub-score-label">Sentence Quality</span>
                    <span class="sub-score-value">${scores.sentenceQuality}%</span>
                </div>
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.intentClarity)}" style="width: ${scores.intentClarity}%"></div>
                    </div>
                    <span class="sub-score-label">Intent Clarity</span>
                    <span class="sub-score-value">${scores.intentClarity}%</span>
                </div>
            </div>
            ${strengthsHTML}
            ${improvementsHTML}
            <div class="feedback-cta">
                <p>Want to learn more about these frameworks?</p>
                <div class="feedback-cta-links">
                    <a href="../learn/crisp.html" class="btn btn-outline btn-sm">CRISP Method</a>
                    <a href="../learn/costar.html" class="btn btn-outline btn-sm">COSTAR Method</a>
                    <a href="../learn/crispe.html" class="btn btn-outline btn-sm">CRISPE Method</a>
                </div>
            </div>
        `;
        scoreDisplay.classList.add('visible');

        // Initialize framework tabs
        initFrameworkTabs();
    }

    // Generate framework elements display HTML
    function generateFrameworkElementsHTML(frameworkResults, selectedFramework) {
        const framework = frameworkResults[selectedFramework];
        if (!framework) return '';

        const elementsHTML = Object.entries(framework.detected).map(([letter, element]) => {
            const statusClass = element.found ? 'detected' : 'missing';
            const icon = element.found
                ? '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>'
                : '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

            return `
                <div class="element-pill ${statusClass}" title="${element.found ? 'Detected' : element.tip}">
                    <span class="element-letter">${letter}</span>
                    <span class="element-name">${element.name}</span>
                    ${icon}
                </div>
            `;
        }).join('');

        return `
            <div class="framework-elements" id="framework-elements">
                <h4>Detected Framework Elements</h4>
                <div class="framework-selector">
                    <button type="button" class="framework-tab ${selectedFramework === 'CRISP' ? 'active' : ''}" data-framework="CRISP">CRISP</button>
                    <button type="button" class="framework-tab ${selectedFramework === 'COSTAR' ? 'active' : ''}" data-framework="COSTAR">COSTAR</button>
                    <button type="button" class="framework-tab ${selectedFramework === 'CRISPE' ? 'active' : ''}" data-framework="CRISPE">CRISPE</button>
                </div>
                <div class="elements-display" id="elements-display">
                    ${elementsHTML}
                </div>
                <p class="framework-coverage">${framework.coverage}/${framework.total} elements detected</p>
            </div>
        `;
    }

    // Initialize framework tab switching
    function initFrameworkTabs() {
        const tabs = document.querySelectorAll('.framework-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const framework = tab.dataset.framework;
                ScorerState.selectedFramework = framework;

                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update elements display
                if (ScorerState.lastAnalysis) {
                    updateFrameworkElements(ScorerState.lastAnalysis, framework);
                }
            });
        });
    }

    // Update framework elements display
    function updateFrameworkElements(frameworkResults, selectedFramework) {
        const container = document.getElementById('elements-display');
        const framework = frameworkResults[selectedFramework];
        if (!container || !framework) return;

        const elementsHTML = Object.entries(framework.detected).map(([letter, element]) => {
            const statusClass = element.found ? 'detected' : 'missing';
            const icon = element.found
                ? '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>'
                : '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

            return `
                <div class="element-pill ${statusClass}" title="${element.found ? 'Detected' : element.tip}">
                    <span class="element-letter">${letter}</span>
                    <span class="element-name">${element.name}</span>
                    ${icon}
                </div>
            `;
        }).join('');

        container.innerHTML = elementsHTML;

        // Update coverage text
        const coverageText = document.querySelector('.framework-coverage');
        if (coverageText) {
            coverageText.textContent = `${framework.coverage}/${framework.total} elements detected`;
        }
    }

    // Guided mode functions
    function toggleGuidedMode(enabled) {
        const guidedToggle = document.getElementById('guided-mode-toggle');
        const guidedPanel = document.getElementById('guided-mode-panel');
        const promptInput = document.getElementById('prompt-input');
        const inputLabel = document.querySelector('label[for="prompt-input"]');

        if (!guidedToggle || !guidedPanel) return;

        ScorerState.mode = enabled ? 'guided' : 'standard';
        guidedToggle.setAttribute('aria-pressed', enabled);

        const toggleText = guidedToggle.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = enabled ? 'Switch to free-form mode' : 'Help me build this prompt';
        }

        if (enabled) {
            guidedPanel.hidden = false;
            if (inputLabel) inputLabel.textContent = 'Combined prompt (editable):';
            if (promptInput) promptInput.placeholder = 'Your combined prompt will appear here. You can edit it before analyzing.';
        } else {
            guidedPanel.hidden = true;
            if (inputLabel) inputLabel.textContent = 'Enter your prompt:';
            if (promptInput) promptInput.placeholder = 'Paste or type your prompt here...';
        }

        localStorage.setItem('scorer-mode', ScorerState.mode);
    }

    // Render guided questions for selected methodology
    function renderGuidedQuestions(methodology) {
        const container = document.getElementById('guided-questions');
        if (!container) return;

        const questions = GUIDED_QUESTIONS[methodology];
        if (!questions) return;

        // Clear current answers when switching methodology
        ScorerState.guidedAnswers = {};

        let html = '';
        questions.forEach(q => {
            const fullWidthClass = q.fullWidth ? ' data-fullwidth="true"' : '';
            const optionalClass = q.optional ? ' guided-letter-optional' : '';
            html += `
                <div class="guided-question" data-element="${q.key}"${fullWidthClass}>
                    <label for="guided-${q.key}" class="guided-label">
                        <span class="guided-letter${optionalClass}">${q.letter}</span>
                        ${q.label}${q.optional ? ' (optional)' : ''}
                    </label>
                    <textarea id="guided-${q.key}" class="guided-input"
                        placeholder="${q.placeholder}" rows="2"></textarea>
                </div>
            `;
        });

        container.innerHTML = html;

        // Reattach input listeners
        container.querySelectorAll('.guided-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const element = e.target.closest('.guided-question')?.dataset.element;
                if (element) {
                    ScorerState.guidedAnswers[element] = e.target.value;
                }
            });
        });
    }

    function combineGuidedAnswers() {
        const promptInput = document.getElementById('prompt-input');
        if (!promptInput) return;

        const methodology = ScorerState.guidedMethodology;
        const answers = ScorerState.guidedAnswers;
        const questions = GUIDED_QUESTIONS[methodology];

        // Build combined prompt naturally without labels
        let parts = [];

        // Order and combine based on methodology
        if (methodology === 'CRISP') {
            if (answers.role?.trim()) parts.push(`Act as ${answers.role.trim()}.`);
            if (answers.context?.trim()) parts.push(answers.context.trim());
            if (answers.instructions?.trim()) parts.push(answers.instructions.trim());
            if (answers.specifics?.trim()) parts.push(answers.specifics.trim());
            if (answers.parameters?.trim()) parts.push(answers.parameters.trim());
        } else if (methodology === 'COSTAR') {
            if (answers.context?.trim()) parts.push(answers.context.trim());
            if (answers.objective?.trim()) parts.push(`My goal is to ${answers.objective.trim()}.`);
            if (answers.audience?.trim()) parts.push(`This is for ${answers.audience.trim()}.`);
            if (answers.style?.trim() || answers.tone?.trim()) {
                const styleText = [answers.style?.trim(), answers.tone?.trim()].filter(Boolean).join(', ');
                parts.push(`Use a ${styleText} tone.`);
            }
            if (answers.response?.trim()) parts.push(`Format as ${answers.response.trim()}.`);
        } else if (methodology === 'CRISPE') {
            if (answers.role?.trim()) parts.push(`Act as ${answers.role.trim()}.`);
            if (answers.context?.trim()) parts.push(answers.context.trim());
            if (answers.instruction?.trim()) parts.push(answers.instruction.trim());
            if (answers.specifics?.trim()) parts.push(answers.specifics.trim());
            if (answers.parameters?.trim()) parts.push(answers.parameters.trim());
            if (answers.example?.trim()) parts.push(`Example: ${answers.example.trim()}`);
        }

        const combined = parts.join('\n\n');
        promptInput.value = combined;
        promptInput.focus();

        if (combined.trim()) {
            showToast('Prompt combined! Edit if needed, then click Analyze.', 'success');
        } else {
            showToast('Please fill in at least one field.', 'error');
        }
    }

    // Initialize scorer enhancements
    function initScorerEnhancements() {
        const guidedToggle = document.getElementById('guided-mode-toggle');
        const combineBtn = document.getElementById('combine-prompt-btn');
        const methodologyBtns = document.querySelectorAll('.methodology-btn');

        // Load saved mode preference
        const savedMode = localStorage.getItem('scorer-mode');
        const savedMethodology = localStorage.getItem('scorer-methodology') || 'CRISP';

        ScorerState.guidedMethodology = savedMethodology;

        // Render initial questions
        renderGuidedQuestions(savedMethodology);

        // Update active methodology button
        methodologyBtns.forEach(btn => {
            if (btn.dataset.method === savedMethodology) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (savedMode === 'guided') {
            toggleGuidedMode(true);
        }

        // Toggle button
        if (guidedToggle) {
            guidedToggle.addEventListener('click', () => {
                const newState = ScorerState.mode === 'standard';
                toggleGuidedMode(newState);
            });
        }

        // Methodology selector buttons
        methodologyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const method = btn.dataset.method;
                ScorerState.guidedMethodology = method;
                localStorage.setItem('scorer-methodology', method);

                // Update active state
                methodologyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Re-render questions
                renderGuidedQuestions(method);
            });
        });

        // Combine button
        if (combineBtn) {
            combineBtn.addEventListener('click', combineGuidedAnswers);
        }
    }

    // Initialize scorer
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

        // Initialize guided mode enhancements
        initScorerEnhancements();
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
