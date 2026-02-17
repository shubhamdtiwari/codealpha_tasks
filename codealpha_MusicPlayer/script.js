const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "Artist 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/id/237/300",
  },
  {
    title: "SoundHelix Song 2",
    artist: "Artist 2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/id/238/300",
  },
];

let songIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.innerText = "⏸";
  cover.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶";
  cover.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = progressPercent + "%";

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
  currentTimeEl.innerText = currentMinutes + ":" + currentSeconds;

  if (duration) {
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    durationEl.innerText = durationMinutes + ":" + durationSeconds;
  }
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadSong(songs[songIndex]);
