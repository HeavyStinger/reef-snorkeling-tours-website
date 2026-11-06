const list = document.querySelector(".benefits");

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const originals = [...list.children];
  const count = originals.length;

  function copyItems() {
    return originals.map(function (item) {
      const copy = item.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      return copy;
    });
  }

  list.prepend(...copyItems());
  list.append(...copyItems());

  const items = [...list.children];
  let current = count;

  function center(item, behavior) {
    list.scrollTo({
      top: item.offsetTop - (list.clientHeight - item.offsetHeight) / 2,
      behavior: behavior,
    });
  }

  function select(index) {
    items[current].classList.remove("on");
    let shift = 0;
    if (current < count) shift = count;
    if (current >= count * 2) shift = -count;
    if (shift) {
      current += shift;
      index += shift;
      center(items[current], "instant");
    }

    items[index].classList.add("on");
    current = index;
    center(items[index], "auto");
  }

  items[current].classList.add("on");
  center(items[current], "instant");
  setInterval(function () {
    select(current + 1);
  }, 2500);
}
