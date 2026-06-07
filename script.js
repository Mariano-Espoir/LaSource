// ===== LaSource — preview interactions =====

const screens = ["feed", "profile", "ask", "admin"];

function showScreen(name) {
  screens.forEach((s) => {
    const el = document.getElementById("screen-" + s);
    if (el) el.classList.toggle("active", s === name);
  });
  document.querySelectorAll(".nav-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.screen === name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Nav tabs
document.querySelectorAll(".nav-tab").forEach((tab) => {
  tab.addEventListener("click", () => showScreen(tab.dataset.screen));
});

// Set default active tab
document.querySelector('.nav-tab[data-screen="feed"]').classList.add("active");

// Feed filter tabs
document.querySelectorAll(".filter-bar .tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-bar .tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// Pill selector (category) — single select
document.querySelectorAll(".pill-select .pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill-select .pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
  });
});

// Click "utile" toggles a +1 visual feedback
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (btn.textContent.includes("Utile")) {
      const num = btn.querySelector("strong");
      if (num) num.textContent = parseInt(num.textContent, 10) + 1;
      btn.style.color = "var(--primary)";
    }
  });
});

// Open mentor profile by clicking a mentor name in feed
document.querySelectorAll(".mentor-name").forEach((m) => {
  m.style.cursor = "pointer";
  m.addEventListener("click", (e) => {
    e.stopPropagation();
    showScreen("profile");
  });
});

// Submit question (demo)
document.querySelectorAll("#screen-ask .btn-primary").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "✓ Question publiée !";
    btn.style.background = "var(--green)";
    setTimeout(() => showScreen("feed"), 900);
  });
});

// Follow buttons
document.querySelectorAll(".btn-outline").forEach((btn) => {
  if (btn.textContent.includes("Suivre")) {
    btn.addEventListener("click", () => {
      if (btn.textContent.includes("+")) {
        btn.textContent = "✓ Suivi";
        btn.style.background = "var(--primary)";
        btn.style.color = "#fff";
      } else {
        btn.textContent = "+ Suivre";
        btn.style.background = "#fff";
        btn.style.color = "var(--primary)";
      }
    });
  }
});

// Admin validate/refuse buttons
document.querySelectorAll(".admin-table .btn-primary, .admin-table .btn-danger").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (row) {
      row.style.transition = ".3s";
      row.style.opacity = "0";
      setTimeout(() => row.remove(), 300);
    }
  });
});

console.log("✨ LaSource preview ready — naviguez entre Accueil / Mentor / Poser / Admin");
