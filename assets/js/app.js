/* ==========================================================================
   Arshia Danesh Ara — site behaviour
   - bilingual FA/EN with RTL support
   - light/dark themes + accent color picker (saved in localStorage)
   - client-side order cart (checkout via email / WhatsApp)
   - product, blog and article rendering
   ========================================================================== */
(function () {
  "use strict";

  const CONTACT = {
    email: "pop13921400@gmail.com",
    phone: "+989999921303",
    phoneDisplay: "+98 999 992 1303",
    whatsapp: "989999921303"
  };

  const ACCENTS = ["indigo", "teal", "rose", "amber", "blue", "violet"];
  const KEY = {
    lang: "arshia.lang",
    theme: "arshia.theme",
    accent: "arshia.accent",
    cart: "arshia.cart"
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const read = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, value); } catch (error) { /* private mode */ }
  };

  const ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 8h13l-1.2 10.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L5.5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.5 8h13l-1.2 10.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L5.5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.2 4h2.6l1.4 3.6-1.9 1.3a11.5 11.5 0 0 0 5.2 5.2l1.3-1.9L18.4 14v2.6a2.4 2.4 0 0 1-2.6 2.4C9.6 18.4 5.6 14.4 5 8.4A2.4 2.4 0 0 1 6.2 4Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.7l4.9-1.3A9.7 9.7 0 1 0 12 2.2Zm0 1.8a7.9 7.9 0 0 1 0 15.8 7.9 7.9 0 0 1-4-1.1l-.4-.2-2.9.8.8-2.8-.2-.4A7.9 7.9 0 0 1 12 4Zm-3.1 3.6c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.4Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13.5a4.2 4.2 0 0 0 6 .1l2.2-2.2a4.2 4.2 0 0 0-6-6L11 6.6"/><path d="M14 10.5a4.2 4.2 0 0 0-6-.1l-2.2 2.2a4.2 4.2 0 0 0 6 6l1.1-1.1"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.1"/><path d="M19.4 13a7.8 7.8 0 0 0 0-2l2-1.5-1.9-3.3-2.3 1a7.6 7.6 0 0 0-1.8-1L15 3.7h-3.8L10.7 6a7.6 7.6 0 0 0-1.8 1l-2.3-1-2 3.3L6.7 11a7.8 7.8 0 0 0 0 2l-2.1 1.5 2 3.3 2.3-1a7.6 7.6 0 0 0 1.8 1l.5 2.3H15l.4-2.3a7.6 7.6 0 0 0 1.8-1l2.3 1 2-3.3-2.1-1.5Z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3.5V7M16 3.5V7M3.5 10h17"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a7.5 7.5 0 0 1-8 7.4 8.9 8.9 0 0 1-2.6-.5L5 20l1.1-3.6A7.2 7.2 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5 7.5 7.5 0 0 1 20 12Z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5A8 8 0 0 0 6.3 6.3L4 8.5M4 4.5v4h4M4 12.5a8 8 0 0 0 13.7 5.2L20 15.5M20 19.5v-4h-4"/></svg>'
  };

  const state = {
    lang: document.documentElement.lang === "en" ? "en" : "fa",
    theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    accent: ACCENTS.includes(document.documentElement.dataset.accent)
      ? document.documentElement.dataset.accent
      : "indigo",
    cart: [],
    filter: "all"
  };

  let toastTimer = null;
  let lastCartFocus = null;

  /* ----------------------------- utilities ------------------------------ */
  const dictionary = (lang) => (window.I18N && window.I18N[lang]) || {};

  function t(key, vars) {
    const dict = dictionary(state.lang);
    let value = dict[key];
    if (value === undefined) value = dictionary("fa")[key];
    if (value === undefined) value = key;
    if (vars) {
      Object.keys(vars).forEach((name) => {
        value = value.split("{" + name + "}").join(vars[name]);
      });
    }
    return value;
  }

  function localized(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[state.lang] || value.fa || value.en || "";
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  const numberFormatter = () => new Intl.NumberFormat(state.lang === "fa" ? "fa-IR" : "en-US");
  const num = (value) => numberFormatter().format(value);

  function money(value) {
    return num(value) + "\u00a0" + t("common.currency");
  }

  function formatDate(iso) {
    const date = new Date(iso + "T12:00:00");
    try {
      return new Intl.DateTimeFormat(state.lang === "fa" ? "fa-IR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(date);
    } catch (error) {
      return iso;
    }
  }

  const findProduct = (id) => window.PRODUCTS.find((product) => product.id === id);
  const findPost = (slug) => window.POSTS.find((post) => post.slug === slug);

  function cartRows() {
    return state.cart
      .map((entry) => ({ entry, product: findProduct(entry.id) }))
      .filter((row) => row.product);
  }

  function cartCount() {
    return state.cart.reduce((sum, entry) => sum + entry.qty, 0);
  }

  function cartTotal() {
    return cartRows().reduce((sum, row) => sum + row.product.price * row.entry.qty, 0);
  }

  /* ------------------------------ language ------------------------------ */
  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "fa" ? "rtl" : "ltr";

    $$("[data-i18n]").forEach((element) => {
      const value = dictionary(state.lang)[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });
    $$("[data-i18n-html]").forEach((element) => {
      const value = dictionary(state.lang)[element.dataset.i18nHtml];
      if (value !== undefined) element.innerHTML = value;
    });
    $$("[data-i18n-aria]").forEach((element) => {
      const value = dictionary(state.lang)[element.dataset.i18nAria];
      if (value !== undefined) element.setAttribute("aria-label", value);
    });
    $$("[data-i18n-placeholder]").forEach((element) => {
      const value = dictionary(state.lang)[element.dataset.i18nPlaceholder];
      if (value !== undefined) element.setAttribute("placeholder", value);
    });

    $$("[data-year]").forEach((element) => {
      try {
        element.textContent = new Intl.DateTimeFormat(
          state.lang === "fa" ? "fa-IR" : "en-US",
          { year: "numeric" }
        ).format(new Date());
      } catch (error) {
        element.textContent = String(new Date().getFullYear());
      }
    });

    syncLangButtons();
    syncFilterButtons();
    setPageMeta();
    renderAll();
    syncNav();
  }

  function syncLangButtons() {
    $$("[data-toggle-lang]").forEach((button) => {
      button.textContent = state.lang === "fa" ? "EN" : "FA";
      button.setAttribute("lang", "en");
    });
    $$("[data-set-lang]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === state.lang));
    });
  }

  function setLanguage(lang) {
    if (lang !== "fa" && lang !== "en") return;
    state.lang = lang;
    write(KEY.lang, lang);
    applyLanguage();
  }

  function setPageMeta() {
    const page = document.body.dataset.page || "home";
    const titleKey = "meta." + page + ".title";
    const title = dictionary(state.lang)[titleKey];
    if (title && page !== "article") document.title = title;

    const description = $('meta[name="description"]');
    const descriptionKey = "meta." + page + ".desc";
    const descriptionText = dictionary(state.lang)[descriptionKey];
    if (description && descriptionText && page !== "article") {
      description.setAttribute("content", descriptionText);
    }
  }

  function syncNav() {
    const page = document.body.dataset.page || "home";
    const active = page === "article" ? "blog" : page;
    $$(".nav a[data-nav]").forEach((link) => {
      if (link.dataset.nav === active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  /* -------------------------------- theme ------------------------------- */
  function setTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    state.theme = theme;
    document.documentElement.dataset.theme = theme;
    write(KEY.theme, theme);
    syncThemeButtons();
    updateThemeColor();
  }

  function setAccent(accent) {
    if (!ACCENTS.includes(accent)) return;
    state.accent = accent;
    document.documentElement.dataset.accent = accent;
    write(KEY.accent, accent);
    syncAccentButtons();
    updateThemeColor();
  }

  function syncThemeButtons() {
    $$("[data-set-theme]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setTheme === state.theme));
    });
    $$("[data-toggle-theme]").forEach((button) => {
      button.setAttribute("aria-pressed", String(state.theme === "dark"));
    });
  }

  function syncAccentButtons() {
    $$("[data-set-accent]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setAccent === state.accent));
    });
  }

  function updateThemeColor() {
    const meta = $('meta[name="theme-color"]');
    if (!meta) return;
    const background = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    if (background) meta.setAttribute("content", background);
  }

  /* -------------------------------- cart -------------------------------- */
  function loadCart() {
    try {
      const parsed = JSON.parse(read(KEY.cart, "[]"));
      if (!Array.isArray(parsed)) return;
      state.cart = parsed
        .filter((entry) => entry && findProduct(entry.id) && Number(entry.qty) > 0)
        .map((entry) => ({
          id: entry.id,
          qty: Math.min(20, Math.max(1, Math.round(Number(entry.qty))))
        }));
    } catch (error) {
      state.cart = [];
    }
  }

  function saveCart() {
    write(KEY.cart, JSON.stringify(state.cart));
  }

  function addToCart(id) {
    const product = findProduct(id);
    if (!product) return;
    const existing = state.cart.find((entry) => entry.id === id);
    if (existing) existing.qty = Math.min(20, existing.qty + 1);
    else state.cart.push({ id, qty: 1 });
    saveCart();
    renderCart();
    bumpCartCount();
    toast(t("common.added"));
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter((entry) => entry.id !== id);
    saveCart();
    renderCart();
    toast(t("common.removed"));
  }

  function changeQty(id, delta) {
    const entry = state.cart.find((item) => item.id === id);
    if (!entry) return;
    const next = entry.qty + delta;
    if (next <= 0) {
      removeFromCart(id);
      return;
    }
    entry.qty = Math.min(20, next);
    saveCart();
    renderCart();
  }

  function bumpCartCount() {
    $$("[data-cart-count]").forEach((badge) => {
      badge.classList.remove("is-bump");
      void badge.offsetWidth;
      badge.classList.add("is-bump");
      window.setTimeout(() => badge.classList.remove("is-bump"), 420);
    });
  }

  function renderCart() {
    const drawer = $("#order-drawer");
    if (!drawer) return;
    const rows = cartRows();
    const count = cartCount();
    const total = cartTotal();
    const body = $("[data-cart-body]", drawer);
    const totalNode = $("[data-cart-total]", drawer);
    const pill = $("[data-cart-pill]", drawer);

    $$("[data-cart-count]").forEach((badge) => {
      badge.textContent = num(count);
      badge.hidden = count === 0;
    });
    if (pill) {
      pill.textContent = num(count);
      pill.hidden = count === 0;
    }
    drawer.classList.toggle("is-empty", count === 0);

    if (totalNode) totalNode.textContent = money(total);

    if (!rows.length) {
      body.innerHTML = `
        <div class="cart-empty">
          ${ICONS.bag}
          <strong>${esc(t("cart.emptyTitle"))}</strong>
          <p>${esc(t("cart.emptyText"))}</p>
          <a class="btn btn-soft btn-sm" href="shop.html" data-close-cart>${esc(t("cart.shopLink"))}</a>
        </div>`;
    } else {
      body.innerHTML = rows.map(({ entry, product }) => `
        <div class="cart-item" data-id="${product.id}">
          <div class="cart-thumb art-${product.art}" aria-hidden="true">${esc(product.symbol)}</div>
          <div class="cart-info">
            <h3>${esc(localized(product.name))}</h3>
            <div class="cart-unit">${money(product.price)}</div>
          </div>
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button type="button" data-qty="1" aria-label="+">+</button>
              <span>${num(entry.qty)}</span>
              <button type="button" data-qty="-1" aria-label="−">−</button>
            </div>
            <button type="button" class="cart-remove" data-remove>${esc(t("common.remove"))}</button>
          </div>
        </div>`).join("");
    }

    const empty = rows.length === 0;
    $$("[data-order-email], [data-order-whatsapp]", drawer).forEach((button) => {
      button.disabled = empty;
    });
  }

  function orderMessage() {
    const lines = cartRows().map(({ entry, product }) =>
      "• " + localized(product.name) + " × " + num(entry.qty) + " — " + money(product.price * entry.qty)
    );
    return [
      t("common.orderIntro"),
      "",
      lines.join("\n"),
      "",
      t("common.orderTotal") + ": " + money(cartTotal()),
      "",
      t("common.orderOutro")
    ].join("\n");
  }

  function openCart() {
    const drawer = $("#order-drawer");
    if (!drawer) return;
    lastCartFocus = document.activeElement;
    closeSettings();
    closeMenu();
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const panel = $(".drawer-panel", drawer);
    if (panel) panel.focus();
  }

  function closeCart() {
    const drawer = $("#order-drawer");
    if (!drawer || !drawer.classList.contains("is-open")) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastCartFocus && document.contains(lastCartFocus)) lastCartFocus.focus();
  }

  /* ------------------------------- toasts ------------------------------- */
  function toast(message) {
    const node = $("#toast");
    if (!node) return;
    const label = $("[data-toast-text]", node);
    if (label) label.textContent = message;
    node.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => node.classList.remove("is-visible"), 2600);
  }

  /* ------------------------------ rendering ----------------------------- */
  function productCard(product) {
    const name = localized(product.name);
    const tagline = localized(product.tagline);
    const comingSoon = !!product.comingSoon;
    const badge = product.badge
      ? `<span class="product-badge">${esc(localized(product.badge))}</span>`
      : "";
    const tags = (product.tags || [])
      .map((tag) => `<span class="tag">${esc(localized(tag))}</span>`)
      .join("");
    const priceMarkup = comingSoon
      ? `<div class="price"><strong class="price-coming">${esc(t("shop.comingSoon"))}</strong></div>`
      : product.price === 0
        ? `<div class="price"><strong>${num(product.price)} ${esc(t("common.currency"))}</strong></div>`
        : `<div class="price">
              <strong>${num(product.price)}</strong>
              <span>${esc(t("common.currency"))}</span>
            </div>`;
    const actionMarkup = comingSoon
      ? `<button type="button" class="btn btn-ghost btn-sm btn-block" disabled>${esc(t("shop.comingSoon"))}</button>`
      : `<a class="btn btn-primary btn-sm btn-block" href="${esc(product.download)}" download="${esc(product.downloadName)}">
            ${ICONS.download}<span>${esc(t("shop.download"))}</span>
          </a>`;

    return `
      <article class="product-card${comingSoon ? "" : " product-card--download"}"${comingSoon ? "" : " data-download-card"}>
        <div class="product-art art-${product.art}">
          <span class="product-symbol" aria-hidden="true">${esc(product.symbol)}</span>
          ${badge}
        </div>
        <div class="product-body">
          <h3>${esc(name)}</h3>
          <p class="product-tagline">${esc(tagline)}</p>
          <div class="tag-row">${tags}</div>
          <div class="product-foot">
            ${priceMarkup}
            <button type="button" class="link-btn" data-details="${product.id}">${esc(t("common.details"))}</button>
          </div>
          ${actionMarkup}
        </div>
      </article>`;
  }

  function renderProducts() {
    const mounts = [
      ["[data-featured-products]", () => window.PRODUCTS.slice(0, 3)],
      ["[data-products]", () => window.PRODUCTS]
    ];
    mounts.forEach(([selector, list]) => {
      const mount = $(selector);
      if (mount) mount.innerHTML = list().map(productCard).join("");
    });
  }

  function postCard(post) {
    const tag = post.tags && post.tags[0] ? t("tag." + post.tags[0]) : "";
    return `
      <a class="post-card" href="article.html?post=${encodeURIComponent(post.slug)}">
        <div class="post-top">
          <span class="tag tag--accent">${esc(tag)}</span>
          <time class="post-date" datetime="${post.date}">${formatDate(post.date)}</time>
        </div>
        <h3>${esc(localized(post.title))}</h3>
        <p class="post-excerpt">${esc(localized(post.excerpt))}</p>
        <div class="post-meta">
          <span>${esc(t("common.minRead", { n: num(post.minutes) }))}</span>
          <span class="post-more">${esc(t("common.readMore"))}${ICONS.arrow}</span>
        </div>
      </a>`;
  }

  function renderLatestPosts() {
    const mount = $("[data-latest-posts]");
    if (mount) mount.innerHTML = window.POSTS.slice(0, 3).map(postCard).join("");
  }

  function filteredPosts() {
    if (state.filter === "all") return window.POSTS;
    return window.POSTS.filter((post) => post.tags.includes(state.filter));
  }

  function renderBlog() {
    const mount = $("[data-posts]");
    if (!mount) return;
    const posts = filteredPosts();
    mount.innerHTML = posts.length
      ? posts.map(postCard).join("")
      : `<div class="notice"><strong>${esc(t("blog.empty"))}</strong></div>`;
  }

  function syncFilterButtons() {
    $$("[data-filter]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === state.filter));
    });
  }

  /* ------------------------------- article ------------------------------ */
  function appendInline(element, text) {
    String(text).split("`").forEach((part, index) => {
      if (!part) return;
      if (index % 2 === 1) {
        const code = document.createElement("code");
        code.textContent = part;
        element.append(code);
      } else {
        element.append(document.createTextNode(part));
      }
    });
  }

  function renderBlocks(blocks) {
    const fragment = document.createDocumentFragment();
    blocks.forEach((block) => {
      let node = null;
      if (block.type === "h2") {
        node = document.createElement("h2");
        node.textContent = block.text;
      } else if (block.type === "p") {
        node = document.createElement("p");
        appendInline(node, block.text);
      } else if (block.type === "quote") {
        node = document.createElement("blockquote");
        appendInline(node, block.text);
      } else if (block.type === "ul") {
        node = document.createElement("ul");
        block.items.forEach((item) => {
          const li = document.createElement("li");
          appendInline(li, item);
          node.append(li);
        });
      } else if (block.type === "code") {
        node = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = block.text;
        node.append(code);
      }
      if (node) fragment.append(node);
    });
    return fragment;
  }

  function renderArticle() {
    const mount = $("[data-article-mount]");
    if (!mount) return;

    const slug = new URLSearchParams(window.location.search).get("post");
    const post = findPost(slug);
    const relatedSection = $("[data-related-section]");

    if (!post) {
      mount.innerHTML = `
        <div class="notice" style="margin-block:48px">
          <strong>${esc(t("article.notFoundTitle"))}</strong>
          <p>${esc(t("article.notFoundText"))}</p>
          <p style="margin-block-start:16px"><a class="btn btn-soft btn-sm" href="blog.html">${esc(t("article.back"))}</a></p>
        </div>`;
      if (relatedSection) relatedSection.hidden = true;
      document.title = t("article.notFoundTitle") + " | " + t("brand.name");
      return;
    }

    const tag = post.tags && post.tags[0] ? t("tag." + post.tags[0]) : "";
    mount.innerHTML = `
      <header class="article-header">
        <div class="tag-row"><span class="tag tag--accent">${esc(tag)}</span></div>
        <h1 class="article-title">${esc(localized(post.title))}</h1>
        <div class="article-meta">
          <span>${ICONS.calendar}<time datetime="${post.date}">${formatDate(post.date)}</time></span>
          <span class="dot" aria-hidden="true"></span>
          <span>${ICONS.clock}${esc(t("common.minRead", { n: num(post.minutes) }))}</span>
        </div>
      </header>
      <div class="article-tools">
        <a class="back-link" href="blog.html">${ICONS.arrowLeft}${esc(t("article.back"))}</a>
        <button type="button" class="btn btn-ghost btn-sm" data-copy-link>
          ${ICONS.link}<span>${esc(t("article.copyLink"))}</span>
        </button>
      </div>
      <div class="prose" data-prose></div>`;

    const prose = $("[data-prose]", mount);
    if (prose) prose.append(renderBlocks(post.body[state.lang] || post.body.fa));

    document.title = localized(post.title) + " | " + t("brand.name");
    const description = $('meta[name="description"]');
    if (description) description.setAttribute("content", localized(post.excerpt));

    if (relatedSection) {
      const others = window.POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);
      const relatedMount = $("[data-related-posts]", relatedSection);
      if (relatedMount) relatedMount.innerHTML = others.map(postCard).join("");
      relatedSection.hidden = others.length === 0;
    }
  }

  function renderAll() {
    renderProducts();
    renderLatestPosts();
    renderBlog();
    renderArticle();
    renderCart();
    syncFilterButtons();
    if (productDialog && productDialog.open && productDialog.dataset.product) {
      renderProductDialog(productDialog.dataset.product);
    }
  }

  /* --------------------------- product dialog --------------------------- */
  let productDialog = null;

  function renderProductDialog(id) {
    const product = findProduct(id);
    if (!product || !productDialog) return;
    const badge = product.badge
      ? `<span class="product-badge">${esc(localized(product.badge))}</span>`
      : "";
    const tags = (product.tags || [])
      .map((tag) => `<span class="tag">${esc(localized(tag))}</span>`)
      .join("");
    const features = localized(product.features)
      .map((feature) => `<li>${esc(feature)}</li>`)
      .join("");
    const comingSoon = !!product.comingSoon;
    const priceMarkup = comingSoon
      ? `<div class="price"><strong class="price-coming">${esc(t("shop.comingSoon"))}</strong></div>`
      : product.price === 0
        ? `<div class="price"><strong>${num(product.price)} ${esc(t("common.currency"))}</strong></div>`
        : `<div class="price">
            <strong>${num(product.price)}</strong>
            <span>${esc(t("common.currency"))}</span>
          </div>`;
    const actionMarkup = comingSoon
      ? `<button type="button" class="btn btn-ghost" disabled>${esc(t("shop.comingSoon"))}</button>`
      : `<a class="btn btn-primary" href="${esc(product.download)}" download="${esc(product.downloadName)}">
            ${ICONS.download}<span>${esc(t("shop.download"))}</span>
          </a>`;

    productDialog.dataset.product = id;
    productDialog.innerHTML = `
      <div class="modal-card">
        <div class="modal-art art-${product.art}">
          <span class="product-symbol" aria-hidden="true">${esc(product.symbol)}</span>
          ${badge}
          <button type="button" class="modal-close" data-close-modal aria-label="${esc(t("common.close"))}">
            ${ICONS.x}
          </button>
        </div>
        <div class="modal-body">
          <div class="tag-row">${tags}</div>
          <h2 id="product-modal-title" style="margin-block-start:10px">${esc(localized(product.name))}</h2>
          <p class="modal-tagline">${esc(localized(product.tagline))}</p>
          <p class="modal-desc">${esc(localized(product.desc))}</p>
          <p class="modal-subhead">${esc(t("common.includes"))}</p>
          <ul class="feature-list">${features}</ul>
        </div>
        <div class="modal-foot">
          ${priceMarkup}
          ${actionMarkup}
        </div>
      </div>`;

    if (!productDialog.open) {
      try {
        productDialog.showModal();
      } catch (error) {
        /* browsers without <dialog> support */
      }
    }
  }

  /* ------------------------------ chrome UI ----------------------------- */
  function buildChrome() {
    const fab = document.createElement("button");
    fab.type = "button";
    fab.className = "settings-fab";
    fab.dataset.openSettings = "";
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-controls", "settings-panel");
    fab.setAttribute("data-i18n-aria", "a11y.settings");
    fab.innerHTML = ICONS.settings;
    document.body.append(fab);

    const panel = document.createElement("div");
    panel.className = "settings-panel";
    panel.id = "settings-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "settings-title");
    panel.innerHTML = `
      <div class="settings-head">
        <h2 id="settings-title" data-i18n="settings.title">ظاهر سایت</h2>
        <button type="button" class="settings-close" data-close-settings data-i18n-aria="a11y.close" aria-label="بستن">
          ${ICONS.x}
        </button>
      </div>
      <div class="settings-group">
        <span class="settings-label" data-i18n="settings.mode">حالت نمایش</span>
        <div class="segmented">
          <button type="button" data-set-theme="light" aria-pressed="true">
            ${ICONS.sun}<span data-i18n="settings.light">روشن</span>
          </button>
          <button type="button" data-set-theme="dark" aria-pressed="false">
            ${ICONS.moon}<span data-i18n="settings.dark">تیره</span>
          </button>
        </div>
      </div>
      <div class="settings-group">
        <span class="settings-label" data-i18n="settings.accent">رنگ اصلی</span>
        <div class="swatches">
          ${ACCENTS.map((accent) => `<button type="button" class="swatch" data-set-accent="${accent}" aria-label="${accent}" aria-pressed="false"></button>`).join("")}
        </div>
      </div>
      <div class="settings-group">
        <span class="settings-label" data-i18n="settings.language">زبان</span>
        <div class="segmented">
          <button type="button" data-set-lang="fa" aria-pressed="true">فارسی</button>
          <button type="button" data-set-lang="en" aria-pressed="false">English</button>
        </div>
      </div>
      <p class="settings-hint" data-i18n="settings.hint">انتخاب‌های شما در همین مرورگر ذخیره می‌شود.</p>`;
    document.body.append(panel);

    const drawer = document.createElement("div");
    drawer.className = "drawer";
    drawer.id = "order-drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML = `
      <div class="drawer-backdrop" data-close-cart></div>
      <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" tabindex="-1">
        <header class="drawer-head">
          <h2 id="cart-title"><span data-i18n="cart.title">سبد سفارش</span> <span class="count-pill" data-cart-pill>0</span></h2>
          <button type="button" class="icon-btn" data-close-cart data-i18n-aria="a11y.close" aria-label="بستن">
            ${ICONS.x}
          </button>
        </header>
        <div class="drawer-body" data-cart-body></div>
        <footer class="drawer-foot">
          <div class="cart-total-row">
            <span data-i18n="cart.total">جمع کل</span>
            <strong data-cart-total>0</strong>
          </div>
          <p class="cart-foot-note" data-i18n="cart.note">پرداخت پس از هماهنگی انجام می‌شود؛ لینک دانلود بعد از تأیید ارسال می‌شود.</p>
          <div class="cart-checkout">
            <button type="button" class="btn btn-primary btn-sm btn-block" data-order-email>
              ${ICONS.mail}<span data-i18n="common.orderEmail">ثبت سفارش با ایمیل</span>
            </button>
            <button type="button" class="btn btn-ghost btn-sm btn-block" data-order-whatsapp>
              ${ICONS.whatsapp}<span data-i18n="common.orderWhatsapp">ثبت سفارش در واتساپ</span>
            </button>
          </div>
        </footer>
      </aside>`;
    document.body.append(drawer);

    productDialog = document.createElement("dialog");
    productDialog.className = "product-dialog";
    productDialog.setAttribute("aria-labelledby", "product-modal-title");
    document.body.append(productDialog);

    const toastNode = document.createElement("div");
    toastNode.className = "toast";
    toastNode.id = "toast";
    toastNode.setAttribute("role", "status");
    toastNode.setAttribute("aria-live", "polite");
    toastNode.innerHTML = `${ICONS.check}<span data-toast-text></span>`;
    document.body.append(toastNode);

    bindChrome(panel, drawer, productDialog);
  }

  function bindChrome(panel, drawer, dialog) {
    const fab = $(".settings-fab");
    const openSettings = () => {
      const isOpen = panel.classList.toggle("is-open");
      fab.setAttribute("aria-expanded", String(isOpen));
      fab.classList.toggle("is-active", isOpen);
      if (isOpen) closeMenu();
    };
    const closePanel = () => {
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    };

    fab.addEventListener("click", () => {
      if (panel.classList.contains("is-open")) closePanel();
      else openSettings();
    });

    panel.addEventListener("click", (event) => {
      const themeChoice = event.target.closest("[data-set-theme]");
      if (themeChoice) {
        setTheme(themeChoice.dataset.setTheme);
        return;
      }
      const accentChoice = event.target.closest("[data-set-accent]");
      if (accentChoice) {
        setAccent(accentChoice.dataset.setAccent);
        return;
      }
      const langChoice = event.target.closest("[data-set-lang]");
      if (langChoice) {
        setLanguage(langChoice.dataset.setLang);
        return;
      }
      if (event.target.closest("[data-close-settings]")) closePanel();
    });

    document.addEventListener("click", (event) => {
      if (!panel.classList.contains("is-open")) return;
      if (panel.contains(event.target) || fab.contains(event.target)) return;
      closePanel();
    });

    drawer.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-cart]")) return;
      const qtyButton = event.target.closest("[data-qty]");
      if (qtyButton) {
        const item = qtyButton.closest(".cart-item");
        if (item) changeQty(item.dataset.id, Number(qtyButton.dataset.qty));
        return;
      }
      const removeButton = event.target.closest("[data-remove]");
      if (removeButton) {
        const item = removeButton.closest(".cart-item");
        if (item) removeFromCart(item.dataset.id);
      }
    });

    drawer.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', drawer)
        .filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.closest("[data-close-modal]")) {
        dialog.close();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (panel.classList.contains("is-open")) closePanel();
      if (drawer.classList.contains("is-open")) closeCart();
      closeMenu();
    });

    document.addEventListener("click", (event) => {
      const openCartButton = event.target.closest("[data-open-cart]");
      if (openCartButton) {
        event.preventDefault();
        openCart();
        return;
      }
      if (event.target.closest("[data-close-cart]")) {
        closeCart();
        return;
      }
      const addButton = event.target.closest("[data-add]");
      if (addButton) {
        addToCart(addButton.dataset.add);
        if (dialog.open) dialog.close();
        return;
      }
      const detailsButton = event.target.closest("[data-details]");
      if (detailsButton) {
        renderProductDialog(detailsButton.dataset.details);
        return;
      }
      const downloadCard = event.target.closest("[data-download-card]");
      if (downloadCard && !event.target.closest("a")) {
        const downloadLink = downloadCard.querySelector("a[download]");
        if (downloadLink) {
          downloadLink.click();
          return;
        }
      }
      const orderEmail = event.target.closest("[data-order-email]");
      if (orderEmail) {
        if (!state.cart.length) return;
        const subject = encodeURIComponent(t("common.orderSubject"));
        const body = encodeURIComponent(orderMessage());
        window.location.href = "mailto:" + CONTACT.email + "?subject=" + subject + "&body=" + body;
        return;
      }
      const orderWhatsapp = event.target.closest("[data-order-whatsapp]");
      if (orderWhatsapp) {
        if (!state.cart.length) return;
        const text = encodeURIComponent(orderMessage());
        window.open("https://wa.me/" + CONTACT.whatsapp + "?text=" + text, "_blank", "noopener");
        return;
      }
      const copyButton = event.target.closest("[data-copy-link]");
      if (copyButton) copyLink();
    });
  }

  function closeSettings() {
    const panel = $("#settings-panel");
    const fab = $(".settings-fab");
    if (!panel) return;
    panel.classList.remove("is-open");
    if (fab) fab.setAttribute("aria-expanded", "false");
  }

  /* -------------------------------- menu -------------------------------- */
  function closeMenu() {
    const nav = $("#site-nav");
    const button = $("[data-toggle-menu]");
    if (!nav) return;
    nav.classList.remove("is-open");
    if (button) button.setAttribute("aria-expanded", "false");
  }

  function bindHeader() {
    const menuButton = $("[data-toggle-menu]");
    const nav = $("#site-nav");
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
      });
      nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
      });
      document.addEventListener("click", (event) => {
        if (!nav.classList.contains("is-open")) return;
        if (nav.contains(event.target) || menuButton.contains(event.target)) return;
        closeMenu();
      });
    }

    $$("[data-toggle-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        setLanguage(state.lang === "fa" ? "en" : "fa");
      });
    });

    const header = $(".site-header");
    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 6);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    $$("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.filter = button.dataset.filter;
        syncFilterButtons();
        renderBlog();
      });
    });
  }

  /* ------------------------------- clipboard ---------------------------- */
  async function copyLink() {
    const url = window.location.href;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        toast(t("common.copied"));
        return;
      }
      throw new Error("clipboard unavailable");
    } catch (error) {
      const area = document.createElement("textarea");
      area.value = url;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      let copied = false;
      try { copied = document.execCommand("copy"); } catch (copyError) { copied = false; }
      area.remove();
      toast(copied ? t("common.copied") : t("common.copyFailed"));
    }
  }

  /* -------------------------------- reveal ------------------------------ */
  function initReveal() {
    const elements = $$(".reveal");
    if (!elements.length) return;
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px" });
    elements.forEach((element) => observer.observe(element));
  }

  /* --------------------------------- init ------------------------------- */
  function init() {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.dataset.accent = state.accent;

    loadCart();
    buildChrome();
    bindHeader();
    initReveal();

    setThemeButtonsOnly();
    syncAccentButtons();
    applyLanguage();
    updateThemeColor();

    window.addEventListener("storage", (event) => {
      if (event.key === KEY.cart) {
        loadCart();
        renderCart();
      }
    });
  }

  function setThemeButtonsOnly() {
    syncThemeButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
