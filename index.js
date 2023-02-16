const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const playPause = document.querySelector('#playPause')
const shuffle = document.querySelector('.shuffle')

// Song titles
const songs = ['mess', 'philo', 'talking', 'soweto']

// Keep track of songs
let songIndex = 2

// initially load song into DOM
loadSong(songs[songIndex])

// update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
}

// Play function
function  playSong() {
    musicContainer.classList.add('play')
    // playBtn.innerText = 'Pause'
    playPause.src = 'icons/pause-button.png'

    audio.play()
}

// Pause function
function  pauseSong() {
    musicContainer.classList.remove('play')
    // playBtn.innerText = 'Play'
    playPause.src = 'icons/play-button.png'
    
    audio.pause()
}

// Prev Function
function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1 
    }

    loadSong(songs[songIndex])

    playSong()
}

// Next Function
function nextSong(){
    if (shuffle.classList.contains('shuffleClass')) {
        shuffleSong()
    } else {
        songIndex++
    
        if (songIndex > songs.length - 1) {
            songIndex = 0
        }
    
        loadSong(songs[songIndex])
    
        playSong()
    }
}

function updateProgress (e) {
    // console.log(e.srcElement.currentTime);
    // console.log(e.srcElement.duration);
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    // console.log(width);

    const clickX = e.offsetX
    // console.log(clickX);

    const duration = audio.duration
    // console.log(duration);

    audio.currentTime = (clickX / width) * duration
    // console.log(audio.currentTime);
}

// Event Listener
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

function shuffleSong() {
    songIndex = Math.floor(Math.random() * songs.length)
    console.log(songIndex);

    loadSong(songs[songIndex])

    playSong()
}

function shuffleMusic() {
    shuffle.classList.toggle('shuffleClass')

    if (shuffle.classList.contains('shuffleClass')) {
       
        audio.addEventListener('ended', shuffleSong)
    }
    else {
        audio.addEventListener('ended', nextSong)
    }

}

// Change song events
prevBtn.addEventListener('click', prevSong) 

nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)

// Add Shuffle

shuffle.addEventListener('click', shuffleMusic)