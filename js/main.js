/* ============================================================
   Vitrine Olanda — main.js
   Lenis smooth scroll · GSAP reveal in/out · inimioare plutitoare
   Swiper · acordeon · age-gate · formular "Vreau să vin"
   ============================================================ */
(function () {
  "use strict";

  /* ---- CONFIG — CHANGE-ME: înlocuiește cu datele reale ale clubului ---- */
  var CONFIG = {
    whatsapp: "31XXXXXXXXX",            // ex: "31612345678" (fără +, fără spații)
    email: "jobs@exemplu.nl",           // CHANGE-ME: emailul real de aplicare
    clubCity: "Olanda"
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = hasGSAP && typeof window.ScrollTrigger !== "undefined";
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---------------- AGE GATE ---------------- */
  var gate = document.getElementById("ageGate");
  if (gate) {
    var yes = document.getElementById("gateYes");
    var no = document.getElementById("gateNo");
    if (yes) yes.addEventListener("click", function () {
      try { localStorage.setItem("mc_age_ok", "1"); } catch (e) {}
      gate.classList.add("gate-out");
      setTimeout(function () { gate.remove(); heroIntro(); }, 620);
    });
    if (no) no.addEventListener("click", function () {
      try { localStorage.removeItem("mc_age_ok"); } catch (e) {}
    });
  }

  /* ---------------- LENIS SMOOTH SCROLL ---------------- */
  var lenis = null;
  if (typeof window.Lenis !== "undefined" && !reduceMotion) {
    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    if (hasGSAP) {
      lenis.on("scroll", function () { if (hasST) ScrollTrigger.update(); });
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
  }

  function scrollToTarget(sel) {
    var el = document.querySelector(sel);
    if (!el) return;
    var nav = document.getElementById("navbar");
    var offset = nav ? -(nav.offsetHeight + 12) : -20;
    if (lenis) lenis.scrollTo(el, { offset: offset, duration: 1.2 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset + offset, behavior: "smooth" });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      scrollToTarget(href);
      closeMobileMenu();
    }
  });

  /* ---------------- NAVBAR ---------------- */
  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function onScrollNav() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  function closeMobileMenu() {
    if (!mobileMenu || mobileMenu.classList.contains("hidden")) return;
    mobileMenu.classList.add("hidden");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var hidden = mobileMenu.classList.toggle("hidden");
      navToggle.setAttribute("aria-expanded", String(!hidden));
    });
  }

  /* secțiune activă în navbar */
  if (hasST) {
    ["acasa", "despre", "pozitii", "galerie", "cerinte", "legal", "faq", "aplica"].forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec, start: "top 45%", end: "bottom 45%",
        onToggle: function (self) {
          if (!self.isActive) return;
          document.querySelectorAll(".nav-link").forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + id);
          });
        }
      });
    });
  }

  /* ---------------- REVEAL IN/OUT (GSAP) ---------------- */
  var REVEALS = {
    up:    { from: { y: 60, opacity: 0 } },
    down:  { from: { y: -60, opacity: 0 } },
    left:  { from: { x: -80, opacity: 0 } },
    right: { from: { x: 80, opacity: 0 } },
    zoom:  { from: { scale: 0.82, opacity: 0 } },
    flip:  { from: { rotationX: -35, y: 40, opacity: 0, transformOrigin: "50% 100%" } }
  };

  function initReveals() {
    if (!hasST) return;
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      var kind = REVEALS[el.dataset.reveal] ? el.dataset.reveal : "up";
      var delay = parseFloat(el.dataset.delay || "0");
      var dur = parseFloat(el.dataset.duration || "0.9");
      gsap.set(el, Object.assign({}, REVEALS[kind].from, { willChange: "transform, opacity" }));
      gsap.to(el, {
        x: 0, y: 0, scale: 1, opacity: 1, rotationX: 0, delay: delay, duration: dur,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" }
      });
    });

    /* parallax ușor pe decor */
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      var speed = parseFloat(el.dataset.parallax || "0.2");
      gsap.to(el, {
        yPercent: speed * 100, ease: "none",
        scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: 1 }
      });
    });
  }

  /* ---------------- HERO INTRO ---------------- */
  function heroIntro() {
    if (!hasGSAP) return;
    var items = document.querySelectorAll("[data-hero]");
    if (!items.length) return;
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    items.forEach(function (el) {
      var d = parseFloat(el.dataset.hero || "0");
      tl.fromTo(el,
        { y: 46, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9 }, d);
    });
  }

  /* ---------------- INIMIOARE PLUTITOARE (canvas) ---------------- */
  function initHearts() {
    var canvas = document.getElementById("heartsCanvas");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    var hearts = [];
    var COLORS = ["#FF7AC8", "#FF4FA3", "#E11D78", "#FFB1D9", "#FFD86B"];

    function resize() {
      var r = canvas.parentElement.getBoundingClientRect();
      canvas.width = r.width; canvas.height = r.height;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawn() {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        s: 6 + Math.random() * 12,
        v: 0.4 + Math.random() * 0.9,
        drift: (Math.random() - 0.5) * 0.6,
        rot: (Math.random() - 0.5) * 0.6,
        vr: (Math.random() - 0.5) * 0.01,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        a: 0.25 + Math.random() * 0.4
      });
      if (hearts.length > 46) hearts.shift();
    }

    function drawHeart(h) {
      ctx.save();
      ctx.translate(h.x, h.y); ctx.rotate(h.rot); ctx.scale(h.s / 16, h.s / 16);
      ctx.globalAlpha = h.a;
      ctx.fillStyle = h.c;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(-9, -3, -6, -11, 0, -6);
      ctx.bezierCurveTo(6, -11, 9, -3, 0, 5);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }

    var last = 0;
    function frame(t) {
      if (t - last > 480) { spawn(); last = t; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = hearts.length - 1; i >= 0; i--) {
        var h = hearts[i];
        h.y -= h.v; h.x += Math.sin(t / 900 + i) * h.drift; h.rot += h.vr;
        if (h.y < -30) { hearts.splice(i, 1); continue; }
        drawHeart(h);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- SWIPER (galerie) ---------------- */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;
    document.querySelectorAll(".gallery-swiper").forEach(function (node) {
      new Swiper(node, {
        slidesPerView: 1.15, spaceBetween: 18, grabCursor: true, loop: true,
        speed: 750,
        autoplay: { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: node.querySelector(".swiper-pagination"), clickable: true },
        navigation: {
          nextEl: node.parentElement.querySelector(".swiper-button-next"),
          prevEl: node.parentElement.querySelector(".swiper-button-prev")
        },
        breakpoints: {
          640: { slidesPerView: 2.1, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 26 }
        }
      });
    });
  }

  /* ---------------- ACORDEON ---------------- */
  document.querySelectorAll("[data-acc-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc-item");
      var group = item.parentElement;
      var wasOpen = item.classList.contains("open");
      group.querySelectorAll(".acc-item").forEach(function (i) { i.classList.remove("open"); });
      if (!wasOpen) item.classList.add("open");
    });
  });

  /* ---------------- INIMIOARE LA CLICK PE CTA ---------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".btn-primary");
    if (!btn) return;
    for (var i = 0; i < 6; i++) {
      var h = document.createElement("span");
      h.className = "mc-heart-pop";
      h.textContent = "♥";
      h.style.left = (e.clientX + (Math.random() - 0.5) * 46) + "px";
      h.style.top = (e.clientY + (Math.random() - 0.5) * 20) + "px";
      h.style.setProperty("--dx", ((Math.random() - 0.5) * 90) + "px");
      h.style.animationDelay = (i * 0.06) + "s";
      h.style.fontSize = (10 + Math.random() * 12) + "px";
      document.body.appendChild(h);
      setTimeout(function (node) { return function () { node.remove(); }; }(h), 1300);
    }
  });

  /* ---------------- FORMULAR "VREAU SĂ VIN" ---------------- */
  var form = document.getElementById("applyForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var get = function (id) { var n = form.querySelector("#" + id); return n ? n.value.trim() : ""; };
      var nume = get("fNume"), varsta = get("fVarsta"), oras = get("fOras"),
          poz = get("fPozitie"), mesaj = get("fMesaj"), contact = get("fContact");
      var ok18 = form.querySelector("#f18");
      if (!ok18 || !ok18.checked) {
        toast("Te rugăm să confirmi că ai 18 ani împliniți. ♥");
        return;
      }
      if (!nume || !contact) { toast("Completează numele și datele de contact. ♥"); return; }

      var lines = [
        "Salut! Vreau să aplic pentru un rol în vitrinele din Olanda ♥",
        "Nume: " + nume,
        "Vârstă: " + varsta,
        "Oraș: " + oras,
        "Poziție dorită: " + poz,
        "Contact: " + contact
      ];
      if (mesaj) lines.push("Mesaj: " + mesaj);
      var text = encodeURIComponent(lines.join("\n"));

      if (CONFIG.whatsapp && CONFIG.whatsapp.indexOf("X") === -1) {
        window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + text, "_blank", "noopener");
      } else {
        window.location.href = "mailto:" + CONFIG.email +
          "?subject=" + encodeURIComponent("Aplicare: " + nume) + "&body=" + text;
      }
      toast("Aplicația ta a fost pregătită! Te contactăm în cel mai scurt timp. ♥");
      form.reset();
    });
  }

  /* ---------------- TOAST ---------------- */
  function toast(msg) {
    var t = document.getElementById("mcToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "mcToast";
      t.className = "bg-plum text-white text-sm font-medium px-6 py-3.5 rounded-full shadow-glow border border-candy-600/40";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove("show"); }, 4200);
  }

  /* ---------------- INIT ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initReveals();
    initHearts();
    initSwiper();
    /* dacă gate-ul nu există (confirmat anterior), rulăm intro-ul imediat */
    if (!document.getElementById("ageGate")) heroIntro();
  });
})();
