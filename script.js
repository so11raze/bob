const prizeEl = document.querySelector(".prize-value");
const target = Number(prizeEl.dataset.count);
const start = performance.now();

function tick(now) {
  const p = Math.min((now - start) / 1400, 1);
  const eased = 1 - Math.pow(1 - p, 3);
  prizeEl.textContent = `${Math.round(target * eased).toLocaleString("ru-RU")} ₽`;
  if (p < 1) requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

const canvas = document.getElementById("sparks");
const ctx = canvas.getContext("2d");
let sparks = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function spawn() {
  sparks.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    v: 0.4 + Math.random() * 1.4,
    s: 0.6 + Math.random() * 1.8,
    a: 0.15 + Math.random() * 0.35,
    c: Math.random() > 0.7 ? "224,180,90" : "198,40,40",
  });
  if (sparks.length > 70) sparks.shift();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparks.forEach((p) => {
    p.y -= p.v;
    ctx.fillStyle = `rgba(${p.c},${p.a})`;
    ctx.fillRect(p.x, p.y, p.s, p.s * 4);
  });
  if (Math.random() > 0.4) spawn();
  requestAnimationFrame(draw);
}

addEventListener("resize", resize);
resize();
draw();

const form = document.getElementById("reg-form");
const list = document.getElementById("teams");
const empty = document.getElementById("teams-empty");
const KEY = "so2cup-teams";

function loadTeams() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function render() {
  const teams = loadTeams();
  list.innerHTML = teams
    .map(
      (t) =>
        `<li><b>${t.team}</b><br>${t.captain} & ${t.partner} · ${t.discord}</li>`
    )
    .join("");
  empty.style.display = teams.length ? "none" : "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const teams = loadTeams();
  teams.unshift(data);
  localStorage.setItem(KEY, JSON.stringify(teams.slice(0, 5)));
  form.reset();
  render();
});

render();
