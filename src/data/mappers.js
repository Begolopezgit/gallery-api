//agrupo los acjetivos similares y los traduzco al castellano
//ya que en la bbdd nos vienen en inglés

/**
 * Diccionario de traducción y agrupación de temperamentos (Inglés -> Español)
 */
export const MAPA_TEMPERAMENTOS = {
  // Juguetón / Activo
  Active: "Activo",
  Playful: "Juguetón",
  Energetic: "Activo",
  Agile: "Activo",
  Athletic: "Activo",
  Mischievous: "Juguetón",
  Lively: "Juguetón",

  // Tranquilo / Dócil
  Calm: "Tranquilo",
  Quiet: "Tranquilo",
  Gentle: "Tranquilo",
  Peaceful: "Tranquilo",
  Sedate: "Tranquilo",
  Patient: "Tranquilo",
  Relaxed: "Tranquilo",

  // Cariñoso / Sociable
  Affectionate: "Cariñoso",
  Friendly: "Sociable",
  Social: "Sociable",
  Loving: "Cariñoso",
  Sweet: "Cariñoso",
  Devoted: "Cariñoso",
  Warm: "Cariñoso",

  // Curioso / Inteligente
  Intelligent: "Inteligente",
  Curious: "Curioso",
  Clever: "Inteligente",
  Inquisitive: "Curioso",
  Alert: "Curioso",

  // Independiente / Leal
  Independent: "Independiente",
  Loyal: "Leal",
  Demanding: "Exigente",
  Vocal: "Expresivo",
};

/**
 * Traduce un temperamento compuesto separándolo por comas
 * y devolviendo la primera coincidencia en el diccionario.
 */
export const clasificarTemperamento = (temperamentString = "") => {
  if (!temperamentString) return "Tranquilo";

  const lista = temperamentString.split(",").map((t) => t.trim());
  for (const item of lista) {
    if (MAPA_TEMPERAMENTOS[item]) {
      return MAPA_TEMPERAMENTOS[item];
    }
  }

  return "Tranquilo"; // Valor por defecto si no hay coincidencia
};

//Normaliza un objeto crudo de The Cat API al formato unificado de la app

//gatoApi - Objeto tal cual viene del fetch
//Objeto normalizado idéntico a los de GATOS_DESTACADOS

export const normalizarGatoApi = (gatoApi) => {
  const infoRaza = gatoApi.breeds?.[0] || {};

  return {
    id: gatoApi.id,
    url: gatoApi.url,
    name: infoRaza.name || "Gato Mestizo",
    origin: infoRaza.origin || "Desconocido",
    temperament: clasificarTemperamento(infoRaza.temperament),
    lifeSpan: infoRaza.life_span || "10 - 15",
    weight: infoRaza.weight?.metric || "3 - 5",
    stats: {
      energy: infoRaza.energy_level || 3,
      childFriendly: infoRaza.child_friendly || 3,
      dogFriendly: infoRaza.dog_friendly || 3,
      grooming: infoRaza.grooming || 2,
      intelligence: infoRaza.intelligence || 3,
    },
  };
};
