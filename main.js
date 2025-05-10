const toggleBtn = document.querySelector(".mode");

const control = document.querySelector(".control");
const menu = document.querySelector(".menu");
settingsBtn = document.querySelector(".settings");

const settingsPanel = document.querySelector(".settings-panel");

const resetBtn = document.getElementById("reset-btn");

function createGrid() {
  const grid = document.querySelector(".grid");

  const gridSize = 10;
  const tileWidth = Math.floor(grid.getBoundingClientRect().width / gridSize);
  const tileHeight = Math.floor(grid.getBoundingClientRect().height / gridSize);

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.style.width = `${tileWidth}px`;
    tile.style.height = `${tileHeight}px`;
    tile.style.backgroundColor = colorGrid();

    tile.addEventListener("click", () => {
      generateGradient(tile);
    });

    grid.appendChild(tile);
  }
}

createGrid();

let firstColor = null;
let secondColor = null;

function generateGradient(tile) {
  const display = document.querySelector(".display");
  const color1 = document.getElementById("first-color");
  const color2 = document.getElementById("second-color");

  const bgColor = getComputedStyle(tile).backgroundColor;
  console.log(bgColor);

  if (!firstColor) {
    firstColor = bgColor;
    console.log("First color:", firstColor);
    return;
  }

  if (!secondColor) {
    secondColor = bgColor;
    console.log("Second color:", secondColor);
  }

  display.style.background = `radial-gradient(circle at center, ${firstColor}, ${secondColor})`;

  color1.textContent = `${firstColor};`;
  color2.textContent = `${secondColor};`;

  firstColor = null;
  secondColor = null;
}

function colorGrid() {
  const colors = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += colors[Math.floor(Math.random() * colors.length)];
  }
  return color;
}

function copyrightYear() {
  const currentDate = document.getElementById("current-date");

  const year = new Date().getFullYear();

  currentDate.textContent = `${year}`;
}

copyrightYear();

menu.addEventListener("click", () => {
  menu.classList.toggle("open");
  control.classList.toggle("show");
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const color1 = document.getElementById("first-color");
  const color2 = document.getElementById("second-color");

  color1.textContent = "";
  color2.textContent = "";

  const display = document.querySelector(".display");

  display.style.background = "#1e1e2f";
});

settingsBtn.addEventListener("click", () => {
  settingsPanel.classList.toggle("show");
});
