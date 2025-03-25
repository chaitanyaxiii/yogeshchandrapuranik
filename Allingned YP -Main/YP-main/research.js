// Sample initial research publications data
let publications = [
    {
        id: 1,
        title: "Sentiment Analysis of YouTube Comments",
        category: "journal",
        authors: ["Dr. John Smith", "Emily Chen"],
        year: 2023,
        abstract: "A comprehensive study on applying machine learning techniques to enhance cybersecurity measures.",
        filename: "Research paper/Sentiment Analysis of YouTube Comments..pdf"
    },
    {
        id: 2,
        title: "Quantum Computing Breakthroughs",
        category: "conference",
        authors: ["Dr. Alice Wong", "Michael Rodriguez"],
        year: 2022,
        abstract: "Recent advancements in quantum computing and potential applications.",
        filename: "quantum_computing.pdf"
    }
    // Add more sample publications
];

// DOM Elements
const publicationsListContainer = document.getElementById('publicationsList');
const searchInput = document.getElementById('searchPublications');
const categoryFilter = document.getElementById('categoryFilter');
const sortOptions = document.getElementById('sortOptions');

// Display publications
function displayPublications(publicationsToDisplay) {
    publicationsListContainer.innerHTML = '';

    if (publicationsToDisplay.length === 0) {
        publicationsListContainer.innerHTML = `
            <div class="empty-state">
                <h3>No publications found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    publicationsToDisplay.forEach(publication => {
        const publicationCard = document.createElement('div');
        publicationCard.className = 'publication-card';
        publicationCard.innerHTML = `
            <div class="publication-title">${publication.title}</div>
            <div class="publication-meta">
                <div>Category: ${getCategoryLabel(publication.category)}</div>
                <div>Authors: ${publication.authors.join(', ')}</div>
                <div>Year: ${publication.year}</div>
            </div>
            <div class="publication-abstract">${publication.abstract}</div>
            <div class="publication-actions">
                <button class="download-btn" data-id="${publication.id}">Download</button>
            </div>
        `;
        publicationsListContainer.appendChild(publicationCard);
    });
}

// Get category label
function getCategoryLabel(category) {
    const categoryLabels = {
        'journal': 'Journal Publication',
        'conference': 'Conference Paper',
        'workshop': 'Workshop Paper',
        'patent': 'Patent'
    };
    return categoryLabels[category] || category;
}

// Download publication
function downloadPublication(publication) {
    const mockDownloadUrl = `${publication.filename} `;

    const downloadLink = document.createElement('a');
    downloadLink.href = mockDownloadUrl;
    downloadLink.download = publication.filename;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    console.log(`Downloading: ${publication.filename} `);
}

// Filter and sort publications
function filterAndDisplayPublications() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const sortValue = sortOptions.value;

    let filteredPublications = publications.filter(pub => {
        const matchesSearch =
            pub.title.toLowerCase().includes(searchTerm) ||
            pub.authors.some(author => author.toLowerCase().includes(searchTerm)) ||
            pub.abstract.toLowerCase().includes(searchTerm);

        const matchesCategory = categoryValue === 'all' || pub.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    // Sort publications
    filteredPublications.sort((a, b) => {
        switch (sortValue) {
            case 'year-desc':
                return b.year - a.year;
            case 'year-asc':
                return a.year - b.year;
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    displayPublications(filteredPublications);
}

// Event listeners for search and filter
searchInput.addEventListener('input', filterAndDisplayPublications);
categoryFilter.addEventListener('change', filterAndDisplayPublications);
sortOptions.addEventListener('change', filterAndDisplayPublications);

// Handle download button
publicationsListContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('download-btn')) {
        const publicationId = parseInt(e.target.getAttribute('data-id'));
        const publication = publications.find(p => p.id === publicationId);

        if (publication) {
            downloadPublication(publication);
        }
    }
});

// Initial display of publications
filterAndDisplayPublications();