const WHATSAPP = "5571991746677";

/* Meta Pixel: descomente depois de colar o pixel no <head>.
function trackContact() {
  // if (window.fbq) fbq("track", "Contact");
}
function trackLead(dados) {
  // if (window.fbq) fbq("track", "Lead", { value: dados.economiaMes, currency: "BRL", content_category: dados.tipo });
}
*/
function trackContact() {}
function trackLead() {}

document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const brl = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ---------- Links de WhatsApp ---------- */
document.querySelectorAll("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
  a.addEventListener("click", () => trackContact());
});

/* ---------- Ano automático ---------- */
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---------- Vídeo do hero: fonte certa por tela ---------- */
(() => {
  const video = document.querySelector(".hero__video");
  if (!video) return;
  const mobile = window.matchMedia("(max-width: 699px)");
  const pick = () => {
    const src = mobile.matches ? "assets/video/hero-mobile.mp4" : "assets/video/hero.mp4";
    video.poster = mobile.matches ? video.dataset.posterMobile : video.dataset.poster;
    if (!video.currentSrc.endsWith(src)) {
      video.src = src;
      video.load();
    }
    if (reduceMotion) video.pause();
    else video.play().catch(() => {});
  };
  pick();
  mobile.addEventListener("change", pick);
  if (reduceMotion) video.removeAttribute("autoplay");
})();

/* ---------- Topo: vidro ao rolar, menu do celular, link ativo ---------- */
(() => {
  const bar = document.querySelector(".topbar");
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".menu-btn");
  const hero = document.querySelector(".hero");
  const wa = document.querySelector(".wa-float");

  let heroH = hero.offsetHeight;
  window.addEventListener("resize", () => (heroH = hero.offsetHeight));
  const onScroll = () => {
    const y = window.scrollY;
    bar.classList.toggle("is-scrolled", y > 40);
    wa.classList.toggle("is-on", y > heroH * 0.85);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const close = () => {
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Abrir menu");
  };
  btn.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !bar.contains(e.target)) close();
  });

  const links = [...nav.querySelectorAll("a")];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  links.forEach((l) => {
    const s = document.querySelector(l.getAttribute("href"));
    if (s) io.observe(s);
  });
})();

/* ---------- Entradas ao rolar (com escalonamento) ---------- */
(() => {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const groups = new Map();
  items.forEach((el) => {
    const parent = el.parentElement;
    const i = groups.get(parent) || 0;
    el.style.setProperty("--d", `${Math.min(i, 6) * 80}ms`);
    groups.set(parent, i + 1);
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- Linha do tempo que se desenha ao rolar ---------- */
(() => {
  const tl = document.querySelector("[data-timeline]");
  if (!tl) return;
  const line = tl.querySelector(".timeline__line span");
  const steps = [...tl.querySelectorAll(".step")];
  if (reduceMotion) {
    steps.forEach((s) => s.classList.add("is-lit"));
    line.style.setProperty("--prog", 1);
    return;
  }
  let ticking = false;
  let max = 0;
  const update = () => {
    ticking = false;
    const r = tl.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.max(max, Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.9))));
    max = p;
    line.style.setProperty("--prog", p.toFixed(3));
    steps.forEach((s, i) => s.classList.toggle("is-lit", p >= i / steps.length + 0.02));
  };
  update();
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", update);
})();

/* ---------- Simulador ---------- */
(() => {
  const form = document.getElementById("sim-form");
  if (!form) return;
  const range = form.querySelector("#conta");
  const billOut = form.querySelector("[data-bill]");
  const counters = {
    month: document.querySelectorAll('[data-count="month"]'),
    year: document.querySelectorAll('[data-count="year"]'),
    total: document.querySelectorAll('[data-count="total"]'),
  };
  const chart = document.querySelector(".mini-chart");
  const ECONOMIA = 0.95; // até 95% da conta
  const ANOS = 25;
  const state = { month: 0, year: 0, total: 0 };
  let raf = null;

  const calc = (conta) => {
    const month = Math.round(conta * ECONOMIA);
    return { month, year: month * 12, total: month * 12 * ANOS };
  };

  const paint = (vals) => {
    Object.keys(counters).forEach((k) => counters[k].forEach((el) => (el.textContent = brl.format(Math.round(vals[k])))));
  };

  const animateTo = (target) => {
    cancelAnimationFrame(raf);
    if (reduceMotion) {
      Object.assign(state, target);
      paint(state);
      return;
    }
    const from = { ...state };
    const t0 = performance.now();
    const dur = 600;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - t, 4);
      Object.keys(target).forEach((k) => (state[k] = from[k] + (target[k] - from[k]) * e));
      paint(state);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };

  const update = () => {
    const conta = Number(range.value);
    const pct = ((conta - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--p", `${pct}%`);
    billOut.textContent = brl.format(conta);
    range.setAttribute("aria-valuetext", `R$ ${brl.format(conta)} por mês`);
    if (chart) chart.style.setProperty("--k", (0.7 + 0.3 * (conta / Number(range.max))).toFixed(3));
    animateTo(calc(conta));
  };
  range.addEventListener("input", update);

  // começa a contar quando o simulador aparece na tela
  const start = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      update();
      start.disconnect();
    }
  }, { threshold: 0.2 });
  start.observe(form);

  const origem = () => {
    const q = new URLSearchParams(location.search);
    const src = q.get("utm_source");
    const camp = q.get("utm_campaign");
    return [src, camp].filter(Boolean).join(" / ");
  };

  const fieldOk = (input) => {
    const ok = input.value.trim().length > 1;
    input.setAttribute("aria-invalid", String(!ok));
    document.getElementById(`${input.id}-err`).hidden = ok;
    return ok;
  };
  ["nome", "bairro"].forEach((id) => {
    const el = form.querySelector(`#${id}`);
    el.addEventListener("input", () => el.getAttribute("aria-invalid") === "true" && fieldOk(el));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.querySelector("#nome");
    const bairro = form.querySelector("#bairro");
    const okNome = fieldOk(nome);
    const okBairro = fieldOk(bairro);
    if (!okNome || !okBairro) {
      (okNome ? bairro : nome).focus();
      return;
    }
    const data = new FormData(form);
    const conta = Number(range.value);
    const { month } = calc(conta);
    const linhas = [
      "Olá! Vim pelo site da SegEnergy Salvador.",
      `Nome: ${nome.value.trim()} | Bairro: ${bairro.value.trim()}`,
      `Imóvel: ${data.get("tipo")}`,
      `Conta de luz: R$ ${brl.format(conta)}/mês`,
      `Economia estimada: R$ ${brl.format(month)}/mês`,
      `Pagamento: ${data.get("pagamento")} | Prazo: ${data.get("prazo")}`,
    ];
    const o = origem();
    if (o) linhas.push(`Origem: ${o}`);
    trackLead({ economiaMes: month, tipo: data.get("tipo") });
    window.open(waLink(linhas.join("\n")), "_blank", "noopener");
  });
})();

/* ---------- Carrossel de avaliações (celular): pontos ---------- */
(() => {
  const track = document.querySelector(".reviews__track");
  const dots = document.querySelector(".dots");
  if (!track || !dots) return;
  const cards = [...track.children];
  cards.forEach(() => dots.appendChild(document.createElement("span")));
  const marks = [...dots.children];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const i = cards.indexOf(en.target);
          marks.forEach((m, j) => m.classList.toggle("is-on", j === i));
        }
      });
    },
    { root: track, threshold: 0.6 }
  );
  cards.forEach((c) => io.observe(c));
})();

/* ---------- Accordion: um aberto por vez ---------- */
document.querySelectorAll(".qa").forEach((d, _, all) => {
  d.addEventListener("toggle", () => {
    if (d.open) all.forEach((o) => o !== d && (o.open = false));
  });
});
