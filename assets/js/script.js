"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Helper
  const elementToggleFunc = (elem) => elem && elem.classList.toggle("active");

  // Sidebar (mobile "Show Contacts")
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
    });
  }

  // Overlay (shared, e.g., for modals)
  const overlay = document.querySelector("[data-overlay]");

  // ======= Testimonials Modal (if you add related HTML later) =======
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    elementToggleFunc(modalContainer);
    elementToggleFunc(overlay);
  };

  if (testimonialsItem.length && modalContainer && overlay) {
    testimonialsItem.forEach((item) => {
      item.addEventListener("click", function () {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");
        if (avatar && modalImg) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt || "";
        }
        if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
        if (modalText && text) modalText.innerHTML = text.innerHTML;
        testimonialsModalFunc();
      });
    });
  }
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay && modalContainer) overlay.addEventListener("click", testimonialsModalFunc);

  // ======= Custom select + category filter =======
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  if (select) {
    select.addEventListener("click", function () {
      elementToggleFunc(this);
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));
    });
  }

  const filterFunc = function (selectedValue) {
    const val = String(selectedValue || "").toLowerCase();
    filterItems.forEach((item) => {
      const cat = (item.dataset.category || "").toLowerCase();
      if (val === "all" || val === cat) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Select items
  if (selectItems.length) {
    selectItems.forEach((btn) => {
      btn.addEventListener("click", function () {
        const val = this.innerText.trim();
        if (selectValue) selectValue.innerText = val;
        if (select) select.classList.remove("active");
        filterFunc(val);
      });
    });
  }

  // Filter pills (desktop)
  if (filterBtn.length) {
    let lastClickedBtn = filterBtn[0];
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        const val = this.innerText.trim();
        if (selectValue) selectValue.innerText = val;
        filterFunc(val);

        if (lastClickedBtn) lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }

  // ======= Contact form validation =======
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");
  if (form && formInputs.length && formBtn) {
    formInputs.forEach((inp) => {
      inp.addEventListener("input", () => {
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });
  }

  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  if (navigationLinks.length && pages.length) {
    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const target = link.textContent.trim().toLowerCase();
        // toggle pages
        pages.forEach((page) => {
          page.classList.toggle("active", page.dataset.page === target);
        });
        // toggle nav active
        navigationLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }
});