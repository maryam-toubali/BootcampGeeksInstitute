let selectedColor = '#ff0000';
let isDrawing = false;

function initCanvas() {
    const canvas = document.getElementById('pixelCanvas');
    canvas.innerHTML = '';
    
    for (let i = 0; i < 3200; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.addEventListener('mousedown', startDrawing);
        pixel.addEventListener('mouseenter', draw);
        pixel.addEventListener('mouseup', stopDrawing);
        canvas.appendChild(pixel);
    }
}

function selectColor(color, element) {
    selectedColor = color;
    
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.remove('selected');
    });
    
    element.classList.add('selected');
}

function startDrawing(e) {
    isDrawing = true;
    e.target.style.backgroundColor = selectedColor;
}

function draw(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = selectedColor;
    }
}

function stopDrawing() {
    isDrawing = false;
}

function clearCanvas() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = 'white';
    });
}

// Prevent context menu on right click
document.addEventListener('contextmenu', e => e.preventDefault());

// Stop drawing when mouse leaves the canvas
document.addEventListener('mouseup', stopDrawing);

// Initialize the canvas when page loads
initCanvas();