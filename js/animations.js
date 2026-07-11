/* Scroll-reveal, animated counters, testimonial slider, cursor glow, typing effect */
(function () {
  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll("[data-aos]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-aos-delay") || 0;
          setTimeout(() => entry.target.classList.add("aos-visible"), Number(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll(".stat-number[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-count"));
        const duration = 1600;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---- Testimonial slider ---- */
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  if (track && dotsWrap) {
    const slides = Array.from(track.querySelectorAll(".testimonial"));
    let active = 0;
    let timer;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Depoimento ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(i) {
      slides[active].classList.remove("active");
      dots[active].classList.remove("active");
      active = i;
      slides[active].classList.add("active");
      dots[active].classList.add("active");
      restart();
    }

    function next() {
      goTo((active + 1) % slides.length);
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 6000);
    }
    restart();
  }

  /* ---- Cursor glow (desktop only) ---- */
  const glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    window.addEventListener("mousemove", (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  /* ---- Hero typing effect ---- */
  const typingEl = document.getElementById("typingText");
  if (typingEl) {
    const phrases = [
      "colheita render mais.",
      "safra fechar no azul.",
      "empresa pagar menos imposto.",
      "campo tomar decisões melhores.",
    ];
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      charIndex = Math.max(0, Math.min(charIndex, current.length));
      typingEl.textContent = current.slice(0, charIndex);

      let delay = deleting ? 40 : 65;

      if (!deleting && charIndex >= current.length) {
        delay = 2200;
        deleting = true;
      } else if (deleting && charIndex <= 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }
      setTimeout(typeLoop, delay);
    }
    setTimeout(typeLoop, 2200);
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
