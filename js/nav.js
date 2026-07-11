/* Header behaviour: scroll fade in/out, progress bar, active link, mobile menu */
(function () {
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("main section[id]");

  let lastScroll = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = docHeight > 0 ? `${(y / docHeight) * 100}%` : "0%";

    header.classList.toggle("scrolled", y > 40);

    // Fade the nav out on scroll-down, back in on scroll-up
    if (y > lastScroll && y > headerHideThreshold()) {
      header.classList.add("hide-nav");
    } else {
      header.classList.remove("hide-nav");
    }
    lastScroll = y;

    if (backToTop) backToTop.style.opacity = y > 500 ? "1" : "0";

    let current = sections[0] ? sections[0].id : "";
    sections.forEach((sec) => {
      if (y >= sec.offsetTop - 140) current = sec.id;
    });
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });

    ticking = false;
  }

  function headerHideThreshold() {
    return header.offsetHeight + 40;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
  onScroll();

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    links.forEach((link) =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      })
    );
  }

  if (backToTop) {
    backToTop.style.transition = "opacity .3s ease";
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
})();
