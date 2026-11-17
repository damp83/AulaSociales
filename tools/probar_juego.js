/**
 * Prueba automática del juego: juega todas las misiones y jefes de cada tema con contenidos
 * (respondiendo bien a la primera), comprueba que se consiguen 3 estrellas, que se desbloquea
 * el tema siguiente y el minijuego, y juega el minijuego. Lo hace en ordenador y en móvil,
 * en castellano y (si el curso lo tiene) en inglés, y avisa de cualquier error de la página.
 *
 * Uso:  node tools/probar_juego.js                 (todos los cursos)
 *       node tools/probar_juego.js 2-primaria      (solo ese curso)
 * Opcional: DISPOSITIVO=ordenador|movil e IDIOMA=es|en para probar solo una combinación.
 * Necesita Playwright con Chromium. Guarda capturas en la carpeta indicada por CAPTURAS (opcional).
 */
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const { chromium, devices } = require('playwright');
const raiz = path.resolve(__dirname, '..');
const reg = {}; vm.createContext(reg);
vm.runInContext(fs.readFileSync(path.join(raiz, 'cursos.js'), 'utf8') + ';this.CURSOS=CURSOS;', reg);
const pedidos = process.argv.slice(2);
const cursos = reg.CURSOS.filter(c => !pedidos.length || pedidos.includes(c.id));
const CAPTURAS = process.env.CAPTURAS || '';

const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };
const servidor = http.createServer((req, res) => {
  const ruta = path.join(raiz, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!ruta.startsWith(raiz) || !fs.existsSync(ruta) || fs.statSync(ruta).isDirectory()) {
    const idx = path.join(ruta, 'index.html');
    if (fs.existsSync(idx)) { res.writeHead(200, { 'Content-Type': 'text/html' }); return res.end(fs.readFileSync(idx)); }
    res.writeHead(404); return res.end();
  }
  res.writeHead(200, { 'Content-Type': tipos[path.extname(ruta)] || 'application/octet-stream' }); res.end(fs.readFileSync(ruta));
});

/* Devuelve el selector que hay que tocar para avanzar en el reto actual con la respuesta correcta */
function siguienteToque() {
  const ch = M.list[M.i]; if (!ch || M.cur.done) return null;
  const box = document.getElementById('stage'), q = s => box.querySelector(s);
  const norm = s => String(s).trim().toLowerCase();
  if (ch.t === 'mc' || ch.t === 'tf') return `.opt[data-i="${ch.t === 'tf' ? (ch.a ? 0 : 1) : ch.a}"]`;
  if (ch.t === 'pick') { const f = ch.a.find(i => q(`.chip[data-i="${i}"]`).getAttribute('aria-pressed') !== 'true'); return f !== undefined ? `.chip[data-i="${f}"]` : '#check'; }
  if (ch.t === 'order') return `.card-opt[data-i="${box.querySelectorAll('.slot.filled').length}"]`;
  if (ch.t === 'classify') { const txt = q('.sort-item').textContent; const it = ch.items.find(x => x[0] === txt); return `.bin[data-b="${it[1]}"]`; }
  if (ch.t === 'match') { const l = [...box.querySelectorAll('.m.l:not([disabled])')][0]; return l.classList.contains('sel') ? `.m.r[data-i="${l.dataset.i}"]` : `.m.l[data-i="${l.dataset.i}"]`; }
  if (ch.t === 'fill') {
    const k = box.querySelectorAll('.blank.filled').length;
    const c = [...box.querySelectorAll('.chip:not([disabled])')].find(b => b.textContent === ch.answers[k]); return `.chip[data-j="${c.dataset.j}"]`;
  }
  if (ch.t === 'esquema') {
    const g = +q('.gap.active').dataset.g, ans = esqRespuestas(ch)[g];
    const c = [...box.querySelectorAll('.esq-bank .chip:not([disabled])')].find(b => norm(b.textContent) === norm(ans)); return `.esq-bank .chip[data-b="${c.dataset.b}"]`;
  }
  throw new Error('Tipo de reto desconocido: ' + ch.t);
}

/* «Bots» que juegan cada minijuego hasta el final. Devuelven el resultado de la partida. */
async function jugarMinijuego(page, tipo) {
  await page.click('#mj-go');
  if (tipo === 'lluvia') {
    await page.evaluate(() => { window.__bot = setInterval(() => {
      if (!MG || MG.state !== 'play') return clearInterval(window.__bot);
      const g = MG.g, vivos = g.items.filter(o => !o.hit && o.y < g.y - 8);
      const malo = x => vivos.some(o => !o.ok && Math.abs(o.x - x) < 46 && o.y > g.y - 170);
      const meta = vivos.filter(o => o.ok && !malo(o.x)).sort((a, b) => b.y - a.y)[0];
      let mejor = g.x, coste = Infinity;
      for (let x = 30; x <= MG.W - 30; x += 8) {
        const c = (malo(x) ? 1e6 : 0) + Math.abs(x - (meta ? meta.x : g.x)) + Math.abs(x - g.x) * .2;
        if (c < coste) { coste = c; mejor = x; }
      }
      g.target = mejor;
    }, 30); });
  } else if (tipo === 'carrera') {
    await page.evaluate(() => { window.__bot = setInterval(() => {
      if (!MG || MG.state !== 'play') return clearInterval(window.__bot);
      const g = MG.g, PX = MG.PX; if (!g.onGround) return;
      const puerta = g.items.find(o => o.kind === 'gate' && !o.done && o.x - PX > -80 && o.x - PX < 220);
      if (puerta) { if (puerta.q.top && puerta.x - PX < 110) miniJump(); return; }
      if (g.items.some(o => o.kind === 'bad' && !o.hit && o.x - PX > 30 && o.x - PX < 85)) miniJump();
    }, 15); });
  } else if (tipo === 'memoria') {
    await page.evaluate(() => { window.__bot = setInterval(() => {
      const libres = [...document.querySelectorAll('#view-mini .mem-card:not(.done):not(.open)')]; if (!libres.length) return;
      if (document.querySelectorAll('#view-mini .mem-card.open:not(.done)').length) return;
      const a = libres[0], par = libres.find(b => b !== a && b.dataset.p === a.dataset.p); a.click(); if (par) setTimeout(() => par.click(), 60);
    }, 400); });
  }
  // Rescate: se comprueba que arranca y funciona sin errores durante un rato
  const limite = tipo === 'rescate' ? 8000 : 150000;
  await page.waitForFunction(() => MG && MG.state === 'end', null, { timeout: limite }).catch(() => {});
  return page.evaluate(() => { clearInterval(window.__bot); if (!MG) return null; const g = MG.g || {}, mj = MG.t.minijuego;
    const estado = MG.state !== 'end' ? 'funciona sin errores' : (mj.rondas ? g.ronda >= mj.rondas.length : g.hearts > 0) ? 'ganado' : 'perdido';
    return { estado, puntos: g.score != null ? g.score : null }; });
}

async function probar(navegador, curso, nombre, opciones, idioma) {
  const ctx = await navegador.newContext(opciones); const page = await ctx.newPage(); const errores = [];
  page.on('pageerror', e => errores.push(String(e))); page.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
  await page.addInitScript(() => { try { speechSynthesis.speak = () => {}; } catch (e) {} });
  await page.goto(`http://localhost:${servidor.address().port}/?curso=${curso.id}`);
  if (idioma === 'en') await page.evaluate(() => { const b = [...document.querySelectorAll('button,[data-lang]')].find(x => /English/.test(x.textContent)); if (b) b.click(); });
  await page.fill('#pname', 'Prueba'); await page.click('#view-welcome .btn:not(.dark)');
  const temas = await page.evaluate(() => TEMAS.map((t, i) => ({ i, id: t.id, n: (t.missions || []).length, mini: t.minijuego ? t.minijuego.tipo : null })).filter(t => t.n));
  const informe = [], reintentos = [];
  for (const t of temas) {
    await page.evaluate(i => { CT = TEMAS[i]; goMap(); }, t.i);
    if (CAPTURAS && t.i === 0) await page.screenshot({ path: path.join(CAPTURAS, `${curso.id}-${nombre}-${idioma}-mapa.png`), fullPage: true });
    for (let k = 0; k <= t.n; k++) {
      await page.click(`.node[data-i="${k}"]`, { force: true }); await page.click('#lstart'); await page.click('#splash');
      for (let paso = 0; paso < 400; paso++) {
        const sel = await page.evaluate(siguienteToque);
        if (sel === null) {
          if (await page.evaluate(() => M.i >= M.list.length - 1 && M.cur.done)) { await page.click('#fb-next').catch(() => {}); break; }
          await page.click('#fb-next'); continue;
        }
        if (CAPTURAS && t.i === 0 && k === 0 && paso === 0) await page.screenshot({ path: path.join(CAPTURAS, `${curso.id}-${nombre}-${idioma}-reto.png`) });
        try { await page.click('#stage ' + sel, { timeout: 8000 }); }
        catch (e) { reintentos.push(`${t.id} etapa ${k + 1}: ${sel}`); await page.click('#stage ' + sel, { force: true }); }
      }
      await page.waitForSelector('#view-result:not([hidden]), .result', { timeout: 8000 }).catch(() => {});
      const r = await page.evaluate(id => P().worlds[id], await page.evaluate(k => stagesOf(CT)[k].id, k));
      if (!r || r.stars !== 3) throw new Error(`${t.id} etapa ${k + 1}: ${r ? r.stars : 0} estrellas`);
      await page.evaluate(() => goMap());
    }
    const linea = { tema: t.id, etapas: t.n + 1, estrellas: '3 en todas' };
    if (t.mini) {
      const abierto = await page.evaluate(i => miniUnlocked(TEMAS[i]), t.i);
      if (!abierto) throw new Error(`${t.id}: el minijuego no se ha desbloqueado`);
      await page.evaluate(i => openMini(TEMAS[i]), t.i);
      linea.minijuego = Object.assign({ tipo: t.mini }, await jugarMinijuego(page, t.mini));
      if (CAPTURAS && t.i === 0) await page.screenshot({ path: path.join(CAPTURAS, `${curso.id}-${nombre}-${idioma}-minijuego.png`) });
      await page.evaluate(() => { try { miniStop(); } catch (e) {} goMap(); });
    }
    const sig = await page.evaluate(i => temaBeaten(P(), TEMAS[i]) && (!TEMAS[i + 1] || !hasContent(TEMAS[i + 1]) || temaOpen(i + 1)), t.i);
    if (!sig) throw new Error(`${t.id}: no se desbloquea el tema siguiente`);
    informe.push(linea);
  }
  if (temas.length) {
    // Panel del docente: la evaluación debe dar SB en cada criterio con retos
    await page.evaluate(() => renderTeacher());
    await page.waitForTimeout(400);
    const txt = await page.evaluate(() => document.querySelector('#view-teacher').innerText);
    if (!/\bSB\b/.test(txt)) throw new Error('El panel del docente no muestra la evaluación SB');
    if (/\b(NT|SU|IN)\b\s+\d+\s*%/.test(txt)) throw new Error('La evaluación no da SB en todos los criterios');
    if (CAPTURAS) await page.screenshot({ path: path.join(CAPTURAS, `${curso.id}-${nombre}-${idioma}-docente.png`), fullPage: true });
  }
  await ctx.close();
  return { informe, errores, reintentos };
}

(async () => {
  await new Promise(r => servidor.listen(0, r));
  const navegador = await chromium.launch(); let fallos = 0;
  for (const curso of cursos) {
    for (const [nombre, opciones] of [['ordenador', { viewport: { width: 1280, height: 800 } }], ['movil', devices['iPhone 13']]].filter(([n]) => !process.env.DISPOSITIVO || process.env.DISPOSITIVO === n)) {
      for (const idioma of (curso.ingles ? ['es', 'en'] : ['es']).filter(i => !process.env.IDIOMA || process.env.IDIOMA === i)) {
        try {
          const { informe, errores, reintentos } = await probar(navegador, curso, nombre, opciones, idioma);
          console.log(`${curso.id} · ${nombre} · ${idioma}: ${informe.length ? informe.map(x => `${x.tema} (${x.etapas} etapas, ${x.estrellas}${x.minijuego ? `, minijuego ${x.minijuego.tipo}: ${x.minijuego.estado}, ${x.minijuego.puntos} puntos` : ''})`).join('; ') : 'sin temas con contenidos'}`);
          if (reintentos.length) console.log('  Aviso: toques repetidos (elemento en movimiento):', reintentos.join(' | '));
          if (errores.length) { fallos++; console.log('  ERRORES:', errores.join(' | ')); }
        } catch (e) { fallos++; console.log(`${curso.id} · ${nombre} · ${idioma}: FALLO · ${e.message.split('\n').slice(0,14).join(' ')}`); }
      }
    }
  }
  await navegador.close(); servidor.close();
  process.exit(fallos ? 1 : 0);
})();
