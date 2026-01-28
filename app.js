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
    // FLOATING PARTICLES ANIMATION
    // ==========================================
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Random animation delay and duration
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';

            // Random opacity
            particle.style.opacity = Math.random() * 0.4 + 0.1;

            particlesContainer.appendChild(particle);
        }
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
            feedback: generateFeedback(clarity, specificity, structure, context)
        };
    }

    function generateFeedback(clarity, specificity, structure, context) {
        const feedback = [];

        if (clarity < 60) feedback.push('Use shorter, clearer sentences for better understanding.');
        if (specificity < 60) feedback.push('Add more specific details about what you want.');
        if (structure < 60) feedback.push('Organize your prompt with clear sections or steps.');
        if (context < 60) feedback.push('Provide more background context for better results.');

        if (feedback.length === 0) {
            feedback.push('Great prompt! Consider adding examples for even better results.');
        }

        return feedback;
    }

    function displayScores(scores) {
        scoreDisplay.innerHTML = `
            <div class="score-main">
                <div class="score-circle ${getScoreClass(scores.overall)}">
                    <span class="score-value">${scores.overall}</span>
                    <span class="score-label">Overall</span>
                </div>
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
            <div class="feedback-section">
                <h4>Suggestions</h4>
                <ul class="feedback-list">
                    ${scores.feedback.map(f => `<li>${f}</li>`).join('')}
                </ul>
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
