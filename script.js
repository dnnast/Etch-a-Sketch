//--------------------VARIABLES------------------------------------------
const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
const clearGridBtn = document.querySelector("#clearBtn");
const colorPicker = document.getElementById("colorpicker");
const randomCheckbox = document.getElementById("random-checkbox");
const darkerCheckbox = document.getElementById("darkening");

let random = false;
let darkerning = false;
let size = 16;
let defaultColor = "#0000ff";

//--------------------HELPER FUNCTIONS-----------------------------------
function addOpacity(color) {
    if (color.includes("rgba")) {
        let opacity = color.split(",")[3].slice(0, -1);
        if (opacity == 0.9) {
            return color;
        } else {
            color = color.replace(opacity, (parseFloat(opacity) + 0.1).toFixed(1));
        }
    } else {
        color = color.replace("rgb", "rgba").replace(")", ", 0.1)");
    }

    return color;
}

function hex2rgb(hexColor) {
    const pattern_color = "^#([A-Fa-f0-9]{6})$";
    if (hexColor.match(pattern_color)) {
        var hexColor = hexColor.replace("#", ""),
            r = parseInt(hexColor.substring(0, 2), 16),
            g = parseInt(hexColor.substring(2, 4), 16),
            b = parseInt(hexColor.substring(4, 6), 16);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    return hexColor;
}

//--------------------FUNCTIONS-------------------------------------------
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

function draw(color = "#0000ff") {
    color = hex2rgb(color);

    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (event) => {
            if (random) {
                // Random color
                event.target.style.backgroundColor = "#" + Math.random().toString(16).substr(-6);
            } else if (darkerning) {
                // Progressive Darkening
                if (event.target.style.backgroundColor.includes("rgba")) {
                    let color2 = addOpacity(event.target.style.backgroundColor);
                    event.target.style.backgroundColor = color2;
                } else {
                    let color1 = addOpacity(color);
                    event.target.style.backgroundColor = color1;
                }
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

// --------------------EVENT LISTENERS-------------------------------------
colorPicker.addEventListener("input", (event) => {
    defaultColor = event.target.value;
    draw(defaultColor);
});

slider.addEventListener("mouseup", (event) => {
    size = event.target.value;
    startDrawing(size);
});

clearGridBtn.addEventListener("click", (event) => {
    startDrawing(size);
});

randomCheckbox.addEventListener("click", (event) => {
    if (event.target.checked) {
        random = true;
        darkerCheckbox.disabled = true;
    } else {
        random = false;
        darkerCheckbox.disabled = false;
    }
});

darkerCheckbox.addEventListener("click", (event) => {
    if (event.target.checked) {
        darkerning = true;
        randomCheckbox.disabled = true;
    } else {
        darkerning = false;
        randomCheckbox.disabled = false;
    }
});

startDrawing();
