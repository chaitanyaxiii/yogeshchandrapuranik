let notes = [
    {
        id: 1,
        title: "Decoding-Cybercrime-Unit I",
        category: "lectures",
        filename: "Notes/Decoding-Cybercrime-Unit I.pptx",
        uploadDate: "2025-03-10",
        fileSize: "3.1 MB"
    },
    {
        id: 2,
        title: "Cryptography-and-Cybercrime Unit II",
        category: "lectures",
        filename: "Notes/Cryptography-and-Cybercrime Unit II.pptx",
        uploadDate: "2025-03-01",
        fileSize: "2.4 MB"
    },
    {
        id: 3,
        title: "UNIT 1 Formatted Notes Cyber Security",
        category: "lectures",
        filename: "Notes/UNIT 1 Formatted Notes Cyber Security.docx",
        uploadDate: "2025-03-15",
        fileSize: "1.2 MB"
    },
    {
        id: 4,
        title: "UNIT 2 Formatted notes Cyber Security.docx",
        category: "lectures",
        description: "Practice exam with solutions",
        uploadDate: "2025-03-05",
        fileSize: "1.8 MB"
    },
];

// DOM Elements
const notesListContainer = document.getElementById('notesList');
const searchInput = document.getElementById('searchNotes');
const categoryFilter = document.getElementById('categoryFilter');
const sortOptions = document.getElementById('sortOptions');
const switchToAdminBtn = document.getElementById('switchToAdminBtn');


// Improved Download Functionality
function downloadNote(note) {
    // In a real-world scenario, this would typically involve 
    // making an AJAX request to a server endpoint to fetch the file
    const mockDownloadUrl = `${note.filename}`;

    // Simulate file download with an anchor tag
    const downloadLink = document.createElement('a');
    downloadLink.href = mockDownloadUrl;
    downloadLink.download = note.filename;

    // Append to body, click, and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Log download event
    console.log(`Downloading: ${note.filename}`);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Display notes
function displayNotes(notesToDisplay) {
    notesListContainer.innerHTML = '';

    if (notesToDisplay.length === 0) {
        notesListContainer.innerHTML = '<div class="empty-state"><h3>No notes found</h3><p>Try adjusting your search or filters</p></div>';
        return;
    }

    // Group notes by category
    const notesByCategory = {};
    notesToDisplay.forEach(note => {
        if (!notesByCategory[note.category]) {
            notesByCategory[note.category] = [];
        }
        notesByCategory[note.category].push(note);
    });

    // Display notes by category
    for (const category in notesByCategory) {
        const categorySection = document.createElement('div');
        categorySection.className = 'notes-category';

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = getCategoryLabel(category);

        categorySection.appendChild(categoryTitle);

        const notesGrid = document.createElement('div');
        notesGrid.className = 'notes-grid';

        notesByCategory[category].forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <h3 class="note-title">${note.title}</h3>
                <div class="note-meta">
                    <div>Date: ${formatDate(note.uploadDate)}</div>
                    <div>Size: ${note.fileSize}</div>
                    <div>${note.description || ''}</div>
                </div>
                <div class="note-actions">
                    <button class="download-btn" data-id="${note.id}">Download</button>
                </div>
            `;
            notesGrid.appendChild(noteCard);
        });

        categorySection.appendChild(notesGrid);
        notesListContainer.appendChild(categorySection);
    }
}

// Get category label
function getCategoryLabel(category) {
    const categoryLabels = {
        'lectures': 'Lectures',
        'assignments': 'Assignments',
        'resources': 'Additional Resources',
        'exams': 'Past Exams'
    };
    return categoryLabels[category] || category;
}

// Filter and sort notes
function filterAndDisplayNotes() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const sortValue = sortOptions.value;

    let filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm) ||
            (note.description && note.description.toLowerCase().includes(searchTerm));
        const matchesCategory = categoryValue === 'all' || note.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    // Sort notes
    filteredNotes.sort((a, b) => {
        switch (sortValue) {
            case 'date-desc':
                return new Date(b.uploadDate) - new Date(a.uploadDate);
            case 'date-asc':
                return new Date(a.uploadDate) - new Date(b.uploadDate);
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    displayNotes(filteredNotes);
}

// Handle download buttons
notesListContainer.addEventListener('click', function (e) {
    const noteId = parseInt(e.target.getAttribute('data-id'));
    const note = notes.find(n => n.id === noteId);

    if (note && e.target.classList.contains('download-btn')) {
        downloadNote(note);
    }
});

// Event listeners for search and filter
searchInput.addEventListener('input', filterAndDisplayNotes);
categoryFilter.addEventListener('change', filterAndDisplayNotes);
sortOptions.addEventListener('change', filterAndDisplayNotes);

// Initial display of notes
filterAndDisplayNotes();