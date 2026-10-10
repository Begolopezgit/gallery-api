//importamos el diccionario /las agrupaciones de los temperamentos
import { MAPA_TEMPERAMENTOS } from "../data/mappers.js";

//Inyecta las opciones dinámicas en el HTML basándose en los datos de la API
export const renderizarFiltros = (razas, origenes, temperamentos) => {
  const listaRazas = document.getElementById("lista-razas");
  const listaOrigenes = document.getElementById("lista-origenes");
  const listaTemperamentos = document.getElementById("lista-temperamentos");

  // 1. Pintar todas las razas (usamos el id para el value y name para mostrar)
  razas.forEach((raza) => {
    listaRazas.innerHTML += `
      <li>
        <label>
          <input type="radio" name="raza" value="${raza.id}"> ${raza.name}
        </label>
      </li>
    `;
  });

  // 2. Pintar todos los orígenes
  origenes.forEach((origen) => {
    listaOrigenes.innerHTML += `
      <li>
        <label>
          <input type="radio" name="origen" value="${origen}"> ${origen}
        </label>
      </li>
    `;
  });

  // 3. Pintar los temperamentos (usamos nuestros arquetipos agrupados en español)
  const temperamentosEspanol = [
    "Activo",
    "Tranquilo",
    "Sociable",
    "Inteligente",
    "Independiente",
    "Cariñoso",
    "Curioso",
  ];

  temperamentosEspanol.forEach((temp) => {
    listaTemperamentos.innerHTML += `
      <li>
        <label>
          <input type="radio" name="temperamento" value="${temp}"> ${temp}
        </label>
      </li>
    `;
  });
};

/**
 * Lee el valor marcado de un grupo de inputs de tipo radio
 * @param {string} nombreGrupo - El atributo name del grupo de radios (ej. "raza", "origen")
 * @returns {string} El valor seleccionado
 */
export const obtenerValorSeleccionado = (nombreGrupo) => {
  const radio = document.querySelector(`input[name="${nombreGrupo}"]:checked`);
  return radio ? radio.value : "todos";
};

/* 
 * Filtra una lista de gatos en memoria según criterios de origen y temperamento
 * @param {Array} gatos - Lista de gatos normalizados
 * @param {string} origen - Criterio de origen ("todos" o nombre de país)
 * @param {string} temperamento - Criterio de temperamento ("todos" o arquetipo)
 * @returns {Array} Gatos que cumplen todos los criterios
 
export const aplicarFiltrosMemoria = (gatos, origen, temperamento) => {
  return gatos.filter((gato) => {
    // Si el usuario marcó "todos", pasa directamente. Si no, comprobamos si coincide.
    const cumpleOrigen =
      origen === "todos" ||
      gato.origin.toLowerCase().includes(origen.toLowerCase());

    const cumpleTemperamento =
      temperamento === "todos" ||
      gato.temperament.toLowerCase() === temperamento.toLowerCase();

    return cumpleOrigen && cumpleTemperamento;
  });
}; */

/**
 * Filtra la lista COMPLETA de razas cruzando todos sus rasgos originales
 * y devuelve los IDs unidos por comas para llamar a la API
 */
export const obtenerIdsRazasFiltradas = (
  listaCompletaRazas,
  razaSel,
  origenSel,
  tempSel,
) => {
  const razasValidas = listaCompletaRazas.filter((razaCruda) => {
    // 1. Filtro de Raza
    const cumpleRaza = razaSel === "todas" || razaCruda.id === razaSel;

    // 2. Filtro de Origen
    const cumpleOrigen =
      origenSel === "todos" ||
      (razaCruda.origin &&
        razaCruda.origin.toLowerCase().includes(origenSel.toLowerCase()));

    // 3. Filtro de Temperamento Profundo
    let cumpleTemp = true;
    if (tempSel !== "todos" && razaCruda.temperament) {
      // Separamos todos los rasgos originales en inglés del gato
      // y Obtenemos los arquetipos en español de este gato
      const listaRasgos = razaCruda.temperament.split(",").map((t) => t.trim());
      const arquetiposGato = listaRasgos
        .map((rasgo) => MAPA_TEMPERAMENTOS[rasgo])
        .filter(Boolean);

      // A. ¿Tiene el rasgo que el usuario ha seleccionado?
      const tieneElBuscado = arquetiposGato.includes(tempSel);

      // B. Comprobamos si tiene el rasgo opuesto prohibido
      // si es activo no tranquilo y viceversa
      // si es cariñoso no independiente y viceversa
      let tieneOpuesto = false;
      if (tempSel === "Tranquilo" && arquetiposGato.includes("Activo"))
        tieneOpuesto = true;
      if (tempSel === "Activo" && arquetiposGato.includes("Tranquilo"))
        tieneOpuesto = true;
      if (tempSel === "Cariñoso" && arquetiposGato.includes("Independiente"))
        tieneOpuesto = true;
      if (tempSel === "Independiente" && arquetiposGato.includes("Cariñoso"))
        tieneOpuesto = true;

      // Solo pasa el filtro si tiene el rasgo buscado y NO tiene el opuesto
      cumpleTemp = tieneElBuscado && !tieneOpuesto;

      /*       // Verificamos si ALGUNO de esos rasgos traduce al arquetipo que busca el usuario
      cumpleTemp = listaRasgos.some(
        (rasgo) => MAPA_TEMPERAMENTOS[rasgo] === tempSel,
      ); */
    } else if (tempSel !== "todos") {
      cumpleTemp = false; // El usuario busca un temperamento, pero la raza no tiene ninguno registrado
    }

    return cumpleRaza && cumpleOrigen && cumpleTemp;
  });

  // Devolvemos un string listo para la API (ej: "siam,mcoo,beng")
  return razasValidas.map((r) => r.id).join(",");
};
