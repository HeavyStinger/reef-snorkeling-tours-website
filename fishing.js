document.querySelectorAll(".addon").forEach(function (group) {
  const card = group.closest(".card-p");
  const trail = card.querySelector(".trail");
  const extras = card.querySelectorAll(".extra, .new");

  group.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;

    group.querySelectorAll("button").forEach(function (other) {
      other.setAttribute("aria-pressed", other === button);
    });

    card.classList.toggle("food", button.dataset.food === "1");

    extras.forEach(function (item) {
      item.classList.toggle("off", button.dataset.food !== "1");
    });
    trail.dispatchEvent(new Event("redraw"));
  });
});
