/* Monta as páginas do álbum a partir de config.js */
(function () {
  const ph = (label) => "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#ead3e0"/>' +
    '<g fill="none" stroke="#A42E6B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".55">' +
    '<rect x="140" y="160" width="120" height="86" rx="12"/><circle cx="200" cy="203" r="22"/><path d="M175 160l8-14h34l8 14"/></g>' +
    '<text x="200" y="292" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="22" fill="#441553" opacity=".7">' +
    (label || "Sua foto aqui") + "</text></svg>");

  window.albumPh = function (el) { el.onerror = null; el.src = ph(el.dataset.ph); };

  const img = (src, alt, pos) => src
    ? `<img src="${src}" alt="${alt || ""}" draggable="false"${pos ? ` style="object-position:${pos}"` : ""} onerror="albumPh(this)">`
    : `<img src="${ph()}" alt="" draggable="false">`;

  const ORN = '<svg class="orn" viewBox="0 0 120 30" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19C28 6 44 29 60 17S96 8 116 17"/><path d="M60 3l1.7 4.2 4.5.3-3.5 2.9 1.1 4.4-3.8-2.4-3.8 2.4 1.1-4.4-3.5-2.9 4.5-.3z"/></svg>';

  const TH = {
    rapunzel: { wm: "tower", d: [["lantern", 72, 5, 14, "a1"], ["star", 8, 100, 6, "a2"], ["lantern", 9, 112, 10, "a3"], ["flower", 78, 112, 13, "a2"]] },
    stitch:   { wm: "hibiscus", d: [["hibiscus", 70, 4, 17, "a2"], ["star", 8, 8, 7, "a1"], ["star", 84, 120, 7, "a3"], ["flower", 6, 112, 12, "a1"]] },
    bts:      { wm: "star7", d: [["heart", 80, 6, 8, "a2"], ["star", 7, 118, 7, "a1"], ["star7", 58, 112, 22, "a3"], ["star", 14, 8, 5, "a3"]] },
    tiana:    { wm: "lily", d: [["lily", 4, 4, 16, "a1"], ["frog", 78, 98, 13, "a3"], ["ff", 70, 12], ["ff", 20, 100], ["ff", 56, 70]] },
    neutral:  { wm: null, d: [["flower", 74, 5, 12, "a1"], ["star", 8, 112, 6, "a2"], ["leaf", 80, 120, 11, "a3"]] },
    night:    { wm: null, d: [["star", 10, 8, 6, "a1"], ["star", 84, 20, 4, "a2"], ["lantern", 76, 112, 12, "a3"], ["star", 8, 124, 5, "a3"]] }
  };
  const deco = (theme, type) => {
    const t = TH[theme] || TH.neutral, hi = ["polaroids", "collage", "duo", "dates", "loves"].includes(type);
    return (t.wm ? `<svg class="wm"><use href="#${t.wm}"/></svg>` : "") + t.d.filter((d) => !hi || d[2] > 22).map(([sy, x, y, w, a]) => sy === "ff"
      ? `<i class="ff" style="left:${x}cqw;top:${y}cqw"></i>`
      : `<svg class="dc ${a}" style="left:${x}cqw;top:${y}cqw;width:${w}cqw;rotate:${(x * 7 + y * 3) % 24 - 12}deg"><use href="#${sy}"/></svg>`).join("");
  };

  /* Adesivos: imagens PNG transparentes fornecidas por você (assets/images/<pasta>/...).
     Sem o arquivo: com showDemoTags=true aparece um espaço tracejado com o nome do arquivo; com false, some. */
  window.albumStk = function (el) {
    const box = el.parentNode, name = (el.getAttribute("src") || "").replace("assets/images/", "");
    if (window.ALBUM_CONFIG.showDemoTags) { box.classList.add("ph0"); if (parseFloat(box.style.width) > 40) box.classList.add("wide"); box.innerHTML = `<span class="hand">coloque<br>${name}</span>`; } else box.remove();
  };
  const stickers = (p) => (p.stickers || []).map((k) =>
    `<div class="stk${k.behind ? " bh" : ""}" style="left:${k.x}cqw;top:${k.y}cqw;width:${k.w}cqw;rotate:${k.r || 0}deg;${k.o ? "opacity:" + k.o : ""}"><img src="${k.src}" alt="" draggable="false"${k.flip ? ' style="transform:scaleX(-1)"' : ""} onerror="albumStk(this)"></div>`).join("");

  const B = {
    intro: (p) => `<div class="pad mid">${ORN}<h2>${p.title}</h2><p class="body">${p.text}</p><p class="hand sign">${p.sign || ""}</p></div>`,

    text: (p) => `<div class="pad"><h2>${p.title}</h2><p class="body">${p.text}</p></div>`,

    hero: (p) => `<div class="bg">${img(p.photo, p.title, p.pos)}</div><div class="pad hero"><h2>${p.title}</h2><p class="body">${p.text}</p></div>`,

    photo: (p) => `<div class="pad"><h2>${p.title || ""}</h2><div class="ph tape big">${img(p.photo, p.caption, p.pos)}</div><p class="hand cap">${p.caption || ""}</p></div>`,

    counter: (p) => `<div class="frame2"></div><div class="pad cnt"><h2>${p.title}</h2><p class="hand lead">${p.lead}</p>
      <div class="grid">
        ${[["d", "dias"], ["h", "horas"], ["m", "minutos"], ["s", "segundos"]].map(([k, l]) =>
          `<div class="cell"><span class="num" data-count="${k}">0</span><span class="hand lbl">${l}</span></div>`).join("")}
      </div><p class="hand foot">${p.foot || ""}</p></div>`,

    polaroids: (p) => `<div class="pad"><h2 class="sm">${p.title}</h2></div>
      ${p.items.map((it, i) => `<figure class="pol pol${i + 1}"><div class="pi">${img(it.photo, it.caption, it.pos)}</div><figcaption class="hand">${it.caption || ""}</figcaption></figure>`).join("")}`,

    dates: (p) => `<div class="pad"><h2>${p.title}</h2><ul class="dates">${p.items.map((d) =>
      `<li><span class="hand dt">${d.date}</span><span class="body tx">${d.text}</span></li>`).join("")}</ul></div>`,

    collage: (p) => `<div class="pad"><h2 class="sm">${p.title}</h2></div>
      <div class="ph tape c1">${img(p.photos[0], "", (p.pos || [])[0])}</div>
      <div class="ph c2">${img(p.photos[1], "", (p.pos || [])[1])}</div>
      <div class="ph tape c3">${img(p.photos[2], "", (p.pos || [])[2])}</div>
      <p class="hand ccap">${p.caption || ""}</p>`,

    quote: (p) => `<div class="pad mid qt">${ORN}<blockquote>${p.text}</blockquote><p class="hand sign">${p.author || ""}</p></div>`,

    loves: (p) => `<div class="pad"><h2>${p.title}</h2><ul class="loves">${p.items.map((t) =>
      `<li><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M10 2l2.1 5.2 5.6.4-4.3 3.6 1.4 5.4-4.8-3-4.8 3 1.4-5.4L2.3 7.6l5.6-.4z"/></svg><span class="hand">${t}</span></li>`).join("")}</ul></div>`,

    letter: (p) => `<div class="pad letter">${p.greeting ? `<p class="hand gr">${p.greeting}</p>` : ""}<div class="lines hand">${p.text}</div>${p.sign ? `<p class="hand sign">${p.sign}</p>` : ""}</div>`,

    duo: (p) => `<div class="pad duo"><h2 class="sm">${p.title}</h2>${p.items.map((it, i) =>
      `<div class="d d${i + 1}"><div class="ph ${i ? "" : "tape"}">${img(it.photo, it.caption, it.pos)}</div><p class="hand cap">${it.caption || ""}</p></div>`).join("")}</div>`,

    final: (p) => `<div class="pad mid fin"><svg class="draw" viewBox="0 0 200 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path pathLength="1" d="M8 26C40 6 64 38 98 20S160 8 192 22"/><path pathLength="1" class="h" d="M100 33c-6-4-9-7-9-10a4.6 4.6 0 0 1 9-1.2A4.6 4.6 0 0 1 109 23c0 3-3 6-9 10z"/></svg>
      <blockquote class="q">${p.text}</blockquote><p class="hand small">${p.small || ""}</p></div>`
  };

  function cover(cfg) {
    const c = cfg.cover, st = (x, y, w, d) => `<svg class="cs" style="left:${x}cqw;top:${y}cqw;width:${w}cqw;animation-delay:${d}s"><use href="#star"/></svg>`;
    return `<div class="page hard cover" data-density="hard"><div class="in"><div class="frame"></div>${st(12, 14, 5, 0)}${st(83, 20, 4, 1.3)}${st(16, 118, 4, .7)}${st(80, 122, 5, 2)}
      <div class="pad mid"><svg class="emb"><use href="#lantern"/></svg><h1>${c.title}</h1><p class="hand sub">${c.subtitle}</p>
      <div class="arch">${img(c.photo, "Capa", c.photoPos)}</div>
      <p class="names">${cfg.couple[0]} &amp; ${cfg.couple[1]}</p></div></div></div>`;
  }

  window.buildAlbum = function (cfg) {
    const html = [cover(cfg)];
    cfg.pages.forEach((p, i) => {
      const tag = cfg.showDemoTags && p.demo ? '<span class="demo hand">texto de exemplo</span>' : "";
      html.push(`<div class="page ${i % 2 === 0 ? "l" : "r"} th-${p.theme || "neutral"} t-${p.type}${p.stickers && p.type === "text" ? " with-stk" : ""}"><div class="in">${deco(p.theme, p.type)}${B[p.type](p)}${stickers(p)}${tag}</div></div>`);
    });
    html.push(`<div class="page hard back" data-density="hard"><div class="in"><div class="frame"></div><div class="pad mid"><p class="hand">${cfg.back.text}</p></div></div></div>`);
    const wrap = document.createElement("div");
    wrap.innerHTML = html.join("");
    return Array.from(wrap.children);
  };
})();
