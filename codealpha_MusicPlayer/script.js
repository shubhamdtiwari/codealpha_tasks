let songs = [
  {
    title: "SoundHelix Song 1",
    artist: "Artist 1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/id/1015/400",
  },
];

let songIndex = 0;
let isShuffle = false;
let isRepeat = false;
let likedSongs = [];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const likeBtn = document.getElementById("like");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const main = document.querySelector(".main");
const fileInput = document.getElementById("fileInput");

function loadSong(index) {
  const song = songs[index];
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  cover.src = song.cover;

  document
    .querySelectorAll(".sidebar li")
    .forEach((li) => li.classList.remove("active"));
  if (playlistEl.children[index])
    playlistEl.children[index].classList.add("active");
}

function playSong() {
  audio.play();
  playBtn.innerText = "⏸";
  document.body.classList.add("playing");
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = "▶";
  document.body.classList.remove("playing");
}

playBtn.onclick = () => (audio.paused ? playSong() : pauseSong());

prevBtn.onclick = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
};

nextBtn.onclick = () => {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songIndex);
  playSong();
};

shuffleBtn.onclick = () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "#00f2ff" : "white";
};

repeatBtn.onclick = () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "#00f2ff" : "white";
};

likeBtn.onclick = () => {
  if (likedSongs.includes(songIndex)) {
    likedSongs = likedSongs.filter((i) => i !== songIndex);
    likeBtn.innerText = "🤍";
  } else {
    likedSongs.push(songIndex);
    likeBtn.innerText = "❤️";
  }
};

audio.onended = () => {
  if (isRepeat) {
    playSong();
  } else {
    nextBtn.onclick();
  }
};

audio.ontimeupdate = () => {
  const { currentTime, duration } = audio;
  if (duration) {
    progress.style.width = (currentTime / duration) * 100 + "%";
  }
  let m = Math.floor(currentTime / 60);
  let s = Math.floor(currentTime % 60);
  if (s < 10) s = "0" + s;
  currentTimeEl.innerText = m + ":" + s;
  if (duration) {
    let dm = Math.floor(duration / 60);
    let ds = Math.floor(duration % 60);
    if (ds < 10) ds = "0" + ds;
    durationEl.innerText = dm + ":" + ds;
  }
};

progressContainer.onclick = (e) => {
  audio.currentTime =
    (e.offsetX / progressContainer.clientWidth) * audio.duration;
};

volumeSlider.oninput = (e) => (audio.volume = e.target.value);

/* Upload Local MP3 */
fileInput.addEventListener("change", function () {
  const files = Array.from(this.files);
  files.forEach((file) => {
    const url = URL.createObjectURL(file);
    const newSong = {
      title: file.name.replace(".mp3", ""),
      artist: "Local File",
      src: url,
      cover: "https://picsum.photos/400?random=" + Math.random(),
    };
    songs.push(newSong);
    const index = songs.length - 1;
    const li = document.createElement("li");
    li.innerText = newSong.title;
    li.onclick = () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    };
    playlistEl.appendChild(li);
  });
  fileInput.value = "";
});

/* Build Initial Playlist */
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.innerText = song.title;
  li.onclick = () => {
    songIndex = index;
    loadSong(songIndex);
    playSong();
  };
  playlistEl.appendChild(li);
});

loadSong(songIndex);
