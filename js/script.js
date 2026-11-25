(function () {
  const cfg = window.ALBUM_CONFIG;
  const book = document.getElementById("book");
  document.title = cfg.cover.title + " · " + cfg.couple.join(" & ");

  const pages = window.buildAlbum(cfg);
  pages.forEach((p) => book.appendChild(p));

  const flip = new St.PageFlip(book, {
    width: 400, height: 560, size: "stretch",
    minWidth: 240, maxWidth: 560, minHeight: 336, maxHeight: 784,
    showCover: true, usePortrait: true, drawShadow: true,
    maxShadowOpacity: 0.5, flippingTime: 1000,
    mobileScrollSupport: false, swipeDistance: 18, showPageCorners: true
  });
  flip.loadFromHTML(pages);

  /* A StPageFlip desenha as páginas em movimento (capa/lombada) sem a folga vertical que usa em repouso;
     se o contêiner for mais alto que o livro, as páginas "pulam" no início e no fim da virada.
     Solução: o contêiner (#book) tem sempre exatamente o tamanho do livro (mesma proporção 400:560). */
  const wrap = document.getElementById("bookwrap");
  function fit() {
    const W = wrap.clientWidth, H = wrap.clientHeight;
    let pw = Math.min(W / 2, H * 400 / 560, 560), port = 2 * pw < 480;
    if (port) pw = Math.min(W, H * 400 / 560, 560);
    pw = Math.max(Math.floor(pw), 120);
    book.style.width = (port ? pw : pw * 2) + "px"; book.style.maxWidth = "none";
    book.style.height = Math.round(pw * 1.4) + "px";
  }
  fit(); flip.update();

  /* ---------- Geometria constante do livro (lombada, espessura, centralização) ----------
     A StPageFlip posiciona a capa fechada na metade direita da lombada. Mantemos essa geometria
     intacta e só deslizamos o conjunto (#shift) para centralizar a capa, na mesma duração da virada. */
  const shift = document.getElementById("shift"), root = document.documentElement, last = pages.length - 1;
  const land = () => flip.getOrientation() === "landscape";
  function setGeo() {
    const r = flip.getBoundsRect();
    root.style.setProperty("--pw", r.pageWidth + "px"); root.style.setProperty("--ph", r.height + "px");
    document.body.classList.toggle("portrait", !land());
  }
  function applyShift(idx) {
    const pw = flip.getBoundsRect().pageWidth;
    const x = !land() ? 0 : idx === 0 ? -pw / 2 : idx === last ? pw / 2 : 0;
    const f = Math.min(1, Math.max(0, (idx - 1) / (last - 2)));
    shift.style.setProperty("--sx", x + "px");
    shift.style.setProperty("--l", idx === 0 ? 0 : idx === last ? 1 : 0.35 + 0.65 * f);
    shift.style.setProperty("--r", idx === last ? 0 : idx === 0 ? 1 : 1 - 0.75 * f);
  }
  function target(c, dir) {   /* índice de destino da virada em andamento (paisagem) */
    if (!land()) return dir === 0 ? c + 1 : c - 1;
    if (dir === 0) return c === 0 ? 1 : c + 2;
    return c === 1 ? 0 : c === last ? last - 2 : c - 2;
  }
  setGeo(); shift.style.transition = "none"; applyShift(0); void shift.offsetWidth; shift.style.transition = "";
  new ResizeObserver(() => setTimeout(() => { fit(); flip.update(); setGeo(); shift.style.transition = "none"; applyShift(flip.getCurrentPageIndex()); void shift.offsetWidth; shift.style.transition = ""; }, 80)).observe(document.getElementById("bookwrap"));
  flip.on("changeState", (e) => {
    if (e.data === "flipping") applyShift(Math.max(0, Math.min(last, target(flip.getCurrentPageIndex(), flip.getRender().getDirection()))));
    else if (e.data === "read") applyShift(flip.getCurrentPageIndex());
  });

  /* ---------- Contador ---------- */
  const start = new Date(cfg.startDate).getTime();
  const els = {};
  document.querySelectorAll("[data-count]").forEach((e) => (els[e.dataset.count] = e));
  function set(el, v) { v = String(v); if (el.textContent === v) return; el.textContent = v; el.classList.remove("tk"); void el.offsetWidth; el.classList.add("tk"); }
  function tick() {
    let t = Math.max(0, Math.floor((Date.now() - start) / 1000));
    const d = Math.floor(t / 86400); t -= d * 86400;
    const h = Math.floor(t / 3600); t -= h * 3600;
    const m = Math.floor(t / 60), s = t - m * 60;
    if (els.d) { set(els.d, d.toLocaleString("pt-BR")); set(els.h, h); set(els.m, m); set(els.s, s); }
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Música ---------- */
  const mbtn = document.getElementById("music");
  let audio = null, playing = false, tried = false;
  function setPlaying(v) { playing = v; mbtn.classList.toggle("on", v); mbtn.setAttribute("aria-pressed", v); }
  if (cfg.music && cfg.music.src) {
    audio = new Audio(cfg.music.src);
    audio.loop = true; audio.volume = cfg.music.volume || 0.6;
    audio.addEventListener("error", () => { mbtn.classList.add("off"); mbtn.title = "Adicione o arquivo de música em assets/music/"; });
  } else { mbtn.hidden = true; }
  function startMusic() {
    if (!audio || tried) return; tried = true;
    audio.play().then(() => setPlaying(true)).catch(() => { tried = false; });
  }
  mbtn.addEventListener("click", () => {
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); } else { audio.play().then(() => setPlaying(true)).catch(() => {}); tried = true; }
  });
  book.addEventListener("pointerdown", startMusic, { once: true });

  /* ---------- Abertura e estados ---------- */
  const openBtn = document.getElementById("open");
  const hint = document.getElementById("hint");
  openBtn.textContent = cfg.cover.openLabel;
  openBtn.addEventListener("click", () => { startMusic(); mark(1); applyShift(1); flip.flipNext(); });
  document.getElementById("prev").addEventListener("click", () => flip.flipPrev());
  document.getElementById("next").addEventListener("click", () => { startMusic(); flip.flipNext(); });

  /* splash de apresentação */
  const sp = document.getElementById("splash").children;
  (cfg.intro || []).forEach((t, i) => (sp[i].textContent = t));
  const endSplash = () => document.body.classList.remove("pre");
  const splashTimer = setTimeout(endSplash, 5200);
  document.getElementById("splash").addEventListener("click", () => { clearTimeout(splashTimer); endSplash(); });

  /* páginas "ativas" disparam as animações de entrada */
  function mark(p) {
    const left = p % 2 ? p : p - 1;
    pages.forEach((el, k) => el.classList.toggle("on", p > 0 && (k === p || k === left || k === left + 1)));
  }
  const chap = document.getElementById("chapter");
  let chapTimer;
  function chapter(p) {
    const c = (cfg.pages[p - 1] || {}).chapter || (p % 2 && (cfg.pages[p] || {}).chapter);
    if (!c) return;
    chap.textContent = c; chap.classList.remove("show"); void chap.offsetWidth; chap.classList.add("show");
    clearTimeout(chapTimer); chapTimer = setTimeout(() => chap.classList.remove("show"), 3600);
  }

  let hintTimer;
  flip.on("flip", (e) => {
    const i = e.data, last = pages.length - 1; mark(i); chapter(i);
    document.body.classList.toggle("opened", i > 0);
    document.body.classList.toggle("finale", i >= last - 2 && i < last);
    if (i > 0) {
      hint.classList.add("show"); clearTimeout(hintTimer);
      hintTimer = setTimeout(() => hint.classList.remove("show"), 3800);
    } else hint.classList.remove("show");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") flip.flipNext();
    if (e.key === "ArrowLeft") flip.flipPrev();
  });
})();
