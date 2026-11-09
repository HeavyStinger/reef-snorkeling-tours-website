const cards = document.querySelector(".cards");
const lightbox = document.querySelector(".lightbox");
let timer;

const slides = [...cards.children];
const count = slides.length;

function copySlides(list) {
  return list.map(function (slide) {
    const copy = slide.cloneNode(true);
    const button = copy.firstElementChild;
    copy.setAttribute("aria-hidden", "true");
    button.tabIndex = -1;
    button.removeAttribute("aria-current");
    return copy;
  });
}

cards.prepend(...copySlides(slides));
cards.append(...copySlides(slides));

const items = [...cards.querySelectorAll(".card")];
let current = count;

function center(card, behavior) {
  const slide = card.parentElement;
  cards.scrollTo({
    left: slide.offsetLeft - (cards.clientWidth - slide.offsetWidth) / 2,
    behavior: behavior,
  });
}

function select(index) {
  items[current].removeAttribute("aria-current");
  let shift = 0;
  if (current < count) shift = count;
  if (current >= count * 2) shift = -count;
  if (shift) {
    current += shift;
    index += shift;
    center(items[current], "instant");
  }

  items[index].setAttribute("aria-current", "true");
  current = index;
  center(items[index], "auto");
}

function advance() {
  if (!cards.matches(":hover") && !lightbox.open) select(current + 1);
}

function restart() {
  clearInterval(timer);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    timer = setInterval(advance, 5000);
  }
}

let touched = false;
let settle;

function nearest() {
  const middle = cards.scrollLeft + cards.clientWidth / 2;
  let best = current;
  let gap = Infinity;
  items.forEach(function (card, index) {
    const slide = card.parentElement;
    const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - middle);
    if (distance < gap) {
      gap = distance;
      best = index;
    }
  });
  return best;
}

function finish() {
  touched = false;
  const index = nearest();
  if (index !== current) {
    items[current].removeAttribute("aria-current");
    items[index].setAttribute("aria-current", "true");
    current = index;
  }
  restart();
}

function interact() {
  touched = true;
  clearInterval(timer);
  clearTimeout(settle);
  settle = setTimeout(finish, 600);
}

["pointerdown", "touchstart", "wheel", "keydown"].forEach(function (name) {
  cards.addEventListener(name, interact, { passive: true });
});

cards.addEventListener(
  "scroll",
  function () {
    if (!touched) return;
    clearTimeout(settle);
    settle = setTimeout(finish, 150);
  },
  { passive: true }
);

function openLightbox(card) {
  const photo = lightbox.querySelector("img");
  const src = "images/" + card.dataset.tour + ".jpg";
  if (!photo.src.endsWith(src)) {
    photo.classList.add("is-loading");
    photo.src = src;
  }
  photo.alt = card.querySelector("img").alt;
  lightbox.querySelector(".where").textContent = card.dataset.where + " · " + card.dataset.time;
  lightbox.querySelector("h2").textContent = card.querySelector("strong").textContent;
  lightbox.querySelector(".lightbox-desc").textContent = card.dataset.desc;
  lightbox.showModal();
}

cards.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;
  if (card.dataset.href) {
    window.location.href = card.dataset.href;
    return;
  }
  select(items.indexOf(card));
  openLightbox(card);
  restart();
});

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) lightbox.close();
});

center(items[current], "instant");
restart();
