/* Theme (light/dark) toggle — initial theme is set inline in <head> to avoid flash */
(function () {
  const root = document.documentElement;
  const storageKey = "katispera-theme";

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(storageKey, next);
    });
  });
})();
