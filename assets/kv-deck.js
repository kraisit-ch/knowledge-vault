/* =========================================================
   Knowledge Vault — Deck Engine
   - สร้าง top bar / progress / nav / สารบัญสไลด์ / speaker notes / ศัพท์เฉพาะ อัตโนมัติ
   - คีย์ลัด: ← → Space  ·  Home/End  ·  M สารบัญ  ·  N โน้ต  ·  F เต็มจอ  ·  Esc ปิด
   - ลิงก์ตรงไปสไลด์ได้ด้วย #<เลขสไลด์> เช่น react.html#5
   ========================================================= */
(function () {
  const script = document.currentScript;
  const root = new URL("../", script.src).href; // โฟลเดอร์ราก repo (assets/..)
  const body = document.body;
  const deckTitle = body.dataset.title || document.title;
  const mark = body.dataset.mark || "KV";

  const icon = {
    home: '<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    full: '<svg viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>',
    note: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
  };

  // ---------- Chrome ----------
  body.insertAdjacentHTML("afterbegin", `
    <header class="kv-topbar">
      <a class="kv-brand" href="${root}index.html" title="กลับหน้าคลังความรู้">
        <div class="kv-mark">${mark}</div>
        <div class="kv-title">${deckTitle}</div>
      </a>
      <div class="kv-actions">
        <div class="kv-counter" id="kvCounter"></div>
        <a class="kv-icon" href="${root}index.html" title="หน้าแรก" aria-label="หน้าแรก">${icon.home}</a>
        <button class="kv-icon" id="kvMenuBtn" type="button" title="สารบัญสไลด์ (M)" aria-label="สารบัญ">${icon.menu}</button>
        <button class="kv-icon" id="kvFullBtn" type="button" title="เต็มหน้าจอ (F)" aria-label="เต็มหน้าจอ">${icon.full}</button>
      </div>
    </header>
    <div class="kv-progress"><div id="kvBar"></div></div>`);

  body.insertAdjacentHTML("beforeend", `
    <nav class="kv-nav">
      <button class="kv-btn" id="kvPrev" type="button" aria-label="ก่อนหน้า">${icon.prev}<span class="kv-btn-label">ก่อนหน้า</span></button>
      <button class="kv-btn" id="kvNoteBtn" type="button" aria-label="โน้ต">${icon.note}<span class="kv-btn-label">โน้ต</span></button>
      <button class="kv-btn" id="kvNext" type="button" aria-label="ถัดไป"><span class="kv-btn-label">ถัดไป</span>${icon.next}</button>
    </nav>
    <div class="kv-help">← → เปลี่ยนสไลด์ · M สารบัญ · N โน้ต · F เต็มจอ</div>
    <div class="kv-credit">© ${new Date().getFullYear()} MERCENT GROUP Co., Ltd.</div>
    <div class="kv-panel" id="kvMenu"><div class="kv-panel-head">สารบัญ<button class="kv-close" data-close>×</button></div><div class="kv-panel-body" id="kvMenuList"></div></div>
    <div class="kv-panel" id="kvNotes"><div class="kv-panel-head"><span id="kvNotesTitle">โน้ต</span><button class="kv-close" data-close>×</button></div><div class="kv-panel-body" id="kvNotesBody"></div></div>
    <div class="kv-backdrop" id="kvGloss" role="dialog" aria-modal="true">
      <div class="kv-modal"><div class="kv-panel-head"><span id="kvGlossTitle"></span><button class="kv-close" data-close>×</button></div><div class="kv-panel-body" id="kvGlossBody"></div></div>
    </div>`);

  const $ = (id) => document.getElementById(id);
  const slides = [...document.querySelectorAll(".slide")];
  const menu = $("kvMenu"), notes = $("kvNotes"), gloss = $("kvGloss");
  let current = 0;

  $("kvMenuList").innerHTML = slides.map((s, i) =>
    `<button class="kv-menu-item" data-go="${i}"><span>${i + 1}</span>${s.dataset.title || "สไลด์ " + (i + 1)}</button>`).join("");

  function show(i, fromHash) {
    if (i < 0 || i >= slides.length) return;
    const back = i < current;
    slides[current].classList.remove("active");
    current = i;
    const s = slides[i];
    s.classList.toggle("back", back);
    s.classList.add("active");
    s.scrollTop = 0;
    $("kvCounter").textContent = `${i + 1} / ${slides.length}`;
    $("kvBar").style.width = `${((i + 1) / slides.length) * 100}%`;
    $("kvPrev").disabled = i === 0;
    $("kvNext").disabled = i === slides.length - 1;
    document.querySelectorAll(".kv-menu-item").forEach((b, n) => b.classList.toggle("on", n === i));
    if (!fromHash) history.replaceState(null, "", "#" + (i + 1));
    if (notes.classList.contains("open")) fillNotes();
  }

  function fillNotes() {
    const t = slides[current].querySelector("template.note");
    $("kvNotesTitle").textContent = "โน้ต · " + (slides[current].dataset.title || "");
    $("kvNotesBody").innerHTML = t ? t.innerHTML : '<p class="muted">ไม่มีโน้ตสำหรับสไลด์นี้</p>';
  }
  const toggle = (el, fn) => { const open = !el.classList.contains("open"); closeAll(); if (open) { fn && fn(); el.classList.add("open"); } };
  const closeAll = () => [menu, notes, gloss].forEach((e) => e.classList.remove("open"));
  const anyOpen = () => [menu, notes, gloss].some((e) => e.classList.contains("open"));

  // ---------- Glossary ----------
  const G = window.KV_GLOSSARY || {};
  document.querySelectorAll(".term").forEach((b) => {
    if (!b.textContent.trim()) b.textContent = "?";
    b.type = "button";
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      const g = G[b.dataset.term];
      if (!g) return;
      $("kvGlossTitle").textContent = g.title;
      $("kvGlossBody").innerHTML = `<p>${g.body}</p>${g.example ? `<div class="kv-example"><strong>ตัวอย่างง่าย ๆ:</strong> ${g.example}</div>` : ""}`;
      closeAll();
      gloss.classList.add("open");
    });
  });

  // ---------- Code highlight + copy ----------
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const KW = "abstract|as|async|await|break|case|catch|class|const|default|else|enum|export|extends|false|finally|for|foreach|from|function|if|implements|import|in|interface|internal|let|namespace|new|null|of|override|partial|private|protected|public|readonly|record|required|return|sealed|static|switch|this|throw|true|try|type|typeof|undefined|using|var|virtual|void|while|yield";
  const re = new RegExp(`(\\/\\/.*$|\\/\\*[\\s\\S]*?\\*\\/|#.*$)|("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\\\n])*'|\`(?:\\\\.|[^\`\\\\])*\`)|\\b(${KW})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`, "gm");
  document.querySelectorAll("pre.code").forEach((pre) => {
    const src = pre.textContent.replace(/^\n/, "");
    if (pre.dataset.lang !== "text") {
      let out = "", last = 0, m;
      re.lastIndex = 0;
      while ((m = re.exec(src))) {
        // '#' เป็นคอมเมนต์เฉพาะ bash/yaml
        if (m[1] && m[1][0] === "#" && !/^(bash|sh|yaml|yml|env)$/.test(pre.dataset.lang || "")) continue;
        out += esc(src.slice(last, m.index));
        const cls = m[1] ? "c" : m[2] ? "s" : m[3] ? "k" : "n";
        out += `<span class="${cls}">${esc(m[0])}</span>`;
        last = m.index + m[0].length;
      }
      pre.innerHTML = out + esc(src.slice(last));
    }
    const btn = document.createElement("button");
    btn.className = "copy-btn"; btn.type = "button"; btn.textContent = "Copy";
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(src); btn.textContent = "Copied ✓"; }
      catch { btn.textContent = "Copy failed"; }
      setTimeout(() => (btn.textContent = "Copy"), 1400);
    });
    pre.appendChild(btn);
  });

  // ---------- Events ----------
  $("kvPrev").onclick = () => show(current - 1);
  $("kvNext").onclick = () => show(current + 1);
  $("kvMenuBtn").onclick = () => toggle(menu);
  $("kvNoteBtn").onclick = () => toggle(notes, fillNotes);
  $("kvMenuList").onclick = (e) => { const b = e.target.closest("[data-go]"); if (b) { show(+b.dataset.go); closeAll(); } };
  document.querySelectorAll("[data-close]").forEach((b) => (b.onclick = closeAll));
  gloss.onclick = (e) => { if (e.target === gloss) closeAll(); };
  $("kvFullBtn").onclick = toggleFull;
  function toggleFull() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea")) return;
    if (e.key === "Escape") return closeAll();
    if (gloss.classList.contains("open")) return;
    const k = e.key.toLowerCase();
    if (["arrowright", "pagedown", " "].includes(k)) { e.preventDefault(); show(current + 1); }
    else if (["arrowleft", "pageup"].includes(k)) { e.preventDefault(); show(current - 1); }
    else if (k === "home") show(0);
    else if (k === "end") show(slides.length - 1);
    else if (k === "m") toggle(menu);
    else if (k === "n") toggle(notes, fillNotes);
    else if (k === "f") toggleFull();
  });

  let sx = 0, sy = 0, skip = false;
  document.addEventListener("touchstart", (e) => {
    skip = Boolean(e.target.closest("button, a, pre, .table-wrap, .kv-panel, .kv-modal")) || anyOpen();
    sx = e.changedTouches[0].clientX; sy = e.changedTouches[0].clientY;
  }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (skip) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener("hashchange", () => { const n = parseInt(location.hash.slice(1), 10); if (n) show(n - 1, true); });
  const start = parseInt(location.hash.slice(1), 10);
  slides.forEach((s) => s.classList.remove("active"));
  slides[0].classList.add("active");
  show(start > 0 && start <= slides.length ? start - 1 : 0, true);
})();
