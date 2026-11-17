# AulaSociales · Viajeros del Tiempo

Videojuego educativo de Ciencias Sociales para 2.º y 3.º de Primaria, organizado por temas. Cada tema es un mundo del **mapa del curso** y se desbloquea al vencer al jefe final del tema anterior (o cuando el docente lo abre).

Es una adaptación de [*Exploradores de la Naturaleza*](https://github.com/damp83/AulaNaturales): mismo motor, misma mecánica y mismas funciones, con otra temática visual y otros contenidos.

| Curso | Enlace para el alumnado | Estado |
|---|---|---|
| 2.º de Primaria | `https://damp83.github.io/AulaSociales/?curso=2-primaria` | Temas 1 y 2 completos (castellano e inglés); temas 3-6 en preparación |
| 3.º de Primaria | `https://damp83.github.io/AulaSociales/?curso=3-primaria` | Temas pendientes de contenidos |

### 2.º de Primaria

| Situación | Tema | Estado |
|---|---|---|
| Mochila al hombro | 1. Mirador de paisajes | 5 misiones + jefe (Borrón de la Niebla) + minijuego *Lluvia en el mirador* |
| | 2. Viaje a las estrellas | 4 misiones + jefe (Borrón Apagaestrellas) + minijuego *Carrera espacial* |
| Guardianes de cada gota | 3. Gotas y vientos | Próximamente |
| | 4. Manos que trabajan | Próximamente |
| Mi rincón del mundo | 5. Mi pueblo, mi ciudad | Próximamente |
| | 6. Detectives del pasado | Próximamente |

Los títulos de temas, situaciones y misiones son propios del juego; las páginas del libro solo se indican como referencia para el docente.

Cada misión empieza con tarjetas de repaso (con lectura en voz alta) y sigue con retos de varios tipos:
elegir respuesta, verdadero/falso, seleccionar varias, ordenar secuencias, clasificar, unir parejas y completar huecos.

## Gamificación
- Estética de videojuego: Tic, un reloj de bolsillo que viaja en el tiempo y reacciona a cada respuesta, fondo animado con estrellas, relojes y rosas de los vientos, música 8 bits y efectos de sonido.
- Pantalla «¡Preparados… ¡YA!» al empezar cada misión, combos y respuestas de colores con formas.
- Jefe final: el Borrón, una mancha de tinta que borra mapas y recuerdos (con un nombre propio en cada tema), con barra de vida que baja con cada acierto.
- Puntos de experiencia (XP), 11 niveles (de «Viajero novato» a «Gran viajero del tiempo») y barra de progreso.
- 1 a 3 estrellas por misión según los aciertos a la primera (3 estrellas con un 85 %).
- Rachas de aciertos e insignias por misión, por jefe y especiales.
- Mapa del curso con todos los temas y, dentro de cada tema, un mapa de misiones que se desbloquean en orden.
- 8 personajes jugables dibujados (exploradora, astronauta, científico, robot, superheroína, ninja, doctora y alienígena).
- **Zona de calma**: ejercicio guiado de respiración (inspiración, mantener, espiración).
- **Esquemas**: cada misión termina con un esquema para completar (mapa conceptual o secuencia de pasos con huecos). En el mapa de cada tema, «Esquemas del tema» permite repasar los esquemas completados.
- **Fichas en papel**: en `fichas/<curso>/` (por ejemplo, `fichas/2-primaria/`) están los esquemas en PDF para imprimir y completar a mano (uno por tema y un solucionario), Las fichas en inglés están en la subcarpeta `en/`. Se regeneran con `node tools/fichas/generar_fichas.js`.
- **Evaluación**: nivel de logro (SB, NT, SU, IN) de cada alumno por criterio de evaluación y tema, calculado con el mejor resultado de cada reto. Los criterios y saberes básicos se definen en el `contenidos.js` de cada curso (`CURRICULO`).
- **Panel del docente**: progreso de cada alumno/a por tema, opción de abrir un tema a toda la clase y *modo libre* para desbloquear todo.
- **Minijuegos de premio**: al vencer al jefe final de cada tema se desbloquea un minijuego con contenidos del tema. Hay cuatro tipos: *carrera* (correr, recoger lo correcto, saltar lo incorrecto y responder preguntas cruzando la puerta de arriba o la de abajo), *rescate* (recoger elementos y llevar cada uno a su grupo, esquivando al villano), *parejas* (memoria) y *lluvia* (atrapar solo lo que pide cada ronda). Se guarda el récord de cada alumno y el docente puede desactivar los minijuegos desde su panel.

## Varios cursos
La plataforma puede tener varios cursos con el mismo juego. Están registrados en `cursos.js` y cada uno tiene su carpeta en `cursos/<curso>/` con sus contenidos.

- En la pantalla de inicio aparece un selector de **curso** cuando hay más de uno.
- Cada curso tiene su enlace directo para el alumnado: `https://damp83.github.io/AulaSociales/?curso=2-primaria`. Está en el panel del docente, con un botón para copiarlo.
- Cada curso guarda su progreso por separado.

Para crear un curso nuevo:

```
python3 tools/nuevo_curso.py 3-primaria "3.º de Primaria" "Primary 3" --temas 6
```

Crea `cursos/3-primaria/contenidos.js` con los temas vacíos («Próximamente») y añade el curso a `cursos.js`. Después se rellenan los temas, el currículo y la evaluación con el formato explicado al principio del archivo.

## Añadir un tema nuevo
Los contenidos de cada curso están en `cursos/<curso>/contenidos.js`. Cada tema tiene misiones (tarjetas de repaso y retos) y un jefe final; las instrucciones y los tipos de reto están explicados al principio del archivo.

Cada tema puede tener un mapa ilustrado: añade `map:'pueblo'` (o `barrio`, `ciudad`, `relieve`, `clima`, `universo`, `historia`, `trabajos`, `mapa`, `cultura`, `huerto`, `bosque`, `rio`, `mundo`, `digital`) en el tema. Los escenarios están en `ESCENAS`, en `index.html`. Sin `map`, el tema usa el camino sencillo.

Para dar a un tema la *Carrera saludable* como premio, añade en ese tema `minijuego: { tipo:'carrera', titulo:'Carrera saludable', preguntas:[{q:'Pregunta', ok:'Respuesta correcta', no:'Respuesta incorrecta'}, …] }` (de cada partida salen 3 preguntas al azar). Para *Rescate en el bosque*: `minijuego: { tipo:'rescate', titulo:'Rescate en el bosque', refugios:['Grupo A','Grupo B','Grupo C'], animales:[{e:'🐙', n:'Pulpo', g:1}, …] }`, donde `g` es la posición del refugio correcto (empezando en 0); en cada partida salen 8 animales al azar. La carrera admite además `buenos`, `malos` (listas `{e:'🛡️', n:'Antivirus'}`), `intro`, `fin` y `fondo:'digital'` o `fondo:'espacio'`; el rescate, `cosas:true`, `intro` y `fondo:'lab'`. Para las parejas: `minijuego: { tipo:'memoria', titulo, parejas:[['Vista','Ojos'], …] }`. Para la lluvia: `minijuego: { tipo:'lluvia', titulo, necesarios:5, rondas:[{meta:'Atrapa los sólidos', ok:[{e:'🧊', n:'Hielo'}], no:[{e:'💧', n:'Agua'}]}] }`. Si el curso tiene inglés, pon también los textos del minijuego en `contenidos-en.js`.

## Pruebas automáticas
Antes de publicar cambios, conviene ejecutar:

```
node tools/validar_ingles.js        # la versión inglesa encaja con la castellana
node tools/probar_juego.js          # juega todas las misiones, jefes y minijuegos en ordenador y móvil
node tools/fichas/generar_fichas.js # regenera las fichas (cada esquema cabe en una página A4)
python3 tools/build_classroom.py    # regenera la versión de Google Classroom
```

`probar_juego.js` responde bien a la primera a todos los retos, comprueba las 3 estrellas, el desbloqueo del tema siguiente y del minijuego, juega el minijuego y revisa que la evaluación del panel del docente salga SB. Se puede limitar con `DISPOSITIVO=movil` o `IDIOMA=en`, y guardar capturas con `CAPTURAS=<carpeta>`.

## Uso
El juego es `index.html`; los cursos están en `cursos.js` y sus contenidos en `cursos/`. Ábrelo en el navegador o publícalo con GitHub Pages
(Settings → Pages → Deploy from branch). El progreso se guarda en el navegador del dispositivo (localStorage).

## Versión para Google Classroom
En la carpeta `google-classroom` está la versión que guarda el progreso en la nube. El alumno entra con su cuenta de Google del centro y continúa su partida en cualquier dispositivo. El progreso de la clase se guarda en una hoja de cálculo del Drive del docente. La guía de instalación está en [`google-classroom/INSTRUCCIONES.md`](google-classroom/INSTRUCCIONES.md).

Hay una carpeta por curso (`google-classroom/2-primaria/`) y cada curso se instala como un proyecto distinto; `Codigo.gs` es el mismo para todos. Si se cambia `index.html` o los contenidos, hay que regenerar esa versión con `python3 tools/build_classroom.py`.

## Versión en inglés (Time Travellers)
Todo el juego está también en inglés: interfaz, tarjetas, retos, esquemas, voz y fichas. El inglés está adaptado a alumnado de 7-8 años que aprende el idioma. Se cambia con el selector **Español / English** de la pantalla de inicio, con el botón **ES/EN** de la barra superior o, para toda la clase, desde el panel del docente. El progreso y la evaluación son los mismos en los dos idiomas.

- Los contenidos en inglés están en `cursos/<curso>/contenidos-en.js`, con la misma estructura que `contenidos.js`. Un curso sin ese archivo se muestra solo en castellano. Tras editarlos, comprueba que encajan con `node tools/validar_ingles.js`.
- Las fichas en inglés están en `fichas/<curso>/en/`.
- Los criterios de evaluación y los saberes básicos se muestran siempre en castellano, como en el currículo oficial.

## Crear un juego como este para otra área
En [`PLANTILLA-NUEVO-JUEGO.md`](PLANTILLA-NUEVO-JUEGO.md) hay una plantilla de instrucciones para pedirle a Claude un videojuego igual para otra área o curso, cambiando solo la temática y los contenidos.

## Autoría y licencia
© 2026 **Diego Alberto Moya Puerta**, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia.

[![Licencia CC BY-NC-SA 4.0](https://img.shields.io/badge/licencia-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)

*Viajeros del Tiempo* (el juego, sus contenidos, los esquemas y las fichas) se distribuye con una licencia [Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Puedes **compartirlo y adaptarlo** siempre que **cites la autoría**, lo uses **sin fines comerciales** y publiques tus versiones con **la misma licencia**. Más detalles en [`LICENSE`](LICENSE).

**Obra original:** *Viajeros del Tiempo* es una adaptación de [*Exploradores de la Naturaleza*](https://github.com/damp83/AulaNaturales) (© 2026 Diego Alberto Moya Puerta, CC BY-NC-SA 4.0). Se reutilizan su motor y sus herramientas; cambian la temática visual y los contenidos.

Las tipografías Andika y Lilita One se distribuyen con la SIL Open Font License 1.1. Las referencias al libro de texto pertenecen a sus titulares.

