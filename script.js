// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, increment, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmPhSw1n-Drv99MVOjYMmEGxoQHU0-omo",
    authDomain: "listgaul-d8918.firebaseapp.com",
    databaseURL: "https://listgaul-d8918-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "listgaul-d8918",
    storageBucket: "listgaul-d8918.appspot.com",
    messagingSenderId: "540182819112",
    appId: "1:540182819112:web:6b6802f31a512dad84201d",
    measurementId: "G-MPCK8Z1KPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const viewCountRef = ref(database, 'viewCount');

// Increment view count
get(viewCountRef).then((snapshot) => {
    if (snapshot.exists()) {
        incrementViewCount();
    } else {
        set(viewCountRef, 1);
    }
}).catch((error) => {
    console.error(error);
});

function incrementViewCount() {
    set(viewCountRef, increment(1));
}

// Update view count on the page
onValue(viewCountRef, (snapshot) => {
    const viewCount = snapshot.val();
    document.getElementById('viewCount').textContent = `Jumlah view: ${viewCount}`;
});

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
    { text: 'Ngenes > Tertekan' },
    { text: 'Rill > Nyata' }
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
    badgeContainer.innerHTML = '';

    const shortBadges = badges.filter(badge => badge.text.length <= shortBadgeThreshold);
    const longBadges = badges.filter(badge => badge.text.length > shortBadgeThreshold);

    const sortedBadges = [...shortBadges, ...longBadges];

    sortedBadges.forEach(badge => {
        const badgeElement = createBadgeElement(badge.text);
        badgeContainer.appendChild(badgeElement);
    });
}

function updateBadgeCount(count) {
    document.getElementById('badgeCount').textContent = `Jumlah badge: ${count}`;
}

function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const badgeContainer = document.getElementById('badgeContainer');

    if (searchInput) {
        const filteredBadges = badgesData.filter(badge =>
            badge.text.toLowerCase().includes(searchInput)
        );

        if (filteredBadges.length > 0) {
            sortAndDisplayBadges(filteredBadges);
            updateBadgeCount(filteredBadges.length);
        } else {
            badgeContainer.innerHTML = '';
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = `"${searchInput}" Lah bahasa gaul apaan lagi tuh?! 😩`;
            badgeContainer.appendChild(errorMessage);

            const kembaliContainer = document.createElement('div');
            kembaliContainer.className = 'kembali-container';
            const kembaliBadge = document.createElement('div');
            kembaliBadge.className = 'kembali-badge';
            kembaliBadge.textContent = 'Kembali';
            kembaliContainer.appendChild(kembaliBadge);
            badgeContainer.appendChild(kembaliContainer);

            kembaliBadge.addEventListener('click', function () {
                errorMessage.remove();
                kembaliContainer.remove();
                sortAndDisplayBadges(badgesData);
                document.getElementById('searchInput').value = '';
                updateBadgeCount(badgesData.length);
            });
        }
    } else {
        const errorMessage = document.querySelector('.error-message');
        const kembaliContainer = document.querySelector('.kembali-container');
        if (errorMessage) {
            errorMessage.remove();
        }
        if (kembaliContainer) {
            kembaliContainer.remove();
        }
        sortAndDisplayBadges(badgesData);
        updateBadgeCount(badgesData.length);
    }
}

document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performSearch();
    }
});

document.getElementById('searchBadge').addEventListener('click', function () {
    performSearch();
});

document.getElementById('mainTitle').addEventListener('click', function () {
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
updateBadgeCount(badgesData.length);
