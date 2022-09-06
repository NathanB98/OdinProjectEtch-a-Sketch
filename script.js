const container = document.querySelector('#container');

//pixel contains an array-like object with each div/pixel in the grid
const pixel = document.getElementsByClassName('gridSquare');

//Values for creating the grid
const GRID_LENGTH = 16;
const GRID_VOLUME = GRID_LENGTH * GRID_LENGTH;

//Updates container div style to divide the grid appropriately given the GRID_LENGTH
container.style.gridTemplateColumns = `repeat(${GRID_LENGTH}, 0fr)`;

createCanvisGrid();

//Checks if the users mouse is hovering over any pixel in the grid
for(let i = 0; i < pixel.length; i++) {
    pixel[i].addEventListener('mouseover', () => {
        pixel[i].style.backgroundColor = 'Red';
    }
)}

//Creates a 1:1 grid of pixels given a value from GRID_LENGTH
function createCanvisGrid() {
    //Creates each individual 'pixel' in the grid.
    for(let i = 0; i < GRID_VOLUME; i++) {
        const gridSquare = document.createElement('div');

        gridSquare.classList.add('gridSquare');
        gridSquare.style.height = '2rem';
        gridSquare.style.width = '2rem';
        gridSquare.style.backgroundColor = 'Blue';
        gridSquare.style.border = 'Solid Black'

        container.appendChild(gridSquare);
    }
}