const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
const clearGridBtn = document.querySelector("#clearBtn");
const colorPicker = document.getElementById("colorpicker");
const randomBtn = document.getElementById("randomBtn");
const checkbox = document.getElementById("darkening");

let dark = false;
let size = 16;
let color = "#0000ff";

const createGrid = (size = 16) => {
    const cellHeight = 600 / size;
    const cellWidth = 600 / size;

    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");

        let cell = ``;
        for (let j = 0; j < size; j++) {
            cell += `<div class="cell" 
                          style="height:${cellHeight}px; 
                                 width:${cellWidth}px;">
                     </div>`;
        }

        row.innerHTML = cell;
        grid.appendChild(row);
    }
};

function clearGrid() {
    grid.innerHTML = ``;
    colorPicker.value = "#0000ff";
}

function draw(color = "blue") {
    let cells = document.querySelectorAll(".cell");
    console.log(color);
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (event) => {
            if (color == true) {
                // random color
                event.target.style.backgroundColor = "#" + Math.random().toString(16).substr(-6);
            } else {
                event.target.style.backgroundColor = color;
            }
        });
    });
}

function startDrawing(size = 16) {
    clearGrid();
    createGrid(size);
    draw();
}

colorPicker.addEventListener("input", (event) => {
    color = event.target.value;
    draw(color);
});

slider.addEventListener("mouseup", (event) => {
    size = event.target.value;
    startDrawing(size);
});

clearGridBtn.addEventListener("click", (event) => {
    startDrawing(size);
});

randomBtn.addEventListener("click", (event) => {
    draw(event.target.checked);
});

startDrawing();
