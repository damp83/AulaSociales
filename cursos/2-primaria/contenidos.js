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
  /* Ciencias Sociales · Primer ciclo. Numeración: competencia específica.criterio */
  criterios: [
    { id:'1.1', texto:'Utilizar dispositivos y recursos digitales de forma segura y de acuerdo con las necesidades del contexto educativo.' },
    { id:'2.1', texto:'Buscar información sencilla de diferentes fuentes seguras y fiables de forma guiada, utilizándola en investigaciones relacionadas con el medio natural, social y cultural.' },
    { id:'3.1', texto:'Identificar las emociones propias y las de los demás, entendiendo las relaciones familiares y escolares a las que pertenecen y reconociendo las acciones que favorezcan el bienestar emocional y social.' },
    { id:'4.1', texto:'Reconocer las características, la organización y las propiedades de los elementos del medio natural, social y cultural a través de la indagación, utilizando las herramientas y procesos adecuados de forma pautada.' },
    { id:'4.2', texto:'Reconocer conexiones sencillas y directas entre diferentes elementos del medio natural, social y cultural por medio de la observación, la manipulación y la experimentación.' },
    { id:'4.3', texto:'Mostrar actitudes de respeto ante el patrimonio natural y cultural, reconociéndolo como un bien común.' },
    { id:'5.1', texto:'Mostrar estilos de vida sostenible y valorar la importancia del respeto, los cuidados, la corresponsabilidad y la protección de los elementos y seres del planeta, identificando la relación de la vida de las personas con sus acciones sobre los elementos y recursos del medio como el suelo y el agua.' },
    { id:'6.1', texto:'Ordenar temporalmente hechos del entorno social y cultural cercano, empleando nociones básicas de medida y sucesión.' },
    { id:'6.2', texto:'Conocer personas y grupos sociales relevantes de la historia, así como formas de vida del pasado, incorporando la perspectiva de género.' },
    { id:'7.1', texto:'Recoger información acerca de manifestaciones culturales del propio entorno, mostrando respeto, valorando su diversidad y riqueza, y apreciándolas como fuente de aprendizaje.' },
    { id:'7.2', texto:'Mostrar actitudes que fomentan la igualdad de género y las conductas no sexistas reconociendo modelos positivos en el entorno cercano.' },
    { id:'8.1', texto:'Establecer acuerdos de forma dialógica y democrática como parte de grupos próximos a su entorno, identificando las responsabilidades individuales y empleando un lenguaje inclusivo y no violento.' },
    { id:'8.2', texto:'Identificar instituciones cercanas, señalando y valorando las funciones que realizan en pro de una buena convivencia.' },
    { id:'8.3', texto:'Conocer e interiorizar normas básicas para la convivencia en el uso de los espacios públicos, especialmente como peatones o como usuarios de los medios de locomoción, tomando conciencia de la importancia de la movilidad segura, saludable y sostenible tanto para las personas como para el planeta.' }
  ],
  /* Numeración: bloque (A Cultura científica, B Tecnología y digitalización, C Sociedades y territorios).apartado.saber */
  saberes: [
    { id:'A.1.1', bloque:'Iniciación en la actividad científica', texto:'Estilos de vida sostenible e importancia del cuidado del planeta a través del conocimiento científico presente en la vida cotidiana.' },
    { id:'A.2.1', bloque:'La vida en nuestro planeta', texto:'Hábitos saludables relacionados con el bienestar emocional y social: estrategias de identificación de las propias emociones y respeto a las de los demás. Sensibilidad y aceptación de la diversidad presente en el aula y en la sociedad. Educación afectivo-sexual.' },
    { id:'B.1.1', bloque:'Digitalización del entorno personal de aprendizaje', texto:'Recursos digitales para comunicarse con personas conocidas en entornos conocidos y seguros.' },
    { id:'C.1.1', bloque:'Retos del mundo actual', texto:'La Tierra en el universo. Elementos, movimientos y dinámicas relacionados con la Tierra y el universo y sus consecuencias en la vida diaria y en el entorno. Secuencias temporales y cambios estacionales.' },
    { id:'C.1.2', bloque:'Retos del mundo actual', texto:'La vida en la Tierra. Fenómenos atmosféricos y su repercusión en los ciclos biológicos y en la vida diaria. Observación y registro de datos atmosféricos.' },
    { id:'C.1.3', bloque:'Retos del mundo actual', texto:'Retos sobre situaciones cotidianas. Funciones básicas del pensamiento espacial y temporal para la interacción con el medio y la resolución de situaciones de la vida cotidiana. Itinerarios y trayectos, desplazamientos y viajes.' },
    { id:'C.2.1', bloque:'Sociedades en el tiempo', texto:'La percepción del tiempo (pasado, presente y futuro). Medida del tiempo en la vida cotidiana (hora, día, semana, mes y año). El ciclo vital y las relaciones intergeneracionales.' },
    { id:'C.2.2', bloque:'Sociedades en el tiempo', texto:'Uso de objetos y artefactos de la vida cotidiana como fuentes para reflexionar sobre el cambio y la continuidad, las causas y consecuencias.' },
    { id:'C.2.3', bloque:'Sociedades en el tiempo', texto:'Recursos y medios analógicos y digitales. Las fuentes orales y la memoria colectiva. La historia local y la biografía familiar; mujeres y hombres como sujetos de la historia.' },
    { id:'C.2.4', bloque:'Sociedades en el tiempo', texto:'Las expresiones y producciones artísticas a través del tiempo. El patrimonio material e inmaterial local.' },
    { id:'C.3.1', bloque:'Alfabetización cívica', texto:'La vida en colectividad. La familia (relaciones de parentesco). Diversidad familiar. Compromisos, corresponsabilidad, participación y normas en el entorno familiar, vecinal y escolar. Prevención, gestión y resolución dialogada de conflictos.' },
    { id:'C.3.2', bloque:'Alfabetización cívica', texto:'La vida en sociedad. Espacios, recursos y servicios del entorno. Formas y modos de interacción social en espacios públicos desde una perspectiva de género. La localidad y el municipio (el Ayuntamiento y los servicios públicos).' },
    { id:'C.3.3', bloque:'Alfabetización cívica', texto:'Identidad y diversidad cultural: existencia de realidades diferentes y aproximación a las distintas etnoculturas presentes en el entorno. La convivencia con los demás y el rechazo a las actitudes discriminatorias. Cultura de paz y no violencia.' },
    { id:'C.3.4', bloque:'Alfabetización cívica', texto:'Ocupación y trabajo. Identificación de las principales actividades profesionales y laborales de mujeres y hombres en el entorno.' },
    { id:'C.3.5', bloque:'Alfabetización cívica', texto:'Igualdad de género y conducta no sexista.' },
    { id:'C.3.6', bloque:'Alfabetización cívica', texto:'Seguridad vial. La ciudad como espacio de convivencia. Normas básicas en los desplazamientos como peatones o como usuarios de los medios de locomoción.' },
    { id:'C.4.1', bloque:'Conciencia ecosocial', texto:'Conocimiento de nuestro entorno. Paisajes naturales y paisajes humanizados, y sus elementos. La acción humana sobre el medio y sus consecuencias.' },
    { id:'C.4.2', bloque:'Conciencia ecosocial', texto:'Responsabilidad ecosocial. Acciones para la conservación, mejora y uso sostenible de los bienes comunes. El maltrato animal y su prevención.' },
    { id:'C.4.3', bloque:'Conciencia ecosocial', texto:'Estilos de vida sostenible. El uso responsable del agua, la movilidad segura, saludable y sostenible, y la prevención y la gestión de los residuos.' }
  ]
};

/* ---------- TEMAS ----------
   Para cada tema: define sus misiones y su jefe final (TEMA1_MISIONES y TEMA1_JEFE,
   con el formato explicado arriba) y ponlos en missions / boss. */

const CURSO = {
  asignatura: 'Ciencias Sociales · 2.º de Primaria',
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
