const container = document.querySelector(".container");
const clearButton = document.querySelector(".clear");
const numOfSquares = document.querySelector('input[name="squares"]');
const darkModeEye = document.querySelector(".fa-eye");
const pencil = document.querySelector(".fa-pencil-alt");
const eraser = document.querySelector(".fa-eraser");
const gridToggle = document.querySelector(".fa-th-large");
const h1 = document.querySelector("h1");

// Jquery for spectrum
$("#custom").spectrum({
    color: "#b42020",
    showInput: true,
    showInitial: true,
    showAlpha: true,
    preferredFormat: "hex"
});
let customValue = $("#custom").spectrum("get");

// Updates grid toggle correctly
let gridCount = 0;

function makeGrid() {
    if (numOfSquares.value > +numOfSquares.getAttribute("max")) {
        numOfSquares.value = +numOfSquares.getAttribute("max");
    } else if (numOfSquares.value < +numOfSquares.getAttribute("min")) {
        numOfSquares.value = +numOfSquares.getAttribute("min");
    }
    container.setAttribute("style",
        `grid-template: repeat(${numOfSquares.value}, 1fr) / repeat(${numOfSquares.value}, 1fr)`);
    for (let x = 1; x <= numOfSquares.value; x++) {
        for (let y = 1; y <= numOfSquares.value; y++) {
            container.appendChild(document.createElement("div"));
            if (gridToggle.classList.contains("grid-toggle")) {
                null;
            } else if (h1.classList[0] === "lm-icon") {
                container.lastChild.classList.add("lm-grid");
            } else {
                container.lastChild.classList.add("dm-grid");
            }
            container.lastChild.setAttribute("style",
                `grid-area: ${x} / ${y} / span 1 / span 1`);
        }
    }
    if (gridCount === 0) {
        toggleGrid();
        gridCount++;
    } else {
        gridToggle.removeEventListener("click", gridToggleSwitch);
        toggleGrid();
    }
}

function resetGrid() {
    container.innerHTML = "";
}

function clear(divs) {
    clearButton.addEventListener("click", () => {
        divs.forEach((div) => {
            div.style.removeProperty("background-color");
        });
    });
}

function updateGrid() {
    numOfSquares.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            resetGrid();
            makeGrid();
            if (pencil.classList.contains("lm-selected-border") ||
                pencil.classList.contains("dm-selected-border")) {
                drawSquares(1, customValue);
            } else {
                eraseSquares();
            }
        }
    });
}

function gridToggleSwitch() {
    const divs = document.querySelectorAll(".container div");
    this.classList.toggle("grid-toggle");
    if (divs[0].classList.contains("lm-grid") ||
        container.classList.contains("lm-grid")) {
        divs.forEach((div) => {
            div.classList.toggle("lm-grid");
        });
        container.classList.toggle("lm-grid");
    } else if (divs[0].classList.contains("dm-grid") ||
        container.classList.contains("dm-grid")) {
        divs.forEach((div) => {
            div.classList.toggle("dm-grid");
        });
        container.classList.toggle("dm-grid");
        container.classList.remove("lm-grid");
    }
}

function toggleGrid() {
    gridToggle.addEventListener("click", gridToggleSwitch);
}

// autoClear: 1 = active
function drawSquares(autoClear = 0, color) {
    const divs = document.querySelectorAll(".container div");

    divs.forEach((div) => {
        div.addEventListener("mouseover", function () {
            this.setAttribute("style",
                `background-color: ${color}`);
        });
    });
    if (autoClear === 1) {
        divs.forEach((div) => {
            div.style.removeProperty("background-color");
        });
    }
    clear(divs);
}

function drawSquaresNewColor() {
    $("#custom").on("change.spectrum", () => {
        customValue = $("#custom").spectrum("get");
        if (eraser.classList.contains("lm-selected-border") ||
            eraser.classList.contains("dm-selected-border")) {
            return;
        }
        drawSquares(0, customValue);
    });
}

function eraseSquares() {
    const divs = document.querySelectorAll(".container div");

    divs.forEach((div) => {
        div.addEventListener("mouseover", function () {
            this.style.removeProperty("background");
        });
    });
}

function darkMode() {
    let githubImg = document.querySelector(".b-nav img");

    darkModeEye.addEventListener("click", () => {
        document.querySelectorAll(".fas").forEach(fas => {
            fas.classList.toggle("lm-icon");
            fas.classList.toggle("dm-icon");
            if (fas.classList.contains("lm-selected-border") ||
                fas.classList.contains("dm-selected-border")) {
                fas.classList.toggle("lm-selected-border");
                fas.classList.toggle("dm-selected-border");
            }
        });
        h1.classList.toggle("lm-icon");
        h1.classList.toggle("dm-icon");
        document.body.classList.toggle("lm-body");
        document.body.classList.toggle("dm-body");
        clearButton.classList.toggle("lm-btn");
        clearButton.classList.toggle("dm-btn");
        numOfSquares.classList.toggle("lm-btn");
        numOfSquares.classList.toggle("dm-btn");
        if (container.classList.contains("lm-grid")) {
            container.classList.toggle("lm-grid");
            container.classList.toggle("dm-grid");
        } else if (container.classList.contains("dm-grid")) {
            container.classList.toggle("dm-grid");
            container.classList.toggle("lm-grid");
        } else {
            document.querySelectorAll(".container div").forEach(div => {
                div.classList.toggle("lm-grid");
                div.classList.toggle("dm-grid");
            });
        }
        document.querySelector(".b-nav p").classList.toggle("lm-icon");
        document.querySelector(".b-nav p").classList.toggle("dm-icon");
        if (githubImg.getAttribute("src") === "./img/GitHub-Mark/PNG/GitHub-Mark-32px.png") {
            githubImg.setAttribute("src", "./img/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png");
        } else {
            githubImg.setAttribute("src", "./img/GitHub-Mark/PNG/GitHub-Mark-32px.png");
        }
    });
}

function draw() {
    window.onload = drawSquares(0, customValue);
    pencil.addEventListener("click", function () {
        if (eraser.classList.contains("lm-selected-border")) {
            eraser.classList.toggle("lm-selected-border");
            this.classList.toggle("lm-selected-border");
        } else if (eraser.classList.contains("dm-selected-border")) {
            eraser.classList.toggle("dm-selected-border");
            this.classList.toggle("dm-selected-border");
        }
        drawSquares(0, customValue);
    });
}

function erase() {
    eraser.addEventListener("click", function () {
        if (pencil.classList.contains("lm-selected-border")) {
            pencil.classList.toggle("lm-selected-border");
            this.classList.toggle("lm-selected-border");
        } else if (pencil.classList.contains("dm-selected-border")) {
            pencil.classList.toggle("dm-selected-border");
            this.classList.toggle("dm-selected-border");
        }
        eraseSquares();
    });
}

function main() {
    makeGrid();
    updateGrid();
    drawSquaresNewColor();
    darkMode();
    draw();
    erase();
}

window.onload = main();