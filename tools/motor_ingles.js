/* =====================================================================
   CONTENIDOS EN INGLÉS · Time Travellers (Viajeros del Tiempo)
   © 2026 Diego Alberto Moya Puerta, Maestro de Educación Primaria, Comunidad Autónoma de la Región de Murcia · Licencia CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
   ---------------------------------------------------------------------
   Versión inglesa de contenidos.js, adaptada a alumnado de 7-8 años que aprende inglés.
   Solo contiene TEXTOS: la estructura (respuestas correctas, orden, grupos, criterios) se toma
   de contenidos.js, así que el progreso y la evaluación son los mismos en los dos idiomas.

   Reglas para editar:
   - Cada misión tiene las mismas tarjetas (learn) y los mismos retos (ch) EN EL MISMO ORDEN que en
     contenidos.js. El esquema es el último reto de cada misión.
   - En «opts», «items», «pairs», «bins» y «parts» hay que respetar el mismo número y orden de
     elementos que en castellano (la respuesta correcta se identifica por su posición).
   - En «classify», «items» es solo la lista de textos (el grupo de cada uno sale de contenidos.js).
   - En los esquemas, [[palabra]] es un hueco: debe haber el mismo número de huecos.
   ===================================================================== */

const IDIOMA_CONTENIDOS = (() => {
  const CAMPOS = ['q', 'opts', 'hint', 'items', 'bins', 'pairs', 'parts', 'answers', 'bank', 'titulo', 'nodos', 'extra'];
  const copia = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));
  const ESQ_EN = { q: 'Complete the concept map for this mission.', hint: 'Look at the lesson cards: the concept map sums them up.' };

  // Guarda una vez los textos originales en castellano para poder volver a ellos
  function guardar(curso) {
    if (curso._es) return;
    curso._es = { asignatura: curso.asignatura, situaciones: (curso.situaciones || []).map(s => s.title) };
    curso.temas.forEach(t => {
      t._es = { title: t.title, short: t.short, starsBadge: t.starsBadge, minijuego: copia(t.minijuego) };
      [...(t.missions || []), ...(t.boss ? [t.boss] : [])].forEach(m => {
        m._es = { title: m.title, short: m.short, badge: m.badge, villain: m.villain, learn: copia(m.learn) };
        [...(m.ch || []), ...(m.extra || [])].forEach(r => {
          r._es = {};
          CAMPOS.forEach(k => { if (r[k] !== undefined) r._es[k] = copia(r[k]); });
        });
      });
    });
  }

  function ponerReto(r, o, idioma) {
    if (idioma === 'es') { Object.keys(r._es).forEach(k => { r[k] = copia(r._es[k]); }); return; }
    if (r.t === 'esquema') o = Object.assign({}, ESQ_EN, o);
    if (!o) return;
    CAMPOS.forEach(k => {
      if (o[k] === undefined) return;
      if (k === 'items' && r.t === 'classify') r.items = r._es.items.map((it, i) => [o.items[i], it[1]]);
      else r[k] = copia(o[k]);
    });
  }

  function aplicar(curso, idioma) {
    guardar(curso);
    const en = idioma === 'en' ? CONTENIDOS_EN : null;
    curso.asignatura = en ? en.asignatura : curso._es.asignatura;
    (curso.situaciones || []).forEach((s, i) => { s.title = en ? en.situaciones[i] : curso._es.situaciones[i]; });
    curso.temas.forEach(t => {
      const ot = en && en.temas[t.id];
      t.title = ot ? ot.title : t._es.title;
      t.short = ot ? ot.short : t._es.short;
      t.starsBadge = ot && ot.starsBadge ? ot.starsBadge : t._es.starsBadge;
      if (t.minijuego) t.minijuego = ot && ot.minijuego ? Object.assign({}, t.minijuego, copia(ot.minijuego)) : copia(t._es.minijuego);
      [...(t.missions || []), ...(t.boss ? [t.boss] : [])].forEach(m => {
        const om = en && en.misiones[m.id];
        ['title', 'short', 'badge', 'villain'].forEach(k => { m[k] = om && om[k] !== undefined ? om[k] : m._es[k]; });
        m.learn = om && om.learn ? copia(om.learn) : copia(m._es.learn);
        (m.ch || []).forEach((r, i) => ponerReto(r, om && om.ch && om.ch[i], idioma));
        (m.extra || []).forEach((r, i) => ponerReto(r, om && om.extra && om.extra[i], idioma));
      });
    });
  }
  return { aplicar };
})();

