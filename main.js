const container = document.querySelector(".container");
const clearButton = document.querySelector(".clear");
const numOfSquares = document.querySelector('input[name="squares"]');

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
    container.appendChild(clearButton);
    container.appendChild(numOfSquares);
}

function makeGrid() {
    if (numOfSquares.value > 100) {
        numOfSquares.value = 100;
    } else if (numOfSquares.value < 1) {
        numOfSquares.value = 1;
    }
    container.setAttribute("style", `grid-template: repeat(${numOfSquares.value}, 1fr) / repeat(${numOfSquares.value}, 1fr)`);
    for (let x = 1; x <= numOfSquares.value; x++) {
        for (let y = 1; y <= numOfSquares.value; y++) {
            container.appendChild(document.createElement("div"));
            container.lastChild.setAttribute("style", `grid-area: ${x} / ${y} / span 1 / span 1`);
        }
    }
}

function clear(divs) {
    clearButton.addEventListener("click", () => {
        divs.forEach((div) => {
            div.classList.remove("fill");
        });
    });
}

// autoClear: 1 = active
function fillSquares(autoClear) {
    const divs = document.querySelectorAll(".container div");

    divs.forEach((div) => {
        div.addEventListener("mouseover", function () {
            this.classList.add("fill");
        });
    });

    if (autoClear === 1) {
        divs.forEach((div) => {
            div.classList.remove("fill");
        });
    }
    clear(divs);
}

function main() {
    makeGrid();
    fillSquares(0);
    updateGrid();
}

window.onload = main();