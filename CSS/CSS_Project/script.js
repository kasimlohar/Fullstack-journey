// ===========================
// Music Data
// ===========================
const recentPlayed = [
    { title: 'Tum Hi Ho', artist: 'Arijit Singh', art: 'assets/tum_hi_ho.jpeg', src: 'assets/tum_hi_ho.mp3' },
    { title: 'Tera Ban Jaunga', artist: 'Akhil Sachdeva', art: 'assets/tera_ban_jaunga.jpeg', src: 'assets/tera_ban_jaunga.mp3' },
    { title: 'Kalank', artist: 'Arijit Singh', art: 'assets/kalank.jpeg', src: 'assets/kalank.mp3' },
    { title: 'Kabira', artist: 'Aditi Singh Sharma', art: 'assets/kabira.jpeg', src: 'assets/kabira.mp3' },
    { title: 'Pehla Nasha', artist: 'Udit Narayan', art: 'assets/pehla_nasha.jpeg', src: 'assets/pehla_nasha.mp3' },
    { title: 'Raabta', artist: 'Arijit Singh', art: 'assets/raabta.jpeg', src: 'assets/raabta.mp3' },
    { title: 'Dil Diyan Gallan', artist: 'Atif Aslam', art: 'assets/dil_diyan_gallan.jpeg', src: 'assets/dil_diyan_gallan.mp3' },
    { title: 'Channa Mereya', artist: 'Arijit Singh', art: 'assets/channa_mereya.jpeg', src: 'assets/channa_mereya.mp3' }
];

const featuredPlaylists = [
    { name: 'Bollywood Hits', description: 'Top Bollywood songs of the year', art: 'assets/bollywood_hits.jpeg', src: 'assets/bollywood_hits.jpeg' },
    { name: 'Romantic Melodies', description: 'Love songs to set the mood', art: 'assets/romantic_melodies.jpeg', src: 'assets/romantic_melodies.jpeg' },
    { name: 'Party Anthems', description: 'Dance tracks for your next party', art: 'assets/party_anthems.jpeg', src: 'assets/party_anthems.jpeg' },
    { name: 'Sad Songs', description: 'Heartfelt tracks for when you need to reflect', art: 'assets/sad_songs.jpeg', src: 'assets/sad_songs.jpeg' },
    { name: 'Old Classics', description: 'Timeless Bollywood classics', art: 'assets/old_classics.jpeg', src: 'assets/old_classics.jpeg' },
    { name: 'New Releases', description: 'Latest hits from Bollywood and beyond', art: 'assets/new_releases.jpeg', src: 'assets/new_releases.jpeg' },
    { name: 'Monsoon Vibes', description: 'Songs that capture the essence of monsoon', art: 'assets/monsoon_vibes.jpeg', src: 'assets/monsoon_vibes.jpeg' },
    { name: 'Dance Mixes', description: 'High-energy tracks to get you moving!', art: 'assets/dance_mixes.jpeg', src: 'assets/dance_mixes.jpeg' }
];

const favoritePlaylists = [
    { name: 'Chill Vibes', description: 'Relaxing tracks for a laid-back mood', art: 'assets/chill_vibes.jpeg', src: 'assets/chill_vibes.jpeg' },
    { name: 'Workout Beats', description: 'High-energy music to keep you motivated', art: 'assets/workout_beats.jpeg', src: 'assets/workout_beats.jpeg' },
    { name: 'Morning Motivation', description: 'Uplifting songs to start your day right', art: 'assets/morning_motivation.jpeg', src: 'assets/morning_motivation.jpeg' },
    { name: 'Evening Relaxation', description: 'Soothing melodies for winding down', art: 'assets/evening_relaxation.jpeg', src: 'assets/evening_relaxation.jpeg' },
    { name: 'Road Trip Anthems', description: 'Fun tracks for your next adventure on the road', art: 'assets/road_trip_anthems.jpeg', src: 'assets/road_trip_anthems.jpeg' },
    { name: 'Throwback Hits', description: 'Nostalgic songs from the past that you love', art: 'assets/throwback_hits.jpeg', src: 'assets/throwback_hits.jpeg' },
    { name: 'Indie Favorites', description: 'Discover unique sounds from independent artists', art: 'assets/indie_favorites.jpeg', src: 'assets/indie_favorites.jpeg' },
    { name: 'Feel-Good Tunes', description: 'Happy songs that lift your spirits!', art: 'assets/feel_good_tunes.jpeg', src: 'assets/feel_good_tunes.jpeg' }
];

// ===========================
// Card Creation Function
// ===========================
function createCard(item, type) {
    if (!item.art || !item.src) {
        console.warn(`Missing asset for ${item.title || item.name}`);
        return null;
    }

    const card = document.createElement('div');
    card.className = 'col-lg-2 col-md-4 col-sm-6 m-2';

    card.innerHTML = `
        <div class="card h-100 position-relative">
            <img src="${item.art}" class="card-img-top" alt="${type === 'song' ? item.title : item.name}" loading="lazy">
            <!-- Play Button -->
            <div class="play-button position-absolute">
                <i class="fas fa-play"></i>
            </div>
            <div class="card-body">
                <h5 class="card-title truncate">${type === 'song' ? item.title : item.name}</h5>
                <p class="card-text truncate">${type === 'song' ? item.artist : item.description}</p>
            </div>
        </div>
    `;

    return card;
}

// ===========================
// Populate Sections with Music Data
// ===========================
function populateSection(containerSelector, data, type) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.warn(`Container "${containerSelector}" not found.`);
        return;
    }

    const fragment = document.createDocumentFragment();
    data.forEach(item => {
        const card = createCard(item, type);
        if (card) fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

// ===========================
// Format Time in MM:SS
// ===========================
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// ===========================
// Audio Player Logic
// ===========================
let currentAudioSrc = '';
let playlistQueue = [];
let currentSongIndex = 0;
const audio = new Audio();

function setupAudioPlayer() {
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.querySelector('.volume-control input');

    if (!audio || !progressBar || !playPauseBtn || !volumeSlider) return;

    // Load saved volume from localStorage
    const savedVolume = localStorage.getItem('volume') || 1;
    audio.volume = savedVolume;
    volumeSlider.value = savedVolume * 100;

    // Event listeners for audio metadata and time updates
    audio.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progressPercent;
            progressBar.style.setProperty('--progress', `${progressPercent}%`);
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }
    });

    // Progress bar input event
    progressBar.addEventListener('input', (e) => {
        audio.currentTime = (e.target.value / 100) * audio.duration;
    });

    // Play/Pause button functionality
    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
            playPauseBtn.setAttribute('aria-label', 'Pause');
        } else {
            audio.pause();
            playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
            playPauseBtn.setAttribute('aria-label', 'Play');
        }
    });

    // Volume slider functionality
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        audio.volume = volume;
        localStorage.setItem('volume', volume);
    });

    // Handle song end
    audio.addEventListener('ended', () => {
        playPauseBtn.innerHTML = `<i class="fas fa-play"></i>`;
        playPauseBtn.setAttribute('aria-label', 'Play');

        if (currentSongIndex < playlistQueue.length - 1) {
            currentSongIndex++;
            const nextSong = playlistQueue[currentSongIndex];
            playSong(nextSong.src, nextSong.art, nextSong.title, nextSong.artist, playlistQueue);
        }
    });

    // Handle audio errors
    audio.addEventListener('error', () => {
        console.error('Error loading audio file.');
    });

    // Save playback state on pause
    audio.addEventListener('pause', () => {
        localStorage.setItem('currentSong', JSON.stringify({
            src: currentAudioSrc,
            currentTime: audio.currentTime
        }));
    });
}

// ===========================
// Play Song Functionality
// ===========================
function playSong(src, art, title, artist, queue = []) {
    playlistQueue = queue;
    currentSongIndex = playlistQueue.findIndex(song => song.src === src);
    currentAudioSrc = src;
    audio.src = src;
    audio.play();

    const playPauseBtn = document.getElementById('play-pause-btn');
    playPauseBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    playPauseBtn.setAttribute('aria-label', 'Pause');

    const currentTrack = document.querySelector('.current-track');
    currentTrack.querySelector('img').src = art;
    currentTrack.querySelector('img').alt = title;
    currentTrack.querySelector('h6').textContent = title;
    currentTrack.querySelector('p').textContent = artist;
}

// ===========================
// Scroll Functionality
// ===========================
document.querySelectorAll('.scroll-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Find the closest container with the scrollable content
        const container = button.closest('.recent-played-container, .featured-playlists-container, .favorite-playlists-container')
            .querySelector('.overflow-auto');

        if (!container) return;

        const scrollAmount = container.offsetWidth / 2; // Scroll half the container width

        if (button.classList.contains('right')) {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (button.classList.contains('left')) {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    });
});

// ===========================
// Event Delegation for Card Clicks
// ===========================
document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        const title = card.querySelector('.card-title').textContent;
        const artist = card.querySelector('.card-text').textContent;
        const song = recentPlayed.find(song => song.title === title && song.artist === artist);

        if (song) {
            playSong(song.src, song.art, song.title, song.artist, recentPlayed);
        }
    }
});

// ===========================
// Next and Previous Buttons
// ===========================
document.querySelector('.fa-step-forward').addEventListener('click', () => {
    if (currentSongIndex < playlistQueue.length - 1) {
        currentSongIndex++;
        const nextSong = playlistQueue[currentSongIndex];
        playSong(nextSong.src, nextSong.art, nextSong.title, nextSong.artist, playlistQueue);
    }
});

document.querySelector('.fa-step-backward').addEventListener('click', () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        const prevSong = playlistQueue[currentSongIndex];
        playSong(prevSong.src, prevSong.art, prevSong.title, prevSong.artist, playlistQueue);
    }
});

// ===========================
// Initialize Content
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    populateSection('.recent-played', recentPlayed, 'song');
    populateSection('.featured-playlists', featuredPlaylists, 'playlist');
    populateSection('.favorite-playlists', favoritePlaylists, 'playlist');

    // Load Playback State on Page Load
    const savedState = JSON.parse(localStorage.getItem('currentSong'));
    if (savedState) {
        const { src, currentTime } = savedState;
        const song = recentPlayed.find(song => song.src === src);

        if (song) {
            playSong(song.src, song.art, song.title, song.artist, recentPlayed);
            audio.currentTime = currentTime;
        }
    }

    setupAudioPlayer();
});