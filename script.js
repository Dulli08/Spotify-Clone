"use strict";

console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio("Songs/nate.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgress = document.getElementById("myProgress");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Nate",
    filePath: "Songs/nate.mp3",
    coverPath: "Covers/NF_-_The_Search.png",
  },
  {
    songName: "Time",
    filePath: "Songs/time.mp3",
    coverPath: "Covers/NF_-_The_Search.png",
  },
  {
    songName: "The Search",
    filePath: "Songs/the search.mp3",
    coverPath: "Covers/NF_-_The_Search.png",
  },
  {
    songName: "Change",
    filePath: "Songs/change.mp3",
    coverPath: "Covers/NF_-_The_Search.png",
  },
];

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("songItemPlay")[0].id = i; // Ensure each songItemPlay has a unique ID
});

const highlightCurrentSong = () => {
  songItem.forEach((element, index) => {
    element.classList.remove("playing");
    if (index === songIndex) {
      element.classList.add("playing");
    }
  });
};

// Handle play/pause events
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Listen to events
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgress.value = progress;
  updateTime();
});

myProgress.addEventListener("change", () => {
  audioElement.currentTime = (myProgress.value * audioElement.duration) / 100;
  updateTime();
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = songs[songIndex].filePath; // Use filePath from songs array
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      masterSongName.innerText = songs[songIndex].songName;
      highlightCurrentSong();
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[songIndex].songName;
  highlightCurrentSong();
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  masterSongName.innerText = songs[songIndex].songName;
  highlightCurrentSong();
});

const updateTime = () => {
  let currentMinutes = Math.floor(audioElement.currentTime / 60);
  let currentSeconds = Math.floor(audioElement.currentTime % 60);
  let durationMinutes = Math.floor(audioElement.duration / 60);
  let durationSeconds = Math.floor(audioElement.duration % 60);

  currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
  durationSeconds =
    durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;

  document.getElementById(
    "currentTime"
  ).innerText = `${currentMinutes}:${currentSeconds}`;
  document.getElementById(
    "duration"
  ).innerText = `${durationMinutes}:${durationSeconds}`;
};

audioElement.addEventListener("loadedmetadata", updateTime);
audioElement.addEventListener("error", (e) => {
  console.error("Failed to load audio file", e);
  masterPlay.classList.remove("fa-pause-circle");
  masterPlay.classList.add("fa-play-circle");
  gif.style.opacity = 0;
  masterSongName.innerText = "Error loading song";
});
