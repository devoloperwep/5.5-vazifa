const playBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backgwordBtn = document.querySelector("#backward");
const progressContainer = document.querySelector(".progress-container");
const progressEl = document.querySelector(".progress");
const audio = document.querySelector("audio");
const container = document.querySelector(".container");
const input = document.querySelector("input");
const volume = document.querySelector("#volume-changer");
const volumeText = document.querySelector("span");
const cover = document.getElementById("cover");
const musicTitle = document.getElementById("music-title");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");
const speed1 = document.getElementById("speed-1");
const speed05 = document.getElementById("speed-05");
const speed2 = document.getElementById("speed-2");
const volumeIcon = document.getElementById("volume-icon");
const mutedEl = document.querySelector(".muted");
const downloadEl = document.getElementById("download");
const speedEl = document.querySelectorAll(".speed");
const timerInput = document.getElementById("time-input");
const timerBtn = document.getElementById("timer-btn");
const timerCount = document.querySelector(".timer-count");

const songs = [
  "Weeknd - Blinding Lights",
  "sherali-jorayev",
  "jahongir-otajonov-oq-bulut",
];

let currentPlayingSong = 0;
function changSong(current) {
  audio.src = `../audios/${songs[current]}.mp3`;
  cover.src = `../images/${songs[current]}.png`;
  downloadEl.href = `../audios/${songs[current]}.mp3`;
  musicTitle.textContent = `${songs[current]}`;
}
changSong(currentPlayingSong);

audio.volume = +volume.value / 100;
volumeText.textContent = `${volume.value}`;

function pause() {
  audio.pause();
  container.classList.remove("play");
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

function play() {
  audio.play();
  container.classList.add("play");
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function nextSong() {
  if (currentPlayingSong < songs.length - 1) {
    currentPlayingSong++;
  } else {
    currentPlayingSong = 0;
  }
  changSong(currentPlayingSong);
  play();
}

function prevSong() {
  if (currentPlayingSong > 0) {
    currentPlayingSong--;
  } else {
    currentPlayingSong = songs.length - 1;
  }
  changSong(currentPlayingSong);
  play();
}

function muzicPlay() {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function progress() {
  const duration = audio.duration;
  const currentTime = audio.currentTime;

  const decresingTime = isNaN(duration - currentTime)
    ? 0
    : duration - currentTime;

  const minutes = String((decresingTime - (decresingTime % 60)) / 60);
  const seconds = String(parseInt(decresingTime % 60));
  const time = `${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes}:${
    +seconds < 10 ? `${seconds.padStart(2, 0)}` : seconds
  }`;
  currentTimeEl.textContent = time;

  const p = (currentTime / duration) * 100;
  progressEl.style.width = `${p}%`;
}

function audioLoad() {
  const duration = audio.duration;
  const minutes = String((duration - (duration % 60)) / 60);
  const seconds = String(parseInt(duration % 60));
  const time = `${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes}:${
    +seconds < 10 ? `${seconds.padStart(2, 0)}` : seconds
  }`;
  durationEl.textContent = time;
}

function changeTime(e) {
  const p = (e.offsetX / this.clientWidth) * 100;
  const currentTime = (audio.duration / 100) * p;
  audio.currentTime = currentTime;
}

function volumeChange() {
  audio.volume = +volume.value / 100;
  volumeText.textContent = `${volume.value}`;
  if (volume.value >= 80) {
    volumeIcon.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  } else if (0 < volume.value) {
    volumeIcon.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
  } else if (volume.value == 0) {
    volumeIcon.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  }
}

let mutedTarget = true;
function mutedControl() {
  if (mutedTarget) {
    audio.muted = true;
    mutedEl.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
  } else {
    audio.muted = false;
    mutedEl.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  }
  mutedTarget == true ? (mutedTarget = false) : (mutedTarget = true);
}

let timeCount = 0;
function timerPause() {
  const inputValue = timerInput.value;
  const error = document.querySelector(".error");
  if (String(inputValue).trim() == "") {
    error.textContent = "Raqam kiriting.";
    setTimeout(() => {
      error.textContent = "";
    }, 1500);
  } else {
    document.removeEventListener("keyup", keyMuzic);
    playBtn.disabled = true;
    play();
    timeCount = inputValue;
    timerCount.textContent = timeCount;
    timerInput.value = "";
    timerInput.disabled = true;
    const countTime = setInterval(() => {
      timeCount--;
      timerCount.textContent = timeCount;
    }, 1000);
    setTimeout(() => {
      timerInput.disabled = false;
      clearInterval(countTime);
      pause();
      timerCount.textContent = "00";
      playBtn.disabled = false;
      document.addEventListener("keyup", keyMuzic);
    }, `${inputValue}000`);
  }
}

let target = true;
function keyMuzic(e) {
  if (e.which == 32) {
    if (target) {
      muzicPlay();
    } else {
      audio.pause();
    }
    target == true && false;
  }
}

audio.addEventListener("loadeddata", audioLoad);
playBtn.addEventListener("click", muzicPlay);
audio.addEventListener("timeupdate", progress);
progressContainer.addEventListener("click", changeTime);
volume.addEventListener("input", volumeChange);
audio.addEventListener("ended", nextSong);
backgwordBtn.addEventListener("click", prevSong);
forwardBtn.addEventListener("click", nextSong);
timerBtn.addEventListener("click", timerPause);
mutedEl.addEventListener("click", mutedControl);
document.addEventListener("keyup", keyMuzic);
document.addEventListener("DOMContentLoaded", () => {
  audio.currentTime = 100;
});

// speeds
speedEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    speedEl.forEach((item) => item.classList.remove("opasity"));
    btn.classList.add("opasity");
  });
});
speed1.addEventListener("click", () => {
  audio.playbackRate = 1;
});
speed05.addEventListener("click", () => {
  audio.playbackRate = 0.5;
});
speed2.addEventListener("click", () => {
  audio.playbackRate = 2;
});
