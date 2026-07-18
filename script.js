const dino = document.getElementById("dino");

dino.addEventListener("pointerdown", () => {
    dino.src = "dino2.png";
});

function restoreImage() {
    dino.src = "dino1.png";
}

dino.addEventListener("pointerup", restoreImage);
dino.addEventListener("pointercancel", restoreImage);
dino.addEventListener("pointerleave", restoreImage);


const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;

async function loadSound() {
    const response = await fetch("pop.mp3");
    const arrayBuffer = await response.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

function playSound() {
    if (!popBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;

    source.connect(audioContext.destination);
    source.start(0);
}

loadSound();

document.addEventListener("pointerdown", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}, { once: true });
