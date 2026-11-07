function finish(event) {
  if (event.target instanceof HTMLImageElement) {
    event.target.classList.remove("is-loading");
  }
}

document.addEventListener("load", finish, true);
document.addEventListener("error", finish, true);

for (const img of document.images) {
  if (!img.complete && !img.closest(".logo")) {
    img.classList.add("is-loading");
  }
}
