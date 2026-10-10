import "./styles/main.scss";

import { renderGallery } from "./components/gallery.js";

import { obtenerGatos, obtenerFiltros } from "./services/api.js";
import { GATOS_DESTACADOS } from "./data/curatedCats.js";
import { toggleFavorito, obtenerFavoritos } from "./services/storage.js";
import {
  renderizarFiltros,
  obtenerValorSeleccionado,
  obtenerIdsRazasFiltradas,
} from "./components/filters.js";

let razasGlobales = []; // <--  variable para guardar las razas en memoria
let paginaActual = 0;
//iniciamos la aplicación pintando las imagenes curadas
// y las opciones a los filtros
const inicializarApp = async () => {
  //  Cargar las fotos curadas iniciales
  cargarImagenesIniciales();

  try {
    //  Traer todos los datos de filtros desde la API
    const datosFiltros = await obtenerFiltros();

    // Guardamos la lista oficial completa para que los filtros tengan de dónde tirar
    razasGlobales = datosFiltros.listaCompletaRazas;

    //  Generar el HTML de los filtros dinámicamente
    renderizarFiltros(
      datosFiltros.razas,
      datosFiltros.origenes,
      datosFiltros.temperamentos,
    );
  } catch (error) {
    console.error("No se pudieron cargar los filtros", error);
  }
};

//inicialmente cargamos una selección de imágenes "buenas/curadas"
const cargarImagenesIniciales = () => {
  // Baraja y toma 10 para completar las dos filas en escritorio
  const barajados = [...GATOS_DESTACADOS].sort(() => Math.random() - 0.5);
  renderGallery(barajados.slice(0, 10), true);
};

// Evento para guardar/quitar favorito al hacer clic en el corazón
const gridContenedor = document.querySelector(".galeria-grid");
if (gridContenedor) {
  gridContenedor.addEventListener("click", (evento) => {
    const btn = evento.target.closest(".btn-favorito");
    if (!btn) return;

    const tarjeta = btn.closest(".galeria-item");
    const datosGato = JSON.parse(tarjeta.dataset.gatoJson);

    // Guardar o quitar de localStorage
    const fueAgregado = toggleFavorito(datosGato);

    // Cambiar la clase visual del botón
    btn.classList.toggle("activo", fueAgregado);
  });
}

//Conectar los botones y enlace de "Mis Favoritos" existentes en el HTML
const btnsFavoritos = document.querySelectorAll(
  ".tarjetas__contenedor__favoritos .bot_targetas, .header__contenedor .bot__favoritos,.enlFavoritos",
);
btnsFavoritos.forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    evento.preventDefault(); // Evita la recarga o salto en la etiqueta <a> del footer
    const listaGuardada = obtenerFavoritos();

    if (listaGuardada.length === 0) {
      alert("Aún no tienes gatos guardados en tus favoritos.");
      return;
    }

    // Renderizamos únicamente los favoritos guardados
    renderGallery(listaGuardada, true);

    //  hacer scroll suave hacia la galería
    gridContenedor.scrollIntoView({ behavior: "smooth" });
  });
});

// Lógica del botón de Filtros ("Mis elecciones")
const btnFiltrar = document.getElementById("btn-filtrar");
if (btnFiltrar) {
  btnFiltrar.addEventListener("click", async () => {
    const razaSeleccionada = obtenerValorSeleccionado("raza");
    const origenSeleccionado = obtenerValorSeleccionado("origen");
    const tempSeleccionado = obtenerValorSeleccionado("temperamento");

    try {
      // 1. Buscamos qué razas exactas cumplen la combinación
      const idsRazasBuscadas = obtenerIdsRazasFiltradas(
        razasGlobales,
        razaSeleccionada,
        origenSeleccionado,
        tempSeleccionado,
      );

      // 2. Si el filtro es tan estricto que no existe ninguna raza en el mundo, avisamos al momento
      if (idsRazasBuscadas === "") {
        alert(
          "No existe ninguna raza registrada con esta combinación exacta. ¡Prueba a abrir un poco el abanico!",
        );
        return;
      }

      // 3. Pedimos a la API fotos EXCLUSIVAMENTE de esas razas encontradas
      const gatosFiltrados = await obtenerGatos(0, 15, idsRazasBuscadas);

      if (gatosFiltrados.length === 0) {
        alert(
          "Encontramos la raza, pero la API no tiene fotos disponibles ahora mismo.",
        );
      } else {
        renderGallery(gatosFiltrados, true);
        gridContenedor?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al filtrar gatos:", error);
    }
  });
}

// Escuchador del botón "Cargar más" y "si quiero" de sorprendeme
// Seleccionamos tanto el botón "Sorpréndeme" como el botón "Ver más" de abajo
const btnsCargarMas = document.querySelectorAll(
  ".tarjetas__contenedor__sorpresa .bot_targetas, #btn-cargar-mas",
);

btnsCargarMas.forEach((boton) => {
  boton.addEventListener("click", async (evento) => {
    evento.preventDefault();
    paginaActual++;

    try {
      const masGatos = await obtenerGatos(paginaActual);
      renderGallery(masGatos, false); // false evita borrar lo que ya está en pantalla

      // SOLO hacemos scroll hacia la galería si pulsamos el botón de "Sorpréndeme" (arriba)
      if (boton.id !== "btn-cargar-mas") {
        gridContenedor?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error al cargar más gatos:", error);
    }
  });
});

// Conectar el botón de la tarjeta "TU ELIGES" (Preferencias)
//para que baje a los filtros
const btnPreferencias = document.querySelector(
  ".tarjetas__contenedor__eliges .bot_targetas",
);
const contenedorFiltros = document.querySelector(".filtros__contenerdor");

if (btnPreferencias && contenedorFiltros) {
  btnPreferencias.addEventListener("click", (evento) => {
    evento.preventDefault();
    // Hacemos scroll suave directo a la zona de filtros
    contenedorFiltros.scrollIntoView({ behavior: "smooth" });
  });
}

inicializarApp();
