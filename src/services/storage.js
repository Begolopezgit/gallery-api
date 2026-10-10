const CLAVE_FAVORITOS = "gatos_favoritos";

//miramos que tenemos en el navegador, obtenemos array
export const obtenerFavoritos = () => {
  const guardados = localStorage.getItem(CLAVE_FAVORITOS);
  return guardados ? JSON.parse(guardados) : [];
};

//miramos si el gato ya está marcado como favorito
// (por el id), devuelve un true o false
export const esFavorito = (id) => {
  const favoritos = obtenerFavoritos();
  return favoritos.some((item) => item.id === id);
};

//con (toggle) quita o pone(conmutador) el gato de favoritos
export const toggleFavorito = (gato) => {
  let favoritos = obtenerFavoritos();
  const existe = favoritos.some((item) => item.id === gato.id);

  if (existe) {
    favoritos = favoritos.filter((item) => item.id !== gato.id);
  } else {
    favoritos.push(gato);
  }

  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  return !existe;
};
