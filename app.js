/**
 * Praxis - Mobile-First JavaScript
 * Clean, performant animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // SECURITY UTILITIES
    // ==========================================

    // Escape HTML to prevent XSS when displaying user content
    const escapeHtml = (str) => {
        if (!str || typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

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
    // SCENARIO TABS (Flip-through examples)
    // ==========================================
    const scenarioContainers = document.querySelectorAll('.scenario-tabs-container');

    scenarioContainers.forEach(container => {
        const tabs = container.querySelectorAll('.scenario-tab');
        const contents = container.querySelectorAll('.scenario-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.scenario;

                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update active content
                contents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.scenario === targetId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    });

    // ==========================================
    // INTERACTIVE NEURAL NETWORK ANIMATION
    // ==========================================

    // AI assistant names - permanently displayed in the network (main page only)
    const AI_NAMES = [
        'ChatGPT',
        'CLAUDE CODE',
        'GEMINI',
        'CURSOR.AI',
        'COPILOT',
        'PERPLEXITY'
    ];

    // AI-related terms for floating display - processing terms for each AI cluster
    const AI_TERMS = [
        // Core AI concepts
        'Machine Learning',
        'Neural Network',
        'Deep Learning',
        'NLP',
        'Computer Vision',
        'Transformer',
        'GPT',
        'Diffusion',
        'Embedding',
        'Tokenization',
        'AI Model',
        'Intelligence',
        'Cognition',
        // Training & optimization
        'Fine-tuning',
        'RAG',
        'Vector DB',
        'Attention',
        'Inference',
        'Training',
        'Backprop',
        'Gradient',
        'Loss Function',
        'Optimization',
        'Weight Update',
        'Learning Rate',
        // Prompting concepts
        'Prompt',
        'Context Window',
        'Hallucination',
        'Alignment',
        'RLHF',
        'Chain of Thought',
        'Few-shot',
        'Zero-shot',
        'Multimodal',
        'Reasoning',
        'System Prompt',
        'Temperature',
        'Top-P',
        'Creativity',
        // Architecture
        'Encoder',
        'Decoder',
        'Self-Attention',
        'Feed Forward',
        'Layer Norm',
        'Softmax',
        'Activation',
        'Dropout',
        'Batch Size',
        'Epochs',
        'Parameters',
        'Weights',
        'Bias',
        // Applications
        'Classification',
        'Generation',
        'Summarization',
        'Translation',
        'Q&A',
        'Sentiment',
        'Entity',
        'Intent',
        'Clustering',
        'Regression',
        'Chatbot',
        'Assistant',
        'Copilot',
        // Modern AI
        'Foundation Model',
        'LLM',
        'SLM',
        'Agent',
        'Tool Use',
        'Retrieval',
        'Grounding',
        'Safety',
        'Benchmark',
        'Eval',
        'API',
        'Streaming',
        'Context',
        // Data
        'Dataset',
        'Preprocessing',
        'Augmentation',
        'Labeling',
        'Annotation',
        'Corpus',
        'Token',
        'Vocab',
        'Sequence',
        'Batch',
        'Synthetic Data',
        // Capabilities
        'Understanding',
        'Knowledge',
        'Memory',
        'Prediction',
        'Analysis',
        'Synthesis',
        'Adaptation',
        'Learning'
    ];

    // Neural Network class - Each AI gets its own active cluster
    class NeuralNetwork {
        constructor(canvas, options = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = 0;
            this.height = 0;
            this.nodes = [];
            this.aiClusters = []; // Each AI has its own cluster (cluster mode)
            this.floatingTerms = []; // Floating AI terms (terms mode)
            this.animationId = null;

            // Mobile detection
            this.isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

            // Mode: 'clusters', 'terms', 'combined', or 'hero' (single large network)
            this.mode = options.mode || 'clusters';

            // Enhanced settings for combined mode (main page - larger network)
            const isCombined = this.mode === 'combined';
            const isHero = this.mode === 'hero';

            // Hero mode settings - single large network, alternating sides
            if (isHero) {
                this.nodesPerCluster = this.isMobile ? 80 : 180; // More nodes for detail
                this.clusterSpread = this.isMobile ? 160 : 280; // Network radius
                this.heroOpacity = 0.5; // Slightly more visible
                this.currentAIIndex = 0;
                this.lastAISwitch = 0;
                this.aiSwitchInterval = 10000; // 10 seconds
                this.aiTransitionProgress = 1; // 0-1 for fade transition
                this.aiTransitionDuration = 1500; // 1.5s fade
                this.heroSide = 'left'; // Alternates between 'left' and 'right'
                this.heroFadeOut = false; // True during fade-out phase
                // Rotation
                this.heroRotation = 0;
                this.heroRotationSpeed = 0.0001; // Very slow rotation
                // Orbiting terms
                this.heroTerms = [];
                this.heroTermCount = this.isMobile ? 12 : 25;
            } else {
                // Cluster settings - one per AI (cluster mode)
                this.nodesPerCluster = this.isMobile ? (isCombined ? 20 : 15) : (isCombined ? 35 : 25);
                this.clusterSpread = this.isMobile ? (isCombined ? 100 : 80) : (isCombined ? 150 : 120);
            }

            // Terms mode settings - more terms for combined mode
            this.nodeCount = this.isMobile ? 40 : 80;
            this.termCount = this.isMobile ? (isCombined ? 8 : 6) : (isCombined ? 15 : 12);

            // Options
            this.showTerms = options.showTerms !== false;
            this.maxConnectionDistance = this.isMobile ? (isHero ? 150 : (isCombined ? 120 : 100)) : (isHero ? 250 : (isCombined ? 180 : 140));

            // Data pulses traveling along connections - more active
            this.dataPulses = [];
            this.lastPulseSpawn = 0;
            this.pulseSpawnInterval = this.isMobile ? 100 : (isHero ? 10 : 150);
            this.maxPulses = this.isMobile ? 60 : (isHero ? 600 : 40);

            // Frame throttling for mobile
            this.lastFrameTime = 0;
            this.targetFrameInterval = this.isMobile ? 33 : 16;

            // Connection cache for performance
            this.cachedConnections = [];
            this.lastConnectionUpdate = 0;
            this.connectionUpdateInterval = 100;

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

            // Initialize based on mode
            if (this.mode === 'terms') {
                this.initTermsMode();
            } else if (this.mode === 'hero') {
                // Hero mode: single large network on left side, cycling AI names
                this.initHeroCluster();
            } else if (this.mode === 'combined') {
                // Combined mode: both AI clusters AND floating terms
                this.initClusters();
                this.initFloatingTermsOnly();  // Add floating terms without resetting nodes
            } else {
                this.initClusters();
            }

            this.dataPulses = [];
            this.buildConnections();
        }

        // Build connections cache - O(n²) but only runs periodically, not every frame
        buildConnections() {
            this.cachedConnections = [];
            const maxDist = this.maxConnectionDistance;
            const isHero = this.mode === 'hero';

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const nodeA = this.nodes[i];
                    const nodeB = this.nodes[j];

                    // Get current positions from cluster centers
                    const posA = this.getNodePosition(nodeA);
                    const posB = this.getNodePosition(nodeB);

                    const dx = posA.x - posB.x;
                    const dy = posA.y - posB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Hero mode: reduce connection density for cleaner look
                    const effectiveMaxDist = isHero ? maxDist * 0.6 : maxDist;

                    if (dist < effectiveMaxDist) {
                        const avgZ = (nodeA.z + nodeB.z) / 2;

                        // Hero mode: varied line widths for more definition
                        const isProminent = Math.random() < 0.15; // 15% of connections are prominent
                        const lineWidth = isHero
                            ? (isProminent ? 0.8 + avgZ * 1.0 : 0.3 + avgZ * 0.5)  // Prominent: 0.8-1.8, Normal: 0.3-0.8
                            : 0.5 + avgZ * 1.5; // Normal: 0.5 - 2.0

                        const baseAlpha = isHero
                            ? (1 - dist / effectiveMaxDist) * (isProminent ? 0.15 + avgZ * 0.25 : 0.08 + avgZ * 0.15)
                            : (1 - dist / maxDist) * (0.15 + avgZ * 0.35);

                        this.cachedConnections.push({
                            i, j, dist, avgZ,
                            lineWidth: lineWidth,
                            baseAlpha: baseAlpha,
                            isProminent: isProminent,
                            // Wave/flow animation parameters
                            waveOffset: Math.random() * Math.PI * 2,
                            waveSpeed: 0.002 + Math.random() * 0.002,
                            waveAmplitude: isProminent ? 3 + Math.random() * 4 : 1 + Math.random() * 2
                        });
                    }
                }
            }
        }

        initClusters() {
            this.nodes = [];
            this.aiClusters = [];

            // Fixed positions for 6 AI clusters in a 3x2 grid layout
            const cols = this.isMobile ? 2 : 3;
            const rows = this.isMobile ? 3 : 2;
            const paddingX = this.width * 0.12;
            const paddingY = this.height * 0.15;
            const spacingX = (this.width - paddingX * 2) / (cols - 1 || 1);
            const spacingY = (this.height - paddingY * 2) / (rows - 1 || 1);

            // Create a cluster for each AI
            AI_NAMES.forEach((name, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const centerX = paddingX + col * spacingX;
                const centerY = paddingY + row * spacingY;

                // Store cluster info with floating animation params
                const cluster = {
                    name: name,
                    baseCenterX: centerX,
                    baseCenterY: centerY,
                    centerX: centerX,
                    centerY: centerY,
                    nodeStartIndex: this.nodes.length,
                    nodeCount: this.nodesPerCluster,
                    pulseOffset: i * 1.2,
                    // Gentle floating animation - subtle movement to keep clusters recognizable
                    floatSpeedX: 0.0002 + Math.random() * 0.0001,
                    floatSpeedY: 0.0003 + Math.random() * 0.0001,
                    floatAmplitudeX: 8 + Math.random() * 5,
                    floatAmplitudeY: 6 + Math.random() * 4,
                    floatPhaseX: Math.random() * Math.PI * 2,
                    floatPhaseY: Math.random() * Math.PI * 2
                };

                // Create nodes for this cluster - stored relative to center
                for (let n = 0; n < this.nodesPerCluster; n++) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = 25 + Math.random() * this.clusterSpread;

                    this.nodes.push(this.createNode(
                        angle,
                        radius,
                        i,
                        n
                    ));
                }

                this.aiClusters.push(cluster);
            });
        }

        // Hero mode: Single large neural network with cycling AI names, alternating sides
        initHeroCluster() {
            this.nodes = [];
            this.aiClusters = [];
            this.heroTerms = [];

            // Position cluster based on current side (left or right)
            const leftPos = this.isMobile ? 0.5 : 0.30;
            const rightPos = this.isMobile ? 0.5 : 0.70;
            const centerX = this.width * (this.heroSide === 'left' ? leftPos : rightPos);
            const centerY = this.height * 0.5;

            // Create single large cluster
            const cluster = {
                name: AI_NAMES[this.currentAIIndex],
                baseCenterX: centerX,
                baseCenterY: centerY,
                centerX: centerX,
                centerY: centerY,
                nodeStartIndex: 0,
                nodeCount: this.nodesPerCluster,
                pulseOffset: 0,
                // Enhanced floating animation - more movement
                floatSpeedX: 0.00015,
                floatSpeedY: 0.0002,
                floatAmplitudeX: 25,
                floatAmplitudeY: 20,
                floatPhaseX: 0,
                floatPhaseY: Math.PI / 4,
                // Breathing effect - scale pulsing
                breatheSpeed: 0.0008,
                breatheAmplitude: 0.08, // 8% size variation
                breathePhase: 0
            };

            // Create nodes in CONCENTRIC RINGS for even distribution (avoids dark center)
            const ringCount = this.isMobile ? 5 : 7;
            const nodesCreated = { count: 0 };

            for (let ring = 0; ring < ringCount; ring++) {
                // Radius increases with each ring - start from outer edge of minimum
                const ringRadius = 40 + (ring / (ringCount - 1)) * this.clusterSpread;
                // More nodes in outer rings (proportional to circumference)
                const nodesInRing = Math.floor(8 + ring * (this.isMobile ? 8 : 12));

                for (let n = 0; n < nodesInRing && nodesCreated.count < this.nodesPerCluster; n++) {
                    // Evenly distributed around the ring with slight randomization
                    const baseAngle = (n / nodesInRing) * Math.PI * 2;
                    const angle = baseAngle + (Math.random() - 0.5) * 0.3;
                    // Slight radius variation within the ring
                    const radius = ringRadius + (Math.random() - 0.5) * 20;

                    this.nodes.push(this.createNode(angle, radius, 0, nodesCreated.count));
                    nodesCreated.count++;
                }
            }

            this.aiClusters.push(cluster);

            // Initialize orbiting AI terms
            this.initHeroTerms(centerX, centerY);
        }

        // Initialize orbiting terms for hero mode
        initHeroTerms(centerX, centerY) {
            const shuffledTerms = [...AI_TERMS].sort(() => Math.random() - 0.5);
            const selectedTerms = shuffledTerms.slice(0, this.heroTermCount);

            selectedTerms.forEach((term, i) => {
                // Orbit outside the network
                const orbitRadius = this.clusterSpread + 60 + Math.random() * 80;
                const startAngle = (i / this.heroTermCount) * Math.PI * 2 + Math.random() * 0.5;

                this.heroTerms.push({
                    text: term,
                    orbitRadius: orbitRadius,
                    angle: startAngle,
                    // Orbit speed - some clockwise, some counter-clockwise
                    orbitSpeed: (0.0002 + Math.random() * 0.0003) * (Math.random() > 0.5 ? 1 : -1),
                    // Vertical oscillation for 3D effect
                    verticalOffset: Math.random() * Math.PI * 2,
                    verticalAmplitude: 15 + Math.random() * 20,
                    verticalSpeed: 0.0003 + Math.random() * 0.0002,
                    // Visual properties
                    opacity: 0.25 + Math.random() * 0.25,
                    fontSize: this.isMobile ? 10 : 11 + Math.floor(Math.random() * 3),
                    pulseOffset: i * 0.5
                });
            });
        }

        // Update hero AI name cycling, rotation, and side switching
        updateHeroAI(time) {
            if (this.mode !== 'hero') return;

            const timeSinceSwitch = time - this.lastAISwitch;
            const fadeOutDuration = this.aiTransitionDuration / 2; // Half time for fade out
            const fadeInDuration = this.aiTransitionDuration / 2;  // Half time for fade in

            // Check if it's time to start fading out
            if (!this.heroFadeOut && timeSinceSwitch >= this.aiSwitchInterval - fadeOutDuration) {
                this.heroFadeOut = true;
            }

            // Calculate opacity based on phase
            if (this.heroFadeOut && timeSinceSwitch < this.aiSwitchInterval) {
                // Fading OUT phase
                const fadeOutProgress = (timeSinceSwitch - (this.aiSwitchInterval - fadeOutDuration)) / fadeOutDuration;
                this.aiTransitionProgress = Math.max(0, 1 - fadeOutProgress);
            } else if (timeSinceSwitch >= this.aiSwitchInterval) {
                // Time to switch - rebuild network on opposite side
                this.currentAIIndex = (this.currentAIIndex + 1) % AI_NAMES.length;
                this.heroSide = this.heroSide === 'left' ? 'right' : 'left';
                this.lastAISwitch = time;
                this.heroFadeOut = false;
                this.aiTransitionProgress = 0;

                // Rebuild the entire network on the new side
                this.initHeroCluster();
                this.buildConnections();
            } else if (this.aiTransitionProgress < 1) {
                // Fading IN phase
                this.aiTransitionProgress = Math.min(1, timeSinceSwitch / fadeInDuration);
            }

            // Update cluster name
            if (this.aiClusters.length > 0) {
                this.aiClusters[0].name = AI_NAMES[this.currentAIIndex];
            }

            // Update slow rotation
            this.heroRotation += this.heroRotationSpeed;

            // Update orbiting terms
            this.heroTerms.forEach(term => {
                term.angle += term.orbitSpeed;
            });
        }

        // Get rotated position for hero nodes with breathing and floating
        getHeroNodePosition(node, time) {
            const cluster = this.aiClusters[0];
            if (!cluster) return { x: 0, y: 0 };

            // Calculate floating offset (gentle drift in space)
            const floatX = Math.sin(time * cluster.floatSpeedX + cluster.floatPhaseX) * cluster.floatAmplitudeX;
            const floatY = Math.cos(time * cluster.floatSpeedY + cluster.floatPhaseY) * cluster.floatAmplitudeY;

            // Calculate breathing scale (network expands and contracts)
            const breatheScale = 1 + Math.sin(time * cluster.breatheSpeed + cluster.breathePhase) * cluster.breatheAmplitude;

            // Apply rotation to the node's angle
            const rotatedAngle = node.angle + this.heroRotation;

            // Apply breathing to radius and floating to position
            const breathedRadius = node.radius * breatheScale;
            const x = cluster.baseCenterX + floatX + Math.cos(rotatedAngle) * breathedRadius;
            const y = cluster.baseCenterY + floatY + Math.sin(rotatedAngle) * breathedRadius;
            return { x, y };
        }

        // Draw hero label OUTSIDE the network with a connecting line
        drawHeroLabel(time) {
            if (this.aiClusters.length === 0) return;

            const cluster = this.aiClusters[0];
            const pulse = Math.sin(time * 0.0015) * 0.1 + 0.9;

            // Calculate floating offset (same as nodes for synchronized movement)
            const floatX = Math.sin(time * cluster.floatSpeedX + cluster.floatPhaseX) * cluster.floatAmplitudeX;
            const floatY = Math.cos(time * cluster.floatSpeedY + cluster.floatPhaseY) * cluster.floatAmplitudeY;
            const currentCenterX = cluster.baseCenterX + floatX;
            const currentCenterY = cluster.baseCenterY + floatY;

            // Fade in/out transition
            const fadeOpacity = this.aiTransitionProgress * this.heroOpacity * pulse * 1.5; // Brighter label

            // Label position - OUTSIDE the network, direction depends on which side
            // Left side: label goes to upper-right; Right side: label goes to upper-left
            const isLeft = this.heroSide === 'left';
            const baseAngle = isLeft ? -Math.PI / 4 : -3 * Math.PI / 4; // Upper-right or upper-left
            const labelAngle = baseAngle + this.heroRotation * 0.1; // Slight rotation follow
            const labelDistance = this.clusterSpread + (this.isMobile ? 40 : 60); // Shortened line
            const labelX = currentCenterX + Math.cos(labelAngle) * labelDistance;
            const labelY = currentCenterY + Math.sin(labelAngle) * labelDistance;

            // Connection point on network edge
            const edgeX = currentCenterX + Math.cos(labelAngle) * (this.clusterSpread * 0.7);
            const edgeY = currentCenterY + Math.sin(labelAngle) * (this.clusterSpread * 0.7);

            this.ctx.save();

            // Draw connecting line from network to label
            this.ctx.beginPath();
            this.ctx.moveTo(edgeX, edgeY);
            this.ctx.lineTo(labelX, labelY);
            this.ctx.strokeStyle = `rgba(230, 57, 70, ${fadeOpacity * 0.5})`;
            this.ctx.lineWidth = 1.5;
            this.ctx.stroke();

            // Draw small dot at connection point
            this.ctx.beginPath();
            this.ctx.arc(edgeX, edgeY, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(230, 57, 70, ${fadeOpacity * 0.8})`;
            this.ctx.fill();

            // Large, prominent font for hero label
            const fontSize = this.isMobile ? 20 : 32;

            this.ctx.font = `bold ${fontSize}px monospace`;
            this.ctx.textAlign = isLeft ? 'left' : 'right'; // Align based on side
            this.ctx.textBaseline = 'middle';

            // Text glow - subtle red glow
            if (!this.isMobile) {
                this.ctx.shadowColor = `rgba(230, 57, 70, ${fadeOpacity * 0.8})`;
                this.ctx.shadowBlur = 20;
            }

            // Main text - white with fade
            this.ctx.fillStyle = `rgba(255, 255, 255, ${fadeOpacity})`;
            const textOffset = isLeft ? 10 : -10;
            this.ctx.fillText(cluster.name, labelX + textOffset, labelY);

            this.ctx.restore();
        }

        // Draw orbiting AI terms around the hero network
        drawHeroTerms(time) {
            if (!this.heroTerms || this.aiClusters.length === 0) return;

            const cluster = this.aiClusters[0];

            // Calculate floating offset (same as nodes for synchronized movement)
            const floatX = Math.sin(time * cluster.floatSpeedX + cluster.floatPhaseX) * cluster.floatAmplitudeX;
            const floatY = Math.cos(time * cluster.floatSpeedY + cluster.floatPhaseY) * cluster.floatAmplitudeY;
            const currentCenterX = cluster.baseCenterX + floatX;
            const currentCenterY = cluster.baseCenterY + floatY;

            this.heroTerms.forEach(term => {
                // Calculate position with rotation
                const rotatedAngle = term.angle + this.heroRotation * 0.3; // Slower follow
                const verticalWobble = Math.sin(time * term.verticalSpeed + term.verticalOffset) * term.verticalAmplitude;

                const x = currentCenterX + Math.cos(rotatedAngle) * term.orbitRadius;
                const y = currentCenterY + Math.sin(rotatedAngle) * term.orbitRadius + verticalWobble;

                const pulse = Math.sin(time * 0.002 + term.pulseOffset) * 0.15 + 0.85;
                const opacity = term.opacity * pulse * this.heroOpacity * this.aiTransitionProgress;

                this.ctx.save();
                this.ctx.font = `${term.fontSize}px monospace`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';

                // Subtle glow
                if (!this.isMobile) {
                    this.ctx.shadowColor = `rgba(230, 57, 70, ${opacity * 0.3})`;
                    this.ctx.shadowBlur = 6;
                }

                // Text color - muted
                this.ctx.fillStyle = `rgba(160, 150, 150, ${opacity})`;
                this.ctx.fillText(term.text, x, y);

                this.ctx.restore();
            });
        }

        // Terms mode: Distributed nodes with floating AI-related terms
        initTermsMode() {
            this.nodes = [];
            this.floatingTerms = [];

            // Create distributed nodes across the canvas
            for (let i = 0; i < this.nodeCount; i++) {
                const x = Math.random() * this.width;
                const y = Math.random() * this.height;
                const z = Math.random() * 0.6 + 0.4;

                this.nodes.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    // Drift animation
                    driftSpeedX: (Math.random() - 0.5) * 0.3,
                    driftSpeedY: (Math.random() - 0.5) * 0.3,
                    // Floating animation
                    floatSpeedX: 0.0005 + Math.random() * 0.0005,
                    floatSpeedY: 0.0007 + Math.random() * 0.0005,
                    floatAmplitudeX: 15 + Math.random() * 20,
                    floatAmplitudeY: 10 + Math.random() * 15,
                    floatPhaseX: Math.random() * Math.PI * 2,
                    floatPhaseY: Math.random() * Math.PI * 2,
                    // Size and brightness based on depth
                    size: 2 + z * 3,
                    z: z,
                    glowIntensity: 0.4 + z * 0.6,
                    pulseOffset: Math.random() * Math.PI * 2,
                    isTermsMode: true
                });
            }

            // Create floating terms - select random subset
            const shuffledTerms = [...AI_TERMS].sort(() => Math.random() - 0.5);
            const selectedTerms = shuffledTerms.slice(0, this.termCount);

            selectedTerms.forEach((term, i) => {
                this.floatingTerms.push({
                    text: term,
                    x: Math.random() * (this.width * 0.8) + this.width * 0.1,
                    y: Math.random() * (this.height * 0.8) + this.height * 0.1,
                    // Floating animation
                    floatSpeedX: 0.0003 + Math.random() * 0.0002,
                    floatSpeedY: 0.0004 + Math.random() * 0.0002,
                    floatAmplitudeX: 20 + Math.random() * 30,
                    floatAmplitudeY: 15 + Math.random() * 25,
                    floatPhaseX: Math.random() * Math.PI * 2,
                    floatPhaseY: Math.random() * Math.PI * 2,
                    // Visual properties
                    opacity: 0.3 + Math.random() * 0.4,
                    pulseOffset: i * 0.8,
                    fontSize: this.isMobile ? 10 : 12 + Math.floor(Math.random() * 4)
                });
            });
        }

        // Initialize only floating terms (for combined mode - attaches terms to each cluster)
        initFloatingTermsOnly() {
            this.floatingTerms = [];

            // Terms per cluster - at least 10 processing terms per AI
            const termsPerCluster = this.isMobile ? 8 : 12;

            // Shuffle all terms
            const shuffledTerms = [...AI_TERMS].sort(() => Math.random() - 0.5);

            // Attach terms to each AI cluster
            this.aiClusters.forEach((cluster, clusterIndex) => {
                // Get a unique set of terms for this cluster
                const startIdx = (clusterIndex * termsPerCluster) % shuffledTerms.length;
                const clusterTerms = [];
                for (let i = 0; i < termsPerCluster; i++) {
                    clusterTerms.push(shuffledTerms[(startIdx + i) % shuffledTerms.length]);
                }

                // Create orbiting terms around this cluster
                clusterTerms.forEach((term, i) => {
                    const angle = (i / termsPerCluster) * Math.PI * 2 + Math.random() * 0.5;
                    const radius = this.clusterSpread * (0.8 + Math.random() * 0.6);

                    this.floatingTerms.push({
                        text: term,
                        clusterIndex: clusterIndex,
                        // Orbital position (relative to cluster)
                        angle: angle,
                        radius: radius,
                        // Orbital speed - slow rotation around cluster
                        orbitSpeed: (0.0002 + Math.random() * 0.0003) * (Math.random() > 0.5 ? 1 : -1),
                        // Wobble animation
                        wobbleSpeed: 0.001 + Math.random() * 0.001,
                        wobbleAmount: 10 + Math.random() * 15,
                        wobblePhase: Math.random() * Math.PI * 2,
                        // Visual properties
                        opacity: 0.25 + Math.random() * 0.35,
                        pulseOffset: i * 0.5 + clusterIndex,
                        fontSize: this.isMobile ? 9 : 10 + Math.floor(Math.random() * 3)
                    });
                });
            });
        }

        createNode(angle, radius, clusterIndex, nodeIndex) {
            // z represents depth (0 = far/dim, 1 = close/bright)
            const z = Math.random() * 0.6 + 0.4;
            return {
                // Store position as angle/radius from cluster center
                angle: angle,
                radius: radius,
                clusterIndex: clusterIndex,
                // Orbit speed - nodes slowly rotate around their cluster
                orbitSpeed: (Math.random() - 0.5) * 0.0008,
                // Size and brightness based on depth
                size: 2 + z * 3,
                z: z,
                glowIntensity: 0.4 + z * 0.6,
                pulseOffset: Math.random() * Math.PI * 2
            };
        }

        updateNode(node, time) {
            // Terms mode: floating animation with drift
            if (node.isTermsMode) {
                node.x = node.baseX +
                    Math.sin(time * node.floatSpeedX + node.floatPhaseX) * node.floatAmplitudeX;
                node.y = node.baseY +
                    Math.sin(time * node.floatSpeedY + node.floatPhaseY) * node.floatAmplitudeY;

                // Slow drift
                node.baseX += node.driftSpeedX;
                node.baseY += node.driftSpeedY;

                // Wrap around edges
                if (node.baseX < -50) node.baseX = this.width + 50;
                if (node.baseX > this.width + 50) node.baseX = -50;
                if (node.baseY < -50) node.baseY = this.height + 50;
                if (node.baseY > this.height + 50) node.baseY = -50;
                return;
            }

            // Cluster mode: nodes orbit slowly around their cluster center
            node.angle += node.orbitSpeed;
        }

        getNodePosition(node, time) {
            // Terms mode: nodes have direct x/y with floating animation
            if (node.isTermsMode) {
                return { x: node.x, y: node.y };
            }

            // Cluster mode: calculate from cluster center + angle/radius
            const cluster = this.aiClusters[node.clusterIndex];

            // Hero mode: apply global rotation
            let effectiveAngle = node.angle;
            if (this.mode === 'hero') {
                effectiveAngle += this.heroRotation;
            }

            const x = cluster.centerX + Math.cos(effectiveAngle) * node.radius;
            const y = cluster.centerY + Math.sin(effectiveAngle) * node.radius;
            return { x, y };
        }

        updateClusterPositions(time) {
            // Update each cluster's floating position
            this.aiClusters.forEach(cluster => {
                cluster.centerX = cluster.baseCenterX +
                    Math.sin(time * cluster.floatSpeedX + cluster.floatPhaseX) * cluster.floatAmplitudeX;
                cluster.centerY = cluster.baseCenterY +
                    Math.sin(time * cluster.floatSpeedY + cluster.floatPhaseY) * cluster.floatAmplitudeY;
            });
        }

        drawNode(node, time) {
            // Get position from cluster center
            const pos = this.getNodePosition(node, time);

            // Pulsing glow based on depth
            const pulse = Math.sin(time * 0.003 + node.pulseOffset) * 0.15 + 0.85;
            let intensity = node.glowIntensity * pulse;

            // Apply hero mode transparency (including fade transition)
            const heroMult = this.mode === 'hero' ? this.heroOpacity * this.aiTransitionProgress : 1;
            intensity *= heroMult;

            // Simplified glow using concentric circles instead of expensive gradients
            // Skip glow entirely on mobile for far nodes (performance)
            if (!this.isMobile || node.z > 0.5) {
                const glowSize = node.size * (3 + node.z * 2);

                // Outer glow layer (most diffuse) - deep red
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, glowSize, 0, Math.PI * 2);
                if (node.z > 0.6) {
                    this.ctx.fillStyle = `rgba(230, 57, 70, ${intensity * 0.08})`;
                } else {
                    this.ctx.fillStyle = `rgba(150, 40, 50, ${intensity * 0.05})`;
                }
                this.ctx.fill();

                // Middle glow layer - pure red
                this.ctx.beginPath();
                this.ctx.arc(pos.x, pos.y, glowSize * 0.5, 0, Math.PI * 2);
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
                    this.ctx.arc(pos.x, pos.y, glowSize * 0.25, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 100, 100, ${intensity * 0.4})`;
                    this.ctx.fill();
                }
            }

            // Core of the node (bright center) - white/pink
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, node.size * 0.5, 0, Math.PI * 2);
            if (node.z > 0.6) {
                this.ctx.fillStyle = `rgba(255, 220, 220, ${intensity})`;
            } else {
                this.ctx.fillStyle = `rgba(255, 150, 150, ${intensity * 0.8})`;
            }
            this.ctx.fill();
        }

        drawClusterLabels(time) {
            // Draw permanent labels at each AI cluster center - clean text only, no background
            this.aiClusters.forEach((cluster, i) => {
                const pulse = Math.sin(time * 0.002 + cluster.pulseOffset) * 0.1 + 0.9;
                const fontSize = this.isMobile ? 12 : 15;

                this.ctx.save();
                this.ctx.font = `bold ${fontSize}px monospace`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';

                // Text glow - subtle red/white glow for visibility
                if (!this.isMobile) {
                    this.ctx.shadowColor = `rgba(230, 57, 70, ${pulse * 0.6})`;
                    this.ctx.shadowBlur = 15;
                }

                // Main text - white with pulse
                this.ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
                this.ctx.fillText(cluster.name, cluster.centerX, cluster.centerY);

                this.ctx.restore();
            });
        }

        // Update floating terms positions - orbit around their assigned cluster
        updateFloatingTerms(time) {
            this.floatingTerms.forEach(term => {
                // Check if term has a cluster assignment (combined mode)
                if (term.clusterIndex !== undefined && this.aiClusters[term.clusterIndex]) {
                    // Update orbital angle (only for cluster-attached terms)
                    term.angle += term.orbitSpeed;
                    const cluster = this.aiClusters[term.clusterIndex];

                    // Calculate position based on cluster center + orbital position + wobble
                    const wobble = Math.sin(time * term.wobbleSpeed + term.wobblePhase) * term.wobbleAmount;
                    const effectiveRadius = term.radius + wobble;

                    term.currentX = cluster.centerX + Math.cos(term.angle) * effectiveRadius;
                    term.currentY = cluster.centerY + Math.sin(term.angle) * effectiveRadius;
                } else {
                    // Fallback for terms mode (random floating)
                    term.currentX = term.x +
                        Math.sin(time * term.floatSpeedX + term.floatPhaseX) * term.floatAmplitudeX;
                    term.currentY = term.y +
                        Math.sin(time * term.floatSpeedY + term.floatPhaseY) * term.floatAmplitudeY;
                }
            });
        }

        // Draw floating AI-related terms - orbiting around clusters
        drawFloatingTerms(time) {
            this.floatingTerms.forEach(term => {
                const pulse = Math.sin(time * 0.002 + term.pulseOffset) * 0.15 + 0.85;
                const opacity = term.opacity * pulse;

                this.ctx.save();
                this.ctx.font = `${term.fontSize}px monospace`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';

                // Subtle text glow - red tint
                if (!this.isMobile) {
                    this.ctx.shadowColor = `rgba(230, 57, 70, ${opacity * 0.4})`;
                    this.ctx.shadowBlur = 8;
                }

                // Text color - soft white/gray
                this.ctx.fillStyle = `rgba(180, 170, 170, ${opacity})`;
                this.ctx.fillText(term.text, term.currentX, term.currentY);

                this.ctx.restore();
            });
        }

        drawConnections(time) {
            // Periodically rebuild connections to account for node movement
            if (time - this.lastConnectionUpdate > this.connectionUpdateInterval) {
                this.buildConnections();
                this.lastConnectionUpdate = time;
            }

            this.ctx.lineCap = 'round';

            // Apply hero mode transparency (including fade transition)
            const heroMult = this.mode === 'hero' ? this.heroOpacity * this.aiTransitionProgress : 1;
            const isHero = this.mode === 'hero';

            // Use cached connections - much faster than O(n²) every frame
            for (const conn of this.cachedConnections) {
                const nodeA = this.nodes[conn.i];
                const nodeB = this.nodes[conn.j];

                // Get current positions from cluster centers
                const posA = this.getNodePosition(nodeA);
                const posB = this.getNodePosition(nodeB);

                // Steady alpha - no pulsing, just organic wave movement
                const alpha = conn.baseAlpha * heroMult;

                this.ctx.beginPath();

                // Hero mode: draw curved lines with wave motion for movement effect
                if (isHero && conn.waveAmplitude) {
                    const midX = (posA.x + posB.x) / 2;
                    const midY = (posA.y + posB.y) / 2;

                    // Calculate perpendicular offset for wave
                    const dx = posB.x - posA.x;
                    const dy = posB.y - posA.y;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const perpX = -dy / len;
                    const perpY = dx / len;

                    // Animated wave offset
                    const waveOffset = Math.sin(time * conn.waveSpeed + conn.waveOffset) * conn.waveAmplitude;

                    // Draw quadratic curve with animated control point
                    this.ctx.moveTo(posA.x, posA.y);
                    this.ctx.quadraticCurveTo(
                        midX + perpX * waveOffset,
                        midY + perpY * waveOffset,
                        posB.x, posB.y
                    );
                } else {
                    // Standard straight line for non-hero modes
                    this.ctx.moveTo(posA.x, posA.y);
                    this.ctx.lineTo(posB.x, posB.y);
                }

                // Color based on depth - prominent lines are brighter
                if (conn.avgZ > 0.6) {
                    const brightness = conn.isProminent ? 230 : 200;
                    this.ctx.strokeStyle = `rgba(${brightness}, 80, 70, ${alpha})`;
                } else if (conn.avgZ > 0.3) {
                    const brightness = conn.isProminent ? 210 : 180;
                    this.ctx.strokeStyle = `rgba(${brightness}, 60, 60, ${alpha})`;
                } else {
                    const brightness = conn.isProminent ? 170 : 140;
                    this.ctx.strokeStyle = `rgba(${brightness}, 50, 55, ${alpha})`;
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
            const isHero = this.mode === 'hero';

            this.dataPulses.push({
                startIdx: reverse ? conn.j : conn.i,
                endIdx: reverse ? conn.i : conn.j,
                progress: 0,
                speed: isHero ? 0.006 + Math.random() * 0.008 : 0.008 + Math.random() * 0.012,
                // Hero mode: skinnier, more delicate pulses (half size)
                size: isHero ? 0.4 + conn.avgZ * 0.5 : 1.5 + conn.avgZ * 2,
                brightness: isHero ? 0.4 + conn.avgZ * 0.3 : 0.6 + conn.avgZ * 0.4,
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
            // Apply hero mode transparency (including fade transition)
            const heroMult = this.mode === 'hero' ? this.heroOpacity * this.aiTransitionProgress : 1;

            this.dataPulses.forEach(pulse => {
                const startNode = this.nodes[pulse.startIdx];
                const endNode = this.nodes[pulse.endIdx];

                // Get current positions from cluster centers
                const startPos = this.getNodePosition(startNode);
                const endPos = this.getNodePosition(endNode);

                const x = startPos.x + (endPos.x - startPos.x) * pulse.progress;
                const y = startPos.y + (endPos.y - startPos.y) * pulse.progress;

                const brightness = pulse.brightness * heroMult;

                // Trail - red/pink
                const trailSteps = this.isMobile ? 3 : 6;
                for (let t = trailSteps; t >= 0; t--) {
                    const trailProg = pulse.progress - (0.15 * t / trailSteps);
                    if (trailProg < 0) continue;

                    const tx = startPos.x + (endPos.x - startPos.x) * trailProg;
                    const ty = startPos.y + (endPos.y - startPos.y) * trailProg;
                    const trailAlpha = (1 - t / trailSteps) * brightness * 0.5;

                    this.ctx.beginPath();
                    this.ctx.arc(tx, ty, pulse.size * 0.6, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 150, 150, ${trailAlpha})`;
                    this.ctx.fill();
                }

                // Glow - red
                if (!this.isMobile) {
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, pulse.size * 2.5, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 80, 80, ${brightness * 0.3})`;
                    this.ctx.fill();
                }

                // Core - bright white/pink
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 240, 240, ${brightness})`;
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

            // Update positions based on mode
            if (this.mode === 'terms') {
                this.updateFloatingTerms(time);
            } else if (this.mode === 'hero') {
                // Hero mode: single large network with cycling AI names
                this.updateClusterPositions(time);
                this.updateHeroAI(time);
            } else if (this.mode === 'combined') {
                // Combined mode: update both clusters and floating terms
                this.updateClusterPositions(time);
                this.updateFloatingTerms(time);
            } else {
                this.updateClusterPositions(time);
            }

            // Layer 1: Connections (behind everything)
            this.drawConnections(time);

            // Layer 2: Data pulses
            this.spawnDataPulse(time);
            this.updateDataPulses();
            this.drawDataPulses();

            // Layer 3: Nodes
            this.nodes.forEach(node => {
                this.updateNode(node, time);
                this.drawNode(node, time);
            });

            // Layer 4: Labels (topmost)
            if (this.mode === 'terms') {
                // Terms mode: draw floating AI terms only
                this.drawFloatingTerms(time);
            } else if (this.mode === 'hero') {
                // Hero mode: draw orbiting terms and cycling AI label
                this.drawHeroTerms(time);
                this.drawHeroLabel(time);
            } else if (this.mode === 'combined') {
                // Combined mode: draw both floating terms and cluster labels
                this.drawFloatingTerms(time);
                if (this.showTerms) {
                    this.drawClusterLabels(time);
                }
            } else if (this.showTerms) {
                // Cluster mode: draw AI cluster labels only
                this.drawClusterLabels(time);
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

    // Check if this is the main index page ONLY (root path or /index.html at root)
    const mainCanvas = document.getElementById('neural-network');
    const pathname = window.location.pathname;
    // Only the root index page gets AI clusters - must be exactly / or /index.html (not in any subdirectory)
    const isMainPage = pathname === '/' || pathname === '/index.html';

    // Main hero canvas on index page - hero mode with single large network cycling through AI names
    if (mainCanvas && isMainPage) {
        neuralNetworks.push(new NeuralNetwork(mainCanvas, {
            mode: 'hero',  // Single large network on left, cycles AI names every 13 seconds
            showTerms: true
        }));
    } else if (mainCanvas) {
        // ALL other pages - terms mode with floating AI terminology only (NO AI names)
        neuralNetworks.push(new NeuralNetwork(mainCanvas, {
            mode: 'terms'
        }));
    }

    // Secondary canvases (CTA cards, footer) - terms mode with floating AI terms
    // Skip on mobile for better performance
    const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
    if (!isMobileDevice) {
        document.querySelectorAll('.neural-canvas-secondary').forEach(canvas => {
            neuralNetworks.push(new NeuralNetwork(canvas, {
                mode: 'terms'
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
    // TOOL PAGE: PROMPT ANALYZER (New Smart Analyzer)
    // ==========================================

    // Element type definitions with position weights
    const ELEMENT_TYPES = {
        context: { id: 'context', name: 'Context', letter: 'C', description: 'Background information about the situation', positionWeight: { early: 1.3, middle: 1.0, late: 0.7 } },
        role: { id: 'role', name: 'Role/Persona', letter: 'R', description: 'AI persona or expertise assignment', positionWeight: { early: 1.2, middle: 1.0, late: 0.8 } },
        instruction: { id: 'instruction', name: 'Instructions', letter: 'I', description: 'The main task or request', positionWeight: { early: 1.0, middle: 1.1, late: 0.9 } },
        specifics: { id: 'specifics', name: 'Specifics/Format', letter: 'S', description: 'Format, length, structure requirements', positionWeight: { early: 0.9, middle: 1.1, late: 1.2 } },
        parameters: { id: 'parameters', name: 'Parameters/Constraints', letter: 'P', description: 'Rules, boundaries, and constraints', positionWeight: { early: 0.8, middle: 1.0, late: 1.3 } },
        audience: { id: 'audience', name: 'Audience', letter: 'A', description: 'Target reader or user description', positionWeight: { early: 1.1, middle: 1.0, late: 1.0 } },
        tone: { id: 'tone', name: 'Tone/Style', letter: 'T', description: 'Emotional quality and writing style', positionWeight: { early: 0.9, middle: 1.1, late: 1.1 } },
        examples: { id: 'examples', name: 'Examples', letter: 'E', description: 'Sample content or output demonstrations', positionWeight: { early: 0.7, middle: 1.0, late: 1.3 } }
    };

    // Technique detection patterns for advanced prompting methods
    const TECHNIQUE_PATTERNS = {
        flippedInteraction: {
            id: 'flipped-interaction',
            name: 'Flipped Interaction Method',
            description: 'Asking AI to interview you first',
            learnUrl: 'learn/flipped-interaction.html',
            signals: [
                { pattern: /\b(ask me|interview me|question me)\s+(first|before|about)/i, weight: 1.0 },
                { pattern: /\b(before (you )?(answer|respond|help|give|provide)|first,? ask)\b/i, weight: 0.9 },
                { pattern: /\b(what (do you|else do you|would you) need to know)\b/i, weight: 0.8 },
                { pattern: /\b(gather (more )?information|clarify(ing)? questions)\b/i, weight: 0.7 },
                { pattern: /\b(ask me \d+|ask \d+ questions)\b/i, weight: 1.0 },
                { pattern: /\b(understand my situation|learn about my)\b/i, weight: 0.6 }
            ]
        },
        chainOfThought: {
            id: 'chain-of-thought',
            name: 'Chain of Thought',
            description: 'Step-by-step reasoning',
            learnUrl: 'learn/advanced.html',
            signals: [
                { pattern: /\b(step[- ]by[- ]step|one step at a time)\b/i, weight: 1.0 },
                { pattern: /\b(think through|walk me through|walk through)\b/i, weight: 0.9 },
                { pattern: /\b(show (your |the )?reasoning|explain (your |the )?thinking)\b/i, weight: 0.9 },
                { pattern: /\b(let'?s think|reason through|work through this)\b/i, weight: 0.8 },
                { pattern: /\b(before (giving |your )?(final )?answer)\b/i, weight: 0.7 }
            ]
        },
        fewShot: {
            id: 'few-shot',
            name: 'Few-Shot Learning',
            description: 'Providing examples before request',
            learnUrl: 'learn/advanced.html',
            signals: [
                { pattern: /\bexample\s*\d*\s*:/i, weight: 1.0 },
                { pattern: /\b(input|output)\s*:/i, weight: 0.9 },
                { pattern: /→|->/, weight: 0.7 },
                { pattern: /\b(like this|for example|for instance|such as):/i, weight: 0.6 },
                { pattern: /\b(here('s| is) an example|example format)\b/i, weight: 0.8 }
            ]
        },
        rolePrompting: {
            id: 'role-prompting',
            name: 'Role Prompting',
            description: 'Assigning AI a persona',
            learnUrl: 'learn/crisp.html',
            signals: [
                { pattern: /\b(act as|you are|pretend to be|imagine you('re| are))\b/i, weight: 1.0 },
                { pattern: /\b(as (a|an) (expert|specialist|professional|senior))\b/i, weight: 0.9 },
                { pattern: /\b(approach this (like|as)|think like)\b/i, weight: 0.8 },
                { pattern: /\b(from the perspective of|in the voice of)\b/i, weight: 0.7 }
            ]
        },
        constraintsFirst: {
            id: 'constraints-first',
            name: 'Constraints First',
            description: 'Leading with limitations',
            learnUrl: 'learn/crisp.html',
            signals: [
                { pattern: /^(constraints?|requirements?|rules?|limitations?):/im, weight: 1.0 },
                { pattern: /\b(must be (under|less than|no more than|at least))\b/i, weight: 0.8 },
                { pattern: /\b(don'?t|do not|never|avoid|exclude|without)\s+\w+/i, weight: 0.6 },
                { pattern: /\b(only use|limit(ed)? to|maximum|minimum)\b/i, weight: 0.7 }
            ]
        },
        selfVerification: {
            id: 'self-verification',
            name: 'Self-Verification',
            description: 'Asking AI to check its work',
            learnUrl: 'learn/advanced.html',
            signals: [
                { pattern: /\b(verify|double[- ]?check|review for (errors|accuracy|mistakes))\b/i, weight: 1.0 },
                { pattern: /\b(are you sure|check (your|the) (answer|work|response))\b/i, weight: 0.9 },
                { pattern: /\b(confirm (this is|that)|validate (your|the))\b/i, weight: 0.8 },
                { pattern: /\b(after (you )?(answer|respond),? (verify|check|review))\b/i, weight: 0.9 }
            ]
        },
        audienceSpec: {
            id: 'audience-spec',
            name: 'Audience Specification',
            description: 'Defining who output is for',
            learnUrl: 'learn/costar.html',
            signals: [
                { pattern: /\b(for (beginners|experts|executives|children|professionals|developers|managers))\b/i, weight: 1.0 },
                { pattern: /\b(target(ing|ed)? (audience|readers|users))\b/i, weight: 0.9 },
                { pattern: /\b(written for|aimed at|intended for|designed for)\b/i, weight: 0.8 },
                { pattern: /\b(audience is|readers are|users are)\b/i, weight: 0.9 },
                { pattern: /\b(who (have|has|are|is) (no experience|familiar|new to))\b/i, weight: 0.7 }
            ]
        },
        formatSpec: {
            id: 'format-spec',
            name: 'Format Specification',
            description: 'Defining output structure',
            learnUrl: 'learn/crisp.html',
            signals: [
                { pattern: /\b(as a (table|list|json|csv|markdown|outline|diagram))\b/i, weight: 1.0 },
                { pattern: /\b(in (json|xml|yaml|csv|html|markdown) format)\b/i, weight: 1.0 },
                { pattern: /\b(bullet(ed)? (points?|list)|numbered list|ordered list)\b/i, weight: 0.9 },
                { pattern: /\b(format(ted)? (as|like|with|using))\b/i, weight: 0.7 },
                { pattern: /\{[^}]*:[^}]*\}/s, weight: 0.6 }
            ]
        },
        metaPrompting: {
            id: 'meta-prompting',
            name: 'Meta-Prompting',
            description: 'Instructions about how to respond',
            learnUrl: 'learn/advanced.html',
            signals: [
                { pattern: /\b(respond only with|just (give|provide|show|return) me)\b/i, weight: 1.0 },
                { pattern: /\b(don'?t explain|no (explanation|preamble|introduction|caveats))\b/i, weight: 0.9 },
                { pattern: /\b(skip (the|any) (intro|introduction|preamble|pleasantries))\b/i, weight: 0.8 },
                { pattern: /\b(output only|return only|give me only)\b/i, weight: 0.8 }
            ]
        },
        devilsAdvocate: {
            id: 'devils-advocate',
            name: "Devil's Advocate",
            description: 'Challenging or critiquing',
            learnUrl: 'learn/advanced.html',
            signals: [
                { pattern: /\b(devil'?s advocate|argue against|play devil)\b/i, weight: 1.0 },
                { pattern: /\b(critique|criticize|challenge|poke holes)\b/i, weight: 0.8 },
                { pattern: /\b(what could go wrong|find (the )?(flaws|weaknesses|problems|issues))\b/i, weight: 0.9 },
                { pattern: /\b(stress[- ]?test|pressure[- ]?test)\b/i, weight: 0.8 }
            ]
        }
    };

    // Multi-signal content indicators for each element type
    const CONTENT_INDICATORS = {
        context: {
            signals: [
                { name: 'first_person_situation', pattern: /\b(I am|I'm|We are|We're|I have|We have)\s+(?!asking|requesting|looking)/i, weight: 0.8, exclusive: true },
                { name: 'working_on', pattern: /\b(working on|building|creating|developing|launching|running|managing)\s+(?:a|an|the|my|our)?\s*\w+/i, weight: 0.7, exclusive: false },
                { name: 'temporal_marker', pattern: /\b(currently|recently|right now|at the moment|this week|this month|planning to|about to)\b/i, weight: 0.5, exclusive: false },
                { name: 'causal_explanation', pattern: /\b(because|since|given that|due to|as a result of|considering that)\b/i, weight: 0.6, exclusive: false },
                { name: 'problem_statement', pattern: /\b(struggling with|need help with|having trouble|facing|dealing with|challenge is)\b/i, weight: 0.7, exclusive: true },
                { name: 'domain_background', pattern: /\b(in the \w+ industry|for (a|my|our) \w+ (company|business|team|project))\b/i, weight: 0.6, exclusive: true },
                { name: 'explicit_label', pattern: /\b(context|background|situation)\s*:/i, weight: 1.0, exclusive: true },
                { name: 'possessive_domain', pattern: /\b(my|our|the)\s+(brand|product|company|business|project|team|client|customer|audience|market)\b/i, weight: 0.5, exclusive: false }
            ],
            structuralBonus: { declarative: 0.2, firstPerson: 0.15, positionEarly: 0.2 }
        },
        role: {
            signals: [
                { name: 'act_as_directive', pattern: /\b(act as|you are|pretend to be|imagine you('re| are)|behave as|take on the role of)\b/i, weight: 1.0, exclusive: true },
                { name: 'approach_like', pattern: /\b(approach this like|approach this as|think like|write like|respond like|answer like)\b/i, weight: 1.0, exclusive: true },
                { name: 'want_you_to_be', pattern: /\b(want you to|need you to|like you to)\s+(be|act|approach|think|write|respond)\b/i, weight: 0.9, exclusive: true },
                { name: 'expertise_words', pattern: /\b(expert|specialist|consultant|advisor|professional|experienced|senior|veteran)\s*(in|with|at|who)?\b/i, weight: 0.8, exclusive: true },
                { name: 'capability_framing', pattern: /\b(with expertise in|who specializes in|who understands|known for|skilled at|proficient in)\b/i, weight: 0.7, exclusive: true },
                { name: 'persona_language', pattern: /\b(character|persona|personality|voice of|perspective of|as if you were)\b/i, weight: 0.6, exclusive: true },
                { name: 'profession_noun', pattern: /\b(a|an)\s+(writer|editor|teacher|coach|mentor|analyst|developer|designer|marketer|strategist|therapist|doctor|lawyer|consultant)\b/i, weight: 0.6, exclusive: false }
            ],
            structuralBonus: { secondPerson: 0.2, imperative: 0.1, positionEarly: 0.15 }
        },
        instruction: {
            signals: [
                { name: 'imperative_start', pattern: /^(write|create|generate|explain|analyze|summarize|list|describe|compare|design|draft|develop|build|make|produce|compose|prepare|outline|review|evaluate|assess|calculate|determine|find|identify|suggest|recommend|help|tell|show|give|provide)\b/i, weight: 1.0, exclusive: true },
                { name: 'request_language', pattern: /\b(I need you to|can you|could you|would you|please|I('d| would) like you to|help me|I need help|I want you to)\b/i, weight: 0.9, exclusive: true },
                { name: 'structural_instruction', pattern: /\b(start by|start with|begin by|begin with|in the (first|second|third|final|last) paragraph|close with|end with|conclude with|open with)\b/i, weight: 0.8, exclusive: true },
                { name: 'task_verbs', pattern: /\b(analyze|summarize|compare|design|evaluate|optimize|implement|translate|convert|transform|rewrite|edit|proofread|revise|announce|introduce|highlight|hook)\b/i, weight: 0.6, exclusive: false },
                { name: 'action_sequence', pattern: /\b(first|then|next|after that|finally|step \d|1\.|2\.|3\.)\b/i, weight: 0.5, exclusive: false },
                { name: 'goal_statement', pattern: /\b(goal is to|objective is|aim to|want to achieve|trying to|need to accomplish|the goal is)\b/i, weight: 0.7, exclusive: false }
            ],
            structuralBonus: { imperative: 0.3, startsWithVerb: 0.2, positionMiddle: 0.1 }
        },
        specifics: {
            signals: [
                { name: 'numeric_specification', pattern: /\b(\d+)\s*(words?|sentences?|paragraphs?|bullet\s*points?|items?|sections?|pages?|minutes?|characters?|hashtags?)\b/i, weight: 1.0, exclusive: true },
                { name: 'written_numbers', pattern: /\b(one|two|three|four|five|six|seven|eight|nine|ten)\s*(to\s*(one|two|three|four|five|six|seven|eight|nine|ten)\s*)?(words?|sentences?|paragraphs?|bullet\s*points?|items?|sections?|hashtags?)\b/i, weight: 1.0, exclusive: true },
                { name: 'exactly_spec', pattern: /\b(exactly|precisely|only|just)\s+(\d+|one|two|three|four|five)\s*(words?|sentences?|paragraphs?|sections?|points?|items?)\b/i, weight: 1.0, exclusive: true },
                { name: 'format_spec', pattern: /\b(as a list|in table format|as JSON|in markdown|bullet points|numbered list|outline format|structured as|formatted as)\b/i, weight: 0.9, exclusive: true },
                { name: 'structure_words', pattern: /\b(sections?|headers?|headings?|subheadings?|outline|structure|format|layout|template)\b/i, weight: 0.6, exclusive: false },
                { name: 'length_constraints', pattern: /\b(brief|detailed|comprehensive|concise|short|long|in-depth|thorough|summary|overview|under \d+ words)\b/i, weight: 0.5, exclusive: false },
                { name: 'output_type', pattern: /\b(email|article|report|summary|outline|script|code|essay|memo|proposal|presentation|documentation|LinkedIn post|blog post|social media post|tweet)\b/i, weight: 0.6, exclusive: false }
            ],
            structuralBonus: { declarative: 0.1, positionLate: 0.15 }
        },
        parameters: {
            signals: [
                { name: 'negative_constraint', pattern: /\b(don't|do not|avoid|exclude|without|never|no \w+|not including|skip|omit)\b/i, weight: 0.9, exclusive: true },
                { name: 'avoid_specific', pattern: /\b(avoid|don't use|do not use)\s+(buzzwords?|jargon|emojis?|clichés?|slang)\b/i, weight: 0.9, exclusive: true },
                { name: 'words_like', pattern: /\b(buzzwords? like|words? like|terms? like|phrases? like)\s*["']?[\w\s]+["']?\b/i, weight: 0.8, exclusive: true },
                { name: 'positive_requirement', pattern: /\b(must include|should have|required|needs to have|make sure to|ensure|always|include)\b/i, weight: 0.8, exclusive: true },
                { name: 'boundary_spec', pattern: /\b(maximum|minimum|at least|no more than|at most|limit|between \d+ and \d+|up to|under \d+ words|keep.+under)\b/i, weight: 0.9, exclusive: true },
                { name: 'keep_constraint', pattern: /\b(keep\s+(it|the|total|length|word count).+(under|below|short|brief|concise))\b/i, weight: 0.8, exclusive: true },
                { name: 'quality_requirement', pattern: /\b(accurate|factual|cite sources|reference|verified|evidence-based|data-driven|specific|precise)\b/i, weight: 0.6, exclusive: false },
                { name: 'conditional_rule', pattern: /\b(if|when|unless|only if|in case|provided that|as long as)\b.*\b(then|use|include|avoid)\b/i, weight: 0.7, exclusive: true }
            ],
            structuralBonus: { imperative: 0.15, positionLate: 0.2 }
        },
        audience: {
            signals: [
                { name: 'target_descriptor', pattern: /\b(for (beginners|experts|professionals|executives|managers|students|children|adults|seniors))\b/i, weight: 1.0, exclusive: true },
                { name: 'aimed_at', pattern: /\b(aimed at|targeted at|intended for|targeting|designed for|meant for|written for)\b/i, weight: 0.9, exclusive: true },
                { name: 'demographic_markers', pattern: /\b(age \d+|aged \d+|\d+-year-olds|millennials|gen z|baby boomers|young adults|teenagers|kids)\b/i, weight: 0.8, exclusive: true },
                { name: 'knowledge_level', pattern: /\b(who have no experience|familiar with|new to|experienced in|advanced|intermediate|beginner|novice)\b/i, weight: 0.7, exclusive: true },
                { name: 'reader_framing', pattern: /\b(the reader|readers|users|audience|viewers|listeners|subscribers|followers)\s+(should|will|can|need|want)\b/i, weight: 0.6, exclusive: true },
                { name: 'role_audience', pattern: /\b(for (developers|designers|marketers|teachers|parents|business owners|entrepreneurs))\b/i, weight: 0.8, exclusive: true }
            ],
            structuralBonus: { declarative: 0.1, positionMiddle: 0.1 }
        },
        tone: {
            signals: [
                { name: 'tone_words', pattern: /\b(friendly|formal|casual|professional|conversational|academic|playful|serious|humorous|authoritative|warm|cold)\b/i, weight: 0.8, exclusive: false },
                { name: 'emotional_quality', pattern: /\b(enthusiastic|calm|urgent|relaxed|confident|humble|empathetic|direct|gentle|firm|encouraging|supportive)\b/i, weight: 0.7, exclusive: false },
                { name: 'style_comparison', pattern: /\b(like a blog post|in academic style|newspaper style|in the style of|sounds like|write like)\b/i, weight: 0.9, exclusive: true },
                { name: 'voice_descriptors', pattern: /\b(conversational|authoritative|approachable|engaging|persuasive|informative|educational|entertaining)\b/i, weight: 0.6, exclusive: false },
                { name: 'tone_label', pattern: /\b(tone|voice|style)\s*:/i, weight: 1.0, exclusive: true }
            ],
            structuralBonus: { declarative: 0.1, positionLate: 0.1 }
        },
        examples: {
            signals: [
                { name: 'example_marker', pattern: /\b(for example|such as|like this|for instance|e\.g\.|sample|here's an example)\b/i, weight: 0.9, exclusive: true },
                { name: 'quoted_sample', pattern: /[""][^""]{10,}[""]/i, weight: 0.8, exclusive: true },
                { name: 'io_pair', pattern: /\b(input|output)\s*:/i, weight: 1.0, exclusive: true },
                { name: 'template_indicator', pattern: /\{[^}]+\}|\[[^\]]+\]|<[^>]+>/i, weight: 0.6, exclusive: false },
                { name: 'here_is_pattern', pattern: /\b(here is|here's|below is|following is|see example|example below)\b/i, weight: 0.8, exclusive: true }
            ],
            structuralBonus: { positionLate: 0.2, hasQuotes: 0.2 }
        }
    };

    // PromptAnalyzer Class
    class PromptAnalyzer {
        constructor() {
            this.indicators = CONTENT_INDICATORS;
            this.elementTypes = ELEMENT_TYPES;
        }

        analyze(prompt, selectedFramework = 'CRISP') {
            const segments = this.segmentPrompt(prompt);
            const analyzedSentences = segments.map((segment, index) =>
                this.analyzeSentence(segment, index, segments.length)
            );
            const elementSummary = this.aggregateElementScores(analyzedSentences);
            const frameworkFit = this.calculateFrameworkFit(elementSummary);
            const overallScore = this.calculateOverallScore(elementSummary, frameworkFit, selectedFramework);
            const feedback = this.generateFeedback(elementSummary, frameworkFit, selectedFramework);
            const techniques = this.detectTechniques(prompt);

            return { prompt, sentences: analyzedSentences, elementSummary, frameworkFit, overallScore, feedback, techniques };
        }

        segmentPrompt(prompt) {
            const rawSentences = prompt.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(s => s.length > 0);
            const segments = [];
            for (const sentence of rawSentences) {
                if (sentence.length > 150) {
                    const clauses = sentence.split(/(?:;\s*|:\s*(?=\d|-)|\s+(?:and|but|however|therefore)\s+)/i);
                    segments.push(...clauses.filter(c => c.trim().length > 5));
                } else {
                    segments.push(sentence);
                }
            }
            return segments.length > 0 ? segments : [prompt];
        }

        analyzeSentence(sentence, index, totalSentences) {
            const positionRatio = totalSentences > 1 ? index / (totalSentences - 1) : 0.5;
            const positionZone = positionRatio < 0.3 ? 'early' : positionRatio > 0.7 ? 'late' : 'middle';
            const structure = this.analyzeSentenceStructure(sentence);

            const elementScores = {};
            for (const [elementKey, elementData] of Object.entries(this.indicators)) {
                elementScores[elementKey] = this.scoreForElement(sentence, elementData, structure, positionZone);
            }

            const sortedElements = Object.entries(elementScores).sort((a, b) => b[1].score - a[1].score);
            const primaryElement = sortedElements[0][1].score > 20 ? sortedElements[0][0] : null;
            const secondaryElements = sortedElements.slice(1).filter(([_, data]) => data.score > 30).map(([key]) => key);

            return { text: sentence, index, positionRatio, positionZone, structure, elementScores, primaryElement, secondaryElements };
        }

        analyzeSentenceStructure(sentence) {
            const trimmed = sentence.trim();
            const words = trimmed.split(/\s+/);
            const firstWord = (words[0] || '').toLowerCase();

            const imperativeVerbs = ['write', 'create', 'generate', 'explain', 'analyze', 'summarize', 'list', 'describe', 'compare', 'design', 'draft', 'develop', 'build', 'make', 'provide', 'give', 'tell', 'show', 'help', 'ensure', 'include', 'avoid', 'use', 'consider', 'focus'];
            const startsWithImperative = imperativeVerbs.includes(firstWord);
            const isRequest = /^(can|could|would|will|please|I need|I want|I'd like)/i.test(trimmed);
            const hasFirstPerson = /\b(I|I'm|I've|I'll|we|we're|we've|my|our|me|us)\b/i.test(sentence);
            const hasSecondPerson = /\b(you|you're|you've|your|yours)\b/i.test(sentence);

            let type = 'declarative';
            if (/\?$/.test(trimmed)) type = 'interrogative';
            else if (/!$/.test(trimmed)) type = 'exclamatory';
            else if (startsWithImperative || isRequest) type = 'imperative';

            return {
                type,
                hasFirstPerson,
                hasSecondPerson,
                startsWithVerb: startsWithImperative,
                wordCount: words.length,
                hasQuotes: /[""]/.test(sentence),
                hasNumbers: /\d/.test(sentence)
            };
        }

        scoreForElement(sentence, elementData, structure, positionZone) {
            let totalScore = 0;
            let maxPossibleScore = 0;
            const signals = [];

            for (const signal of elementData.signals) {
                maxPossibleScore += signal.weight * 100;
                const matches = sentence.match(signal.pattern);
                if (matches) {
                    totalScore += signal.weight * 100;
                    signals.push({ name: signal.name, matched: matches[0], weight: signal.weight, exclusive: signal.exclusive });
                }
            }

            if (elementData.structuralBonus) {
                const bonus = elementData.structuralBonus;
                if (bonus.declarative && structure.type === 'declarative') totalScore *= (1 + bonus.declarative);
                if (bonus.imperative && structure.type === 'imperative') totalScore *= (1 + bonus.imperative);
                if (bonus.firstPerson && structure.hasFirstPerson) totalScore *= (1 + bonus.firstPerson);
                if (bonus.secondPerson && structure.hasSecondPerson) totalScore *= (1 + bonus.secondPerson);
                if (bonus.startsWithVerb && structure.startsWithVerb) totalScore *= (1 + bonus.startsWithVerb);
                if (bonus.hasQuotes && structure.hasQuotes) totalScore *= (1 + bonus.hasQuotes);
                if (bonus.positionEarly && positionZone === 'early') totalScore *= (1 + bonus.positionEarly);
                if (bonus.positionMiddle && positionZone === 'middle') totalScore *= (1 + bonus.positionMiddle);
                if (bonus.positionLate && positionZone === 'late') totalScore *= (1 + bonus.positionLate);
            }

            const normalizedScore = maxPossibleScore > 0 ? Math.min(100, (totalScore / maxPossibleScore) * 100) : 0;
            let confidence = 'low';
            if (normalizedScore > 60 || signals.some(s => s.exclusive && s.weight >= 0.8)) confidence = 'high';
            else if (normalizedScore > 30 || signals.length >= 2) confidence = 'medium';

            return { score: Math.round(normalizedScore), signals, confidence };
        }

        aggregateElementScores(analyzedSentences) {
            const summary = {};

            for (const elementKey of Object.keys(this.indicators)) {
                const contributingSentences = [];
                const excerpts = [];
                let totalWeightedScore = 0;
                let totalWeight = 0;
                let highestConfidence = 'low';

                for (const sentence of analyzedSentences) {
                    const elementScore = sentence.elementScores[elementKey];
                    if (elementScore.score > 20) {
                        const positionMultiplier = this.elementTypes[elementKey]?.positionWeight?.[sentence.positionZone] || 1.0;
                        totalWeightedScore += elementScore.score * positionMultiplier;
                        totalWeight += positionMultiplier;
                        contributingSentences.push(sentence.index);

                        for (const signal of elementScore.signals) {
                            if (signal.matched && !excerpts.find(e => e.text === signal.matched)) {
                                excerpts.push({ text: signal.matched, signalName: signal.name, sentenceIndex: sentence.index, fullSentence: sentence.text });
                            }
                        }

                        if (elementScore.confidence === 'high') highestConfidence = 'high';
                        else if (elementScore.confidence === 'medium' && highestConfidence === 'low') highestConfidence = 'medium';
                    }
                }

                const aggregateScore = totalWeight > 0 ? Math.min(100, Math.round(totalWeightedScore / totalWeight)) : 0;
                const detected = aggregateScore > 25 || excerpts.length > 0;

                summary[elementKey] = {
                    detected,
                    confidence: detected ? highestConfidence : 'none',
                    score: aggregateScore,
                    excerpts: excerpts.slice(0, 5),
                    contributingSentences,
                    suggestions: detected ? [] : this.getSuggestions(elementKey)
                };
            }

            return summary;
        }

        calculateFrameworkFit(elementSummary) {
            const frameworksUnique = {
                CRISP: ['context', 'role', 'instruction', 'specifics', 'parameters'],
                COSTAR: ['context', 'instruction', 'tone', 'audience', 'specifics'],
                CRISPE: ['context', 'role', 'instruction', 'specifics', 'parameters', 'examples']
            };

            const fit = {};
            for (const [frameworkName, elements] of Object.entries(frameworksUnique)) {
                let totalScore = 0;
                let detected = 0;
                const missing = [];

                for (const element of elements) {
                    const elementData = elementSummary[element];
                    if (elementData?.detected) {
                        totalScore += elementData.score;
                        detected++;
                    } else {
                        missing.push(element);
                    }
                }

                fit[frameworkName] = {
                    score: elements.length > 0 ? Math.round(totalScore / elements.length) : 0,
                    missingElements: missing,
                    coverage: `${detected}/${elements.length}`,
                    coverageRatio: detected / elements.length
                };
            }

            return fit;
        }

        calculateOverallScore(elementSummary, frameworkFit, selectedFramework) {
            const frameworkScore = (frameworkFit[selectedFramework]?.coverageRatio || 0) * 100;
            const detectedElements = Object.values(elementSummary).filter(e => e.detected);
            const avgElementScore = detectedElements.length > 0 ? detectedElements.reduce((sum, e) => sum + e.score, 0) / detectedElements.length : 0;

            // Structural bonus for having key elements
            let structuralScore = 0;
            if (elementSummary.instruction?.detected) structuralScore += 50;
            if (elementSummary.context?.detected) structuralScore += 30;
            if (elementSummary.role?.detected || elementSummary.audience?.detected) structuralScore += 20;

            // Confidence bonus - reward high-confidence detections
            const highConfidenceCount = detectedElements.filter(e => e.confidence === 'high').length;
            const confidenceBonus = highConfidenceCount * 4; // Up to 32 points for 8 high-confidence

            // Extra elements bonus - reward detecting elements beyond framework requirements
            const frameworkElements = {
                CRISP: ['context', 'role', 'instruction', 'specifics', 'parameters'],
                COSTAR: ['context', 'instruction', 'tone', 'audience', 'specifics'],
                CRISPE: ['context', 'role', 'instruction', 'specifics', 'parameters', 'examples']
            };
            const requiredCount = frameworkElements[selectedFramework]?.length || 5;
            const extraElementsCount = Math.max(0, detectedElements.length - requiredCount);
            const extraElementsBonus = extraElementsCount * 5; // Bonus for tone, examples, etc beyond framework

            // Richness bonus - reward comprehensive prompts
            const richnessBonus = detectedElements.length >= 6 ? 8 : detectedElements.length >= 5 ? 5 : 0;

            // Calculate base score with adjusted weights
            const baseScore = frameworkScore * 0.45 + avgElementScore * 0.25 + structuralScore * 0.20;

            // Add bonuses (capped contribution)
            const totalBonus = Math.min(20, (confidenceBonus + extraElementsBonus + richnessBonus) * 0.5);

            return Math.min(100, Math.max(0, Math.round(baseScore + totalBonus)));
        }

        generateFeedback(elementSummary, frameworkFit, selectedFramework) {
            const feedback = { strengths: [], improvements: [], quickWins: [], missingCritical: [] };
            const frameworkElements = {
                CRISP: ['context', 'role', 'instruction', 'specifics', 'parameters'],
                COSTAR: ['context', 'instruction', 'tone', 'audience', 'specifics'],
                CRISPE: ['context', 'role', 'instruction', 'specifics', 'parameters', 'examples']
            };

            const relevantElements = frameworkElements[selectedFramework] || frameworkElements.CRISP;
            const criticalElements = ['instruction', 'context'];

            // Identify strengths
            for (const [elementKey, data] of Object.entries(elementSummary)) {
                if (data.detected) {
                    const elementType = this.elementTypes[elementKey];
                    const message = data.confidence === 'high'
                        ? `Strong ${elementType?.name || elementKey} - clearly defined`
                        : `${elementType?.name || elementKey} detected but could be more explicit`;
                    feedback.strengths.push({
                        element: elementKey,
                        name: elementType?.name || elementKey,
                        letter: elementType?.letter || '',
                        message,
                        excerpts: data.excerpts.slice(0, 2).map(e => e.text)
                    });
                }
            }

            // Identify improvements
            for (const elementKey of relevantElements) {
                const data = elementSummary[elementKey];
                if (!data?.detected) {
                    const elementType = this.elementTypes[elementKey];
                    const isCritical = criticalElements.includes(elementKey);
                    const suggestion = this.getSuggestions(elementKey);

                    const improvement = {
                        element: elementKey,
                        name: elementType?.name || elementKey,
                        letter: elementType?.letter || '',
                        priority: isCritical ? 'high' : 'medium',
                        message: `Add ${elementType?.name || elementKey}`,
                        tip: suggestion.tip,
                        example: suggestion.example
                    };

                    if (isCritical) feedback.missingCritical.push(improvement);
                    feedback.improvements.push(improvement);
                } else if (data.confidence === 'low' && relevantElements.includes(elementKey)) {
                    const elementType = this.elementTypes[elementKey];
                    const suggestion = this.getSuggestions(elementKey);
                    feedback.quickWins.push({
                        element: elementKey,
                        name: elementType?.name || elementKey,
                        letter: elementType?.letter || '',
                        message: `Strengthen your ${elementType?.name || elementKey}`,
                        tip: suggestion.tip,
                        currentExcerpt: data.excerpts[0]?.text || null
                    });
                }
            }

            feedback.improvements.sort((a, b) => (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1));
            return feedback;
        }

        getSuggestions(elementKey) {
            const suggestions = {
                context: { tip: 'Add background: "I\'m working on..." or "Context: Our company is..."', example: 'Context: I\'m a marketing manager at a B2B SaaS startup launching our first product.' },
                role: { tip: 'Define the AI persona: "Act as..." or "You are an expert..."', example: 'Act as a senior content strategist with 10 years of B2B marketing experience.' },
                instruction: { tip: 'State what you want clearly: Start with "Write...", "Create...", "Analyze..."', example: 'Create a comprehensive content calendar for our Q1 product launch.' },
                specifics: { tip: 'Define format and length: "Write 500 words as a bulleted list..."', example: 'Format as a table with columns: Topic, Platform, Publish Date, KPIs.' },
                parameters: { tip: 'Add constraints: "Avoid...", "Must include...", "Maximum of..."', example: 'Must include 3 blog posts per week. Avoid overly technical jargon.' },
                audience: { tip: 'Specify who this is for: "For beginners who...", "Targeting executives..."', example: 'Target audience: CTOs and engineering leads with limited marketing knowledge.' },
                tone: { tip: 'Define the voice: "Use a professional but friendly tone..."', example: 'Tone should be authoritative yet approachable, like Harvard Business Review.' },
                examples: { tip: 'Provide a sample: "Example output: [your example]" or show input/output pairs', example: 'Example: "Weekly Sync: 3 key wins, 2 challenges, 1 ask for next week"' }
            };
            return suggestions[elementKey] || { tip: 'Add more detail', example: '' };
        }

        detectTechniques(prompt) {
            const detectedTechniques = [];

            for (const [techniqueKey, technique] of Object.entries(TECHNIQUE_PATTERNS)) {
                let totalWeight = 0;
                let maxWeight = 0;
                const matchedSignals = [];

                for (const signal of technique.signals) {
                    maxWeight += signal.weight;
                    const match = prompt.match(signal.pattern);
                    if (match) {
                        totalWeight += signal.weight;
                        matchedSignals.push({
                            matched: match[0],
                            weight: signal.weight
                        });
                    }
                }

                // Calculate confidence based on weighted matches
                const score = maxWeight > 0 ? (totalWeight / maxWeight) * 100 : 0;

                // Only include if we have meaningful detection (at least one strong signal or multiple weak signals)
                if (score >= 20 || (matchedSignals.length >= 2 && score >= 15)) {
                    let confidence = 'low';
                    if (score >= 60 || matchedSignals.some(s => s.weight >= 1.0)) {
                        confidence = 'high';
                    } else if (score >= 35 || matchedSignals.length >= 2) {
                        confidence = 'medium';
                    }

                    detectedTechniques.push({
                        id: technique.id,
                        key: techniqueKey,
                        name: technique.name,
                        description: technique.description,
                        learnUrl: technique.learnUrl,
                        score: Math.round(score),
                        confidence,
                        matchedSignals
                    });
                }
            }

            // Sort by confidence (high first) then by score
            const confidenceOrder = { high: 0, medium: 1, low: 2 };
            detectedTechniques.sort((a, b) => {
                if (confidenceOrder[a.confidence] !== confidenceOrder[b.confidence]) {
                    return confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
                }
                return b.score - a.score;
            });

            return detectedTechniques;
        }
    }

    // Analyzer Display Class
    class AnalyzerDisplay {
        constructor(containerElement) {
            this.container = containerElement;
            this.analyzer = new PromptAnalyzer();
        }

        displayAnalysis(prompt, selectedFramework = 'CRISP') {
            const results = this.analyzer.analyze(prompt, selectedFramework);
            this.render(results, selectedFramework);
            return results;
        }

        render(results, selectedFramework) {
            const { overallScore, elementSummary, frameworkFit, feedback, techniques } = results;

            this.container.innerHTML = `
                ${this.renderOverallScore(overallScore)}
                ${this.renderElementDetection(elementSummary, selectedFramework)}
                ${this.renderTechniquesDetected(techniques)}
                ${this.renderFrameworkCoverage(frameworkFit, selectedFramework)}
                ${this.renderExcerptHighlights(elementSummary)}
                ${this.renderStrengths(feedback.strengths)}
                ${this.renderImprovements(feedback.improvements, feedback.quickWins, selectedFramework, elementSummary)}
                ${this.renderCTA()}
            `;

            this.container.classList.add('visible');
        }

        renderOverallScore(score) {
            const scoreClass = getScoreClass(score);
            const messages = {
                'score-excellent': 'Excellent prompt structure! You\'ve covered the key elements.',
                'score-good': 'Good foundation! Adding a few more elements will strengthen your prompt.',
                'score-fair': 'Your prompt has some elements but is missing key components.',
                'score-poor': 'Your prompt needs more structure. Try adding the suggested elements below.'
            };

            return `
                <div class="score-main">
                    <div class="score-circle ${scoreClass}">
                        <span class="score-value">${score}</span>
                        <span class="score-label">Overall</span>
                    </div>
                    <p class="score-message ${scoreClass}">${messages[scoreClass]}</p>
                </div>
            `;
        }

        renderElementDetection(elementSummary, selectedFramework) {
            const frameworkElements = {
                CRISP: ['context', 'role', 'instruction', 'specifics', 'parameters'],
                COSTAR: ['context', 'instruction', 'tone', 'audience', 'specifics'],
                CRISPE: ['context', 'role', 'instruction', 'specifics', 'parameters', 'examples']
            };

            const relevantElements = frameworkElements[selectedFramework];

            const elementsHTML = relevantElements.map(elementKey => {
                const data = elementSummary[elementKey];
                const type = ELEMENT_TYPES[elementKey];
                const statusClass = data?.detected ? 'detected' : 'missing';
                const confidenceClass = data?.confidence || 'none';

                const icon = data?.detected
                    ? '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>'
                    : '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

                return `
                    <div class="element-pill ${statusClass} confidence-${confidenceClass}" title="${data?.detected ? 'Detected with ' + confidenceClass + ' confidence' : type?.description || ''}">
                        <span class="element-letter">${type?.letter || ''}</span>
                        <span class="element-name">${type?.name || elementKey}</span>
                        ${icon}
                    </div>
                `;
            }).join('');

            const detectedCount = relevantElements.filter(e => elementSummary[e]?.detected).length;

            return `
                <div class="framework-elements" id="framework-elements">
                    <h4>Detected Elements (${selectedFramework})</h4>
                    <div class="elements-display" id="elements-display">
                        ${elementsHTML}
                    </div>
                    <p class="framework-coverage">${detectedCount}/${relevantElements.length} elements detected</p>
                </div>
            `;
        }

        renderTechniquesDetected(techniques) {
            if (!techniques || techniques.length === 0) {
                return `
                    <div class="techniques-section techniques-empty">
                        <h4>Prompting Techniques</h4>
                        <p class="techniques-hint">No advanced techniques detected. Consider using methods like <a href="../learn/flipped-interaction.html">Flipped Interaction</a>, Chain of Thought, or Role Prompting to enhance your prompts.</p>
                    </div>
                `;
            }

            const truncate = (text, max) => text.length <= max ? text : text.substring(0, max - 3) + '...';

            const techniquesHTML = techniques.map(t => {
                const confidenceClass = `confidence-${t.confidence}`;
                const icon = t.confidence === 'high'
                    ? '<svg class="technique-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>'
                    : '<svg class="technique-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>';

                const matchPreview = t.matchedSignals.length > 0
                    ? `<span class="technique-match">"${escapeHtml(truncate(t.matchedSignals[0].matched, 30))}"</span>`
                    : '';

                return `
                    <div class="technique-badge ${confidenceClass}" data-technique="${escapeHtml(t.id)}">
                        ${icon}
                        <div class="technique-info">
                            <span class="technique-name">${escapeHtml(t.name)}</span>
                            <span class="technique-desc">${escapeHtml(t.description)}</span>
                            ${matchPreview}
                        </div>
                        <a href="../${escapeHtml(t.learnUrl)}" class="technique-learn" title="Learn more">Learn</a>
                    </div>
                `;
            }).join('');

            return `
                <div class="techniques-section">
                    <h4>Prompting Techniques Detected</h4>
                    <div class="techniques-grid">
                        ${techniquesHTML}
                    </div>
                </div>
            `;
        }

        renderExcerptHighlights(elementSummary) {
            const allExcerpts = [];

            for (const [elementKey, data] of Object.entries(elementSummary)) {
                if (data.detected && data.excerpts?.length > 0) {
                    const type = ELEMENT_TYPES[elementKey];
                    for (const excerpt of data.excerpts.slice(0, 2)) {
                        allExcerpts.push({
                            element: elementKey,
                            elementName: type?.name || elementKey,
                            letter: type?.letter || '',
                            text: excerpt.text,
                            signal: excerpt.signalName
                        });
                    }
                }
            }

            if (allExcerpts.length === 0) return '';

            const truncate = (text, max) => text.length <= max ? text : text.substring(0, max - 3) + '...';
            const formatSignal = (name) => name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            const excerptsHTML = allExcerpts.slice(0, 6).map(e => `
                <div class="excerpt-card" data-element="${escapeHtml(e.element)}">
                    <span class="excerpt-element-badge">${escapeHtml(e.letter)}</span>
                    <div class="excerpt-content">
                        <span class="excerpt-label">${escapeHtml(e.elementName)}</span>
                        <p class="excerpt-text">"${escapeHtml(truncate(e.text, 50))}"</p>
                        ${e.signal ? `<span class="excerpt-signal">Detected: ${escapeHtml(formatSignal(e.signal))}</span>` : ''}
                    </div>
                </div>
            `).join('');

            return `
                <div class="excerpts-section">
                    <h4>What We Detected</h4>
                    <div class="excerpts-grid">
                        ${excerptsHTML}
                    </div>
                </div>
            `;
        }

        renderStrengths(strengths) {
            if (strengths.length === 0) return '';

            const truncate = (text, max) => text.length <= max ? text : text.substring(0, max - 3) + '...';

            return `
                <div class="feedback-section feedback-strengths">
                    <h4>What You Did Well</h4>
                    <ul class="feedback-list">
                        ${strengths.map(s => `
                            <li>
                                <span class="element-badge element-badge-success">${escapeHtml(s.letter)}</span>
                                <div class="feedback-content">
                                    <span class="feedback-text">${escapeHtml(s.message)}</span>
                                    ${s.excerpts?.length > 0 ? `<span class="feedback-excerpt">"${escapeHtml(truncate(s.excerpts[0], 40))}"</span>` : ''}
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        renderImprovements(improvements, quickWins, selectedFramework = 'CRISP', elementSummary = {}) {
            if (improvements.length === 0 && quickWins.length === 0) {
                // Generate framework-aware success message
                let successTip = '';
                const hasExamples = elementSummary.examples?.detected;
                const hasTone = elementSummary.tone?.detected;

                if (selectedFramework === 'CRISP') {
                    // CRISP doesn't require examples, but they're a nice bonus
                    if (!hasExamples && !hasTone) {
                        successTip = 'For even better results, consider adding tone guidance or examples.';
                    } else if (!hasExamples) {
                        successTip = 'Adding an example of desired output can help get more consistent results.';
                    } else {
                        successTip = 'You\'ve gone above and beyond with examples - great job!';
                    }
                } else if (selectedFramework === 'CRISPE') {
                    // CRISPE includes examples as a core element
                    successTip = hasExamples
                        ? 'Your examples help ensure consistent, high-quality outputs.'
                        : 'Consider strengthening your examples section for even better results.';
                } else if (selectedFramework === 'COSTAR') {
                    successTip = 'Your prompt has excellent structure for content creation.';
                }

                return `
                    <div class="feedback-section feedback-perfect">
                        <h4>Excellent Work!</h4>
                        <p>Your prompt covers all the key ${selectedFramework} elements. ${successTip}</p>
                    </div>
                `;
            }

            const quickWinsHTML = quickWins.length > 0 ? `
                <div class="quick-wins">
                    <h5>Quick Wins</h5>
                    ${quickWins.slice(0, 2).map(q => `
                        <div class="quick-win-card">
                            <span class="element-badge">${q.letter}</span>
                            <div>
                                <p class="quick-win-message">${q.message}</p>
                                <p class="quick-win-tip">${q.tip}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : '';

            const improvementsHTML = improvements.slice(0, 4).map(i => `
                <div class="feedback-card ${i.priority === 'high' ? 'priority-high' : ''}">
                    <div class="feedback-card-header">
                        <span class="element-badge">${i.letter}</span>
                        <span class="feedback-category">${i.name}</span>
                        ${i.priority === 'high' ? '<span class="priority-badge">Important</span>' : ''}
                    </div>
                    <p class="feedback-tip">${i.tip}</p>
                    <p class="feedback-example"><strong>Example:</strong> ${i.example}</p>
                </div>
            `).join('');

            return `
                <div class="feedback-section feedback-improvements">
                    <h4>How to Improve</h4>
                    ${quickWinsHTML}
                    <div class="feedback-cards">
                        ${improvementsHTML}
                    </div>
                </div>
            `;
        }

        renderFrameworkCoverage(frameworkFit, selectedFramework) {
            const selected = frameworkFit[selectedFramework];

            return `
                <div class="sub-scores">
                    <div class="sub-score">
                        <div class="sub-score-bar">
                            <div class="sub-score-fill ${getScoreClass(selected.coverageRatio * 100)}" style="width: ${selected.coverageRatio * 100}%"></div>
                        </div>
                        <span class="sub-score-label">${selectedFramework} Coverage</span>
                        <span class="sub-score-value">${selected.coverage}</span>
                    </div>
                </div>
            `;
        }

        renderCTA() {
            return `
                <div class="feedback-cta">
                    <p>Want to learn more about these frameworks?</p>
                    <div class="feedback-cta-links">
                        <a href="../learn/crisp.html" class="btn btn-outline btn-sm">CRISP Method</a>
                        <a href="../learn/costar.html" class="btn btn-outline btn-sm">COSTAR Method</a>
                        <a href="../learn/crispe.html" class="btn btn-outline btn-sm">CRISPE Method</a>
                    </div>
                </div>
            `;
        }
    }

    // Initialize Analyzer Page
    const analyzerForm = document.getElementById('analyzer-form');
    const analyzerPromptInput = document.getElementById('prompt-input');
    const analysisDisplay = document.getElementById('analysis-display');
    const frameworkSelector = document.getElementById('framework-selector');

    if (analyzerForm && analyzerPromptInput && analysisDisplay) {
        const display = new AnalyzerDisplay(analysisDisplay);

        analyzerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const prompt = analyzerPromptInput.value.trim();
            const selectedFramework = frameworkSelector?.value || 'CRISP';

            if (prompt.length < 10) {
                showToast('Please enter a longer prompt to analyze', 'error');
                return;
            }

            display.displayAnalysis(prompt, selectedFramework);
        });

        if (frameworkSelector) {
            frameworkSelector.addEventListener('change', () => {
                const prompt = analyzerPromptInput.value.trim();
                const selectedFramework = frameworkSelector.value;
                if (prompt.length >= 10) {
                    display.displayAnalysis(prompt, selectedFramework);
                }
            });
        }
    }

    // ==========================================
    // TOOL PAGE: PROMPT BUILDER (Guidance)
    // ==========================================

    const BUILDER_QUESTIONS = {
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

    const BuilderState = {
        methodology: 'CRISP',
        answers: {}
    };

    function renderBuilderQuestions(methodology) {
        const container = document.getElementById('guided-questions');
        if (!container) return;

        const questions = BUILDER_QUESTIONS[methodology];
        if (!questions) return;

        BuilderState.answers = {};

        let html = '';
        questions.forEach(q => {
            const fullWidthClass = q.fullWidth ? ' data-fullwidth="true"' : '';
            const optionalClass = q.optional ? ' guided-letter-optional' : '';
            html += `
                <div class="guided-question" data-element="${q.key}"${fullWidthClass}>
                    <label for="builder-${q.key}" class="guided-label">
                        <span class="guided-letter${optionalClass}">${q.letter}</span>
                        ${q.label}${q.optional ? ' (optional)' : ''}
                    </label>
                    <textarea id="builder-${q.key}" class="guided-input" placeholder="${q.placeholder}" rows="2"></textarea>
                </div>
            `;
        });

        container.innerHTML = html;

        container.querySelectorAll('.guided-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const element = e.target.closest('.guided-question')?.dataset.element;
                if (element) {
                    BuilderState.answers[element] = e.target.value;
                }
            });
        });
    }

    function combineBuilderAnswers() {
        const outputSection = document.getElementById('output-section');
        const outputTextarea = document.getElementById('combined-output');
        if (!outputSection || !outputTextarea) return;

        const methodology = BuilderState.methodology;
        const answers = BuilderState.answers;

        let parts = [];

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

        if (combined.trim()) {
            outputTextarea.value = combined;
            outputSection.hidden = false;
            showToast('Prompt combined! Copy it or send to the Analyzer.', 'success');
        } else {
            showToast('Please fill in at least one field.', 'error');
        }
    }

    // Initialize Builder Page
    const methodologySelector = document.getElementById('methodology-selector');
    const combineBtn = document.getElementById('combine-prompt-btn');
    const copyBtn = document.getElementById('copy-btn');
    const guidedQuestionsContainer = document.getElementById('guided-questions');

    if (methodologySelector && guidedQuestionsContainer && combineBtn) {
        // Initial render
        renderBuilderQuestions('CRISP');

        // Methodology buttons
        methodologySelector.querySelectorAll('.methodology-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const method = btn.dataset.method;
                BuilderState.methodology = method;

                methodologySelector.querySelectorAll('.methodology-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                renderBuilderQuestions(method);
            });
        });

        // Combine button
        combineBtn.addEventListener('click', combineBuilderAnswers);

        // Copy button
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const outputTextarea = document.getElementById('combined-output');
                if (outputTextarea && outputTextarea.value) {
                    navigator.clipboard.writeText(outputTextarea.value).then(() => {
                        showToast('Copied to clipboard!', 'success');
                    }).catch(() => {
                        outputTextarea.select();
                        document.execCommand('copy');
                        showToast('Copied to clipboard!', 'success');
                    });
                }
            });
        }
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
});
