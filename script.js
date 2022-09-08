const container = document.querySelector('#container');

const gridSize = document.getElementById('gridSizeSelect');
const canvasResest = document.getElementById('clearCanvas');
const colourPicker = document.getElementById('colourPicker');
const paintBtn = document.getElementById('paintMode');
const rainbowBtn = document.getElementById('rainbowMode');
const eraserBtn = document.getElementById('eraserTool');

//Default values for initialising the default canvas grid
const DEFAULT_GRID_LENGTH = 16;
const DEFAULT_GRID_VOLUME = DEFAULT_GRID_LENGTH * DEFAULT_GRID_LENGTH;
const DEFAULT_BRUSH_COLOUR = '#000000';
const DEFAULT_MODE = 'colour';

let gridLength = 16;
let gridVolume = gridLength * gridLength;
let brushColour = DEFAULT_BRUSH_COLOUR;
let currentMode = DEFAULT_MODE;
let pixel;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

gridSize.onclick = () => selectGridSize();
canvasResest.onclick = () => clearCanvas();
colourPicker.oninput = (e) => setBrushColour(e.target.value);
paintBtn.onclick = () => setCurrentMode('colour');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');

function setBrushColour(newColour) {
    brushColour = newColour;
}

function setCurrentMode(newMode) {
    setPaintMode(newMode)
    currentMode = newMode;
}

//Generates a new canvas, using the gridVolume value for the total number of 'pixels' in the grid.
function createCanvasGrid(volume) {
    container.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;

    for(let i = 0; i < volume; i++) {
        let gridSquare = document.createElement('div');

        gridSquare.classList.add('gridSquare');
        gridSquare.addEventListener('mouseover', changeBrushColour);
        gridSquare.addEventListener('mousedown', changeBrushColour);
        container.appendChild(gridSquare);
    }
}

//Paints the appropriately selected mode to the canvas.
function changeBrushColour(e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    if(currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if(currentMode === 'colour') {
        e.target.style.backgroundColor = brushColour;
    } else if(currentMode === 'eraser') {
        e.target.style.backgroundColor = '#FEFEFE';
    }
}

//Recieves a new grid size from the user for initialising a new canvas.
function selectGridSize() {
    let newGridSize = prompt('Please enter the length of your canvas in pixels. (Max size: 100)');
    newGridSize = Number(newGridSize);
    
    if(!(newGridSize < 1) && !(newGridSize > 100)) {
        clearGrid();
        gridLength = newGridSize;
        gridVolume = gridLength * gridLength;
        createCanvasGrid(gridVolume);
    } else {
        alert('Please enter a valid number (1-100)');
    }
}

//Deletes the grid in its entirety
function clearGrid() {
    let allPixels = document.querySelectorAll('.gridSquare');
        allPixels.forEach(px => {
            px.remove();
        });
}

function setPaintMode(newMode) {
    if(currentMode === 'rainbow') {
        rainbowMode.classList.remove('active');
    } else if(currentMode === 'colour') {
        paintMode.classList.remove('active');
    } else if(currentMode === 'eraser') {
        eraserTool.classList.remove('active');
    }

    if(newMode === 'rainbow') {
        rainbowMode.classList.add('active');
    } else if(newMode === 'colour') {
        paintMode.classList.add('active');
    } else if(newMode === 'eraser') {
        eraserTool.classList.add('active');
    }
}

//Deletes and re-initialises a grid. Effectively wipes the current canvas without changing its size.
function clearCanvas() {
    clearGrid();
    createCanvasGrid(gridVolume);
}

window.onload = () => {
    createCanvasGrid(gridVolume);
    setPaintMode(DEFAULT_MODE);
}