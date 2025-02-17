window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const counter = document.getElementById("counter");
    const bgMusic = document.getElementById("bgMusic");
    const volumeControl = document.getElementById("volumeControl");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pacman = { x: canvas.width / 2, y: canvas.height / 2, size: 30, angle: 0 };
    let dots = [];
    let ballsEaten = 0;
    let isDragging = false; // To track if the slider is being dragged

    // Start music
    bgMusic.volume = 0.5; // Default volume
    bgMusic.play().catch(err => console.log("Autoplay blocked:", err));

    // Volume control event listener
    volumeControl.addEventListener("input", function () {
        bgMusic.volume = this.value;
    });

    // Prevent Pac-Man movement when interacting with volume slider
    volumeControl.addEventListener("mousedown", () => {
        isDragging = true;
    });

    volumeControl.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Function to spawn dots randomly
    function spawnDot() {
        dots.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
        setTimeout(spawnDot, 1000);
    }
    spawnDot();

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) { // Ignore movement if adjusting volume
            pacman.x = e.clientX;
            pacman.y = e.clientY;
        }
    });

    function drawPacman() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pacman.angle = (pacman.angle + 0.1) % (Math.PI * 2);
        let mouthOpen = Math.abs(Math.sin(pacman.angle)) * 0.3;

        // Draw Pac-Man
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(pacman.x, pacman.y, pacman.size, mouthOpen, Math.PI * 2 - mouthOpen);
        ctx.lineTo(pacman.x, pacman.y);
        ctx.fill();

        // Draw and check collision with dots
        for (let i = 0; i < dots.length; i++) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(dots[i].x, dots[i].y, 5, 0, Math.PI * 2);
            ctx.fill();

            let dx = pacman.x - dots[i].x;
            let dy = pacman.y - dots[i].y;
            if (Math.sqrt(dx * dx + dy * dy) < pacman.size) {
                dots.splice(i, 1);
                ballsEaten++;
                counter.textContent = `Balls Eaten: ${ballsEaten}`;
                i--;
            }
        }
        requestAnimationFrame(drawPacman);
    }
    drawPacman();
};
