# Tichu · Contador

Contador de puntuaciones para el juego de cartas **Tichu**, con versión gratis y versión completa de pago. Funciona en el navegador, se puede instalar como app en el móvil y funciona sin conexión.

Creado por **PenTech**. Tichu es un juego de sus respectivos autores, editado en español por Devir. El nombre del juego y sus reglas pertenecen a sus titulares.

## Versión gratis y versión completa

- **Gratis:** Tichu clásico de 4 jugadores y archivo de partidas con las 3 últimas a la vista.
- **Completa (con clave):** Trichu (3 jugadores), Tianjin (6 jugadores), deshacer, historial de manos y archivo completo.
- Lo de pago se ve con un candado 🔒. Al tocarlo se abre la ventana «Versión completa», con la lista de lo que incluye, el botón «Comprar la clave» (https://buymeacoffee.com/pentech/e/590024) y el campo para escribir la clave. También se abre desde el enlace «Versión completa» del menú.
- La clave no distingue mayúsculas ni espacios y queda guardada en el dispositivo (`tichu-pro-lic`). Ya no hay partidas de prueba ni pantalla de acceso.
- La clave **no aparece en el código**: solo se guarda una huella (*hash*). Como es una web estática, un usuario con conocimientos podría saltarse la comprobación.

## Cambiar la clave

Con Node.js, ejecuta `node generar-clave.js` (archivo aparte, que **no hay que subir** a GitHub). Te da una clave nueva y la línea `const KEYH=...` para sustituir en `index.html`. Para usar una clave elegida por ti: `node generar-clave.js MI-CLAVE`.

## Archivo de partidas

Cada partida se guarda sola al terminar (`tichu-historial-v1`, máximo 200). Si se deshace la última mano de una partida terminada, sale del archivo, y vuelve a entrar al terminarla de nuevo. Sin clave se ven las 3 últimas y no aparece «Vaciar archivo».

## Publicar un cambio

1. Sustituir en GitHub los archivos modificados (normalmente `index.html` y `sw.js`).
2. Subir siempre la versión de la primera línea de `sw.js` (`const V="tichupro-v1-13"` → `tichupro-v1-14`, etc.).
3. **No tocar la versión visible** (`VERSION`, ahora `v1.1`) salvo que se decida otra.
4. El service worker usa red primero: el cambio se ve al abrir la app con conexión, a veces a la segunda.

## Archivos

- `index.html`: toda la app (diseño, lógica, licencia, archivo y aviso legal). El pie muestra «Contador no oficial · © 2026 PenTech», el botón «Aviso legal» y la versión.
- `sw.js`: service worker para el modo sin conexión; solo borra cachés `tichupro-`.
- `manifest.json`: datos para instalarla como app (solo vertical).
- `fondo.webp`, `splash.webp`, `logo.webp`: fondo, pantalla de bienvenida y logotipo.
- `melodia.mp3`: sonido de la pantalla de bienvenida (suena una vez al pulsar «Toca para empezar»).
- `icon-*.png`, `apple-touch-icon.png`: iconos para navegador, Android e iOS.

## Tipografías

Protest Revolution y Nunito, de Google Fonts (licencia SIL Open Font License).
