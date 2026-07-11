/* Newsletter + contact form: client-side validation and simulated submission.
   No backend is wired up — swap the submitForm() body for a real API/Formspree call. */
(function () {
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setError(wrap, hasError) {
    if (!wrap) return;
    wrap.classList.toggle("error", hasError);
  }

  function simulateSubmit(button) {
    return new Promise((resolve) => {
      const label = button.querySelector(".btn-text");
      const original = label ? label.textContent : button.textContent;
      button.disabled = true;
      if (label) label.textContent = "Enviando...";
      setTimeout(() => {
        button.disabled = false;
        if (label) label.textContent = original;
        resolve();
      }, 900);
    });
  }

  /* ---- Newsletter form ---- */
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    const emailInput = document.getElementById("newsletterEmail");
    const msg = document.getElementById("newsletterMsg");
    const wrap = emailInput.closest(".input-wrap");

    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const valid = isValidEmail(emailInput.value.trim());
      setError(wrap, !valid);
      if (!valid) {
        msg.textContent = "Informe um e-mail válido.";
        msg.className = "form-msg error";
        return;
      }
      await simulateSubmit(newsletterForm.querySelector("button"));
      msg.textContent = "Inscrição confirmada! Fique de olho no seu e-mail. ✓";
      msg.className = "form-msg success";
      newsletterForm.reset();
    });
  }

  /* ---- Contact form ---- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const msg = document.getElementById("contactMsg");
    const name = document.getElementById("cName");
    const email = document.getElementById("cEmail");
    const subject = document.getElementById("cSubject");
    const message = document.getElementById("cMessage");

    subject.addEventListener("change", () => {
      subject.classList.toggle("has-value", subject.value !== "");
    });

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let valid = true;

      [
        [name, name.value.trim().length > 1],
        [email, isValidEmail(email.value.trim())],
        [message, message.value.trim().length > 4],
      ].forEach(([field, ok]) => {
        setError(field.closest(".input-wrap"), !ok);
        if (!ok) valid = false;
      });

      if (!subject.value) valid = false;

      if (!valid) {
        msg.textContent = "Confira os campos destacados antes de enviar.";
        msg.className = "form-msg error";
        return;
      }

      await simulateSubmit(contactForm.querySelector("button[type=submit]"));
      msg.textContent = "Mensagem enviada! Retorno em até 1 dia útil. ✓";
      msg.className = "form-msg success";
      contactForm.reset();
      subject.classList.remove("has-value");
    });
  }
})();
