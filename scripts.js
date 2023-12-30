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

  // Mostrar el contador en el elemento con id "countdown"
  document.getElementById("countdown").innerHTML = `
      <div class="row">
        <div class="col">
          <p class="c_reg_elem">meses</p>
        </div>
        <div class="col">
          ${months}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="c_reg_elem">días</p>
        </div>
        <div class="col">
          ${days}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="c_reg_elem">horas</p>
        </div>
        <div class="col">
          ${hours}
        </div>
      </div>
    `;

  //<div>${minutes} minutos</div>
  //<div>${seconds} segundos</div>

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
}
