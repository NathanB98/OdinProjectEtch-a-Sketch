const container = document.querySelector('#container');

//Values for creating the grid
let GRID_LENGTH = 16;
let GRID_VOLUME = GRID_LENGTH * GRID_LENGTH;

let pixel;

//Creates a 1:1 grid of pixels given a value from GRID_LENGTH
function createCanvisGrid(volume) {
    container.style.gridTemplateColumns = `repeat(${GRID_LENGTH}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${GRID_LENGTH}, 1fr)`;

    //Creates each individual 'pixel' in the grid.
    for(let i = 0; i < volume; i++) {
        let gridSquare = document.createElement('div');

        gridSquare.classList.add('gridSquare');
        gridSquare.addEventListener('mouseover', () => {
            gridSquare.style.backgroundColor = 'Red';
        })

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
        GRID_LENGTH = newGridSize;
        GRID_VOLUME = GRID_LENGTH * GRID_LENGTH;
        createCanvisGrid(GRID_VOLUME);
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

//Clears the grid then replaces it with one of the same dimentions
function clearCanvas() {
    clearGrid();
    createCanvisGrid(GRID_VOLUME);
}

window.onload = () => {
    createCanvisGrid(GRID_VOLUME);
}