# Tichu · Contador (versión de pago)

Contador de puntuaciones para el juego de cartas **Tichu** (4 jugadores, Trichu para 3 y Tianjin para 6). Funciona en el navegador, se puede instalar como app en el móvil y funciona sin conexión.

Creado por **PenTech**. Tichu es un juego de sus respectivos autores, editado en español por Devir. El nombre del juego y sus reglas pertenecen a sus titulares.

## Cómo funciona el acceso

1. Al abrir la app sale la pantalla de bienvenida. Al pulsar "Toca para empezar" suena `melodia.mp3` una vez, entera, mientras se entra a la app. Si el MP3 no puede reproducirse, suena una melodía de respaldo generada por el navegador.
2. La prueba gratuita dura **una partida**. Cuando se acaba, el botón de prueba se sustituye por **Comprar la clave**, que abre la página de compra (https://buymeacoffee.com/pentech/e/590024) en una pestaña nueva. Termina al empezar una partida nueva (tanto desde la pantalla final como desde el botón *Nueva partida*), y avisa antes de hacerlo.
3. Con la clave, el acceso es ilimitado. La clave no distingue mayúsculas ni espacios, y queda guardada en el dispositivo.
4. La clave solo se introduce en la pantalla de acceso; durante el recuento de puntos no hay ningún botón de licencia.

La clave **no aparece en el código**: solo se guarda una huella (*hash*) para comprobarla. Aun así, como esto es una web estática, un usuario con conocimientos podría saltarse la comprobación.

## Cambiar o generar una clave

Con Node.js instalado, ejecuta `node generar-clave.js` (archivo aparte, que **no hay que subir** a GitHub). Te da una clave nueva y la línea `const KEYH=...` que debes pegar en `index.html`, sustituyendo la existente. Para usar una clave elegida por ti: `node generar-clave.js MI-CLAVE`.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (distinto del de la versión gratuita).
2. Sube todos los archivos de esta carpeta a la raíz del repositorio.
3. En **Settings → Pages**, elige *Deploy from a branch*, rama `main` y carpeta `/ (root)`.
4. Espera un minuto: la app estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Actualizar la app

Cada vez que cambies algo, sube la versión de la primera línea de `sw.js` (`const V="tichupro-v1-9"` → `tichupro-v1-10`, etc.). Así los móviles que ya la tienen instalada descargan la versión nueva.

## Archivos

- `index.html`: toda la app (diseño, lógica, licencia y pie legal).
- `sw.js`: service worker para el modo sin conexión.
- `manifest.json`: datos para instalarla como app.
- `fondo.webp`, `splash.webp`, `logo.webp`: imágenes de la app (fondo, pantalla de bienvenida y logotipo).
- `melodia.mp3`: sonido de la pantalla de bienvenida (suena una vez al pulsar "Toca para empezar"). Se puede sustituir por otro MP3 con el mismo nombre.
- `icon-*.png`, `apple-touch-icon.png`: iconos para navegador, Android e iOS.

## Tipografías

Protest Revolution (números del marcador) y Nunito (texto general), de Google Fonts (licencia SIL Open Font License).
