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

