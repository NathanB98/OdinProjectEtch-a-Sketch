const container = document.querySelector('#container');

const colourPicker = document.getElementById('colourPicker');
const paintBtn = document.getElementById('paintMode');
const rainbowBtn = document.getElementById('rainbowMode');
const eraserBtn = document.getElementById('eraserTool');


const DEFAULT_GRID_LENGTH = 16;
const DEFAULT_GRID_VOLUME = DEFAULT_GRID_LENGTH * DEFAULT_GRID_LENGTH;
const DEFAULT_BRUSH_COLOUR = '#000000';
const DEFAULT_MODE = 'colour';

let gridLength = 16;
let gridVolume = gridLength * gridLength;
let brushColour = DEFAULT_BRUSH_COLOUR;
let currentMode = DEFAULT_MODE;
let pixel;

colourPicker.oninput = (e) => setBrushColour(e.target.value);
paintBtn.onclick = () => setPaintMode('colour');
rainbowBtn.onclick = () => setPaintMode('rainbow');
eraserBtn.onclick = () => setPaintMode('eraser');

function setBrushColour(newColour) {
    brushColour = newColour;
}

//Creates a 1:1 grid of pixels given a value from GRID_LENGTH
function createCanvisGrid(volume) {
    container.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;

    //Creates each individual 'pixel' in the grid.
    for(let i = 0; i < volume; i++) {
        let gridSquare = document.createElement('div');

        gridSquare.classList.add('gridSquare');
        gridSquare.addEventListener('mousedown', () => {
            gridSquare.style.backgroundColor = `${brushColour}`;
        });
        gridSquare.addEventListener('mouseover', () => {
            
        });

        container.appendChild(gridSquare);
    }
}


//Select grid size and updates to show that new grid in place of the previous grid.
function selectGridSize() {
    let newGridSize = prompt('Please enter the length of your canvas in pixels. (Max size: 100)');
    //Converts input to an integer number
    newGridSize = Number(newGridSize);
    
    if(!(newGridSize < 1) && !(newGridSize > 100)) {
        clearGrid();
        gridLength = newGridSize;
        gridVolume = gridLength * gridLength;
        createCanvisGrid(gridVolume);
    } else {
        alert('Please enter a valid number (1-100)');
    }
}

//Removes the current canvas to make way for another
function clearGrid() {
    let allPixels = document.querySelectorAll('.gridSquare');
        allPixels.forEach(px => {
            px.remove();
        });
}

function setPaintMode(newMode) {
    if(currentMode === 'rainbow') {
        rainbowMode.classList.remove('active');
        console.log('rainbow deactivated');
    } else if(currentMode === 'colour') {
        paintMode.classList.remove('active');
        console.log('colour deactiated');
    } else if(currentMode === 'eraser') {
        eraserTool.classList.remove('active');
        console.log('eraser deactivated');
    }

    if(newMode === 'rainbow') {
        rainbowMode.classList.add('active');
        console.log('rainbow active');
    } else if(newMode === 'colour') {
        paintMode.classList.add('active');
        console.log('colour active');
    } else if(newMode === 'eraser') {
        eraserTool.classList.add('active');
        console.log('eraser active');
    }
}

//Clears the grid then replaces it with one of the same dimentions
function clearCanvas() {
    clearGrid();
    createCanvisGrid(gridVolume);
}

window.onload = () => {
    createCanvisGrid(gridVolume);
    setPaintMode(DEFAULT_MODE);
}