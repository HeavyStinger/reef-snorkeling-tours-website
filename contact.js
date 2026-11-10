const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
const ENDPOINT = "https://api.web3forms.com/submit";
const TIMEOUT = 15000;

const ICONS = {
  snorkeling: '<img src="images/logo.webp" alt="" width="253" height="298">',
  fishing: '<svg class="ico-fish" viewBox="0 0 80 50" aria-hidden="true"><path d="M72 26C66 14 46 10 28 24L8 12C12 20 12 32 8 40L28 28C46 42 66 38 72 26Z"/><path d="M42 13L50 4C56 4 58 9 58 15"/><path d="M44 37L50 46C56 46 58 42 58 37"/><path d="M60 17C54 22 54 30 60 35"/><path d="M65 20C61 24 61 29 65 33"/><circle cx="66" cy="23" r="1.6" fill="currentColor"/></svg>',
  spearfishing: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20L18.5 5.5"/><path d="M20 4l-7 .8 6.2 6.2z"/><path d="M8.5 15.5l-3.5-.5M8.5 15.5l.5 3.5"/></svg>',
  "chartered-trips": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 16h18l-2.6 4.5H5.6z"/><path d="M12 16V4l6 9h-6M12 8L7 14h5"/></svg>',
};

const CATEGORIES = [
  { id: "snorkeling", label: "Snorkeling", note: "Reef & manatees", img: "half-day-tour-sm.jpg" },
  { id: "fishing", label: "Fishing", note: "Snapper trips", img: "fishing.jpg", pos: "50% 30%" },
  { id: "spearfishing", label: "Spearfishing", note: "Lobster & conch", img: "half-day-spearfishing-sm.jpg" },
  { id: "chartered-trips", label: "Chartered Trips", note: "Seats up to 14", img: "secret-beach-sm.jpg" },
];

const SWINGS = '<a href="https://share.google/VO3ABcIWY1SggvuIT" target="_blank" rel="noopener noreferrer">Swings</a>';

const PATHS = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.3c2.3.7 3.5 2.6 3.5 5.7"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  water: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  fruit: '<path d="M12 8c-3-2-7-.5-7 4 0 4 3 8 5 8 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-4 5-8 0-4.5-4-6-7-4z"/><path d="M12 8c0-2 1-4 3-4"/>',
  food: '<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-1.5 1-2 1-3.5M12 7c0-1.5 1-2 1-3.5M16 7c0-1.5 1-2 1-3.5"/>',
  mask: '<path d="M3 8.5C3 7.7 3.7 7 4.5 7h15c.8 0 1.5.7 1.5 1.5V12c0 2.5-1.8 4.5-4.2 4.5-2 0-2.6-2.2-3.3-2.2h-1c-.7 0-1.3 2.2-3.3 2.2C4.8 16.5 3 14.5 3 12z"/><path d="M21 9l1.5-1M3 9L1.5 8"/>',
  ticket: '<path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 7v10"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  boat: '<path d="M3 16h18l-2.6 4.5H5.6z"/><path d="M12 16V4l6 9h-6M12 8L7 14h5"/>',
  fish: '<g transform="translate(0 4.5) scale(.3)" stroke-width="6"><path d="M72 26C66 14 46 10 28 24L8 12C12 20 12 32 8 40L28 28C46 42 66 38 72 26Z"/><path d="M42 13L50 4C56 4 58 9 58 15"/><path d="M44 37L50 46C56 46 58 42 58 37"/><path d="M60 17C54 22 54 30 60 35"/><path d="M65 20C61 24 61 29 65 33"/><circle cx="66" cy="23" r="1.6" fill="currentColor"/></g>',
  spear: '<path d="M4 20L18.5 5.5"/><path d="M20 4l-7 .8 6.2 6.2z"/><path d="M8.5 15.5l-3.5-.5M8.5 15.5l.5 3.5"/>',
  drink: '<path d="M6 4h12l-1.5 8a4.5 4.5 0 0 1-9 0z"/><path d="M12 16.5V20M8.5 20h7"/>',
  shade: '<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v6.5a2 2 0 0 0 4 0"/>',
  dry: '<path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  van: '<path d="M3 16V8h11v8M14 11h4l3 3v2h-3"/><circle cx="7" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',
};

const WATER = ["water", "Water"];
const FRUIT = ["fruit", "Fruits"];
const FOOD = ["food", "Food"];
const GEAR = ["mask", "Snorkeling equipment"];
const PARK = ["ticket", "Park fee"];
const VESSEL = ["boat", "Private vessel"];
const BEACH_NOTES = [
  ["food", "Ceviche is conch, lobster or shrimp. Pick yours when it is in season."],
  ["van", "Pickup and drop off from Belize or San Pedro, day or night, for a small fee."],
];
const FEED = ["star", "Bonus: tarpon and magnificent frigatebird feeding."];
const SWINGS_NOTE = ["food", "Add food and " + SWINGS + " cooks your catch for free. You pay only for sides and drinks."];

const TRIPS = {
  snorkeling: [
    { id: "half-day", name: "Half Day Tour", img: "half-day-tour", hours: "3 hours", when: "", size: "", where: "Caye Caulker Marine Reserve", stops: ["Coral Garden", "Shark and Stingray Alley", "South Channel"], incl: [WATER, FRUIT, GEAR, PARK], know: [FEED] },
    { id: "full-day", name: "Full Day Tour", img: "full-day-tour", hours: "6 hours", when: "", size: "", where: "Hol Chan Marine Reserve", stops: ["Coral Garden", "Shark Ray Alley", "Hol Chan (main)", "Sunken Barge"], incl: [FOOD, WATER, FRUIT, GEAR, PARK], know: [FEED] },
    { id: "night", name: "Night Snorkeling", img: "night-snorkeling", hours: "2 hours", when: "5pm to 7pm", size: "", where: "South Channel", stops: ["One hour of preparation", "One hour snorkeling with lights"], incl: [WATER, ["bulb", "Underwater lights"], GEAR, ["ticket", "Entrance and park fee"]], know: [] },
    { id: "goffs-caye", name: "Full Day Goff's Caye", img: "goffs-caye-snorkeling", hours: "8 hours", when: "9am to 5pm", size: "", where: "Goff's Caye", stops: ["Manatee sighting", "Snorkel Goff's Caye", "Lunch", "Enjoy the island"], incl: [WATER, GEAR, FRUIT, FOOD, PARK], know: [] },
  ],
  fishing: [
    { id: "half-day", name: "Half Day Fishing", img: "fishing", pos: "50% 30%", hours: "4 hours", when: "9am to 1pm", size: "2 to 6 guests", where: "Inside the reef", stops: ["Find where the fish bite", "Drop fishing for snapper"], incl: [WATER, FRUIT, ["fish", "Fishing equipment"], VESSEL], know: [["info", "Drop fishing, not trolling, focused on snapper."], SWINGS_NOTE] },
    { id: "full-day", name: "Full Day Fishing", img: "fishing", pos: "50% 80%", hours: "7 hours", when: "9am to 4pm", size: "2 to 6 guests", where: "Inside the reef", stops: ["Find where the fish bite", "Drop fishing for snapper"], incl: [WATER, FRUIT, ["fish", "Fishing equipment"], VESSEL], know: [["info", "Drop fishing, not trolling, focused on snapper."], SWINGS_NOTE] },
  ],
  spearfishing: [
    { id: "half-day", name: "Half Day Spearfishing", img: "half-day-spearfishing", hours: "4 hours", when: "9am to 1pm", size: "2 to 6 guests", where: "Caye Caulker reef", stops: ["Company lobster traps", "Shallow reef for conch", "Spearfishing zone"], incl: [WATER, FRUIT, ["spear", "Spearfishing equipment"], GEAR, VESSEL, ["food", "Fresh conch ceviche"]], know: [["star", "Catch lobster, conch and fish."]] },
    { id: "full-day", name: "Full Day Spearfishing", img: "full-day-spearfishing", hours: "7 hours", when: "9am to 4pm", size: "2 to 6 guests", where: "Caye Caulker reef", stops: ["Company lobster traps", "Shallow reef for conch", "Spearfishing zone"], incl: [WATER, FRUIT, ["spear", "Spearfishing equipment"], GEAR, VESSEL, ["food", "Fresh conch ceviche"]], know: [["star", "Catch lobster, conch and fish."]] },
  ],
  "chartered-trips": [
    { id: "secret-beach", name: "Secret Beach", img: "secret-beach", hours: "9am to 5pm", when: "", size: "Seats 14", where: "Secret Beach", stops: ["Board the shaded boat", "Secret Beach", "Rum punch and ceviche"], incl: [["drink", "Rum punch"], ["food", "Seasonal ceviche"], ["shade", "Shaded boat"], ["dry", "Dry storage"]], know: BEACH_NOTES },
    { id: "goffs-caye", name: "Goff's Caye", img: "goffs-caye-charter", hours: "9am to 5pm", when: "", size: "Seats 14", where: "Goff's Caye", stops: ["Board the shaded boat", "Goff's Caye", "Lunch and rum punch"], incl: [["food", "Lobster, chicken, fish or vegetarian"], ["drink", "Rum punch"], ["food", "Seasonal ceviche"], ["shade", "Shaded boat"], ["dry", "Dry storage"]], know: BEACH_NOTES },
    { id: "miami-beach", name: "Miami Beach", img: "miami-beach", hours: "9am to 5pm", when: "", size: "Seats 14", where: "Miami Beach", stops: ["Board the shaded boat", "Miami Beach", "Lunch and rum punch"], incl: [["food", "Lobster, chicken, fish or vegetarian"], ["drink", "Rum punch"], ["food", "Seasonal ceviche"], ["shade", "Shaded boat"], ["dry", "Dry storage"]], know: BEACH_NOTES },
  ],
};

const COUNTRIES = [
  ["BZ", "Belize", "+501", "610 1234"],
  ["AR", "Argentina", "+54"],
  ["AU", "Australia", "+61"],
  ["AT", "Austria", "+43"],
  ["BS", "Bahamas", "+1"],
  ["BB", "Barbados", "+1"],
  ["BE", "Belgium", "+32"],
  ["BO", "Bolivia", "+591"],
  ["BR", "Brazil", "+55"],
  ["CA", "Canada", "+1"],
  ["CL", "Chile", "+56"],
  ["CN", "China", "+86"],
  ["CO", "Colombia", "+57"],
  ["CR", "Costa Rica", "+506"],
  ["CU", "Cuba", "+53"],
  ["CZ", "Czechia", "+420"],
  ["DK", "Denmark", "+45"],
  ["DO", "Dominican Republic", "+1"],
  ["EC", "Ecuador", "+593"],
  ["SV", "El Salvador", "+503"],
  ["FI", "Finland", "+358"],
  ["FR", "France", "+33"],
  ["DE", "Germany", "+49"],
  ["GR", "Greece", "+30"],
  ["GT", "Guatemala", "+502"],
  ["HN", "Honduras", "+504"],
  ["HK", "Hong Kong", "+852"],
  ["HU", "Hungary", "+36"],
  ["IN", "India", "+91"],
  ["IE", "Ireland", "+353"],
  ["IL", "Israel", "+972"],
  ["IT", "Italy", "+39"],
  ["JM", "Jamaica", "+1"],
  ["JP", "Japan", "+81"],
  ["MX", "Mexico", "+52"],
  ["NL", "Netherlands", "+31"],
  ["NZ", "New Zealand", "+64"],
  ["NI", "Nicaragua", "+505"],
  ["NO", "Norway", "+47"],
  ["PA", "Panama", "+507"],
  ["PE", "Peru", "+51"],
  ["PL", "Poland", "+48"],
  ["PT", "Portugal", "+351"],
  ["PR", "Puerto Rico", "+1"],
  ["RU", "Russia", "+7"],
  ["SG", "Singapore", "+65"],
  ["ZA", "South Africa", "+27"],
  ["KR", "South Korea", "+82"],
  ["ES", "Spain", "+34"],
  ["SE", "Sweden", "+46"],
  ["CH", "Switzerland", "+41"],
  ["TT", "Trinidad and Tobago", "+1"],
  ["UA", "Ukraine", "+380"],
  ["GB", "United Kingdom", "+44"],
  ["US", "United States", "+1"],
  ["UY", "Uruguay", "+598"],
  ["VE", "Venezuela", "+58"],
];

const NOT_SURE = { id: "not-sure", name: "Not sure yet", sub: "Tell us what you like and we will help you choose." };
const REASONS = { booking: "Tour booking", inquiry: "General inquiry" };
const STEP_NAMES = ["Reason", "Category", "Trip", "Details"];
const TICK = '<span class="tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>';

const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
const form = document.getElementById("contact-form");
const stepper = document.querySelector("[data-stepper]");
const panels = [...form.querySelectorAll(".step")];
const state = { step: 1, reached: 1, reason: null, category: null, trip: null };

function $(selector, root) {
  return (root || document).querySelector(selector);
}

function $$(selector, root) {
  return [...(root || document).querySelectorAll(selector)];
}

function category() {
  return CATEGORIES.find(function (item) {
    return item.id === state.category;
  });
}

function trip() {
  if (state.trip === NOT_SURE.id) return NOT_SURE;
  return (TRIPS[state.category] || []).find(function (item) {
    return item.id === state.trip;
  });
}

function burst(host, count, rise) {
  if (calm) return;
  for (let i = 0; i < count; i++) {
    const bubble = document.createElement("span");
    bubble.className = "bubble";
    bubble.style.top = rise ? "100%" : "50%";
    bubble.style.setProperty("--size", 5 + Math.random() * 11 + "px");
    bubble.style.setProperty("--x", Math.random() * 100 + "%");
    bubble.style.setProperty("--dx", (Math.random() - 0.5) * 90 + "px");
    bubble.style.setProperty("--dy", -(50 + Math.random() * 110) + "px");
    bubble.style.setProperty("--time", 0.7 + Math.random() * 0.5 + "s");
    bubble.style.setProperty("--delay", Math.random() * 0.1 + "s");
    bubble.addEventListener("animationend", function () {
      bubble.remove();
    });
    host.append(bubble);
  }
}

/* Rendering */

function renderCategories() {
  $('[data-render="cats"]').innerHTML = CATEGORIES.map(function (item) {
    const position = item.pos ? ' style="object-position:' + item.pos + '"' : "";
    return (
      '<label class="choice cat"><input type="radio" name="category" value="' + item.id + '">' +
      '<span class="face"><img src="images/' + item.img + '" alt="" width="640" height="480" loading="lazy" decoding="async"' + position + ">" +
      '<span class="cat-ico">' + ICONS[item.id] + "</span><strong>" + item.label + "</strong><span>" + item.note + "</span></span>" + TICK + "</label>"
    );
  }).join("");
}

function icon(name) {
  return '<svg class="tr-i" viewBox="0 0 24 24" aria-hidden="true">' + PATHS[name] + "</svg>";
}

function tripPhoto(item, big) {
  const position = item.pos ? ' style="object-position:' + item.pos + '"' : "";
  const file = item.img === "fishing" || big ? item.img : item.img + "-sm";
  return '<img src="images/' + file + '.jpg" alt="" width="' + (item.img === "fishing" ? 840 : big ? 1800 : 640) + '" height="' + (item.img === "fishing" ? 1120 : big ? 1100 : 480) + '" loading="lazy" decoding="async"' + position + ">";
}

function tripMeta(item) {
  return (
    '<p class="tr-meta"><span>' + icon("clock") + item.hours + (item.when ? ", " + item.when : "") + "</span>" +
    (item.size ? "<span>" + icon("people") + item.size + "</span>" : "") +
    "<span>" + icon("pin") + item.where + "</span></p>"
  );
}

function tripDetails(item) {
  const stops = item.stops.map(function (stop, index) {
    return '<li class="node" style="--n: ' + (index + 1) + '"><i>' + (index + 1) + "</i><span>" + stop + "</span></li>";
  }).join("");
  const included = item.incl.map(function (entry) {
    return "<li>" + icon(entry[0]) + "<span>" + entry[1] + "</span></li>";
  }).join("");
  const know = item.know.length
    ? '<div><h4>Good to know</h4><ul class="tr-know">' + item.know.map(function (entry) {
        return "<li>" + icon(entry[0]) + "<span>" + entry[1] + "</span></li>";
      }).join("") + "</ul></div>"
    : "";
  return (
    '<div class="tr-full"><div class="tr-two"><div><h4>Stops in order</h4><div class="trail" role="group" aria-label="Stops in order"><svg aria-hidden="true"><path class="base"/><path class="draw"/></svg><span class="boat" aria-hidden="true"></span><ol><li class="node start" style="--n: 0"><i aria-hidden="true">&#9679;</i><span>Caye Caulker</span></li>' + stops +
    '</ol></div></div><div><h4>Included</h4><ul class="tr-incl">' + included + "</ul></div></div>" + know + "</div>"
  );
}

const TRAVEL = 1500;
const DWELL = 900;
const HOLD = 1400;
const LEAD = 1100;
let trailFrame = 0;
let trailBox = null;

const trailWatcher = new ResizeObserver(function () {
  if (trailBox) drawTrail(trailBox);
});

function ease(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function drawTrail(trail) {
  const box = trail.getBoundingClientRect();
  if (!box.width || !box.height) return;
  const points = $$(".node i", trail).map(function (node) {
    const rect = node.getBoundingClientRect();
    return [rect.left + rect.width / 2 - box.left, rect.top + rect.height / 2 - box.top];
  });

  let d = "M" + points[0][0] + " " + points[0][1];
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1];
    const q = points[i];
    const dx = (q[0] - p[0]) / 2;
    const dy = (q[1] - p[1]) / 2;
    if (Math.abs(q[0] - p[0]) > Math.abs(q[1] - p[1])) {
      d += " C" + (p[0] + dx) + " " + p[1] + " " + (q[0] - dx) + " " + q[1] + " " + q[0] + " " + q[1];
    } else {
      d += " C" + p[0] + " " + (p[1] + dy) + " " + q[0] + " " + (q[1] - dy) + " " + q[0] + " " + q[1];
    }
  }

  const draw = $(".draw", trail);
  $("svg", trail).setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
  $$("path", trail).forEach(function (path) {
    path.setAttribute("d", d);
  });
  const total = draw.getTotalLength();
  trail.style.setProperty("--len", total);
  $(".boat", trail).style.offsetPath = "path('" + d + "')";

  trail.lengths = points.map(function (point) {
    let best = 0;
    let gap = Infinity;
    for (let s = 0; s <= 400; s++) {
      const length = (total * s) / 400;
      const q = draw.getPointAtLength(length);
      const g = (q.x - point[0]) * (q.x - point[0]) + (q.y - point[1]) * (q.y - point[1]);
      if (g < gap) {
        gap = g;
        best = length;
      }
    }
    return best / total;
  });
}

function trailAt(lengths, ms) {
  const legs = lengths.length - 1;
  const time = Math.max(0, ms) % (legs * (TRAVEL + DWELL) + HOLD);
  let at = lengths[0];
  let reached = 0;
  for (let k = 0; k < legs; k++) {
    const from = k * (TRAVEL + DWELL);
    if (time >= from + TRAVEL) {
      at = lengths[k + 1];
      reached = k + 1;
    } else if (time >= from) {
      at = lengths[k] + (lengths[k + 1] - lengths[k]) * ease((time - from) / TRAVEL);
      break;
    } else {
      break;
    }
  }
  return { at: at, reached: reached };
}

function startTrail() {
  cancelAnimationFrame(trailFrame);
  trailWatcher.disconnect();
  trailBox = null;
  const trail = $(".tr-panel .trail");
  if (!trail) return;
  const nodes = $$(".node", trail);
  const boat = $(".boat", trail);
  trailBox = trail;
  trailWatcher.observe(trail);
  drawTrail(trail);

  if (calm) {
    trail.classList.add("go");
    nodes.forEach(function (node) {
      node.classList.add("visited");
    });
    return;
  }

  setTimeout(function () {
    trail.classList.add("go");
  }, 60);
  const start = performance.now() + LEAD;
  let last = -1;

  function frame(now) {
    if (!trail.isConnected || trail.closest(".step").hidden) return;
    if (trail.lengths) {
      const pos = trailAt(trail.lengths, now - start);
      boat.style.offsetDistance = pos.at * 100 + "%";
      if (pos.reached !== last) {
        last = pos.reached;
        nodes.forEach(function (node, index) {
          node.classList.toggle("visited", index <= pos.reached);
        });
      }
    }
    trailFrame = requestAnimationFrame(frame);
  }
  frame(performance.now());
}

let viewed = null;

function paintPanel(animate) {
  const list = TRIPS[state.category] || [];
  const panelBox = $("[data-panel]");
  const item = list.find(function (entry) { return entry.id === viewed; });
  const booking = state.reason !== "inquiry";
  if (item) {
    const chosen = state.trip === item.id;
    panelBox.innerHTML =
      tripPhoto(item, true).replace("<img ", '<img class="tr-bg" ') + '<div class="tr-hero"><h3>' + item.name + "</h3>" + tripMeta(item) + '</div><div class="tr-body">' +
      tripDetails(item) + '<button type="button" class="btn btn-light" data-confirm>' + (chosen ? "Continue with this trip" : booking ? "Choose this trip" : "Choose this one") + "</button></div>";
  } else {
    panelBox.innerHTML =
      '<div class="tr-body"><div class="tr-full"><h4>Not sure yet</h4><p class="tr-sure">' + NOT_SURE.sub + ' Pick this and tell us more in the next step.</p></div><button type="button" class="btn btn-light" data-confirm>' + (state.trip === NOT_SURE.id ? "Continue" : "Choose this") + "</button></div>";
  }
  $$("[data-view]").forEach(function (row) {
    row.classList.toggle("is-focus", row.dataset.view === viewed);
  });
  startTrail();
  if (animate) {
    panelBox.classList.remove("swap");
    void panelBox.offsetWidth;
    panelBox.classList.add("swap");
  }
}

function renderTrips() {
  const list = TRIPS[state.category] || [];
  const booking = state.reason !== "inquiry";
  $("[data-title3]").textContent = booking ? "Which trip?" : "What is it about?";
  $("[data-hint3]").textContent = booking ? "Pick one to see everything that is included." : "Pick the closest match, or choose not sure.";
  viewed = state.trip || (list[0] && list[0].id);
  $("[data-list]").innerHTML = list.map(function (item) {
    return (
      '<label class="tr-item" data-view="' + item.id + '"><input type="radio" name="trip" value="' + item.id + '">' + tripPhoto(item, false) +
      "<span><strong>" + item.name + "</strong><small>" + icon("clock") + item.hours + (item.when ? ", " + item.when : "") + "</small></span></label>"
    );
  }).join("") +
    '<label class="tr-item" data-view="' + NOT_SURE.id + '"><input type="radio" name="trip" value="' + NOT_SURE.id + '"><span class="tr-help">' + icon("help") + "</span><span><strong>" + NOT_SURE.name + "</strong><small>Help me choose</small></span></label>";
  paintPanel(false);
  syncChoices();
}

function renderRecap(host, upto) {
  const chips = [];
  chips.push([1, REASONS[state.reason]]);
  if (upto >= 2 && category()) chips.push([2, category().label]);
  if (upto >= 3 && trip()) chips.push([3, trip().name]);
  host.innerHTML = chips.map(function (chip) {
    return host.hasAttribute("data-recap")
      ? '<li><button type="button" data-goto="' + chip[0] + '">' + chip[1] + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg><span class="visually-hidden">Change</span></button></li>'
      : "<li><span>" + chip[1] + "</span></li>";
  }).join("");
}

function renderDots() {
  $("[data-dots]").innerHTML = STEP_NAMES.map(function () {
    return "<i></i>";
  }).join("");
}

function syncChoices() {
  $$(".choice, .tr-item").forEach(function (choice) {
    const input = $("input", choice);
    const on =
      (input.name === "reason" && input.value === state.reason) ||
      (input.name === "category" && input.value === state.category) ||
      (input.name === "trip" && input.value === state.trip);
    input.checked = on;
    choice.classList.toggle("is-on", on);
  });
  panels.forEach(function (panel) {
    const go = $("[data-next]", panel);
    if (!go) return;
    const key = ["", "reason", "category", "trip"][panel.dataset.step];
    go.setAttribute("aria-disabled", state[key] ? "false" : "true");
  });
}

function paintProgress() {
  const shown = Math.min(state.step, 4);
  $("[data-now]").textContent = shown;
  $$("[data-dots] i").forEach(function (seg, index) {
    seg.classList.toggle("is-done", index + 1 < state.step);
    seg.classList.toggle("is-now", index + 1 === state.step);
  });
}

function show(step, direction, quiet) {
  state.step = step;
  state.reached = Math.max(state.reached, Math.min(step, 4));
  if (step === 3) renderTrips();
  if (step === 4) prepareDetails();
  panels.forEach(function (panel) {
    const active = Number(panel.dataset.step) === step;
    panel.hidden = !active;
    if (active) {
      panel.dataset.dir = direction || "next";
      panel.classList.remove("enter");
      void panel.offsetWidth;
      panel.classList.add("enter");
    }
  });
  syncChoices();
  paintProgress();
  $("[data-top]").hidden = step > 4;
  if (step === 3) startTrail();
  if (quiet) return;
  const heading = $("h2", panels[step - 1]);
  if (heading) heading.focus({ preventScroll: true });
  if (stepper.getBoundingClientRect().top < 0) stepper.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
}

function prepareDetails() {
  renderRecap($("[data-recap]"), 3);
  const booking = state.reason !== "inquiry";
  $("[data-title4]").textContent = booking ? "Almost there" : "Your message";
  $("[data-send-label]").textContent = booking ? "Send booking request" : "Send message";
  $("#f-message").placeholder = booking
    ? "Preferred date, how many people, anything we should know"
    : "How can we help?";
}

/* Navigation */

function nudge(panel) {
  const group = $(".reasons, .cats, .tr-list", panel);
  const error = $(".group-error", panel);
  error.hidden = false;
  group.classList.remove("shake");
  void group.offsetWidth;
  group.classList.add("shake");
}

function next() {
  const panel = panels[state.step - 1];
  const key = ["", "reason", "category", "trip"][state.step];
  if (state.step < 4 && !state[key]) {
    nudge(panel);
    return;
  }
  show(state.step + 1, "next");
}

function back() {
  show(Math.max(1, state.step - 1), "back");
}

function lock(on) {
  const panel = panels[state.step - 1];
  $$("[data-next], [data-back]", panel).forEach(function (button) {
    button.disabled = on;
  });
  form.classList.toggle("is-locked", on);
}

function choose(input, byPointer) {
  const name = input.name;
  if (name === "category" && state.category !== input.value) state.trip = null;
  state[name] = input.value;
  $$(".group-error").forEach(function (error) {
    error.hidden = true;
  });
  syncChoices();
  const choice = input.closest(".choice, .tr-item");
  choice.classList.remove("pop");
  void choice.offsetWidth;
  choice.classList.add("pop");
  burst(choice, 7);
  if (name === "trip") {
    viewed = input.value;
    paintPanel(true);
    const panelBox = $("[data-panel]");
    if (panelBox.getBoundingClientRect().top > innerHeight - 120) panelBox.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "nearest" });
    return;
  }
  if (!byPointer) return;
  lock(true);
  const step = Number(input.closest(".step").dataset.step);
  setTimeout(function () {
    lock(false);
    if (state.step === step) next();
  }, calm ? 0 : 480);
}

form.addEventListener("change", function (event) {
  const input = event.target;
  if (input.matches('input[type="radio"]') && state[input.name] !== input.value) choose(input, false);
});

form.addEventListener("click", function (event) {
  const input = event.target.closest('input[type="radio"]');
  if (input) {
    if (event.detail > 0) choose(input, true);
    return;
  }
  const go = event.target.closest("[data-goto]");
  if (go) {
    const target = Number(go.dataset.goto);
    if (target <= state.reached && target !== state.step) show(target, target < state.step ? "back" : "next");
    return;
  }
  if (event.target.closest("[data-confirm]")) {
    if (form.classList.contains("is-locked")) return;
    if (state.trip !== viewed) {
      state.trip = viewed;
      syncChoices();
    }
    lock(true);
    setTimeout(function () {
      lock(false);
      next();
    }, calm ? 0 : 260);
    return;
  }
  if (event.target.closest("[data-next]")) next();
  if (event.target.closest("[data-back]")) back();
});

/* Fields */

const fields = {
  name: {
    check: function (value) {
      if (!value.trim()) return "Please enter your name.";
      if (value.trim().length < 2) return "Your name needs at least 2 characters.";
      return "";
    },
  },
  email: {
    check: function (value) {
      if (!value.trim()) return "Please enter your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return "That email does not look right. Try name@example.com.";
      return "";
    },
  },
  phone: {
    check: function (value) {
      const typed = value.trim();
      if (!typed) return "Please enter your phone number.";
      const digits = typed.replace(/\D/g, "");
      const total = typed.charAt(0) === "+" ? digits.length : digits.length + dial().replace(/\D/g, "").length;
      if (!/^[0-9+()\-\s.]+$/.test(typed) || digits.length < 6 || total > 15) {
        return "Enter a valid phone number, for example " + example() + ".";
      }
      return "";
    },
  },
  message: {
    check: function (value) {
      if (!value.trim()) return "Please write a message.";
      if (value.trim().length < 10) return "Add a little more detail, at least 10 characters.";
      return "";
    },
  },
};

Object.keys(fields).forEach(function (key) {
  const wrap = $('[data-field="' + key + '"]');
  const input = $("input, textarea", wrap);
  const error = $(".error", wrap);
  fields[key].wrap = wrap;
  fields[key].input = input;
  fields[key].error = error;
  fields[key].touched = false;
});

function dial() {
  const option = $("[data-cc]").selectedOptions[0];
  return option ? option.dataset.dial : "+501";
}

function countryName() {
  const option = $("[data-cc]").selectedOptions[0];
  return option ? option.dataset.name : "Belize";
}

function example() {
  const option = $("[data-cc]").selectedOptions[0];
  return (option && option.dataset.example) || "555 123 4567";
}

function fullPhone() {
  const typed = fields.phone.input.value.trim();
  return typed.charAt(0) === "+" ? typed : dial() + " " + typed;
}

function syncCountry() {
  $("[data-cc-code]").textContent = dial();
  fields.phone.input.placeholder = example();
  if (fields.phone.touched) paintField("phone", false);
}

function paintField(key, announce) {
  const field = fields[key];
  const message = field.check(field.input.value);
  const show = field.touched || announce;
  field.wrap.classList.toggle("is-bad", show && !!message);
  field.wrap.classList.toggle("is-good", !message);
  field.input.setAttribute("aria-invalid", show && message ? "true" : "false");
  field.error.hidden = !(show && message);
  if (show && message) {
    const changed = field.error.textContent !== message;
    field.error.textContent = message;
    if (changed || announce) {
      field.wrap.classList.remove("shake");
      void field.wrap.offsetWidth;
      field.wrap.classList.add("shake");
    }
  }
  return !message;
}

Object.keys(fields).forEach(function (key) {
  const field = fields[key];
  field.input.addEventListener("blur", function () {
    field.touched = true;
    paintField(key, false);
  });
  field.input.addEventListener("input", function () {
    if (key === "message") $("[data-count]").textContent = field.input.value.length;
    hideAlert();
    if (field.touched) paintField(key, false);
    else field.wrap.classList.toggle("is-good", !field.check(field.input.value));
  });
});

function validateAll() {
  let first = null;
  Object.keys(fields).forEach(function (key) {
    fields[key].touched = true;
    if (!paintField(key, true) && !first) first = fields[key].input;
  });
  return first;
}

/* Sending */

function showAlert(text) {
  const box = $("[data-alert]");
  $("[data-alert-text]").textContent = text;
  box.hidden = false;
  box.classList.remove("shake");
  void box.offsetWidth;
  box.classList.add("shake");
}

function hideAlert() {
  $("[data-alert]").hidden = true;
}

function setLoading(on) {
  const button = $(".send");
  button.classList.toggle("is-loading", on);
  button.disabled = on;
  button.setAttribute("aria-busy", on);
  $$("input, textarea, [data-back]", panels[3]).forEach(function (control) {
    control.disabled = on;
  });
  $("[data-send-label]").textContent = on ? "Sending" : state.reason === "inquiry" ? "Send message" : "Send booking request";
}

function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function send(payload) {
  if (ACCESS_KEY.startsWith("YOUR_")) {
    console.warn("Contact form is in demo mode. Add a Web3Forms access key in contact.js to send real messages.");
    await wait(1500);
    if (new URLSearchParams(location.search).get("demo") === "fail") throw new Error("demo");
    return;
  }
  const controller = new AbortController();
  const timer = setTimeout(function () {
    controller.abort();
  }, TIMEOUT);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await response.json().catch(function () {
      return {};
    });
    if (!response.ok || !data.success) throw new Error(data.message || "failed");
  } finally {
    clearTimeout(timer);
  }
}

function payload() {
  const picked = trip();
  const label = category() ? category().label : "";
  return {
    access_key: ACCESS_KEY,
    subject: REASONS[state.reason] + ": " + (picked ? picked.name : label) + " from " + fields.name.input.value.trim(),
    from_name: "Reef Snorkeling Tours website",
    name: fields.name.input.value.trim(),
    email: fields.email.input.value.trim(),
    phone: fullPhone(),
    phone_country: countryName(),
    message: fields.message.input.value.trim(),
    reason: REASONS[state.reason],
    category: label,
    trip: picked ? picked.name : "",
    botcheck: "",
  };
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (state.step < 4) {
    next();
    return;
  }
  hideAlert();
  const bad = validateAll();
  if (bad) {
    bad.focus();
    return;
  }
  if ($(".hp").checked) {
    finish();
    return;
  }
  setLoading(true);
  try {
    await send(payload());
    setLoading(false);
    finish();
  } catch (error) {
    setLoading(false);
    $(".send").focus();
    showAlert(
      error.name === "AbortError" || error.message === "Failed to fetch"
        ? "We could not reach the server. Check your connection and try again."
        : "Something went wrong sending your message. Try again, or email bookings@example.com."
    );
  }
});

function finish() {
  const first = fields.name.input.value.trim().split(/\s+/)[0];
  $("[data-done-title]").textContent = "Thank you, " + first + "!";
  $("[data-done-text]").textContent =
    state.reason === "inquiry"
      ? "Your message is on its way. We will reply by email."
      : "Your booking request is on its way. We will reply by email to confirm.";
  renderRecap($("[data-done-recap]"), 3);
  show(5, "next");
  setTimeout(function () {
    burst($("[data-burst]"), 16, true);
  }, 350);
}

function reset() {
  Object.assign(state, { step: 1, reached: 1, reason: null, category: null, trip: null });
  form.reset();
  syncCountry();
  Object.keys(fields).forEach(function (key) {
    fields[key].touched = false;
    fields[key].wrap.classList.remove("is-good", "is-bad");
    fields[key].error.hidden = true;
    fields[key].input.setAttribute("aria-invalid", "false");
  });
  $("[data-count]").textContent = "0";
  show(1, "back");
}

$("[data-again]").addEventListener("click", reset);

/* Start, including links from the Book buttons */

renderDots();
renderCategories();

$("[data-cc]").innerHTML = COUNTRIES.map(function (country) {
  return '<option value="' + country[0] + '" data-dial="' + country[2] + '" data-name="' + country[1] + '" data-example="' + (country[3] || "") + '"' + (country[0] === "BZ" ? " selected" : "") + ">" + country[1] + " (" + country[2] + ")</option>";
}).join("");
$("[data-cc]").addEventListener("change", syncCountry);
syncCountry();

const params = new URLSearchParams(location.search);
const tour = params.get("tour");
const wanted = params.get("trip");
let start = 1;

if (tour === "general") {
  state.reason = "booking";
  start = 2;
} else if (Object.prototype.hasOwnProperty.call(TRIPS, tour)) {
  state.reason = "booking";
  state.category = tour;
  start = 3;
  if (wanted && TRIPS[tour].some(function (item) { return item.id === wanted; })) {
    state.trip = wanted;
    start = 4;
  }
}

state.reached = start;
show(start, "next", true);
