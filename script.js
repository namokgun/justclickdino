const dino = document.getElementById("dino");

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

let popBuffer;

// 효과음 불러오기
async function loadSound() {
    const response = await fetch("pop.mp3");
    const arrayBuffer = await response.arrayBuffer();
    popBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

loadSound();

// 첫 터치 시 오디오 활성화
document.addEventListener("pointerdown", async () => {
    if (audioContext.state === "suspended") {
        await audioContext.resume();
    }
}, { once: true });

// 효과음 재생
function playSound() {
    if (!popBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = popBuffer;
    source.connect(audioContext.destination);
    source.start();
}

// 누를 때
function press(e) {
    e.preventDefault();

    dino.blur(); // 포커스 제거

    dino.src = "dino2.png";
    playSound();
}

// 뗄 때
function release(e) {
    if (e) e.preventDefault();

    dino.src = "dino1.png";
}

// 이벤트 등록
dino.addEventListener("pointerdown", press);
dino.addEventListener("pointerup", release);
dino.addEventListener("pointerleave", release);
dino.addEventListener("pointercancel", release);

// 드래그 및 우클릭 방지
dino.addEventListener("dragstart", e => e.preventDefault());
dino.addEventListener("contextmenu", e => e.preventDefault());