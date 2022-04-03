/* variants */

const recommended = document.getElementById("playList");

const artistSpace = document.getElementById("player");

document.addEventListener("DOMContentLoaded", loadCards());

function loadCards() {
  fetch("../json/sound.json")
    .then((res) => res.json())
    .then((data) => {
      let count = 0;
      data.forEach((song) => {
        count++;

        console.log(count);
        recommended.innerHTML += `  <!-- card -->
        <div class="card-music" id = ${song.id} >
          <div class="img-card" ><img src=${song.picture} alt="artista" ></div>
          <h4 class="name-card"   >${song.name}</h4>
          
        </div>
        <!-- fin card -->`;
      });
    });

  getArtist();
}

function getArtist() {
  window.addEventListener("click", (e) => {
    const point = e.target;
    if (point.classList.contains("card-music")) {
      const card = point;
      console.log(card.id);
      setArtist(card.id);
    }
  });
}

function setArtist(id) {
  fetch("../json/sound.json")
    .then((res) => res.json())
    .then((artistas) => {
      const artistSet = artistas.find((artista) => artista.id == id);

      console.log(artistSet);

      artistSpace.innerHTML = ` <div class="album-artist">
      <img id="artist" src=${artistSet.picture} alt="">
      </div>
      
      <h4  class="name-sound text-black">${artistSet.name}</h4>
      <h4  class="name-sound text-black">${artistSet.artist}</h4>
      <div class="volume">  <img src="./img/icons/audio.png" alt="audio" class="audio"><input id='vol' type="range" min="0" max="1" step="0.1" class="slider"></div>

      
      <div class="controls">
      <button class="btn-m" id="back"><img src="img/icons/rewind.png" alt="rewind"> </button>
      <button class="btn-m" id="play" onclick = "playMusic('${artistSet.sound}')"><img src="img/icons/play.png" alt="play"></button>
      <button class="btn-m" id="pause"  onclick="pauseMusic()"><img src=".//img/icons/pausa.png" alt="pause"></button>
      <button class="btn-m" id="next"   onclick ="pauseMusic()"><img src="img/icons/fast-forward.png" alt="play"></button>
      </div>`;

      soundVolume();
    });
}

/* code reproductor */
var audio;

const playMusic = (src) => {
  if (typeof audio == "object") {
    audio.src = src;
    audio.play();

    console.log("play");
  } else {
    audio = new Audio(src);
    audio.play();
  }
  var artist = document.getElementById("artist");
  artist.classList.add("animacion");
};

const pauseMusic = () => {
  artist.classList.remove("animacion");
  console.log("pause");
  audio.pause();
};

function soundVolume() {
  const volume = document.getElementById("vol");
  volume.addEventListener("click", () => {
    let dcv = volume.value;

    audio.volume = dcv;
  });
}
