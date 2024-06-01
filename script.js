const badgesData = [
    { text: 'Gw > Aku' },
    { text: 'Gue > Aku' },
    { text: 'Gak > Tidak' },
    { text: 'Ngabuburit > Mengisi waktu untuk menunggu' },
    { text: 'Apes > Malang' },
    { text: 'Gaul > Informal' },
    { text: 'Kepo > Ingin tahu' },
    { text: 'Jomblo > Tidak punya pacar' },
    { text: 'Alay > Berlebihan' },
    { text: 'Ngenes > Tertekan' }
];

const shortBadgeThreshold = 20;

function createBadgeElement(text) {
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = text;
    return badge;
}

function sortAndDisplayBadges(badges) {
    const badgeContainer = document.getElementById('badgeContainer');
    badgeContainer.innerHTML = ''; // Clear previous badges

    const shortBadges = [];
    const longBadges = [];

    badges.forEach(badge => {
        if (badge.text.length <= shortBadgeThreshold) {
            shortBadges.push(badge);
        } else {
            longBadges.push(badge);
        }
    });

    const sortedBadges = shortBadges.concat(longBadges);
    sortedBadges.forEach(badge => {
        const badgeElement = createBadgeElement(badge.text);
        badgeContainer.appendChild(badgeElement);
    });

    updateBadgeCount(sortedBadges.length);
}

function updateBadgeCount(count) {
    document.getElementById('badgeCount').textContent = `Jumlah badge: ${count}`;
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    const lowerCaseQuery = query.toLowerCase();
    const filteredBadges = badgesData.filter(badge => badge.text.toLowerCase().includes(lowerCaseQuery));

    const badgeContainer = document.getElementById('badgeContainer');
    badgeContainer.innerHTML = ''; // Clear previous badges

    const errorMessage = document.querySelector('.error-message');
    const kembaliContainer = document.querySelector('.kembali-container');
    
    if (query === "") {
        if (errorMessage) errorMessage.remove();
        if (kembaliContainer) kembaliContainer.remove();
        sortAndDisplayBadges(badgesData);
    } else if (filteredBadges.length > 0) {
        if (errorMessage) errorMessage.remove();
        if (kembaliContainer) kembaliContainer.remove();
        sortAndDisplayBadges(filteredBadges);
    } else {
        if (errorMessage) {
            errorMessage.textContent = `(${query}) Lah bahasa gaul apaan lagi tuh?! 😩`;
        } else {
            const newErrorMessage = document.createElement('div');
            newErrorMessage.className = 'error-message';
            newErrorMessage.textContent = `(${query}) Lah bahasa gaul apaan lagi tuh?! 😩`;
            badgeContainer.parentNode.insertBefore(newErrorMessage, badgeContainer.nextSibling);

            const newKembaliContainer = document.createElement('div');
            newKembaliContainer.className = 'kembali-container';
            const newKembaliBadge = document.createElement('div');
            newKembaliBadge.className = 'kembali-badge';
            newKembaliBadge.textContent = 'Kembali';
            newKembaliContainer.appendChild(newKembaliBadge);
            badgeContainer.parentNode.insertBefore(newKembaliContainer, newErrorMessage.nextSibling);

            newKembaliBadge.addEventListener('click', function() {
                newErrorMessage.remove();
                newKembaliContainer.remove();
                sortAndDisplayBadges(badgesData);
                document.getElementById('searchInput').value = '';
                updateBadgeCount(badgesData.length);
            });
        }
        updateBadgeCount(0);
    }
}

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});

document.getElementById('searchBadge').addEventListener('click', function() {
    performSearch();
});

document.getElementById('mainTitle').addEventListener('click', function() {
    const errorMessage = document.querySelector('.error-message');
    const kembaliContainer = document.querySelector('.kembali-container');
    if (errorMessage) {
        errorMessage.remove();
    }
    if (kembaliContainer) {
        kembaliContainer.remove();
    }
    sortAndDisplayBadges(badgesData);
    document.getElementById('searchInput').value = '';
    updateBadgeCount(badgesData.length);
});

sortAndDisplayBadges(badgesData);
