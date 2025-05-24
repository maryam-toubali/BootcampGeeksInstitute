// List of colors for palette
const colors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
];

// Select elements
const palette = document.getElementById('palette');
const drawingGrid = document.getElementById('drawingGrid');

let selectedColor = colors[0]; // Default color
let mouseDown = false;

// Create palette color swatches
colors.forEach(color => {
  const swatch = document.createElement('div');
  swatch.classList.add('color-swatch');
  swatch.style.backgroundColor = color;
  if(color === selectedColor) swatch.classList.add('selected');

  swatch.addEventListener('click', () => {
    selectedColor = color;
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    swatch.classList.add('selected');
  });

  palette.appendChild(swatch);
});

// Create 20x20 grid squares (400 squares)
const gridSize = 20 * 20;
for (let i = 0; i < gridSize; i++) {
  const square = document.createElement('div');
  square.classList.add('square');

  // Paint on mousedown or mouseover while mouse is down
  square.addEventListener('mousedown', () => {
    square.style.backgroundColor = selectedColor;
  });
  square.addEventListener('mouseover', () => {
    if(mouseDown) {
      square.style.backgroundColor = selectedColor;
    }
  });

  drawingGrid.appendChild(square);
};

// Track mouse state globally
document.body.addEventListener('mousedown', () => {
  mouseDown = true;
});
document.body.addEventListener('mouseup', () => {
  mouseDown = false;
});
