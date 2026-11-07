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
  select(items.indexOf(card));
  openLightbox(card);
  restart();
});

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) lightbox.close();
});

center(items[current], "instant");
restart();
