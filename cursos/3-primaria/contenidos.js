/* =====================================================================
   CONTENIDOS DEL CURSO · Viajeros del Tiempo
   © 2026 Diego Alberto Moya Puerta, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia · Licencia CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
   ---------------------------------------------------------------------
   Cada tema tiene misiones (con tarjetas "learn" y retos "ch") y un jefe
   final. Un tema sin misiones aparece en el mapa como "Próximamente".

   Para añadir un tema: rellena "missions" y "boss" copiando el modelo del
   Tema 1. Tipos de reto disponibles:
     mc       elegir una respuesta        {t:'mc', q, opts:[...], a:índice, hint}
     tf       verdadero o falso           {t:'tf', q, a:true|false, hint}
     pick     seleccionar varias          {t:'pick', q, opts:[...], a:[índices], hint}
     order    ordenar una secuencia       {t:'order', q, items:[en orden correcto], hint}
     classify clasificar en grupos        {t:'classify', q, bins:[...], items:[[texto, grupo],...], hint}
     match    unir parejas                {t:'match', q, pairs:[[izq, der],...], hint}
     fill     completar huecos            {t:'fill', q, parts:['texto ',0,' texto ',1], answers:[...], bank:[distractores], hint}
   Los "id" de misiones y jefes deben ser únicos en todo el curso.
   ===================================================================== */

/* ---------- CURRÍCULO: criterios de evaluación y saberes básicos ----------
   Se rellenan aquí y se asocian:
     · a cada tema:   criterios:['4.1','6.1'], saberes:['C.2.1']    (en EVALUACION, al final)
     · a cada misión: cr:['4.1']   → todos sus retos cuentan para ese criterio
     · a un reto:     cr:['4.3']   → sustituye al de la misión solo para ese reto
   Un criterio del tema sin ningún reto asociado aparece como «no evaluable en el juego».
   Mientras no haya criterios asociados, el panel del docente evalúa por misión. */
const CURRICULO = {
  /* Ciencias Sociales · Segundo ciclo. Numeración: competencia específica.criterio */
  criterios: [
    { id:'1.1', texto:'Utilizar dispositivos y recursos digitales, de acuerdo a las necesidades del contexto educativo de forma segura, buscando información, comunicándose y trabajando de forma individual y en equipo, reelaborando y creando contenidos digitales sencillos.' },
    { id:'2.1', texto:'Formular preguntas y realizar predicciones razonadas, demostrando curiosidad por el medio natural, social y cultural cercano.' },
    { id:'2.2', texto:'Buscar y seleccionar información de diferentes fuentes seguras y fiables, utilizándola en investigaciones relacionadas con el medio natural, social y cultural y adquiriendo léxico científico básico.' },
    { id:'2.3', texto:'Presentar los resultados de las investigaciones en diferentes formatos, utilizando lenguaje científico básico y explicando los pasos seguidos.' },
    { id:'3.1', texto:'Mostrar actitudes que fomenten el bienestar emocional y social, identificando las emociones propias y las de los demás, mostrando empatía y estableciendo relaciones afectivas saludables.' },
    { id:'4.1', texto:'Identificar las características, la organización y las propiedades de los elementos del medio natural, social y cultural a través de la indagación y utilizando las herramientas y procesos adecuados.' },
    { id:'4.2', texto:'Identificar conexiones sencillas entre diferentes elementos del medio natural, social y cultural mostrando comprensión de las relaciones que se establecen.' },
    { id:'4.3', texto:'Proteger el patrimonio natural y cultural y valorarlo como un bien común, adoptando conductas respetuosas para su disfrute y proponiendo acciones para su conservación y mejora.' },
    { id:'5.1', texto:'Identificar problemas ecosociales, proponer posibles soluciones y poner en práctica estilos de vida sostenible, reconociendo comportamientos respetuosos de cuidado, corresponsabilidad y protección del entorno y uso sostenible de los recursos naturales, y expresando los cambios positivos y negativos causados en el medio por la acción humana.' },
    { id:'6.1', texto:'Identificar hechos del entorno social y cultural desde la Prehistoria hasta la Edad Antigua, empleando las nociones de causalidad, simultaneidad y sucesión.' },
    { id:'6.2', texto:'Conocer personas, grupos sociales relevantes y formas de vida de las sociedades desde la Prehistoria hasta la Edad Antigua, incorporando la perspectiva de género.' },
    { id:'7.1', texto:'Analizar la importancia demográfica, cultural y económica de las migraciones en la actualidad, valorando con respeto y empatía el aporte de la diversidad cultural al bienestar individual y colectivo.' },
    { id:'7.2', texto:'Valorar positivamente las acciones que fomentan la igualdad de género y las conductas no sexistas reconociendo modelos positivos a lo largo de la historia.' },
    { id:'8.1', texto:'Realizar actividades en el contexto de la comunidad escolar, asumiendo responsabilidades y estableciendo acuerdos de forma dialogada y democrática y empleando un lenguaje inclusivo y no violento.' },
    { id:'8.2', texto:'Conocer los principales órganos de gobierno y funciones de diversas administraciones y servicios públicos, valorando la importancia de su gestión para la seguridad integral ciudadana y la participación democrática.' },
    { id:'8.3', texto:'Interiorizar normas básicas para la convivencia en el uso de los espacios públicos como peatones o como usuarios de los medios de locomoción, identificando las señales de tráfico y tomando conciencia de la importancia de una movilidad segura, saludable y sostenible tanto para las personas como para el planeta.' }
  ],
  /* Numeración: bloque (A Cultura científica, B Tecnología y digitalización, C Sociedades y territorios).apartado.saber */
  saberes: [
    { id:'A.1.1', bloque:'La vida en nuestro planeta', texto:'Relación del ser humano con los ecosistemas para cubrir las necesidades de la sociedad. Ejemplos de buenos y malos usos de los recursos naturales de nuestro planeta y sus consecuencias.' },
    { id:'A.1.2', bloque:'La vida en nuestro planeta', texto:'Las formas de relieve más relevantes.' },
    { id:'A.1.3', bloque:'La vida en nuestro planeta', texto:'Clasificación elemental de las rocas.' },
    { id:'B.1.1', bloque:'Digitalización del entorno personal de aprendizaje', texto:'Estrategias de búsquedas guiadas de información seguras y eficientes en Internet (valoración, discriminación, selección y organización).' },
    { id:'B.1.2', bloque:'Digitalización del entorno personal de aprendizaje', texto:'Reglas básicas de seguridad y privacidad para navegar por Internet y para proteger el entorno digital personal de aprendizaje.' },
    { id:'B.1.3', bloque:'Digitalización del entorno personal de aprendizaje', texto:'Recursos y plataformas digitales restringidas y seguras para comunicarse con otras personas. Etiqueta digital, reglas básicas de cortesía y respeto y estrategias para resolver problemas en la comunicación digital.' },
    { id:'B.1.4', bloque:'Digitalización del entorno personal de aprendizaje', texto:'Estrategias para fomentar el bienestar digital físico y mental. Reconocimiento de los riesgos asociados a un uso inadecuado y poco seguro de las tecnologías digitales (tiempo excesivo de uso, ciberacoso, acceso a contenidos inadecuados, publicidad y correos no deseados, etc.) y estrategias de actuación.' },
    { id:'C.1.1', bloque:'Retos del mundo actual', texto:'La Tierra y las catástrofes naturales. Elementos, movimientos, dinámicas que ocurren en el universo y su relación con fenómenos físicos que afectan a la Tierra y repercuten en la vida diaria y en el entorno.' },
    { id:'C.1.2', bloque:'Retos del mundo actual', texto:'Conocimiento del espacio. Representación del espacio. Representación de la Tierra a través del globo terráqueo (identificación de los polos, el eje y los hemisferios), los mapas y otros recursos digitales. Mapas y planos en distintas escalas. Técnicas de orientación mediante la observación de los elementos del medio físico y otros medios de localización espacial.' },
    { id:'C.1.3', bloque:'Retos del mundo actual', texto:'La atmósfera, el clima y el paisaje. Los fenómenos atmosféricos. Toma y registro de datos meteorológicos y su representación gráfica y visual. Las Tecnologías de la Información Geográfica (TIG). Relación entre las zonas climáticas y la diversidad de paisajes.' },
    { id:'C.1.4', bloque:'Retos del mundo actual', texto:'La hidrosfera. Distribución de las aguas en el planeta. El ciclo del agua.' },
    { id:'C.1.5', bloque:'Retos del mundo actual', texto:'Retos demográficos. Ocupación y distribución de la población en el espacio y análisis de los principales problemas y retos demográficos. Variables demográficas. Representación gráfica y cartográfica de la población. La organización del territorio en España y en Europa.' },
    { id:'C.1.6', bloque:'Retos del mundo actual', texto:'Desigualdad social y acceso a los recursos. Usos del espacio por el ser humano y evolución de las actividades productivas (recursos naturales, materias primas, productos elaborados y formas de producción). Las actividades económicas y los sectores de producción. El valor, el control del dinero y los medios de pago. De la supervivencia a la sobreproducción.' },
    { id:'C.2.1', bloque:'Sociedades en el tiempo', texto:'El tiempo histórico. Nociones temporales y cronología (año y siglo). Ubicación temporal de las grandes etapas históricas.' },
    { id:'C.2.2', bloque:'Sociedades en el tiempo', texto:'Las fuentes históricas: clasificación y utilización de las distintas fuentes (orales, escritas, patrimoniales) como vía para el análisis de los cambios y permanencias en la localidad a lo largo de la historia. Las huellas de la historia en lugares, edificios, objetos, vestido, oficios o tradiciones de la localidad.' },
    { id:'C.2.3', bloque:'Sociedades en el tiempo', texto:'Iniciación en la investigación y en los métodos de trabajo para la realización de proyectos, que analicen hechos, asuntos y temas de relevancia actual con perspectiva histórica, contextualizándolos en la época correspondiente (Prehistoria y Edad Antigua), como la supervivencia y la alimentación, la vivienda, los intercambios comerciales (de dónde viene el dinero, los trabajos no remunerados), la explotación de bienes comunes y recursos, los avances técnicos.' },
    { id:'C.2.4', bloque:'Sociedades en el tiempo', texto:'La acción de las mujeres y hombres como sujetos en la historia. Interpretación del papel de los individuos y de los distintos grupos sociales: relaciones, conflictos, creencias y condicionantes en cada época histórica.' },
    { id:'C.2.5', bloque:'Sociedades en el tiempo', texto:'Las expresiones artísticas y culturales prehistóricas y de la Antigüedad y su contextualización histórica desde una perspectiva de género. La función del arte y la cultura en el mundo de la Prehistoria y la Edad Antigua.' },
    { id:'C.2.6', bloque:'Sociedades en el tiempo', texto:'El patrimonio natural y cultural. Los espacios protegidos, naturales y culturales. Su uso, cuidado y conservación.' },
    { id:'C.3.1', bloque:'Alfabetización cívica', texto:'Compromisos y normas para la vida en sociedad.' },
    { id:'C.3.2', bloque:'Alfabetización cívica', texto:'Las costumbres, tradiciones y manifestaciones etnoculturales del entorno. Respeto por la diversidad y la cohesión social. La cultura de paz y no violencia.' },
    { id:'C.3.3', bloque:'Alfabetización cívica', texto:'La organización política y territorial de España.' },
    { id:'C.3.4', bloque:'Alfabetización cívica', texto:'Organización y funcionamiento de la sociedad. Las principales instituciones y entidades del entorno local, regional y nacional y los servicios públicos que prestan. Estructura administrativa de España.' },
    { id:'C.3.5', bloque:'Alfabetización cívica', texto:'Seguridad vial. La ciudad como espacio de convivencia. Normas de circulación, señales y marcas viales. Movilidad segura, saludable y sostenible como peatones o como usuarios de los medios de locomoción.' },
    { id:'C.4.1', bloque:'Conciencia ecosocial', texto:'El cambio climático. Introducción a las causas y consecuencias del cambio climático, y su impacto en los paisajes de la Tierra. Medidas de mitigación y de adaptación.' },
    { id:'C.4.2', bloque:'Conciencia ecosocial', texto:'Responsabilidad ecosocial. Ecodependencia e interdependencia entre personas. Sociedades y medio natural.' },
    { id:'C.4.3', bloque:'Conciencia ecosocial', texto:'La transformación y la degradación de los ecosistemas naturales por la acción humana. Conservación y protección de la naturaleza. El maltrato animal y su prevención.' },
    { id:'C.4.4', bloque:'Conciencia ecosocial', texto:'Estilos de vida sostenible. El consumo y la producción responsable, la alimentación equilibrada y sostenible, el uso eficiente del agua y la energía, la movilidad segura, saludable y sostenible, y la prevención y la gestión de los residuos.' }
  ]
};

/* ---------- TEMAS ----------
   Para cada tema: define sus misiones y su jefe final (TEMA1_MISIONES y TEMA1_JEFE,
   con el formato explicado arriba) y ponlos en missions / boss. */

const CURSO = {
  asignatura: 'Ciencias Sociales · 3.º de Primaria',
  situaciones: [
    /* { title:'Título propio de la situación', temas:['tema1','tema2'] }, */
  ],
  temas: [
    { id:'tema1', n:1, title:'Tema 1', short:'Próximamente', color:'--lung', icon:'home', missions:[] },
    { id:'tema2', n:2, title:'Tema 2', short:'Próximamente', color:'--ok', icon:'globe', missions:[] },
    { id:'tema3', n:3, title:'Tema 3', short:'Próximamente', color:'--food', icon:'compass', missions:[] },
    { id:'tema4', n:4, title:'Tema 4', short:'Próximamente', color:'--virus', icon:'clock', missions:[] },
    { id:'tema5', n:5, title:'Tema 5', short:'Próximamente', color:'--sense', icon:'castle', missions:[] },
    { id:'tema6', n:6, title:'Tema 6', short:'Próximamente', color:'--bone', icon:'coin', missions:[] }
  ]
};

/* ---------- ASOCIACIÓN DE CADA TEMA CON EL CURRÍCULO ----------
   criterios: los del tema (los que no tengan retos aparecen como «no evaluables en el juego»).
   misiones:  criterio que evalúan todos los retos de esa misión (también el jefe final).
   retos:     excepciones para un reto concreto, con la clave «misión#número» (el número empieza en 0;
              en los jefes, los retos propios del jefe son «jefe#x0», «jefe#x1»...). */
const EVALUACION = {
  /* tema1: { criterios:['4.1'], saberes:['C.3.1'], misiones:{ mision1:['4.1'], 'jefe1':['4.1'] }, retos:{ 'mision1#3':['4.2'] } }, */
};
CURSO.temas.forEach(t => {
  const e = EVALUACION[t.id]; if (!e) return;
  t.criterios = e.criterios; t.saberes = e.saberes;
  [...(t.missions || []), ...(t.boss ? [t.boss] : [])].forEach(m => {
    if (e.misiones && e.misiones[m.id]) m.cr = e.misiones[m.id];
    (m.ch || []).forEach((r, i) => { const k = m.id + '#' + i; if (e.retos && e.retos[k]) r.cr = e.retos[k]; });
    (m.extra || []).forEach((r, i) => { const k = m.id + '#x' + i; if (e.retos && e.retos[k]) r.cr = e.retos[k]; });
  });
});
