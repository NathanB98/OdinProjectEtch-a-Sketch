const container = document.querySelector('#container');

for(let i = 0; i < 16; i++) {
    makeSquare();
}

function makeSquare() {
    const gridSquare = document.createElement('div');

    gridSquare.classList.add('gridSqure');
    gridSquare.style.height = '2rem';
    gridSquare.style.width = '2rem';
    gridSquare.style.backgroundColor = 'Blue';
    gridSquare.style.border = 'Solid Black'

    container.appendChild(gridSquare);
}