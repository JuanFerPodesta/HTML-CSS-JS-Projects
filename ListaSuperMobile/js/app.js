let months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// sectionInicio
const sectionInicio = document.getElementById("sectionInicio");

// sectionCarga
const sectionCarga = document.getElementById("sectionCarga");
const addBtn = document.getElementById("addBtn");
const txtTituloGlobal = document.getElementById("txtTitulo");
const txtDescriptionGlobal = document.getElementById("txtDescription");

// sectionCargados
const sectionCargados = document.getElementById("sectionCargados");
const listContainer = document.getElementById("listContainer");
const listBtn = document.getElementById("listBtn");
const returnBtn = document.getElementById("returnBtn");
const alert = document.querySelector(".alert");

// sectionItemsCargados
const sectionListadosAnteriores = document.getElementById(
  "sectionListadosAnteriores"
);
const sectionItemsCargados = document.getElementById("sectionItemsCargados");
const returnBtnItemsCargados = document.getElementById(
  "returnBtnItemsCargados"
);

// sectionGuardados
const sectionGuardados = document.getElementById("sectionGuardados");
const newList = document.querySelector(".newList-btn");
const itemsContenedor = document.getElementById("itemsContenedor");
const returnBtnSectionCargados = document.getElementById(
  "returnBtnSectionCargados"
);

// sectionListadosAnteriores

// sectionItemsListadosAnteriores
let itemsListadosAnteriores = document.getElementById(
  "itemsListadosAnteriores"
);
let returnBtnSectionListadosAnteriores = document.getElementById(
  "returnBtnSectionListadosAnteriores"
);

// footer
const footerBtn = document.getElementById("footerBtn");
const addListBtn = document.getElementById("addListBtn");

// setting up
if (localStorage.length !== 0) {
  almacenadosEnLocalStorage();
}

let currentKey = 0;

// *** EVENTOS *** //

// sectionCargados

document.addEventListener("click", function (e) {
  if (e.target.id === "saveBtn") {
    setBackToDefaultElement(sectionGuardados);
    almacenadosEnLocalStorage();
    mostrar(addListBtn);
    ocultar(sectionCargados);
    setBackToDefaultElement(listContainer);
  }
});

returnBtn.addEventListener("click", function () {
  mostrar(sectionCarga);
  ocultar(sectionCargados);
  ocultar(sectionItemsCargados);
  setBackToDefaultElement(itemsContenedor);
});

returnBtnSectionCargados.addEventListener("click", function () {
  mostrar(sectionCargados);
  ocultar(sectionItemsCargados);
  setBackToDefaultElement(itemsContenedor);
});

// sectionItemsCargados

returnBtnItemsCargados.addEventListener("click", function () {
  mostrar(sectionCarga);
  ocultar(sectionCargados);
  ocultar(sectionItemsCargados);
  setBackToDefaultElement(itemsContenedor);
});

// sectionGuardados

document.addEventListener("click", function (e) {
  if (e.target.id === "deleteBtnListasAnteriores") {
    currentKey = e.target.parentElement.parentElement.children[1].innerHTML;
    const element =
      e.target.parentElement.parentElement.parentElement.parentElement;
    console.log("lista:", element);
    console.log("este es el de borrar listas");
    console.log(currentKey);
    localStorage.removeItem(currentKey);
    setBackToDefaultElement(element);
    if (localStorage.length === 0) {
      mostrar(sectionInicio);
      ocultar(sectionGuardados);
    }
  }
});

document.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.id === "editBtnListasAnteriores") {
    console.log(
      "key del edit: ",
      e.target.parentElement.parentElement.children[1].innerHTML
    );
    currentKey = e.target.parentElement.parentElement.children[1].innerHTML;
    let listaGuardada = localStorage.getItem(currentKey);
    listaGuardada = JSON.parse(listaGuardada);
    mostrarListaGuardada(listaGuardada);
    ocultar(sectionGuardados);
    ocultar(addListBtn);
    mostrar(sectionListadosAnteriores);
    mostrar(footerBtn);
  }
});

// sectionGuardados & sectionListadosAnteriores
document.addEventListener("click", function (e) {
  if (
    e.target.parentElement.parentElement.parentElement.parentElement
      .parentElement.id === "sectionListadosAnteriores" &&
    e.target.classList[1] !== "fa-edit" &&
    e.target.classList[1] !== "fa-trash"
  ) {
    let itemsListadosAnterioresContenedor = document.getElementById(
      "itemsListadosAnterioresContenedor"
    );

    let elemento =
      e.target.parentElement.parentElement.parentElement.firstElementChild;
    generarCartaItem(elemento, itemsListadosAnterioresContenedor);
    mostrar(itemsListadosAnteriores);
    ocultar(sectionListadosAnteriores);
    ocultar(footerBtn);
  } else if (e.target.id === "listBtn") {
    let itemsContenedor = document.getElementById("itemsContenedor");
    let elemento =
      e.target.parentElement.parentElement.parentElement.firstElementChild;
    generarCartaItem(elemento, itemsContenedor);
    ocultar(sectionCargados);
    ocultar(footerBtn);
    mostrar(sectionItemsCargados);
  }
});

// sectionItemsListadosAnteriores

returnBtnSectionListadosAnteriores.addEventListener("click", function () {
  ocultar(itemsListadosAnteriores);
  mostrar(sectionListadosAnteriores);
  setBackToDefaultElement(itemsListadosAnterioresContenedor);
  mostrar(footerBtn);
});

// Footer

addListBtn.addEventListener("click", function () {
  ocultar(sectionInicio);
  mostrar(sectionCarga);
  addBtn.addEventListener("click", addItem);
  ocultar(addListBtn);
  mostrar(footerBtn);
  ocultar(sectionGuardados);
  currentKey = obtenerKey();
  console.log("addListBtn: ", currentKey);
});

footerBtn.addEventListener("click", function () {
  console.log;
  if (localStorage.length === 0) {
    mostrar(sectionInicio);
  } else {
    mostrar(sectionGuardados);
  }
  ocultar(sectionCargados);
  ocultar(sectionCarga);
  ocultar(sectionItemsCargados);
  mostrar(addListBtn);
  setBackToDefaultElement(itemsContenedor);
  ocultar(footerBtn);
  ocultar(sectionListadosAnteriores);
  setBackToDefaultElement(sectionListadosAnteriores);
});

//*** FUNCIONES *** //

// generales

function ocultar(section) {
  section.classList.add("hidden");
}

function mostrar(section) {
  section.classList.remove("hidden");
}

function setBackToDefault(valor) {
  valor.value = "";
}

function setBackToDefaultElement(valor) {
  valor.innerHTML = "";
}

function obtenerKey() {
  let fecha = new Date();
  let number = fecha.getDate();
  let month = fecha.getMonth();
  let year = fecha.getYear();
  let time = hora();
  let key = `${number} de ${months[month]} del ${year + 1900}, a las ${time}`;
  return key;
}

function hora() {
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var temp = "" + (hour > 12 ? hour - 12 : hour);
  if (hour == 0) temp = "12";
  temp += (minute < 10 ? ":0" : ":") + minute;
  temp += (second < 10 ? ":0" : ":") + second;
  temp += hour >= 12 ? " P.M." : " A.M.";
  return temp;
}

// storage

function mostrarListaGuardada(array) {
  for (let i = 0; i < array.length; i++) {
    let id = array[i].id;
    let items = array[i].items;
    let txtTitulo = array[i].txtTitulo;
    let txtDescription = array[i].txtDescription;
    createListItem(
      id,
      items,
      txtTitulo,
      txtDescription,
      sectionListadosAnteriores
    );
  }
}

function almacenadosEnLocalStorage() {
  for (i = 0; i < localStorage.length; i++) {
    console.log("recorrido: ", i);
    let key = localStorage.key(i);
    sectionGuardados.innerHTML += `
    <div class="contenedor margin-md padding-md">
        <div class="lista listContainer" id="listasAnteriores">
        <div class="flexRowListasAnteriores"><span class="underline">Lista:</span><h5>${key}</h5>
         
                      <button type="button" class="delete-btn" >
                        <i class="fas fa-trash" id="deleteBtnListasAnteriores"></i>
                      </button>
                      <button type="button" class="edit-btn editBtnListasAnteriores" >
                        <i class="fas fa-chevron-right" id="editBtnListasAnteriores"></i>
                      </button></div>
                      
      </div>
      </div>`;
  }
  ocultar(sectionInicio);
  mostrar(sectionGuardados);
}

function addToLocalStorage(key, id, items, txtTitulo, txtDescription) {
  const grocery = { id, items, txtTitulo, txtDescription };
  let itemsGrocery = getLocalStorage(key);
  itemsGrocery.push(grocery);
  localStorage.setItem(key, JSON.stringify(itemsGrocery));
}

function getLocalStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function removeFromLocalStorage(id, key) {
  let items = getLocalStorage(key);
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem(key, JSON.stringify(items));
}

// items

function addItem(e) {
  e.preventDefault();
  ocultar(sectionCarga);
  ocultar(footerBtn);
  let txtTitulo = document.getElementById("txtTitulo").value;
  let items = document.getElementById("items").value;
  let txtDescription = document.getElementById("txtDescription").value;
  const id = new Date().getTime().toString();
  if (txtTitulo !== "") {
    createListItem(id, items, txtTitulo, txtDescription, listContainer);
    console.log("desdeAddItem: ", currentKey);
    addToLocalStorage(currentKey, id, items, txtTitulo, txtDescription);
  }
  setBackToDefault(txtTituloGlobal);
  setBackToDefault(txtDescriptionGlobal);
  mostrar(sectionCargados);
}

function createListItem(id, items, txtTitulo, txtDescription, pantalla) {
  const element = document.createElement("article");
  element.classList.add("padding-sm");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<div class="list-group-item borde">
                    <div class="icono"> ${items}</div>
                    <div class="texto borde">${txtTitulo}</div>
                    <div class="texto borde hidden">${txtDescription}</div>
                    <div class="btn-container">
                      
                      <button type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                      </button>
                      <button type="button">
                        <i id="listBtn" class="list-btn fas fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>`;
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  pantalla.appendChild(element);
}

function generarCartaItem(elemento, section) {
  const icono = elemento;
  const titulo = icono.nextElementSibling;
  const descripcion = titulo.nextElementSibling;

  let itemIcono = document.createElement("div");
  itemIcono.innerHTML = icono.innerHTML;
  let itemTitulo = document.createElement("div");
  itemTitulo.innerHTML = titulo.innerHTML;
  let itemDescripcion = document.createElement("div");
  itemDescripcion.innerHTML = descripcion.innerHTML;

  itemIcono.classList.add("itemIcono");
  itemTitulo.classList.add("itemTitulo");
  itemDescripcion.classList.add("itemDescripcion", "padding-md");

  section.appendChild(itemIcono);
  section.appendChild(itemTitulo);
  section.appendChild(itemDescripcion);
}

function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement.parentElement;
  console.log("seccion:", element.parentElement.id);
  const id = element.dataset.id;
  console.log("por afuera: ", id);
  let items = getLocalStorage(currentKey);
  if (items.length === 1) {
    console.log("aaa");
    localStorage.removeItem(currentKey);
    setBackToDefaultElement(element);
    setBackToDefaultElement(sectionGuardados);
    ocultar(sectionGuardados);
    ocultar(sectionListadosAnteriores);
    ocultar(footerBtn);
    almacenadosEnLocalStorage();
    mostrar(addListBtn);
    ocultar(sectionCargados);
    setBackToDefaultElement(listContainer);
  } else {
    console.log("en el else: ", id);
    displayAlert("item removed", "danger");
    setBackToDefaultElement(element);
    removeFromLocalStorage(id, currentKey);
  }
  if (localStorage.length === 0) {
    mostrar(sectionInicio);
    mostrar(addListBtn);
    ocultar(sectionCargados);
    ocultar(sectionGuardados);
    ocultar(footerBtn);
    ocultar(sectionListadosAnteriores);
  }
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
