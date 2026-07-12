(() => {
  const waitlistPageLoadTime = Date.now();

  document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const header = button.closest(".site-header");
      const open = header.getAttribute("data-menu-open") === "true";
      header.setAttribute("data-menu-open", open ? "false" : "true");
      button.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".site-header[data-menu-open='true']").forEach((header) => {
      if (!header.contains(event.target)) {
        header.setAttribute("data-menu-open", "false");
        const toggle = header.querySelector("[data-nav-toggle]");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.querySelectorAll('form[action*="waitlister.me"]').forEach((form) => {
    form.addEventListener("submit", (event) => {
      const honeypot = form.querySelector('input[name="website"]');
      const submittedTooFast = Date.now() - waitlistPageLoadTime < 3000;

      if ((honeypot && honeypot.value.trim() !== "") || submittedTooFast) {
        event.preventDefault();
        window.location.href = "https://fareping.app/?waitlist=success";
      }
    });
  });
})();
