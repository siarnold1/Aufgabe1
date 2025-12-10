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
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
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

        if (!title || !text) {
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
            timestamp: new Date().toISOString(),
            autoFeedback: autoFeedback,
            userFeedback: []
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

function createIdeaCard(idea, index) {
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

    card.innerHTML = `
        <div class="idea-header">
            <div>
                <h2 class="idea-title">${escapeHtml(idea.title)}</h2>
                <div class="idea-meta">
                    von <strong>${escapeHtml(idea.author)}</strong> • ${formattedDate}
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
                <button class="btn btn-primary add-feedback-btn" onclick="openFeedbackModal(${idea.id})">
                    <span class="btn-icon">💭</span>
                    Feedback hinzufügen
                </button>
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

// Close modal when clicking outside
if (document.getElementById('feedbackModal')) {
    window.onclick = function(event) {
        const modal = document.getElementById('feedbackModal');
        if (event.target == modal) {
            closeFeedbackModal();
        }
    };

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

// Utility function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
