/* ============================================================
   MANDINE — menu page rendering
   ============================================================ */
(function () {
  function spiceIcons(level) {
    let html = '<span class="spice" aria-label="' + level + ' of 3 spice level">';
    for (let i = 1; i <= 3; i++) {
      html += `<svg viewBox="0 0 24 24" class="${i <= level ? "on" : "off"}"><path d="M12 2c1 3-2 4-2 7a2 2 0 1 0 4 0c0-1-1-2-1-3 2 1 4 4 4 7a5 5 0 1 1-10 0c0-5 4-7 5-11z"/></svg>`;
    }
    return html + "</span>";
  }

  function priceBlock(item) {
    if (item.sizes) {
      return `
        <select class="size-select" data-id="${item.id}">
          ${item.sizes.map((s, idx) => `<option value="${idx}">${s.label} — ₹${s.price}</option>`).join("")}
        </select>`;
    }
    return `<span class="ticket-price">₹${item.price}</span>`;
  }

  function cardHTML(item) {
    return `
      <article class="ticket reveal" data-category="${item.category}">
        <div class="ticket-row">
          <div>
            <h3 class="ticket-name">${item.name}</h3>
          </div>
        </div>
        <p class="ticket-desc">${item.desc}</p>
        <div class="ticket-meta">
          <span class="veg-dot ${item.veg ? "" : "nonveg"}" title="${item.veg ? "Vegetarian" : "Non-vegetarian"}"></span>
          ${spiceIcons(item.spice)}
        </div>
        <hr class="ticket-divider">
        <div class="ticket-foot">
          ${priceBlock(item)}
          <button class="add-btn" data-id="${item.id}" aria-label="Add ${item.name} to order">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </article>`;
  }

  function render(filter) {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;
    const list = filter === "all" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === filter);
    grid.innerHTML = list.map(cardHTML).join("");
    grid.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    bindAddButtons();
  }

  function bindAddButtons() {
    document.querySelectorAll(".add-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const item = MENU_ITEMS.find((i) => i.id === id);
        if (!item) return;
        if (item.sizes) {
          const select = document.querySelector(`.size-select[data-id="${id}"]`);
          const size = item.sizes[select.value];
          window.MandineCart.addItem({ id: item.id, name: item.name, size: size.label, price: size.price });
        } else {
          window.MandineCart.addItem({ id: item.id, name: item.name, price: item.price });
        }
      });
    });
  }

  function initFilters() {
    const wrap = document.getElementById("filterBar");
    if (!wrap) return;
    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      wrap.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      render(btn.dataset.filter);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFilters();
    render("all");
  });
})();
