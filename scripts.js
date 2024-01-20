function resize(el, factor) {
  var width = el.offsetWidth;
  el.style.fontSize = ((width / factor) | 0) + "px";
}

window.onload = function () {
  function doResize() {
    const textos = document.getElementsByClassName("inv-text");
    let larg = textos.length;
    for (var i = 0; i < larg; i++) {
      resize(textos[i], 16);
    }
  }
  window.onresize = doResize;
  doResize();
};

// Fecha objetivo
const countDownDate = new Date("April 6, 2024").getTime();

// Actualizar el contador cada segundo
const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  // Cálculos para meses, días, horas, minutos y segundos
  const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(
    (distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("meses").innerHTML = `${months}`;
  document.getElementById("dias").innerHTML = `${days}`;
  document.getElementById("horas").innerHTML = `${hours}`;
  document.getElementById("minutos").innerHTML = `${minutes}`;
  document.getElementById("segundos").innerHTML = `${seconds}`;

  // Cuando la cuenta regresiva termina, mostrar un mensaje
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "¡Ha llegado la fecha!";
  }
}, 1000);

// Función para inicializar el mapa
function initMap() {
  // Coordenadas del lugar a mostrar
  const location = { lat: 40.7128, lng: -74.006 }; // Ejemplo: Nueva York

  // Crear un mapa en el contenedor con id "map"
  const map = new google.maps.Map(document.getElementById("map"), {
    center: location, // Centrar el mapa en las coordenadas especificadas
    zoom: 12, // Nivel de zoom del mapa
  });

  // Marcador en el mapa
  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Ubicación", // Título del marcador
  });

  VanillaTilt.init(document.querySelector(".card-tilt-js"), {
    // vanilla-tilt.js (https://micku7zu.github.io/vanilla-tilt.js/) is required for this one
    max: 25, // max tilt rotation (degrees (deg))
    perspective: 1000, // transform perspective, the lower the more extreme the tilt gets (pixels (px))
    scale: 1.05, // transform scale - 2 = 200%, 1.5 = 150%, etc..
    speed: 500, // speed (transition-duration) of the enter/exit transition (milliseconds (ms))
    easing: "cubic-bezier(.03,.98,.52,.99)", // easing (transition-timing-function) of the enter/exit transition
  });

  const tiltEffectSettings = {
    max: 25,
    perspective: 1000,
    scale: 1.05,
    speed: 500,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  const card = document.querySelector(".card");

  card.addEventListener("mouseenter", cardMouseEnter);
  card.addEventListener("mousemove", cardMouseMove);
  card.addEventListener("mouseleave", cardMouseLeave);

  function cardMouseEnter(event) {
    setTransition();
  }

  function cardMouseMove(event) {
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth / 2;
    const centerY = card.offsetTop + cardHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped =
      +1 * ((tiltEffectSettings.max * mouseY) / (cardHeight / 2));
    const rotateYUncapped =
      -1 * ((tiltEffectSettings.max * mouseX) / (cardWidth / 2));
    const rotateX =
      rotateXUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateXUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateXUncapped;
    const rotateY =
      rotateYUncapped < -tiltEffectSettings.max
        ? -tiltEffectSettings.max
        : rotateYUncapped > tiltEffectSettings.max
        ? tiltEffectSettings.max
        : rotateYUncapped;

    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                            scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
  }

  function cardMouseLeave(event) {
    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition();
  }

  function setTransition() {
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
      card.style.transition = "";
    }, tiltEffectSettings.speed);
  }
}

var audio = document.getElementById("miAudio");
var musicOn = false;
var visited = false;

function startAudioOnScroll() {
  window.addEventListener("scroll", function () {
    var scrollThreshold = window.innerHeight / 2;

    if (window.scrollY >= scrollThreshold && !visited) {
      audio.play();
      visited = true;
      musicOn = true;
      window.removeEventListener("scroll", startAudioOnScroll);
    }
  });
}

function stopOrPlay() {
  if (musicOn) {
    audio.pause();
    musicOn = false;
  } else {
    audio.play();
    musicOn = true;
  }
}

if (!visited) {
  startAudioOnScroll();
}
