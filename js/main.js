const container = document.querySelector(".container");
const clearButton = document.querySelector(".clear");
const numOfSquares = document.querySelector('input[name="squares"]');
const darkModeEye = document.querySelector(".fa-eye");
const h1 = document.querySelector("h1");

function updateGrid() {
    numOfSquares.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            resetGrid();
            makeGrid();
            fillSquares(1);
        }
    });
}

function resetGrid() {
    container.innerHTML = "";
}

function makeGrid() {
    if (numOfSquares.value > +numOfSquares.getAttribute("max")) {
        numOfSquares.value = 50;
    } else if (numOfSquares.value < +numOfSquares.getAttribute("min")) {
        numOfSquares.value = 1;
    }
    container.setAttribute("style",
        `grid-template: repeat(${numOfSquares.value}, 1fr) / repeat(${numOfSquares.value}, 1fr)`);
    for (let x = 1; x <= numOfSquares.value; x++) {
        for (let y = 1; y <= numOfSquares.value; y++) {
            container.appendChild(document.createElement("div"));
            if (h1.classList[0] === "lm-icon") {
                container.lastChild.classList.add("lm-grid");
            } else {
                container.lastChild.classList.add("dm-grid");
            }
            container.lastChild.setAttribute("style",
                `grid-area: ${x} / ${y} / span 1 / span 1`);
        }
    }
}

function clear(divs) {
    clearButton.addEventListener("click", () => {
        divs.forEach((div) => {
            div.style.removeProperty("background-color");
        });
    });
}

// autoClear: 1 = active
function fillSquares(autoClear) {
    const divs = document.querySelectorAll(".container div");

    divs.forEach((div) => {
        div.addEventListener("mouseover", function () {
            this.setAttribute("style",
                `background-color: rgb(${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`);
        });
    });
    if (autoClear === 1) {
        divs.forEach((div) => {
            div.style.removeProperty("background-color");
        });
    }
    clear(divs);
}

function darkMode() {
    darkModeEye.addEventListener("click", function () {
        this.classList.toggle("lm-icon");
        this.classList.toggle("dm-icon");
        h1.classList.toggle("lm-icon");
        h1.classList.toggle("dm-icon");
        document.body.classList.toggle("lm-body");
        document.body.classList.toggle("dm-body");
        clearButton.classList.toggle("lm-btn");
        clearButton.classList.toggle("dm-btn");
        numOfSquares.classList.toggle("lm-btn");
        numOfSquares.classList.toggle("dm-btn");
        document.querySelectorAll(".container div").forEach(div => {
            div.classList.toggle("lm-grid");
            div.classList.toggle("dm-grid");
        });
    });
}

function main() {
    makeGrid();
    fillSquares(0);
    updateGrid();
    darkMode();
}

window.onload = main();