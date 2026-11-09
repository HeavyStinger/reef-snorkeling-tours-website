const trails = document.querySelectorAll(".trail");
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

const TRAVEL = 1500;
const DWELL = 900;
const HOLD = 1400;
const LEAD = 2300;

function ease(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function drawTrail(trail) {
  const box = trail.getBoundingClientRect();
  const points = [...trail.querySelectorAll(".node:not(.off) i")].map(function (node) {
    const rect = node.getBoundingClientRect();
    return [rect.left + rect.width / 2 - box.left, rect.top + rect.height / 2 - box.top];
  });

  let d = "M" + points[0][0] + " " + points[0][1];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dx = (b[0] - a[0]) / 2;
    const dy = (b[1] - a[1]) / 2;
    if (Math.abs(b[0] - a[0]) > Math.abs(b[1] - a[1])) {
      d += " C" + (a[0] + dx) + " " + a[1] + " " + (b[0] - dx) + " " + b[1] + " " + b[0] + " " + b[1];
    } else {
      d += " C" + a[0] + " " + (a[1] + dy) + " " + b[0] + " " + (b[1] - dy) + " " + b[0] + " " + b[1];
    }
  }

  const draw = trail.querySelector(".draw");
  trail.querySelector("svg").setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
  trail.querySelectorAll("path").forEach(function (path) {
    path.setAttribute("d", d);
  });
  const total = draw.getTotalLength();
  trail.style.setProperty("--len", total);
  trail.querySelector(".boat").style.offsetPath = "path('" + d + "')";

  trail.at = null;
  trail.reached = -1;
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

function position(trail, ms) {
  const lengths = trail.lengths;
  const legs = lengths.length - 1;
  const time = ms % (legs * (TRAVEL + DWELL) + HOLD);
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

function step(trail, ms) {
  const now = position(trail, Math.max(0, ms));
  if (now.at !== trail.at) {
    trail.boat.style.offsetDistance = now.at * 100 + "%";
    trail.at = now.at;
  }
  if (now.reached !== trail.reached) {
    trail.nodes.forEach(function (node, i) {
      node.classList.toggle("visited", i <= now.reached);
    });
    trail.reached = now.reached;
  }
}

const all = [...trails];
const running = new Set();
let current = [];
let frameId = 0;

function refresh() {
  const live = all.filter(function (trail) {
    return running.has(trail);
  });
  const top = live[live.length - 1];
  const stacked = top && getComputedStyle(top.closest(".card-p")).position === "sticky";
  current = stacked ? [top] : live;
  if (current.length && !frameId && !calm) frameId = requestAnimationFrame(frame);
}

function frame(now) {
  if (!current.length) {
    frameId = 0;
    return;
  }
  current.forEach(function (trail) {
    step(trail, now - trail.start);
  });
  frameId = requestAnimationFrame(frame);
}

const watcher = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      const trail = entry.target;
      if (entry.isIntersecting) {
        trail.classList.add("go");
        if (!running.has(trail)) {
          trail.start = performance.now() + LEAD;
          running.add(trail);
        }
      } else {
        running.delete(trail);
      }
    });
    refresh();
  },
  { threshold: 0.5 }
);

all.forEach(function (trail) {
  trail.boat = trail.querySelector(".boat");
  trail.nodes = trail.querySelectorAll(".node");
  drawTrail(trail);
  step(trail, 0);
  watcher.observe(trail);
  new ResizeObserver(function () {
    drawTrail(trail);
  }).observe(trail);
  trail.addEventListener("redraw", function () {
    drawTrail(trail);
  });
});

addEventListener("resize", refresh);
addEventListener("load", function () {
  all.forEach(drawTrail);
});
