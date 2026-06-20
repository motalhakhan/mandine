/* ============================================================
   MANDINE — cart
   Persists in localStorage so it survives page navigation.
   Exposes window.MandineCart with addItem() used by menu.js
   ============================================================ */
(function () {
  const STORAGE_KEY = "mandine_cart_v1";
  const DETAILS_KEY = "mandine_customer_v1";
  const WHATSAPP_NUMBER = "919889147162"; // restaurant order line

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
  function loadDetails() {
    try {
      const raw = localStorage.getItem(DETAILS_KEY);
      return raw ? JSON.parse(raw) : { name: "", phone: "", address: "", notes: "" };
    } catch (e) {
      return { name: "", phone: "", address: "", notes: "" };
    }
  }
  function saveDetails(d) {
    localStorage.setItem(DETAILS_KEY, JSON.stringify(d));
  }

  let items = load();
  let customer = loadDetails();

  function lineKey(id, size) {
    return size ? `${id}__${size}` : id;
  }

  function addItem({ id, name, size, price }) {
    const key = lineKey(id, size);
    const existing = items.find((i) => i.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ key, id, name, size: size || null, price, qty: 1 });
    }
    save(items);
    render();
    bumpCartIcon();
    showToast(`Added ${name}${size ? " (" + size + ")" : ""} to your order`);
  }

  function changeQty(key, delta) {
    const line = items.find((i) => i.key === key);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) items = items.filter((i) => i.key !== key);
    save(items);
    render();
  }

  function removeItem(key) {
    items = items.filter((i) => i.key !== key);
    save(items);
    render();
  }

  function total() {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function count() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  /* ---------------- DOM ---------------- */

  function injectMarkup() {
    const root = document.getElementById("cart-root");
    if (!root) return;
    root.innerHTML = `
      <div class="cart-overlay" id="cartOverlay"></div>
      <aside class="cart-drawer" id="cartDrawer" aria-label="Your order">
        <div class="cart-head">
          <div>
            <span class="tag">No. ${String(Date.now()).slice(-4)}</span>
            <h3>Your Order</h3>
          </div>
          <button class="cart-close" id="cartClose" aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
        <div class="cart-body" id="cartBody"></div>
        <div class="cart-foot" id="cartFoot"></div>
      </aside>
    `;
  }

  function emptyState() {
    return `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h2l2.4 12.4A2 2 0 0 0 9.36 17H19a2 2 0 0 0 1.96-1.6L22 9H6"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>
        <p>No orders fired yet.</p>
        <a href="menu.html">Browse the menu →</a>
      </div>`;
  }

  function render() {
    const badgeEls = document.querySelectorAll(".cart-badge");
    const c = count();
    badgeEls.forEach((b) => {
      b.textContent = c;
      b.hidden = c === 0;
    });

    const body = document.getElementById("cartBody");
    const foot = document.getElementById("cartFoot");
    if (!body || !foot) return;

    if (items.length === 0) {
      body.innerHTML = emptyState();
      foot.innerHTML = "";
      return;
    }

    body.innerHTML =
      items
        .map(
          (i) => `
      <div class="cart-item" data-key="${i.key}">
        <div class="cart-item-info">
          <div class="cart-item-name">${i.name}</div>
          ${i.size ? `<div class="cart-item-size">${i.size}</div>` : ""}
          <div class="cart-item-row">
            <div class="qty">
              <button class="qty-minus" aria-label="Decrease quantity">−</button>
              <span>${i.qty}</span>
              <button class="qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-price">₹${i.price * i.qty}</div>
          </div>
          <button class="cart-item-remove">Remove</button>
        </div>
      </div>`
        )
        .join("") +
      `
      <div class="cart-form">
        <div class="field-label">Delivery details</div>
        <input type="text" id="custName" placeholder="Your name" value="${escapeAttr(customer.name)}">
        <input type="tel" id="custPhone" placeholder="Phone number" value="${escapeAttr(customer.phone)}">
        <textarea id="custAddress" placeholder="Delivery address / locality">${customer.address || ""}</textarea>
        <textarea id="custNotes" placeholder="Notes for the kitchen (optional)">${customer.notes || ""}</textarea>
      </div>`;

    foot.innerHTML = `
      <div class="cart-total-row">
        <span class="label">Total</span>
        <span class="amount">₹${total()}</span>
      </div>
      <button class="btn btn-wa btn-block" id="sendOrderBtn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.2L2 22l4.9-1.3c1.5.8 3.2 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.1c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3C3.8 14.6 3.3 13 3.3 12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7-3.9 8.7-8.7 8.7z"/></svg>
        Send order on WhatsApp
      </button>
      <p class="cart-note">Opens WhatsApp with your full order. Confirm there to lock it in.</p>
    `;

    document.getElementById("sendOrderBtn").addEventListener("click", sendOrder);
  }

  function escapeAttr(s) {
    return (s || "").replace(/"/g, "&quot;");
  }

  function bumpCartIcon() {
    document.querySelectorAll(".cart-btn").forEach((btn) => {
      btn.classList.remove("bump");
      // restart animation
      void btn.offsetWidth;
      btn.classList.add("bump");
    });
  }

  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function buildMessage() {
    const lines = [];
    lines.push("🔥 New order — MANDINE");
    lines.push("");
    items.forEach((i) => {
      lines.push(`${i.qty}x ${i.name}${i.size ? " (" + i.size + ")" : ""} — ₹${i.price * i.qty}`);
    });
    lines.push("");
    lines.push(`Total: ₹${total()}`);
    lines.push("");
    lines.push(`Name: ${customer.name || "-"}`);
    lines.push(`Phone: ${customer.phone || "-"}`);
    lines.push(`Address: ${customer.address || "-"}`);
    if (customer.notes) lines.push(`Notes: ${customer.notes}`);
    lines.push("");
    lines.push("— sent from the MANDINE website");
    return lines.join("\n");
  }

  function sendOrder() {
    customer.name = document.getElementById("custName").value.trim();
    customer.phone = document.getElementById("custPhone").value.trim();
    customer.address = document.getElementById("custAddress").value.trim();
    customer.notes = document.getElementById("custNotes").value.trim();

    if (!customer.name || !customer.phone || !customer.address) {
      showToast("Add your name, phone and address first");
      return;
    }
    saveDetails(customer);

    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  function openCart() {
    document.getElementById("cartOverlay").classList.add("is-open");
    document.getElementById("cartDrawer").classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    document.getElementById("cartOverlay").classList.remove("is-open");
    document.getElementById("cartDrawer").classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function bindEvents() {
    document.querySelectorAll(".cart-btn").forEach((btn) => btn.addEventListener("click", openCart));
    document.getElementById("cartClose").addEventListener("click", closeCart);
    document.getElementById("cartOverlay").addEventListener("click", closeCart);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeCart();
    });

    document.getElementById("cartBody").addEventListener("click", (e) => {
      const itemEl = e.target.closest(".cart-item");
      if (!itemEl) return;
      const key = itemEl.dataset.key;
      if (e.target.classList.contains("qty-plus")) changeQty(key, 1);
      if (e.target.classList.contains("qty-minus")) changeQty(key, -1);
      if (e.target.classList.contains("cart-item-remove")) removeItem(key);
    });
  }

  function init() {
    injectMarkup();
    bindEvents();
    render();
  }

  document.addEventListener("DOMContentLoaded", init);

  window.MandineCart = { addItem };
})();
