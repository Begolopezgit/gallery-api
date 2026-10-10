//para ver si es favorito (lo tenemos o no en navegador)
import { esFavorito } from "../services/storage.js";

//creamos variables de los elementos del dom
//selecciono el contenedor de cuadrícula
const gridContenedor = document.querySelector(".galeria-grid");

//función que crea la tarjeta
const crearTarjetaGato = (gato) => {
  //creo la etiqueta figure y le asigno la clase figure
  const figure = document.createElement("figure");
  figure.classList.add("galeria-item");

  //obtengo el nombre de la raza (si existe) de la bbdd
  const nombreRaza = gato.breeds?.[0]?.name || "Gatito misterioso";
  //este gato es favorito
  const activo = esFavorito(gato.id);

  // Línea unificada: Raza · Origen · Temperamento
  const metaTexto = `${gato.name} · ${gato.origin} · ${gato.temperament}`;
  //Mostramos la estructura interna
  figure.innerHTML = `
    <button class="btn-favorito ${activo ? "activo" : ""}" data-id="${gato.id}" aria-label="Guardar en favoritos">
      ♥
    </button>
    <img src="${gato.url}" alt="${nombreRaza}" loading="lazy">
    <figcaption class="galeria-info">
      <span>${metaTexto}</span>
    </figcaption>
    `;
  // Guardamos la referencia de los datos en el elemento para
  // recuperarlos fácil al hacer clic
  figure.dataset.gatoJson = JSON.stringify(gato);
  return figure;
};

//función que se encargará de renderizar.
//datosGatos será array con la info que me devuelve la API
//limpiar lo ustilizo para la primera vez, luego quiero que se
//vayan añadiendo más gatos

export const renderGallery = (datosGatos, limpiar = true) => {
  if (limpiar) {
    gridContenedor.innerHTML = "";
  }

  //recorre el array y añadimos cada tarjeta al contenedor
  datosGatos.forEach((gato) => {
    const tarjeta = crearTarjetaGato(gato);
    //añado al grid
    gridContenedor.appendChild(tarjeta);
  });
};
