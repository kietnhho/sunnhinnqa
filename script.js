const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");

let w, h;
function resize() {
    w = starsCanvas.width = window.innerWidth;
    h = starsCanvas.height = window.innerHeight;
}
window.addEventListener("resize",resize);
resize();

const stars = [];
const STAR_COUNT = 500;
for (let i =0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 3 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005
    });
}

function drawStars() {
    starsCtx.clearRect(0, 0, w, h);
    starsCtx.fillStyle = "white";
    stars.forEach(star => {
        star.alpha += star.delta;
        if (star.apha <= 0 || star.apha >= 1) star.delta = -star.delta;
        starsCtx.globalApha = star.alpha;
        starsCtx.beginPath();
        starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starsCtx.fill();
    });
    starsCtx.globalApha = 1;
    requestAnimationFrame(drawStars);
}
drawStars();

const constellation = [
    {
        name: "Scorpio",
        image: "Scorpio.png",
        description: "Hi Qa nè , tớ nhớ không nhầm nay là sinh nhật lần thứ 18 của Qa đúng không nè ? Chúc Qa bước sang tuổi mới có thật nhiều niềm vui , hạnh phúc , chúc cho con đường học tập của Qa luôn suôn sẻ , có nhiều sức khỏe , tất cả những điều tốt lành nhất luôn đến với Qa . Hi vọng cuộc sống của Qa sẽ tràn đầy nắng ấm , mong Qa sẽ luôn nở nụ cười trên môi và bước qua những điều tiêu cực ở phía trước , mong những chuyện tồi tệ chẳng thể làm hao mòn , quật ngã Qa nha . Với tớ thì Qa xinh rồi nè , mong là mắt Qa sẽ bớt đỏ vào ban đêm và bớt sưng khi trời sáng , nên là hãy luôn đỏ môi chứ đừng đỏ mắt nhé!"
    }
];

let currentIndex = 0;
const Image = document.getElementById("Image");
const Name = document.getElementById("Name");
const Description = document.getElementById("Description");

let typingTimeout;

function typeWriter(text, element, callback) {
    element.textContent = "";
    element.style.opacity = 1;

    let i = 0;
    const speed = 50;

    if (typingTimeout) {
        clearTimeout(typingTimeout);
    }

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, speed);
        } else {
            typingTimeout = null;
            if (callback) callback();
        }
    }

    type();
}

function updateConstellationImage() {
    Image.style.opacity = 0;
    Name.style.opacity = 0;
    Description.style.opacity = 0;

    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    Description.textContent = "";

    setTimeout(() => {
        const data = constellation[currentIndex];
        Image.src = data.image;
        Name.textContent = data.name;

        Image.onload = () => {
            Image.style.opacity = 1;
            Name.style.opacity = 1;
            Description.style.opacity = 0; // 1 or 0 vẫn ổn

            Image.onclick = null;

            Image.onclick = () => {
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                    typingTimeout = null;
                }
                Description.textContent = "";
                Description.style.opacity = 1;
                typeWriter(data.description, Description); 
            };
        };
    }, 500);
}

function goToNext() {
    currentIndex = (currentIndex + 1) % constellation.length;
    updateConstellationImage();
}

function goToPrevious() {
    currentIndex = (currentIndex - 1 + constellation.length) % constellation.length;
    updateConstellationImage()
}

document.getElementById("previous").onclick = goToPrevious;
document.getElementById("next").onclick =goToNext;

let scrollCooldown = false;
window.addEventListener("wheel", (e) => {
    if (scrollCooldown) return;
    if (e.deltaY > 0) goToNext();
    else goToPrevious();
    scrollCooldown = true;
    setTimeout(() => scrollCooldown = false, 1000);
});

function createMeteor() {
    const meteor = document.createElement("div");
    meteor,className = "meteor";
    meteor.style.top = Math.random() * window.innerHeight * 1 + "px";
    meteor.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(meteor);
    setTimeout(() => meteor.remove(), 1000);
}

function launchMeteorLoop() {
    createMeteor();
    const nextMeteorDelay = Math.random() * 2000 + 500;
    setTimeout(launchMeteorLoop, nextMeteorDelay);
}

launchMeteorLoop();

updateConstellationImage();
function createBurstStars(x, y) {
const burstCount = 20;
for (let i = 0; i < burstCount; i++) {
    const star = document.createElement("div");
    star.className = "burst-star";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    star.animate([
        { transform: `translate(0 ,0)`, opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
    ], {
       duration: 800,
       easing: "ease-out",
       fill: "forwards"  
    });

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 800);
}
}

// Gọi hàm khi chạm hoặc click
window.addEventListener("click", (e) => {
    createBurstStars(e.clientX, e.clientY);
});
