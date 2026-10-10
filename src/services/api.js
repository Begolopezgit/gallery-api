/*primeras pruebas
const apiKey =
  "live_vB7trcYmdnGgo0m7qNMenJRXIuCcKBburyUML4y0szVXyZ4lqAhjsN8uDAA82LBS";
const URL = "https://api.thecatapi.com/v1/breeds";

 
fetch(URL, {
  headers: {
    "x-api-key": apiKey,
  },
})
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    console.log("Datos de la API:", datos);
    //Extraemos de la bbdd las razas (107)que tiene, los orígenes(32) y los temperamentos o comportamientos(68)
    //y estos serán los filtros que pueda seleccionar el usuario
    // 1. Extraer todas las razas (nombres)
    const razas = datos.map((gato) => gato.name);
    console.log("Filtro Razas:", razas);

    // 2. Extraer orígenes únicos (usamos Set para eliminar los repetidos)
    const origenes = [...new Set(datos.map((gato) => gato.origin))];
    console.log("Filtro Orígenes:", origenes);

    // 3. Extraer temperamentos únicos
    const temperamentos = [
      ...new Set(
        datos.flatMap((gato) =>
          gato.temperament ? gato.temperament.split(", ") : [],
        ),
      ),
    ].sort();
    console.log("Filtro Temperamentos:", temperamentos);
  })
  .catch((error) => console.error("Ups, hubo un error:", error)); */

const API_KEY =
  "live_vB7trcYmdnGgo0m7qNMenJRXIuCcKBburyUML4y0szVXyZ4lqAhjsN8uDAA82LBS";
const BASE_URL = "https://api.thecatapi.com/v1";

const cabeceras = {
  "x-api-key": API_KEY,
};

//Importamos la función de normalización desde la carpeta data
import { normalizarGatoApi } from "../data/mappers.js";

//Obtiene las razas y extrae las listas únicas para los filtros (raza, origen, temperamento)
//pero revisando si la raza tiene imagen, si no hay imágenes, no la añade
export const obtenerFiltros = async () => {
  try {
    const respuesta = await fetch(`${BASE_URL}/breeds`, { headers: cabeceras });
    const datosCrudos = await respuesta.json();

    // 1. EL FILTRO MÁGICO: Nos quedamos solo con las razas que tienen imagen verificada
    const datosValidos = datosCrudos.filter(
      (gato) => gato.image && gato.image.url,
    );

    // 2. Extraemos las listas usando ÚNICAMENTE los datos válidos
    const razas = datosValidos.map((gato) => ({
      id: gato.id,
      name: gato.name,
    }));

    const origenes = [
      ...new Set(datosValidos.map((gato) => gato.origin).filter(Boolean)),
    ].sort();

    const temperamentos = [
      ...new Set(
        datosValidos.flatMap((gato) =>
          gato.temperament ? gato.temperament.split(", ") : [],
        ),
      ),
    ].sort();

    return { razas, origenes, temperamentos, listaCompletaRazas: datosValidos };
  } catch (error) {
    console.error("Error al obtener filtros:", error);
    throw error;
  }
};

// Obtiene un listado de imágenes para la galería

export const obtenerGatos = async (pagina = 0, limite = 10, breedId = "") => {
  try {
    let url = `${BASE_URL}/images/search?limit=${limite}&page=${pagina}&has_breeds=1`;

    if (breedId && breedId !== "todas") {
      url += `&breed_ids=${breedId}`;
    }

    const respuesta = await fetch(url, { headers: cabeceras });
    const datos = await respuesta.json();
    //transformo cada objeto de la API al fomato estándar creado
    return datos.map((gatoApi) => normalizarGatoApi(gatoApi));
  } catch (error) {
    console.error("Error al obtener imágenes de gatos:", error);
    throw error;
  }
};
