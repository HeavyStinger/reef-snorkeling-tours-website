const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
}

function splash() {
  menu.classList.add("hit");
  for (let i = 0; i < 18; i++) {
    const bubble = document.createElement("span");
    bubble.className = "bubble";
    bubble.style.setProperty("--size", 6 + Math.random() * 24 + "px");
    bubble.style.setProperty("--x", Math.random() * 100 + "%");
    bubble.style.setProperty("--dx", (Math.random() - 0.5) * 160 + "px");
    bubble.style.setProperty("--dy", 120 + Math.random() * 280 + "px");
    bubble.style.setProperty("--time", 0.9 + Math.random() * 0.7 + "s");
    bubble.style.setProperty("--delay", Math.random() * 0.12 + "s");
    bubble.addEventListener("animationend", function () {
      bubble.remove();
    });
    menu.append(bubble);
  }
}

toggle.addEventListener("click", function () {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

menu.addEventListener("transitionend", function (event) {
  if (event.propertyName === "transform" && document.body.classList.contains("menu-open")) {
    splash();
  }
});

menu.addEventListener("animationend", function (event) {
  if (event.target === menu) menu.classList.remove("hit");
});

menu.addEventListener("click", function (event) {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") setMenu(false);
});

const header = document.querySelector(".site-header");

function sizeHeader() {
  document.documentElement.style.setProperty("--nav-h", header.offsetHeight + "px");
}

function tintHeader() {
  header.classList.toggle("scrolled", window.scrollY > 8);
}

new ResizeObserver(sizeHeader).observe(header);
window.addEventListener("scroll", tintHeader, { passive: true });
sizeHeader();
tintHeader();
