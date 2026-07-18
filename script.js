const dino = document.getElementById("dino");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;

async function loadSound() {
    const response = await fetch("pop.mp3");
    const arrayBuffer = await response.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

loadSound();

document.addEventListener("pointerdown", () => {
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }
}, { once: true });

function playSound() {
    if (!popBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}

// 누를 때
function press() {
    dino.src = "dino2.png";
    playSound();
}

// 뗄 때
function release() {
    dino.src = "dino1.png";
}

dino.addEventListener("pointerdown", press);
dino.addEventListener("pointerup", release);
dino.addEventListener("pointerleave", release);
dino.addEventListener("pointercancel", release);