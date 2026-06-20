/* ============================================================
   MANDINE — contact page quick message
   ============================================================ */
(function () {
  const WHATSAPP_NUMBER = "919889147162";

  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("msgForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("msgName").value.trim();
      const phone = document.getElementById("msgPhone").value.trim();
      const message = document.getElementById("msgBody").value.trim();
      if (!name || !phone || !message) {
        showToast("Fill in your name, phone and message");
        return;
      }
      const text = encodeURIComponent(
        `New enquiry from the MANDINE website\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
      form.reset();
    });
  });
})();
