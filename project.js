let outLine;
let serviceLine;
let tinLine;

document.addEventListener('DOMContentLoaded', () => {
    outLine = document.getElementById("out");
    serviceLine = document.getElementById("service");
    tinLine = document.getElementById("tin");
});

// wykrywanie kliknięć
let isService = true;
document.addEventListener('click', (e) => {
    const outLineY = outLine.getBoundingClientRect().top;
    const serviceLineY = serviceLine.getBoundingClientRect().top;
    const tinLineY = tinLine.getBoundingClientRect().top;

    if (e.clientY < outLineY) {
        console.log("out, resetting");
    } else if (e.clientY > outLineY && isService && e.clientY < serviceLineY) {
        console.log("successful service");
        isService = false;
    }
    else if (e.clientY > serviceLineY && isService) {
        console.log("failed service");
    }
    else if (e.clientY < tinLineY) {
        console.log("good hit");
    }
    else {
        console.log("below tin, resetting");
        isService = true;
    }
});

// p5js
function setup() {
    createCanvas(windowWidth, windowHeight)
}

// efekt klinkięcia
let circles = []

const max_r_percent = 4;
const grow_percent_per_sec = 8;
function draw() {
    clear();

    for (let i = circles.length - 1; i >= 0; i--) {
        let c = circles[i];

        c.p += grow_percent_per_sec * deltaTime / 1000;

        let progress = c.p / max_r_percent;
        if (progress >= 1) {
            circles.splice(i, 1);
            continue;
        }

        let outerR = (c.p / 125) * width;
        let thickness = outerR * 0.2;
        let alpha = 400 * (1 - progress);

        noFill();
        stroke(0, 0, 0, alpha);
        strokeWeight(thickness);
        circle(c.x, c.y, (outerR - thickness / 2) * 2);
    }
}

function mousePressed() {
    circles.push({ x: mouseX, y: mouseY, p: 0 });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}