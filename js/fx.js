/* Ambiente ao redor do álbum: estrelas, vaga-lumes, lanternas e flores nos cantos */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = innerWidth < 700;

  /* lanternas subindo, em profundidades diferentes */
  const L = document.getElementById("lanterns");
  const n = small ? 6 : 10;
  for (let i = 0; i < n; i++) {
    const far = Math.random() < 0.5, s = far ? 16 + Math.random() * 14 : 30 + Math.random() * 26;
    const el = document.createElement("div");
    el.className = "lt" + (far ? " far" : "");
    el.style.cssText = `left:${(i + Math.random() * 0.8) / n * 100}%;width:${s}px;height:${s}px;` +
      `animation-duration:${(far ? 52 : 38) + Math.random() * 18}s,${5 + Math.random() * 4}s;animation-delay:${-Math.random() * 60}s,${-Math.random() * 6}s`;
    el.innerHTML = '<svg viewBox="0 0 48 48"><use href="#lantern"/></svg>';
    L.appendChild(el);
  }

  /* flores e folhas nos cantos (camada da frente, só nas bordas) */
  const C = document.getElementById("corners");
  const u = (id, x, y, w, c, r) => `<svg style="left:${x}%;top:${y}%;width:${w}%;color:${c};rotate:${r}deg"><use href="#${id}"/></svg>`;
  const cluster = (cls) => `<div class="cn ${cls}">` +
    u("leaf", 0, 38, 46, "#7fa88a", -20) + u("leaf", 36, 58, 40, "#6f9c82", 24) + u("leaf", 52, 22, 34, "#8fb39a", -50) +
    u("hibiscus", 14, 6, 44, "#b9a1e8", 0) + u("flower", 50, 44, 30, "#f3e9d2", 15) + u("flower", 4, 62, 26, "#9fc3e6", -10) +
    u("star", 62, 8, 12, "#e7cd86", 0) + `</div>`;
  C.innerHTML = cluster("tl") + cluster("tr") + cluster("bl") + cluster("br");

  /* partículas: estrelas cintilantes + vaga-lumes dourados */
  const cv = document.getElementById("fx"), cx = cv.getContext("2d");
  let W, H, P = [];
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * d; H = cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0);
    W /= d; H /= d;
    const ns = small ? 60 : 130, nf = small ? 14 : 28;
    P = [];
    for (let i = 0; i < ns; i++) P.push({ t: 0, x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.3, p: Math.random() * 6.28, v: 0.4 + Math.random() * 1.2 });
    for (let i = 0; i < nf; i++) P.push({ t: 1, x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + 1, p: Math.random() * 6.28, v: 0.3 + Math.random() * 0.6, a: Math.random() * 6.28 });
  }
  function draw(ts) {
    cx.clearRect(0, 0, W, H);
    for (const q of P) {
      if (q.t === 0) {
        const o = reduce ? 0.6 : 0.25 + 0.6 * Math.abs(Math.sin(ts / 1000 * q.v + q.p));
        cx.fillStyle = `rgba(235,225,255,${o})`; cx.beginPath(); cx.arc(q.x, q.y, q.r, 0, 6.28); cx.fill();
      } else {
        if (!reduce) { q.a += (Math.random() - 0.5) * 0.12; q.x += Math.cos(q.a) * q.v; q.y += Math.sin(q.a) * q.v - 0.08;
          if (q.x < -10) q.x = W + 10; if (q.x > W + 10) q.x = -10; if (q.y < -10) q.y = H + 10; if (q.y > H + 10) q.y = -10; }
        const o = 0.35 + 0.5 * Math.abs(Math.sin(ts / 1400 + q.p)), g = cx.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r * 7);
        g.addColorStop(0, `rgba(255,224,140,${o})`); g.addColorStop(1, "rgba(255,224,140,0)");
        cx.fillStyle = g; cx.beginPath(); cx.arc(q.x, q.y, q.r * 7, 0, 6.28); cx.fill();
      }
    }
    if (!reduce && !document.hidden) requestAnimationFrame(draw);
  }
  size(); addEventListener("resize", size);
  if (reduce) draw(0); else requestAnimationFrame(draw);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && !reduce) requestAnimationFrame(draw); });
})();
