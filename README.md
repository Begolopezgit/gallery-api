🐈 10 Minutos para ti - Galería de Energía

Bienvenido a 10 Minutos para ti, una aplicación web diseñada para ofrecer un respiro mental frente al estrés diario. A través de una interfaz limpia y minimalista, esta plataforma permite a los usuarios desconectar navegando por una galería interactiva y personalizable de imágenes felinas.

🌟 Propósito del Proyecto

El objetivo principal de esta aplicación es proporcionar una experiencia de usuario (UX) relajante y fluida. En lugar de ser un simple catálogo de imágenes, la web está pensada como una "galería de energía" donde el usuario tiene el control total sobre lo que quiere ver y guardar.

🚀 Funcionalidades Principales

La aplicación se divide en tres flujos de interacción principales:

Sorpréndeme (Exploración Libre): Permite cargar imágenes de forma aleatoria desde uno de los catálogos más grandes de internet, ideal para descubrir contenido nuevo de forma continua mediante un sistema de paginación infinita ("Ver más").

Tú Eliges (Filtros Inteligentes): Un sistema de búsqueda avanzada donde el usuario puede filtrar los resultados según sus preferencias.

Tus Favoritos (Colección Personal): Los usuarios pueden marcar las imágenes que más les transmitan y guardarlas en su propia galería privada.

⚙️ Cómo funciona por debajo (Aspectos Técnicos Destacados)

Aunque la interfaz es deliberadamente sencilla, la aplicación maneja lógicas interesantes en segundo plano para garantizar la mejor experiencia:

Consumo de API Dinámico: La web se alimenta en tiempo real de The Cat API. Toda la información sobre razas, orígenes y temperamentos se extrae dinámicamente.

Filtros Limpios y Seguros: El sistema analiza los datos de la base de datos externa antes de mostrarlos al usuario. Solo se habilitan en el buscador aquellas razas que tienen fotografías comprobadas, evitando búsquedas que devuelvan resultados vacíos o errores.

Lógica de Exclusión: El buscador de temperamentos incluye reglas lógicas para evitar contradicciones (por ejemplo, el sistema entiende que no se puede buscar un gato que sea "Activo" y "Tranquilo" al mismo tiempo).

Persistencia de Datos (Local Storage): La galería de favoritos no se borra al cerrar la pestaña. La aplicación utiliza el almacenamiento interno del navegador del usuario para recordar sus preferencias de forma totalmente privada y sin necesidad de crear cuentas o contraseñas.

Diseño Responsive: Construida con HTML5 y SCSS (Sass), la cuadrícula de imágenes y los menús se adaptan de forma fluida a cualquier dispositivo, pasando de 1 columna en móviles hasta 5 columnas en monitores panorámicos.

🛠️ Tecnologías Utilizadas

HTML5 (Semántica y accesibilidad)

CSS3 / SCSS (Sass) (Estilos modulares, variables y mixins para un diseño escalable)

JavaScript (ES6+) (Lógica de la aplicación, peticiones asíncronas fetch y manipulación del DOM)

Vite (Entorno de desarrollo rápido y empaquetador)

The Cat API (Proveedor de datos e imágenes)
