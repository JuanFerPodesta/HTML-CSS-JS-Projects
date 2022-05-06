// moives array
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
  "The Shawshank Redemption",
  "Fight Club",
  "Goodfellas",
  "La vita è bella",
  "The Departed",
  "Cinema Paradiso",
  "Raiders of the Lost Ark",
  "Witness for the Prosecution",
  "Avengers: Infinity War",
  "American Beauty",
  "Spider-Man: Into the Spider-Verse",
  "braveheart",
  "amadeus",
  "coco",
  "Star Wars: Episode VI - Return of the Jedi",
  "amelie",
];

//SETUP

let counter = 0;
let currentKey = 0;

// screens

const screenInicio = document.getElementById("screenInicio");
const screenAnimacion = document.getElementById("screenAnimacion");
const screenCards = document.getElementById("screenCards");
const screenResultados = document.getElementById("screenResultados");

// inputs jugadores

const jugador1 = document.getElementById("jugador1");
const jugador2 = document.getElementById("jugador2");

// botones

const btnPlay = document.getElementById("btnPlay");
const btnVolver = document.getElementById("btnVolver");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const btnResultados = document.getElementById("btnResultados");
const btnVolverScores = document.getElementById("btnVolverScores");
const btnGuardarResultados = document.getElementById("btnGuardarResultados");
const deleteBtn = document.querySelector(".deleteBtn");
const listBtn = document.querySelector(".listBtn");

// variables globales

let chosenMovies = [];

// slides

const slides = document.querySelectorAll(".slide");

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

ocultar(prevBtn);

// elementos para completar dinamicamente

const nombreJugadorInicio = document.querySelectorAll(".nombreJugadorInicio");
const filmCard = document.querySelectorAll(".filmCard");
const filmTitle = document.querySelectorAll(".filmTitle");
const filmPoster = document.querySelectorAll(".filmPoster");
const filmRatingPoints = document.querySelectorAll(".filmRatingPoints");
const nombreJugadorScores = document.querySelectorAll(".nombreJugadorScores");
const puntajeJugador = document.querySelectorAll(".puntajeJugador");
const nombreJugadorGanador = document.getElementById("nombreJugadorGanador");
const posterImage = document.querySelectorAll(".posterImage");
const frase = document.getElementById("frase");
const cardPreviousMatches = document.getElementById("cardPreviousMatches");
const previousMatches = document.getElementById("previousMatches");
const alert = document.querySelector(".alert");

localStorage.length !== 0
  ? almacenadosEnLocalStorage()
  : ocultar(previousMatches);

// eventos de botones
btnPlay.addEventListener("click", function () {
  if (jugador1.value === `` || jugador2.value === ``) {
    return displayAlert("Nombres de los jugadores ???", "danger");
  }
  completarNombresJugadores(jugador1, jugador2);
  currentKey = generarKey(jugador1, jugador2);
  ocultar(screenInicio);
  mostrar(screenAnimacion);
  setTimeout(() => ocultar(screenAnimacion), 5000);
  setTimeout(() => mostrar(screenCards), 5000);
  try {
    for (i = 0; i < slides.length; i++) {
      generarRandomMovie();
    }
  } catch {
    mostrar(screenAnimacion);
    setTimeout(() => ocultar(screenAnimacion), 5000);
  }
  setTimeout(
    () => completarFilmCard(filmPoster, filmTitle, filmRatingPoints),
    4500
  );

  counter = 0;
  carousel();
  console.log(chosenMovies);
});

btnVolver.addEventListener("click", function () {
  console.log("Hola btnVolver");
  ocultar(screenCards);
  mostrar(screenInicio);
  setBackToDefault(jugador1);
  setBackToDefault(jugador2);
  chosenMovies = [];
});
prevBtn.addEventListener("click", function () {
  console.log("Hola prevBtn");
  counter--;
  carousel();
});
nextBtn.addEventListener("click", function () {
  console.log("Hola nextBtn");
  counter++;
  carousel();
});
btnResultados.addEventListener("click", function () {
  console.log("Hola btnResultados");
  ocultar(screenCards);
  mostrar(screenResultados);
  completarResultados();
  mostrar(btnGuardarResultados);
  setBackToDefault(jugador1);
  setBackToDefault(jugador2);
});

btnVolverScores.addEventListener("click", function () {
  console.log("Hola tnVolverScores");
  chosenMovies = [];
  ocultar(screenResultados);
  mostrar(screenInicio);
});
btnGuardarResultados.addEventListener("click", function () {
  console.log("Hola btnGuardarResultados");
  console.log(currentKey);
  addToLocalStorage(currentKey, chosenMovies);
  ocultar(screenResultados);
  guardarEnPreviousMatches(currentKey);
  mostrar(screenInicio);
  mostrar(previousMatches);
  chosenMovies = [];
});

document.addEventListener("click", function (e) {
  if (e.target.id === "deleteBtn") {
    let actualKey =
      e.target.parentElement.parentElement.parentElement.children[0].innerHTML;
    console.log(actualKey);
    const element = e.target.parentElement.parentElement.parentElement;
    localStorage.removeItem(actualKey);
    setBackToDefaultElement(element);
    console.log(element);
    if (localStorage.length === 0) {
      ocultar(previousMatches);
    }
  }
});

document.addEventListener("click", function (e) {
  if (e.target.id === "listBtn") {
    console.log("list Button");
    let actualKey =
      e.target.parentElement.parentElement.parentElement.children[0].innerHTML;
    console.log(actualKey);
    let catchJugadores = actualKey.split(" ");
    console.log("jugador1", catchJugadores[0]);
    console.log("jugador2", catchJugadores[2]);
    let datosPartidaAnterior = getLocalStorage(actualKey);
    console.log("datosPartidaAnterior", datosPartidaAnterior);
    completarResultadosDesdeInicio(catchJugadores, datosPartidaAnterior);
    ocultar(screenInicio);
    ocultar(btnGuardarResultados);
    mostrar(screenResultados);
  }
});
// FUNCIONES
// generales
function ocultar(section) {
  section.classList.add("hidden");
}

function mostrar(section) {
  section.classList.remove("hidden");
}

function setBackToDefault(valor) {
  valor.value = ``;
}

function setBackToDefaultElement(valor) {
  valor.innerHTML = ``;
}

//particulares
async function generarRandomMovie() {
  let randomNumber = Math.floor(Math.random() * movieList.length);
  let encoded = encodeURI(movieList[randomNumber]);
  movieList.splice(randomNumber, 1);
  let movies = await fetch(
    "https://www.omdbapi.com/?t=" + encoded + "&apikey=1fdfa668"
  );
  let resultado = await movies.json();
  let title = resultado.Title;
  let poster = resultado.Poster;
  let rating = resultado.Ratings[0].Value;
  const pelis = { title, poster, rating };
  chosenMovies.push(pelis);
}

function carousel() {
  if (counter < slides.length - 1) {
    mostrar(nextBtn);
  } else {
    ocultar(nextBtn);
  }

  if (counter > 0) {
    mostrar(prevBtn);
  } else {
    ocultar(prevBtn);
  }

  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

function completarNombresJugadores(jugador1, jugador2) {
  nombreJugadorInicio.forEach(function (nombre, index) {
    if (index >= 0 && index < 3) {
      nombre.innerHTML = jugador1.value;
    } else {
      nombre.innerHTML = jugador2.value;
    }
  });
}

function completarFilmCard(posters, titles, ratingPoints) {
  posters.forEach(function (poster, index) {
    poster.style.backgroundImage = `url(${chosenMovies[index].poster})`;
  });
  titles.forEach(function (title, index) {
    title.innerHTML = chosenMovies[index].title;
  });
  ratingPoints.forEach(function (Rating, index) {
    Rating.innerHTML = chosenMovies[index].rating;
  });
}

function completarResultados() {
  nombreJugadorScores[0].innerHTML = jugador1.value;
  nombreJugadorScores[1].innerHTML = jugador2.value;
  let puntajes = puntajesJugadores(chosenMovies);
  puntajeJugador[0].innerHTML = puntajes[0].toFixed(2);
  puntajeJugador[1].innerHTML = puntajes[1].toFixed(2);
  nombreJugadorGanador.innerHTML = ganador(
    puntajes[0],
    puntajes[1],
    jugador1.value,
    jugador2.value
  );
  posterImage.forEach(function (poster, index) {
    poster.style.backgroundImage = `url(${chosenMovies[index].poster})`;
  });
}

function puntajesJugadores(array) {
  let puntajesJugador1 = 0;
  let puntajesJugador2 = 0;
  for (i = 0; i < array.length; i++) {
    if (i < 3) {
      puntajesJugador1 += parseFloat(array[i].rating);
    } else {
      puntajesJugador2 += parseFloat(array[i].rating);
    }
  }
  return [puntajesJugador1, puntajesJugador2];
}

function ganador(a, b, jugador1, jugador2) {
  if (a == b) {
    return `Empate`;
  } else {
    mostrar(frase);
    return a > b ? jugador1 : jugador2;
  }
}

function generarKey(jugador1, jugador2) {
  return `${jugador1.value} vs ${jugador2.value} `;
}

function addToLocalStorage(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

function getLocalStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function almacenadosEnLocalStorage() {
  for (i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    guardarEnPreviousMatches(key);
  }
  mostrar(previousMatches);
}

function guardarEnPreviousMatches(key) {
  cardPreviousMatches.innerHTML += `
    <div class="listPreviousMatches">
              <li class="listPreviousMatchesItems">${key}</li>
              <div class="botonesPreviousMatches">
                <button type="button" class="deleteBtn">
                  <i class="fas fa-trash" id="deleteBtn"></i>
                </button>
                <button type="button" class="listBtn">
                  <i class="fas fa-chevron-right" id="listBtn"></i>
                </button>
              </div>
            </div>`;
}

function completarResultadosDesdeInicio(array, array2) {
  nombreJugadorScores[0].innerHTML = array[0];
  nombreJugadorScores[1].innerHTML = array[2];
  let puntajes = puntajesJugadores(array2);
  puntajeJugador[0].innerHTML = puntajes[0].toFixed(2);
  puntajeJugador[1].innerHTML = puntajes[1].toFixed(2);
  nombreJugadorGanador.innerHTML = ganador(
    puntajes[0],
    puntajes[1],
    array[0],
    array[2]
  );
  posterImage.forEach(function (poster, index) {
    poster.style.backgroundImage = `url(${array2[index].poster})`;
  });
}

// alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}
