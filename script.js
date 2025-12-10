// Storage key for LocalStorage
const STORAGE_KEY = 'textFeedbackIdeas';

// Initialize LocalStorage if needed
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

// Get all ideas from storage
function getIdeas() {
    initStorage();
    const ideas = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // Filter out old ideas without category (migration)
    const validIdeas = ideas.filter(idea => idea.category);

    // Save cleaned ideas if any were removed
    if (validIdeas.length !== ideas.length) {
        saveIdeas(validIdeas);
    }

    return validIdeas;
}

// Save ideas to storage
function saveIdeas(ideas) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

// Auto-feedback rules - analyze text and generate automatic feedback
function generateAutoFeedback(text) {
    const feedback = [];
    const lowerText = text.toLowerCase();

    // Rule 1: KI / AI - Ethics concerns
    if (lowerText.includes('ki') || lowerText.includes('künstliche intelligenz') || lowerText.includes('ai')) {
        feedback.push({
            type: 'auto',
            text: '⚠️ Ethische Überlegungen: Ihr Text erwähnt Künstliche Intelligenz. Bedenken Sie potenzielle ethische Fragestellungen wie Datenschutz, Bias, Transparenz und gesellschaftliche Auswirkungen.',
            trigger: 'KI/AI'
        });
    }

    // Rule 2: Datenschutz
    if (lowerText.includes('datenschutz') || lowerText.includes('daten') || lowerText.includes('privat')) {
        feedback.push({
            type: 'auto',
            text: '🔒 Datenschutzhinweis: Ihr Text behandelt Datenschutzthemen. Stellen Sie sicher, dass DSGVO-Richtlinien und Datensicherheitsmaßnahmen berücksichtigt werden.',
            trigger: 'Datenschutz'
        });
    }

    // Rule 3: Innovation / Zukunft
    if (lowerText.includes('innovation') || lowerText.includes('zukunft') || lowerText.includes('revolution')) {
        feedback.push({
            type: 'auto',
            text: '🚀 Innovationsgedanke: Ihr Text zeigt visionäres Denken. Erwägen Sie, konkrete Umsetzungsschritte und Machbarkeit zu beschreiben.',
            trigger: 'Innovation'
        });
    }

    // Rule 4: Nachhaltigkeit / Umwelt
    if (lowerText.includes('nachhaltig') || lowerText.includes('umwelt') || lowerText.includes('klima') || lowerText.includes('öko')) {
        feedback.push({
            type: 'auto',
            text: '🌱 Nachhaltigkeitsaspekt: Ihr Text berücksichtigt Umweltthemen. Denken Sie an langfristige ökologische Auswirkungen und CO2-Bilanz.',
            trigger: 'Nachhaltigkeit'
        });
    }

    // Rule 5: Technologie
    if (lowerText.includes('technologie') || lowerText.includes('digital') || lowerText.includes('software')) {
        feedback.push({
            type: 'auto',
            text: '💻 Technologiefokus: Ihr Text ist technologieorientiert. Beachten Sie Barrierefreiheit, Benutzerfreundlichkeit und technische Skalierbarkeit.',
            trigger: 'Technologie'
        });
    }

    // Rule 6: Gesellschaft / Sozial
    if (lowerText.includes('gesellschaft') || lowerText.includes('sozial') || lowerText.includes('gemeinschaft')) {
        feedback.push({
            type: 'auto',
            text: '👥 Sozialer Kontext: Ihr Text hat gesellschaftliche Relevanz. Berücksichtigen Sie verschiedene Perspektiven und soziale Gerechtigkeit.',
            trigger: 'Gesellschaft'
        });
    }

    // Rule 7: Wirtschaft / Business
    if (lowerText.includes('wirtschaft') || lowerText.includes('business') || lowerText.includes('markt') || lowerText.includes('geschäft')) {
        feedback.push({
            type: 'auto',
            text: '💼 Wirtschaftlicher Aspekt: Ihr Text hat ökonomische Dimensionen. Analysieren Sie Marktpotenzial, Wettbewerb und Geschäftsmodelle.',
            trigger: 'Wirtschaft'
        });
    }

    // Rule 8: Bildung / Lernen
    if (lowerText.includes('bildung') || lowerText.includes('lernen') || lowerText.includes('ausbildung') || lowerText.includes('wissen')) {
        feedback.push({
            type: 'auto',
            text: '📚 Bildungsrelevanz: Ihr Text tangiert Bildungsthemen. Überlegen Sie, wie Wissen vermittelt und Zugänglichkeit gewährleistet werden kann.',
            trigger: 'Bildung'
        });
    }

    // Rule 9: Gesundheit
    if (lowerText.includes('gesundheit') || lowerText.includes('medizin') || lowerText.includes('patient')) {
        feedback.push({
            type: 'auto',
            text: '⚕️ Gesundheitsaspekt: Ihr Text behandelt gesundheitsbezogene Themen. Beachten Sie medizinische Standards, Sicherheit und Patientenwohl.',
            trigger: 'Gesundheit'
        });
    }

    // Rule 10: Sicherheit
    if (lowerText.includes('sicherheit') || lowerText.includes('schutz') || lowerText.includes('risiko')) {
        feedback.push({
            type: 'auto',
            text: '🛡️ Sicherheitsüberlegung: Ihr Text spricht Sicherheitsaspekte an. Führen Sie eine Risikoanalyse durch und entwickeln Sie Schutzmaßnahmen.',
            trigger: 'Sicherheit'
        });
    }

    // General text quality feedback
    if (text.length < 100) {
        feedback.push({
            type: 'auto',
            text: '📝 Textlänge: Ihr Text ist recht kurz. Ausführlichere Beschreibungen können zu detaillierterem Feedback führen.',
            trigger: 'Länge'
        });
    } else if (text.length > 2000) {
        feedback.push({
            type: 'auto',
            text: '📖 Umfangreicher Text: Ihr Text ist sehr ausführlich. Erwägen Sie eine Strukturierung in Absätze für bessere Lesbarkeit.',
            trigger: 'Länge'
        });
    }

    return feedback;
}

// Submit idea form handler
if (document.getElementById('ideaForm')) {
    const form = document.getElementById('ideaForm');
    const charCount = document.getElementById('charCount');
    const ideaText = document.getElementById('ideaText');

    // Character counter
    ideaText.addEventListener('input', () => {
        charCount.textContent = ideaText.value.length;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const author = document.getElementById('authorName').value.trim() || 'Anonym';
        const title = document.getElementById('ideaTitle').value.trim();
        const text = ideaText.value.trim();
        const category = document.getElementById('textCategory').value;
        const genre = document.getElementById('textGenre').value;

        if (!title || !text || !category) {
            alert('Bitte füllen Sie alle Pflichtfelder aus.');
            return;
        }

        // Generate auto feedback
        const autoFeedback = generateAutoFeedback(text);

        // Create new idea object
        const idea = {
            id: Date.now(),
            author: author,
            title: title,
            text: text,
            category: category,
            genre: genre,
            timestamp: new Date().toISOString(),
            autoFeedback: autoFeedback,
            userFeedback: [],
            overallRatings: []
        };

        // Save to storage
        const ideas = getIdeas();
        ideas.unshift(idea); // Add to beginning
        saveIdeas(ideas);

        // Show success message
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
    });
}

// Load and display ideas on feedback page
if (document.getElementById('ideasContainer')) {
    loadIdeas();
}

function loadIdeas() {
    const ideas = getIdeas();
    const container = document.getElementById('ideasContainer');
    const noIdeasMessage = document.getElementById('noIdeasMessage');

    if (ideas.length === 0) {
        container.style.display = 'none';
        noIdeasMessage.style.display = 'block';
        return;
    }

    container.innerHTML = '';
    ideas.forEach((idea, index) => {
        const ideaCard = createIdeaCard(idea, index);
        container.appendChild(ideaCard);
    });
}

function createIdeaCard(idea, index, showFeedbackButtons = false) {
    const card = document.createElement('div');
    card.className = 'idea-card';

    const date = new Date(idea.timestamp);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Get category and genre labels
    const categoryLabel = getCategoryLabel(idea.category);
    const genreLabel = idea.genre ? getGenreLabel(idea.genre) : '';

    card.innerHTML = `
        <div class="idea-header">
            <div>
                <h2 class="idea-title">${escapeHtml(idea.title)}</h2>
                <div class="idea-meta">
                    von <strong>${escapeHtml(idea.author)}</strong> • ${formattedDate}
                </div>
                <div class="idea-categories">
                    <span class="category-badge">${categoryLabel}</span>
                    ${genreLabel ? `<span class="genre-badge">${genreLabel}</span>` : ''}
                </div>
            </div>
        </div>

        <div class="idea-content" id="idea-content-${idea.id}" data-idea-id="${idea.id}">${escapeHtml(idea.text)}</div>

        <div class="feedback-section">
            <div class="auto-feedback-container">
                <h3 class="feedback-header">🤖 Automatisches Feedback</h3>
                ${idea.autoFeedback.length > 0
                    ? idea.autoFeedback.map(fb => `
                        <div class="feedback-item auto">
                            <div class="feedback-meta">
                                <span class="feedback-author">System-Analyse</span>
                                <span>${fb.trigger}</span>
                            </div>
                            <div class="feedback-text">${fb.text}</div>
                        </div>
                    `).join('')
                    : '<p style="color: var(--text-dim);">Keine automatischen Hinweise gefunden.</p>'
                }
            </div>

            <div class="user-feedback-container">
                <h3 class="feedback-header">💬 Nutzer-Feedback (${idea.userFeedback.length})</h3>
                <div id="userFeedbackList-${idea.id}">
                    ${idea.userFeedback.length > 0
                        ? idea.userFeedback.map(fb => createUserFeedbackHTML(fb)).join('')
                        : '<p style="color: var(--text-dim);">Noch kein Nutzer-Feedback vorhanden. Seien Sie der Erste!</p>'
                    }
                </div>
                ${showFeedbackButtons ? `
                <div class="feedback-buttons">
                    <button class="btn btn-primary add-feedback-btn" onclick="openFeedbackModal(${idea.id})">
                        <span class="btn-icon">💭</span>
                        Feedback zu Passage
                    </button>
                    <button class="btn btn-secondary add-feedback-btn" onclick="openOverallRatingModal(${idea.id})">
                        <span class="btn-icon">⭐</span>
                        Gesamtbewertung
                    </button>
                </div>
                ` : ''}
            </div>

            <div class="overall-ratings-container">
                <h3 class="feedback-header">⭐ Gesamtbewertungen (${idea.overallRatings ? idea.overallRatings.length : 0})</h3>
                <div id="overallRatingsList-${idea.id}">
                    ${idea.overallRatings && idea.overallRatings.length > 0
                        ? idea.overallRatings.map(rating => createOverallRatingHTML(rating)).join('')
                        : '<p style="color: var(--text-dim);">Noch keine Gesamtbewertungen vorhanden.</p>'
                    }
                </div>
            </div>
        </div>
    `;

    // Add click listener for text selection on the idea content
    setTimeout(() => {
        const contentElement = document.getElementById(`idea-content-${idea.id}`);
        if (contentElement) {
            contentElement.style.cursor = 'text';
            contentElement.style.userSelect = 'text';
        }
    }, 0);

    return card;
}

function createUserFeedbackHTML(feedback) {
    const date = new Date(feedback.timestamp);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `
        <div class="feedback-item user">
            <div class="feedback-meta">
                <span class="feedback-author">${escapeHtml(feedback.author)}</span>
                <span>${formattedDate}</span>
            </div>
            <div class="feedback-text">
                ${feedback.passage ? `<span class="feedback-quote">— ${escapeHtml(feedback.passage)} —</span> ` : ''}
                ${escapeHtml(feedback.text)}
            </div>
        </div>
    `;
}

function createOverallRatingHTML(rating) {
    const date = new Date(rating.timestamp);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Calculate average rating
    const avgRating = (
        rating.style +
        rating.tension +
        rating.structure +
        rating.clarity +
        rating.originality
    ) / 5;

    // Create star display
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = (avgRating % 1) >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '★'.repeat(fullStars);
    if (hasHalfStar) starsHTML += '⯨';
    starsHTML += '☆'.repeat(emptyStars);

    return `
        <div class="rating-item">
            <div class="rating-header">
                <div>
                    <span class="rating-author">${escapeHtml(rating.author)}</span>
                    <span class="rating-date">${formattedDate}</span>
                </div>
                <div class="rating-average">
                    <span class="stars">${starsHTML}</span>
                    <span class="avg-value">${avgRating.toFixed(1)}/5</span>
                </div>
            </div>

            <div class="rating-details">
                <div class="rating-bar-item">
                    <span class="rating-label">Schreibstil</span>
                    <div class="rating-bar">
                        <div class="rating-fill" style="width: ${(rating.style / 5) * 100}%"></div>
                    </div>
                    <span class="rating-score">${rating.style}/5</span>
                </div>

                <div class="rating-bar-item">
                    <span class="rating-label">Spannungsbogen</span>
                    <div class="rating-bar">
                        <div class="rating-fill" style="width: ${(rating.tension / 5) * 100}%"></div>
                    </div>
                    <span class="rating-score">${rating.tension}/5</span>
                </div>

                <div class="rating-bar-item">
                    <span class="rating-label">Struktur</span>
                    <div class="rating-bar">
                        <div class="rating-fill" style="width: ${(rating.structure / 5) * 100}%"></div>
                    </div>
                    <span class="rating-score">${rating.structure}/5</span>
                </div>

                <div class="rating-bar-item">
                    <span class="rating-label">Verständlichkeit</span>
                    <div class="rating-bar">
                        <div class="rating-fill" style="width: ${(rating.clarity / 5) * 100}%"></div>
                    </div>
                    <span class="rating-score">${rating.clarity}/5</span>
                </div>

                <div class="rating-bar-item">
                    <span class="rating-label">Originalität</span>
                    <div class="rating-bar">
                        <div class="rating-fill" style="width: ${(rating.originality / 5) * 100}%"></div>
                    </div>
                    <span class="rating-score">${rating.originality}/5</span>
                </div>
            </div>

            ${rating.comment ? `<div class="rating-comment">${escapeHtml(rating.comment)}</div>` : ''}
        </div>
    `;
}

// Helper functions for category and genre labels
function getCategoryLabel(category) {
    const labels = {
        'social-media': '📱 Social Media',
        'blog': '📝 Blog-Artikel',
        'newspaper': '📰 Zeitungskommentar',
        'essay': '📖 Essay',
        'short-story': '📚 Kurzgeschichte',
        'poem': '✍️ Gedicht',
        'product': '🛍️ Produktbeschreibung',
        'speech': '🎤 Rede',
        'review': '⭐ Rezension',
        'academic': '🎓 Wissenschaftlich',
        'letter': '✉️ Brief',
        'other': '📄 Sonstiges'
    };
    return labels[category] || category;
}

function getGenreLabel(genre) {
    const labels = {
        'fiction': '🌟 Fiktion',
        'non-fiction': '📚 Sachtext',
        'technology': '💻 Technologie',
        'science': '🔬 Wissenschaft',
        'business': '💼 Wirtschaft',
        'politics': '🏛️ Politik',
        'culture': '🎨 Kultur',
        'lifestyle': '🌈 Lifestyle',
        'education': '📖 Bildung',
        'health': '⚕️ Gesundheit',
        'environment': '🌱 Umwelt',
        'entertainment': '🎬 Unterhaltung'
    };
    return labels[genre] || genre;
}

// Filter functions
function filterIdeas() {
    const filterCategory = document.getElementById('filterCategory').value;
    const filterGenre = document.getElementById('filterGenre').value;

    const allIdeas = getIdeas();

    const filteredIdeas = allIdeas.filter(idea => {
        const categoryMatch = !filterCategory || idea.category === filterCategory;
        const genreMatch = !filterGenre || idea.genre === filterGenre;
        return categoryMatch && genreMatch;
    });

    displayFilteredIdeas(filteredIdeas);
    updateFilterStats(filteredIdeas.length, allIdeas.length);
}

function displayFilteredIdeas(ideas) {
    const container = document.getElementById('ideasContainer');
    const noIdeasMessage = document.getElementById('noIdeasMessage');

    if (ideas.length === 0) {
        container.style.display = 'none';
        noIdeasMessage.style.display = 'block';
        noIdeasMessage.querySelector('h3').textContent = 'Keine passenden Ideen gefunden';
        noIdeasMessage.querySelector('p').textContent = 'Versuchen Sie, die Filter anzupassen.';
        return;
    }

    container.style.display = 'block';
    noIdeasMessage.style.display = 'none';
    container.innerHTML = '';

    ideas.forEach((idea, index) => {
        const ideaCard = createIdeaCard(idea, index);
        container.appendChild(ideaCard);
    });
}

function updateFilterStats(filtered, total) {
    const statsElement = document.getElementById('filterStats');
    if (filtered === total) {
        statsElement.textContent = `${total} Ideen insgesamt`;
    } else {
        statsElement.textContent = `${filtered} von ${total} Ideen werden angezeigt`;
    }
    statsElement.style.display = 'block';
}

function resetFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterGenre').value = '';
    loadIdeas();
    document.getElementById('filterStats').textContent = '';
}

// Modal functions
function openFeedbackModal(ideaId) {
    // Find the idea
    const ideas = getIdeas();
    const idea = ideas.find(i => i.id === ideaId);

    if (!idea) {
        alert('Idee nicht gefunden.');
        return;
    }

    // Set idea ID
    document.getElementById('feedbackIdeaId').value = ideaId;

    // Load the idea text into modal
    const modalIdeaText = document.getElementById('modalIdeaText');
    modalIdeaText.textContent = idea.text;

    // Reset form fields
    document.getElementById('feedbackAuthor').value = '';
    document.getElementById('feedbackText').value = '';
    document.getElementById('feedbackPassage').value = '';

    // Show modal
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'block';
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';
}

// Overall Rating Modal functions
function openOverallRatingModal(ideaId) {
    // Find the idea
    const ideas = getIdeas();
    const idea = ideas.find(i => i.id === ideaId);

    if (!idea) {
        alert('Idee nicht gefunden.');
        return;
    }

    // Set idea ID
    document.getElementById('ratingIdeaId').value = ideaId;

    // Load text preview (truncated)
    const textPreview = document.getElementById('ratingTextPreview');
    const maxPreviewLength = 300;
    const previewText = idea.text.length > maxPreviewLength
        ? idea.text.substring(0, maxPreviewLength) + '...'
        : idea.text;
    textPreview.textContent = previewText;

    // Reset form fields
    document.getElementById('ratingAuthor').value = '';
    document.getElementById('overallComment').value = '';

    // Reset sliders to 3
    const sliders = ['styleRating', 'tensionRating', 'structureRating', 'clarityRating', 'originalityRating'];
    sliders.forEach(sliderId => {
        document.getElementById(sliderId).value = 3;
        updateRatingValue(sliderId);
    });

    // Show modal
    const modal = document.getElementById('overallRatingModal');
    modal.style.display = 'block';
}

function closeOverallRatingModal() {
    const modal = document.getElementById('overallRatingModal');
    modal.style.display = 'none';
}

function updateRatingValue(sliderId) {
    const slider = document.getElementById(sliderId);
    const valueId = sliderId.replace('Rating', 'Value');
    const valueSpan = document.getElementById(valueId);
    if (valueSpan) {
        valueSpan.textContent = slider.value;
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const feedbackModal = document.getElementById('feedbackModal');
    const ratingModal = document.getElementById('overallRatingModal');

    if (event.target == feedbackModal) {
        closeFeedbackModal();
    }
    if (event.target == ratingModal) {
        closeOverallRatingModal();
    }
};

// Feedback Modal event listeners
if (document.getElementById('feedbackModal')) {

    // Close button
    document.querySelector('.modal-close').onclick = closeFeedbackModal;

    // Capture selection button
    document.getElementById('captureSelectionBtn').addEventListener('click', () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (!selectedText) {
            alert('Bitte markieren Sie zuerst eine Textpassage im Text oben.');
            return;
        }

        // Check if selection is from the modal idea text
        const modalIdeaText = document.getElementById('modalIdeaText');
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer;

            // Check if selection is within the modal idea text
            if (modalIdeaText && (modalIdeaText.contains(container) || modalIdeaText === container)) {
                // Limit passage length
                const maxPassageLength = 200;
                const passage = selectedText.length > maxPassageLength
                    ? selectedText.substring(0, maxPassageLength) + '...'
                    : selectedText;

                // Set passage
                document.getElementById('feedbackPassage').value = passage;

                // Visual feedback
                const captureBtn = document.getElementById('captureSelectionBtn');
                captureBtn.textContent = '✓ Passage übernommen!';
                captureBtn.style.background = 'var(--gradient-4)';

                setTimeout(() => {
                    captureBtn.innerHTML = '<span class="btn-icon">✓</span> Markierte Passage übernehmen';
                    captureBtn.style.background = '';
                }, 2000);
            } else {
                alert('Bitte markieren Sie Text aus dem Ideentext oben.');
            }
        }
    });

    // Submit user feedback
    document.getElementById('userFeedbackForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const ideaId = parseInt(document.getElementById('feedbackIdeaId').value);
        const author = document.getElementById('feedbackAuthor').value.trim() || 'Anonym';
        const text = document.getElementById('feedbackText').value.trim();
        const passage = document.getElementById('feedbackPassage').value.trim();

        if (!text) {
            alert('Bitte geben Sie ein Feedback ein.');
            return;
        }

        if (!passage) {
            alert('Bitte übernehmen Sie eine markierte Textpassage, bevor Sie das Feedback senden.');
            return;
        }

        const feedback = {
            author: author,
            text: text,
            passage: passage,
            timestamp: new Date().toISOString()
        };

        // Add feedback to idea
        const ideas = getIdeas();
        const ideaIndex = ideas.findIndex(i => i.id === ideaId);

        if (ideaIndex !== -1) {
            ideas[ideaIndex].userFeedback.push(feedback);
            saveIdeas(ideas);

            // Reload ideas display
            loadIdeas();

            // Close modal
            closeFeedbackModal();

            // Scroll to the feedback section
            setTimeout(() => {
                const ideaCard = document.querySelector(`#userFeedbackList-${ideaId}`).closest('.idea-card');
                ideaCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
}

// Overall Rating Modal event listeners
if (document.getElementById('overallRatingModal')) {
    // Update rating values when sliders change
    const sliders = ['styleRating', 'tensionRating', 'structureRating', 'clarityRating', 'originalityRating'];
    sliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.addEventListener('input', () => updateRatingValue(sliderId));
        }
    });

    // Submit overall rating
    document.getElementById('overallRatingForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const ideaId = parseInt(document.getElementById('ratingIdeaId').value);
        const author = document.getElementById('ratingAuthor').value.trim() || 'Anonym';
        const comment = document.getElementById('overallComment').value.trim();

        const rating = {
            author: author,
            style: parseInt(document.getElementById('styleRating').value),
            tension: parseInt(document.getElementById('tensionRating').value),
            structure: parseInt(document.getElementById('structureRating').value),
            clarity: parseInt(document.getElementById('clarityRating').value),
            originality: parseInt(document.getElementById('originalityRating').value),
            comment: comment,
            timestamp: new Date().toISOString()
        };

        // Add rating to idea
        const ideas = getIdeas();
        const ideaIndex = ideas.findIndex(i => i.id === ideaId);

        if (ideaIndex !== -1) {
            // Initialize overallRatings array if it doesn't exist
            if (!ideas[ideaIndex].overallRatings) {
                ideas[ideaIndex].overallRatings = [];
            }

            ideas[ideaIndex].overallRatings.push(rating);
            saveIdeas(ideas);

            // Reload ideas display
            loadIdeas();

            // Close modal
            closeOverallRatingModal();

            // Scroll to the rating section
            setTimeout(() => {
                const ideaCard = document.querySelector(`#overallRatingsList-${ideaId}`).closest('.idea-card');
                if (ideaCard) {
                    ideaCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        }
    });
}

// Choice Modal Functions
let currentUserName = localStorage.getItem('currentUserName') || null;
let currentReviewCategory = null;
let currentReviewGenre = null;
let reviewedIdeasIds = JSON.parse(localStorage.getItem('reviewedIdeas') || '[]');

function showMyOwnFeedback() {
    // Get or set user name
    if (!currentUserName) {
        currentUserName = prompt('Bitte geben Sie Ihren Namen ein, um Ihre eigenen Texte zu sehen:');
        if (!currentUserName) {
            alert('Sie müssen einen Namen eingeben.');
            return;
        }
        localStorage.setItem('currentUserName', currentUserName);
    }

    document.getElementById('choiceModal').style.display = 'none';

    // Filter ideas by current user
    const allIdeas = getIdeas();
    const myIdeas = allIdeas.filter(idea =>
        idea.author.toLowerCase() === currentUserName.toLowerCase()
    );

    if (myIdeas.length === 0) {
        alert(`Keine Texte von "${currentUserName}" gefunden. Reichen Sie zuerst einen Text ein!`);
        document.getElementById('choiceModal').style.display = 'block';
        return;
    }

    displayFilteredIdeas(myIdeas);
    updateFilterStats(myIdeas.length, allIdeas.length);

    // Hide filter section
    document.querySelector('.filter-section').style.display = 'none';
}

function showReviewChoice() {
    document.getElementById('choiceModal').style.display = 'none';
    document.getElementById('reviewPreferenceModal').style.display = 'block';
}

function showAllIdeas() {
    document.getElementById('choiceModal').style.display = 'none';
    loadIdeas();
    document.querySelector('.filter-section').style.display = 'block';
}

function backToChoice() {
    document.getElementById('reviewPreferenceModal').style.display = 'none';
    document.getElementById('singleReviewModal').style.display = 'none';
    document.getElementById('choiceModal').style.display = 'block';
}

function closeReviewModal() {
    document.getElementById('singleReviewModal').style.display = 'none';
}

// Handle review preference form
if (document.getElementById('reviewPreferenceForm')) {
    document.getElementById('reviewPreferenceForm').addEventListener('submit', (e) => {
        e.preventDefault();

        currentReviewCategory = document.getElementById('preferredCategory').value;
        currentReviewGenre = document.getElementById('preferredGenre').value;

        if (!currentReviewCategory) {
            alert('Bitte wählen Sie eine Textart.');
            return;
        }

        findAndShowRandomIdea();
    });
}

function findAndShowRandomIdea() {
    const allIdeas = getIdeas();

    // Filter ideas based on preferences
    let filteredIdeas = allIdeas.filter(idea => {
        // Don't show already reviewed ideas
        if (reviewedIdeasIds.includes(idea.id)) {
            return false;
        }

        // Don't show own ideas
        if (currentUserName && idea.author.toLowerCase() === currentUserName.toLowerCase()) {
            return false;
        }

        // Filter by category
        if (currentReviewCategory && currentReviewCategory !== 'any') {
            if (idea.category !== currentReviewCategory) {
                return false;
            }
        }

        // Filter by genre
        if (currentReviewGenre && currentReviewGenre !== '') {
            if (idea.genre !== currentReviewGenre) {
                return false;
            }
        }

        return true;
    });

    if (filteredIdeas.length === 0) {
        alert('Keine passenden Texte zum Reviewen gefunden. Versuchen Sie andere Filter oder setzen Sie die Filter zurück.');
        return;
    }

    // Select random idea
    const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
    const selectedIdea = filteredIdeas[randomIndex];

    showSingleIdeaForReview(selectedIdea);
}

function showSingleIdeaForReview(idea) {
    document.getElementById('reviewPreferenceModal').style.display = 'none';
    document.getElementById('singleReviewModal').style.display = 'block';

    const content = document.getElementById('singleReviewContent');

    const date = new Date(idea.timestamp);
    const formattedDate = date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const categoryLabel = getCategoryLabel(idea.category);
    const genreLabel = idea.genre ? getGenreLabel(idea.genre) : '';

    // Check if already following
    const followKey = `follow_${idea.author}`;
    const isFollowing = localStorage.getItem(followKey) === 'true';

    content.innerHTML = `
        <div class="single-review-card">
            <div class="idea-header">
                <div>
                    <h2 class="idea-title">${escapeHtml(idea.title)}</h2>
                    <div class="idea-meta">
                        von <strong>${escapeHtml(idea.author)}</strong> • ${formattedDate}
                    </div>
                    <div class="idea-categories">
                        <span class="category-badge">${categoryLabel}</span>
                        ${genreLabel ? `<span class="genre-badge">${genreLabel}</span>` : ''}
                    </div>
                </div>
                <button class="btn btn-follow ${isFollowing ? 'following' : ''}"
                        onclick="toggleFollow('${escapeHtml(idea.author)}')"
                        id="followBtn-${idea.id}">
                    <span class="btn-icon">${isFollowing ? '✓' : '+'}</span>
                    ${isFollowing ? 'Folge ich' : 'Folgen'}
                </button>
            </div>

            <div class="idea-content">${escapeHtml(idea.text)}</div>

            <div class="feedback-section">
                <h3 class="feedback-header">🤖 Automatisches Feedback</h3>
                ${idea.autoFeedback.length > 0
                    ? idea.autoFeedback.map(fb => `
                        <div class="feedback-item auto">
                            <div class="feedback-meta">
                                <span class="feedback-author">System-Analyse</span>
                                <span>${fb.trigger}</span>
                            </div>
                            <div class="feedback-text">${fb.text}</div>
                        </div>
                    `).join('')
                    : '<p style="color: var(--text-dim);">Keine automatischen Hinweise gefunden.</p>'
                }
            </div>

            <div class="review-feedback-actions">
                <button class="btn btn-primary" onclick="openFeedbackModal(${idea.id})">
                    <span class="btn-icon">💭</span>
                    Feedback zu Passage geben
                </button>
                <button class="btn btn-secondary" onclick="openOverallRatingModal(${idea.id})">
                    <span class="btn-icon">⭐</span>
                    Gesamtbewertung abgeben
                </button>
            </div>
        </div>
    `;

    // Mark as reviewed
    if (!reviewedIdeasIds.includes(idea.id)) {
        reviewedIdeasIds.push(idea.id);
        localStorage.setItem('reviewedIdeas', JSON.stringify(reviewedIdeasIds));
    }
}

function showNextReview() {
    findAndShowRandomIdea();
}

function toggleFollow(authorName) {
    const followKey = `follow_${authorName}`;
    const isFollowing = localStorage.getItem(followKey) === 'true';

    if (isFollowing) {
        localStorage.removeItem(followKey);
        alert(`Sie folgen ${authorName} nicht mehr.`);
    } else {
        localStorage.setItem(followKey, 'true');
        alert(`Sie folgen jetzt ${authorName}!`);
    }

    // Update button
    const followBtns = document.querySelectorAll(`[onclick*="toggleFollow('${authorName}')"]`);
    followBtns.forEach(btn => {
        const newIsFollowing = !isFollowing;
        btn.className = `btn btn-follow ${newIsFollowing ? 'following' : ''}`;
        btn.innerHTML = `
            <span class="btn-icon">${newIsFollowing ? '✓' : '+'}</span>
            ${newIsFollowing ? 'Folge ich' : 'Folgen'}
        `;
    });
}

// Utility function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
