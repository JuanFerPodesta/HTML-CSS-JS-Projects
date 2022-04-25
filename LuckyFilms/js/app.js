const movieList = [
  "reservoir dogs",
  "pulp fiction",
  "kill bill",
  "harry potter",
  "titanic",
  "django unchained",
  "jackie brown",
  "midnight in paris",
  "The hateful eight",
  "rango",
  "superman",
  "back to the future",
  "lord of the rings",
  "Toy Story",
  "Licorice Pizza",
  "The Hangover",
  "Hook",
  "Aladin",
  "Harry Potter and the Prisoner of Azkaban",
  "Beauty and the Beast",
  "Cinderella",
  "The Fly",
  "Batman Begins",
  "Batman: The Dark Knight",
  "Joker",
  "Saving Private Ryan",
  "Forrest Gump",
  "Isle of Dogs",
  "Terminator 2: Judgment Day",
  "Avatar",
  "The Godfather",
  "The Shining",
  "Schindler's List",
  "The Good, the Bad and the Ugly",
  "Star Wars: Episode V - The Empire Strikes Back",
  "The Matrix Reloaded",
  "City of God",
  "Interstellar",
  "The Green Mile",
  "The Lion King",
  "Whiplash",
  "Inception",
  "Memento",
  "The Matrix",
];

const sectionInicio = document.getElementById("sectionInicio");
const jugador1 = document.getElementById("jugador1");
const jugador2 = document.getElementById("jugador2");
const btnJugar = document.getElementById("btnJugar");
const sectionAnimation = document.getElementById("sectionAnimation");
const sectionCarrousel = document.getElementById("sectionCarrousel");
const btnSlide = document.querySelectorAll(".btnSlide");
const slides = document.querySelectorAll(".slide");
const resultadosAnteriores = document.querySelector(".resultadosAnteriores");
const sectionResults = document.getElementById("sectionResults");
const sectionMenu = document.getElementById("sectionMenu");
const irAResults = document.getElementById("irAResults");
const irAInicio = document.getElementById("irAInicio");
const btnGuardarSalir = document.getElementById("btnGuardarSalir");
const btnSalirAlmacenados = document.getElementById("btnSalirAlmacenados");
const resultadosPartidosAnteriores = document.getElementById(
  "resultadosPartidosAnteriores"
);

ocultar(sectionAnimation);
ocultar(sectionCarrousel);
ocultar(sectionResults);
ocultar(sectionMenu);
ocultar(resultadosPartidosAnteriores);
ocultar(btnGuardarSalir);
ocultar(btnSalirAlmacenados);

const traerPartidos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const partidos = document.querySelectorAll(".partidos");
      resolve(partidos);
    }, 2000);
  });
};

if (localStorage.length === 0) {
  ocultar(resultadosAnteriores);
} else if (traerPartidos()) {
  verPartidosAnteriores();
}
// generar resultados anteriores segun el localsotrage

//
almacenadosEnLocalStorage();

async function almacenadosEnLocalStorage() {
  for (i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    console.log(key);
    resultadosAnteriores.innerHTML += `<h1 class="partidos">${key}</h1>`;
  }
}

// creo el modelo para los slides

let movieCardModel = `<div class="cardHeader margin-rl">
                            <p class="nroCarta"></p>
                            <span><i class="scoreboard material-icons"> scoreboard </i></span> 
                      </div>  
                      <div class="slideCard padding-gral margin-rl">
                        <h1 class="title"></h1>
                        <img class="img padding-gral" src="" alt="poster" />
                        <h3 class="rating"></h3>
                      </div>`;

// inserto en el código el modelo de slides
slides.forEach(function (slide) {
  slide.innerHTML = movieCardModel;
});

// es para que cada slide se corra hacia la izquierda la cantidad correspondiente

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

btnJugar.addEventListener("click", async function () {
  ocultar(sectionInicio);
  sectionAnimation.innerHTML = `<div class="animation slide-out-fwd-center"></div>`;
  const mostrarSectionAnimation = await mostrar(sectionAnimation);
  mostrarSectionAnimation;
  setTimeout(() => ocultar(sectionAnimation), 3500);
  setTimeout(() => {
    slides.forEach(function (slide, index) {
      generarRandomMovie(index);
    });
  }, 1000);
  setTimeout(() => {
    slides.forEach(function (slide, index) {
      ordenarYMostrarMovies(index);
    });
  }, 1500);
  setTimeout(async () => {
    const mostrarSectionCarrousel = await mostrar(sectionCarrousel);
    mostrarSectionCarrousel;
  }, 3000);
  await generarResultados();
});

function ocultar(section) {
  section.style.display = "none";
}

const mostrar = (section) => {
  return new Promise((resolve) => {
    resolve((section.style.display = "block"));
  });
};

let title = document.querySelectorAll(".title");
let img = document.querySelectorAll(".img");
let rating = document.querySelectorAll(".rating");
let ratingValues = [];
let titulosArr = [];
let imgSrcArr = [];

async function generarRandomMovie(i) {
  let randomNumber = Math.floor(Math.random() * movieList.length);
  let encoded = encodeURI(movieList[randomNumber]);
  movieList.splice(randomNumber, 1);
  let movies = await fetch(
    "https://www.omdbapi.com/?t=" + encoded + "&apikey=1fdfa668"
  );
  let resultado = await movies.json();
  titulosArr.push(resultado.Title);
  imgSrcArr.push(resultado.Poster);
  ratingValues.push(resultado.Ratings[0].Value);
  console.log(titulosArr);
}

function ordenarYMostrarMovies(i) {
  title[i].innerHTML = titulosArr[i];
  img[i].setAttribute("src", imgSrcArr[i]);
  rating[i].innerHTML = `Puntos: ` + ratingValues[i];
}

// botonera carrousel

let prevBtn = 0;

btnSlide[prevBtn].classList.add("active-material-icons");

for (let i = 0; i < btnSlide.length; i++) {
  btnSlide[i].addEventListener("click", function () {
    slides.forEach(function (slide) {
      slide.style.transform = `translateX(-${i * 100}%)`;
    });
    btnSlide[prevBtn].classList.remove("active-material-icons");
    btnSlide[i].classList.add("active-material-icons");
    prevBtn = i;
  });
}

function resetearCarrouselBtn(aux, boton, clase) {
  boton[aux].classList.remove(clase);
  aux = 0;
}

const traerNroCarta = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let nroCarta = document.querySelectorAll(".nroCarta");
      resolve(nroCarta);
    }, 2000);
  });
};

async function sumarRatings(array) {
  let puntosJugador1 = 0;
  let puntosJugador2 = 0;
  let nroCarta = await traerNroCarta();
  if (nroCarta) {
    for (i = 0; i < array.length; i++) {
      if (i < 3) {
        puntosJugador1 += parseFloat(array[i]);
        nroCarta[i].innerHTML += `<h6>${jugador1.value} - carta ${
          i + 1
        }/3</h6>`;
      } else {
        puntosJugador2 += parseFloat(array[i]);
        nroCarta[i].innerHTML += `<h6>${jugador2.value} - carta ${
          i - 3 + 1
        }/3</h6>`;
      }
    }
  }
  return [puntosJugador1, puntosJugador2];
}

const traerScoreboard = () => {
  return new Promise((resolve) => {
    let scoreboard = document.querySelectorAll(".scoreboard");
    resolve(scoreboard);
  });
};

async function irAmenu() {
  const scoreboard = await traerScoreboard();
  for (let i = 0; i < scoreboard.length; i++) {
    scoreboard[i].addEventListener("click", async function () {
      ocultar(sectionCarrousel);
      const mostrarSectionMenu = await mostrar(sectionMenu);
      mostrarSectionMenu;
    });
  }
}

irAmenu();

let sectionResultsCode = `<h1 id="player1" class"espacios-md"></h1>
                                <div class="postersContainer">
                                 <div class="poster"></div>
                                 <div class="poster"></div>
                                 <div class="poster"></div>
                                </div>
                                <h1 id="player2" class"espacios-md"></h1>
                                <div class="postersContainer">
                                  <div class="poster"></div>
                                  <div class="poster"></div>
                                  <div class="poster"></div>
                                </div>
                                <h2 id="winner" class="winner margin-rl"></h2>`;

async function generarResultados() {
  sectionResults.innerHTML = sectionResultsCode;
  let ratings = await sumarRatings(ratingValues);
  let ganador = winner(ratings);
  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");
  let winners = document.getElementById("winner");
  let posters = document.querySelectorAll(".poster");
  player1.innerHTML = `${jugador1.value} - ${ratings[0].toFixed(2)} puntos`;
  player2.innerHTML = `${jugador2.value} - ${ratings[1].toFixed(2)} puntos`;
  winners.innerHTML = `${resultadoFinal(
    ganador,
    jugador1.value,
    jugador2.value
  )}`;
  posters.forEach(function (poster, index) {
    poster.style.background = `url(${imgSrcArr[index]}) center/cover no-repeat`;
  });
}

function winner(array) {
  if (array[0] > array[1]) {
    return 1;
  } else if (array[1] > array[0]) {
    return 2;
  } else {
    return 0;
  }
}

function resultadoFinal(resultado, j1, j2) {
  if (resultado === 1) {
    return `Ganador ${j1}!!!`;
  } else if (resultado === 2) {
    return `Ganador ${j2}!!!`;
  } else {
    return `Empate!!!`;
  }
}

async function irAMenuResults() {
  irAResults.addEventListener("click", async function () {
    ocultar(sectionMenu);
    await mostrar(sectionResults);
    resetearCarrouselBtn(prevBtn, btnSlide, "active-material-icons");
    mostrar(btnGuardarSalir);
    btnSalir();
    btnGuardar();
  });
}

async function volverAlInicio() {
  irAInicio.addEventListener("click", async function () {
    setBackToDefault(jugador1);
    setBackToDefault(jugador2);
    ocultar(sectionMenu);
    let nroCarta = await traerNroCarta();
    await setBackToDefaultArr(nroCarta);
    await mostrar(sectionInicio);
    resetearCarrouselBtn(prevBtn, btnSlide, "active-material-icons");
    ratingValues = [];
    titulosArr = [];
    imgSrcArr = [];
  });
}

irAMenuResults();
volverAlInicio();

const traerBtnSalir = () => {
  return new Promise((resolve) => {
    const salir = document.getElementById("salir");
    resolve(salir);
  });
};

const traerBtnGuardar = () => {
  return new Promise((resolve) => {
    const guardar = document.getElementById("guardar");
    resolve(guardar);
  });
};

async function btnSalir() {
  let salir = await traerBtnSalir();
  if (salir) {
    salir.addEventListener("click", async function () {
      setBackToDefault(jugador1);
      setBackToDefault(jugador2);
      ocultar(sectionResults);
      await mostrar(sectionInicio);
      let nroCarta = await traerNroCarta();
      await setBackToDefaultArr(nroCarta);
      ratingValues = [];
      titulosArr = [];
      imgSrcArr = [];
      ocultar(btnGuardarSalir);
    });
  }
}

async function btnGuardar() {
  let key = `${jugador1.value} VS ${jugador2.value}`;
  let guardar = await traerBtnGuardar();
  let resultados = sectionResults.innerHTML;
  if (guardar) {
    guardar.addEventListener("click", async function () {
      localStorage.setItem(key, resultados);
      setBackToDefault(jugador1);
      setBackToDefault(jugador2);
      ocultar(sectionResults);
      await mostrar(sectionInicio);
      let nroCarta = await traerNroCarta();
      await setBackToDefaultArr(nroCarta);
      ratingValues = [];
      titulosArr = [];
      imgSrcArr = [];
      ocultar(btnGuardarSalir);
    });
  }
  await mostrar(resultadosAnteriores);
  resultadosAnteriores.innerHTML += `<h1 class="partidos">${jugador1.value} VS ${jugador2.value}</h1>`;
  verPartidosAnteriores();
}

function setBackToDefault(valor) {
  valor.value = ``;
}

function setBackToDefaultElement(valor) {
  valor.innerHTML = ``;
}

const setBackToDefaultArr = (arr) => {
  return new Promise((resolve) => {
    arr.forEach(function (a) {
      a.innerHTML = ``;
    });
    resolve(arr);
  });
};

async function verPartidosAnteriores() {
  let partidos = await traerPartidos();
  for (let i = 1; i <= partidos.length; i++) {
    // resultadosPartidosAnteriores.innerHTML = localStorage.getItem(
    //   partidos[0].innerHTML
    // );
    partidos[i].addEventListener("click", function () {
      ocultar(sectionInicio);
      resultadosPartidosAnteriores.innerHTML = localStorage.getItem(
        partidos[i].innerHTML
      );
      mostrar(resultadosPartidosAnteriores);
      mostrar(btnSalirAlmacenados);
    });
  }
}

btnSalirAlmacenados.addEventListener("click", function () {
  mostrar(sectionInicio);
  ocultar(btnSalirAlmacenados);
  ocultar(resultadosPartidosAnteriores);
});
