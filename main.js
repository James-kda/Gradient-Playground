const toggleBtn = document.querySelector(".mode");

const control = document.querySelector(".control");
const menu = document.querySelector(".menu");
const settingsBtn = document.querySelector(".settings");

const choice1Input = document.getElementById("choice1");
const choice2Input = document.getElementById("choice2");
const gradientSelect = document.getElementById("gradientType");

const display = document.querySelector(".display");

const settingsPanel = document.querySelector(".settings-panel");

const resetBtn = document.getElementById("reset-btn");

function preferenceColor() {
  const color1 = document.getElementById("first-color");
  const color2 = document.getElementById("second-color");
  const input1 = choice1Input.value;
  const input2 = choice2Input.value;

  const gradientType = gradientSelect.value;

  if (gradientType === "radial") {
    display.style.background = `radial-gradient(circle at center, ${input1}, ${input2})`;
  } else {
    display.style.background = `linear-gradient(to right, ${input1}, ${input2})`;
  }

  updateSyntax(gradientType, input1, input2);

  color1.textContent = `${input1};`;
  color2.textContent = `${input2};`;
}

function updateSyntax(gradientType, color1, color2) {
  const syntaxEl = document.querySelector(".syntax");

  let cssCode = "";

  if (gradientType === "radial") {
    cssCode = `background: radial-gradient(circle at center, ${color1}, ${color2});`;
  } else {
    cssCode = `background: linear-gradient(to right, ${color1}, ${color2});`;
  }

  syntaxEl.textContent = cssCode;
}

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

let firstColor = null;
let secondColor = null;

function generateGradient(tile) {
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

  const gradientType = gradientSelect.value;

  if (gradientType === "radial") {
    display.style.background = `radial-gradient(circle at center, ${firstColor}, ${secondColor})`;
  } else {
    display.style.background = `linear-gradient(to right, ${firstColor}, ${secondColor})`;
  }

  updateSyntax(gradientType, firstColor, secondColor);

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

choice1Input.addEventListener("input", preferenceColor);
choice2Input.addEventListener("input", preferenceColor);

createGrid();
copyrightYear();
