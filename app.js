const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");
const eraserBtn = document.getElementById("jsEraser");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function startPainting(event) {
  painting = true;
}

function stopPainting(event) {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDoun(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.textContent = "Fill";
  } else {
    filling = true;
    mode.textContent = "Paint";
  }
}

function handleCanvasClick(event) {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCanvasMenu(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS[🎨]";
  link.click();
}

function handleResetClick(event) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleEraserClick(event) {
  const userX = event.clientX;
  const userY = event.clientY;
  ctx.clearRect(userX, userY); //작동하지 않음
}

function pushAndExecute() {
  commands.push(arguments);
  execute.apply(null, arguments); //here
}

function handleCtrlZClick(event) {
  let commands = [];
  if (event.ctrlKey && event.key === "z") {
    commands.splice(-1, 1);
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    commands.forEach(function (command) {
      execute.apply(null, command); //here2
    });
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCanvasMenu);
}
window.addEventListener("keydown", handleCtrlZClick);

Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
if (resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
}
if (eraserBtn) {
  eraserBtn.addEventListener("click", handleEraserClick);
}
