// script.js - Complete Interactive Features for Birthday Surprise

// Configuration
const BIRTHDAY_NAME = "SKY";
const BIRTHDAY_DATE = new Date(new Date().getFullYear(), 5, 10); // June 10 - change as needed

// DOM Elements
let music, celebrateSound, blowSound;
let musicPlaying = false;
let fireworksCanvas, confettiCanvas;
let fireworksCtx, confettiCtx;
let fireworks = [];
let particles = [];

// Initialize everything when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    // Set birthday name everywhere
    document.querySelectorAll(".birthday-name").forEach(el => {
        el.innerText = BIRTHDAY_NAME;
    });
    
    // Initialize audio
    music = document.getElementById("bgMusic");
    celebrateSound = document.getElementById("celebrateSound");
    blowSound = document.getElementById("blowSound");
    
    // Initialize canvases
    fireworksCanvas = document.getElementById("fireworksCanvas");
    confettiCanvas = document.getElementById("confettiCanvas");
    if (fireworksCanvas) {
        fireworksCtx = fireworksCanvas.getContext("2d");
        confettiCtx = confettiCanvas.getContext("2d");
        resizeCanvases();
        window.addEventListener("resize", resizeCanvases);
    }
    
    // Start floating effects
    initFloatingEffects();
    initCursorTrail();
    initScrollProgress();
    initThemeToggle();
    initCountdown();
    initTypingEffect();
    initGallery();
    initTimeline();
    initCarousel();
    initGiftBoxes();
    initFlipCards();
    initQuiz();
    initMemoryWall();
    initVideoMessage();
    initScratchCard();
    initBirthdayCake();
    initCelebrateButton();
    initMusicPlayer();
    initCTAScroll();
    initEnvelopeLetter();
    initSectionAnimations();
    
    // Start background confetti
    startBackgroundConfetti();
});

// Resize canvases
function resizeCanvases() {
    if (fireworksCanvas) {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    }
    if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
}

// Loading screen transition
window.addEventListener("load", () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                loadingScreen.style.display = "none";
                document.getElementById("mainContent").style.display = "block";
                startBackgroundMusicPrompt();
            }, 800);
        }
    }, 2000);
});

// Start music with user interaction
function startBackgroundMusicPrompt() {
    const playMusic = () => {
        if (music && !musicPlaying) {
            music.volume = 0.5;
            music.play().catch(e => console.log("Autoplay prevented"));
            musicPlaying = true;
            const musicBtn = document.getElementById("musicBtn");
            if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        document.removeEventListener("click", playMusic);
        document.removeEventListener("touchstart", playMusic);
    };
    document.addEventListener("click", playMusic);
    document.addEventListener("touchstart", playMusic);
}

// Floating Balloons & Effects
function initFloatingEffects() {
    setInterval(() => {
        const container = document.getElementById("floatingParticles") || document.body;
        const balloon = document.createElement("div");
        const icons = ["🎈", "🎉", "✨", "⭐", "💖", "🎂", "🎁", "🌸"];
        balloon.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        balloon.className = "float-balloon";
        balloon.style.left = Math.random() * 100 + "%";
        balloon.style.fontSize = (Math.random() * 30 + 20) + "px";
        balloon.style.animationDuration = (Math.random() * 6 + 5) + "s";
        balloon.style.animationDelay = Math.random() * 5 + "s";
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 10000);
    }, 1500);
}

// Cursor Trail
function initCursorTrail() {
    const cursor = document.querySelector(".custom-cursor");
    const trailContainer = document.querySelector(".cursor-trail-container");
    
    document.addEventListener("mousemove", (e) => {
        if (cursor) {
            cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        }
        
        // Create trail
        const trail = document.createElement("div");
        trail.className = "cursor-trail";
        trail.style.left = e.clientX + "px";
        trail.style.top = e.clientY + "px";
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 300);
    });
}

// Scroll Progress
function initScrollProgress() {
    window.addEventListener("scroll", () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector(".scroll-progress");
        if (progressBar) progressBar.style.width = scrolled + "%";
    });
}

// Theme Toggle
function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            const icon = toggle.querySelector("i");
            const text = toggle.querySelector(".theme-text");
            if (document.body.classList.contains("dark")) {
                icon.className = "fas fa-sun";
                if (text) text.innerText = "Light";
            } else {
                icon.className = "fas fa-moon";
                if (text) text.innerText = "Dark";
            }
        });
    }
}

// Countdown Timer
function initCountdown() {
    function updateCountdown() {
        const now = new Date();
        let target = new Date(BIRTHDAY_DATE);
        if (now > target) {
            target.setFullYear(target.getFullYear() + 1);
        }
        const diff = target - now;
        
        if (diff <= 0) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            triggerCelebration();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (86400000)) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = mins.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = secs.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Typing Effect
function initTypingEffect() {
    const messages = [
        "✨ You light up every room you enter ✨",
        "🎂 Another year of amazing adventures 🎂",
        "💫 The world is brighter with you in it 💫",
        "🌟 Today we celebrate YOU! 🌟"
    ];
    let msgIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById("typingText");
    
    function type() {
        if (!typingElement) return;
        if (charIndex < messages[msgIndex].length) {
            typingElement.innerHTML = messages[msgIndex].slice(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
            setTimeout(type, 80);
        } else {
            setTimeout(() => {
                charIndex = 0;
                msgIndex = (msgIndex + 1) % messages.length;
                type();
            }, 3000);
        }
    }
    
    type();
}

// Photo Gallery with Lightbox
function initGallery() {
    const galleryImages = [
        { src: "https://picsum.photos/id/20/400/300", caption: "Beautiful moments ✨" },
        { src: "https://picsum.photos/id/22/400/300", caption: "Adventure time 🎒" },
        { src: "https://picsum.photos/id/26/400/300", caption: "Nature love 🌿" },
        { src: "https://picsum.photos/id/28/400/300", caption: "Sunset magic 🌅" },
        { src: "https://picsum.photos/id/30/400/300", caption: "Coffee moments ☕" },
        { src: "https://picsum.photos/id/32/400/300", caption: "Mountain vibes ⛰️" }
    ];
    
    const gallery = document.getElementById("photoGallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    
    if (gallery) {
        galleryImages.forEach(img => {
            const imgElement = document.createElement("img");
            imgElement.src = img.src;
            imgElement.alt = img.caption;
            imgElement.classList.add("gallery-img");
            imgElement.addEventListener("click", () => {
                if (lightboxImg) lightboxImg.src = img.src;
                if (lightboxCaption) lightboxCaption.innerText = img.caption;
                if (lightbox) lightbox.style.display = "flex";
            });
            gallery.appendChild(imgElement);
        });
    }
    
    const closeBtn = document.querySelector(".close-lightbox");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (lightbox) lightbox.style.display = "none";
        });
    }
    
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });
    }
}

// Memory Timeline
function initTimeline() {
    const timelineData = [
        { year: "Childhood", desc: "The beginning of an amazing journey 👶", icon: "🍼" },
        { year: "School Days", desc: "Always the brightest star in class 📚", icon: "✏️" },
        { year: "College Life", desc: "Unforgettable adventures and friendships 🎓", icon: "🎓" },
        { year: "Special Achievements", desc: "So many incredible accomplishments 🏆", icon: "🏆" },
        { year: "Favorite Moments", desc: "Every moment spent with you is precious 💕", icon: "💕" }
    ];
    
    const timeline = document.getElementById("timeline");
    if (timeline) {
        timelineData.forEach(item => {
            const div = document.createElement("div");
            div.className = "timeline-item";
            div.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 2rem;">${item.icon}</span>
                    <div>
                        <h3 style="margin-bottom: 5px;">${item.year}</h3>
                        <p>${item.desc}</p>
                    </div>
                </div>
            `;
            timeline.appendChild(div);
        });
    }
    
    // Intersection Observer for timeline items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll(".timeline-item").forEach(el => observer.observe(el));
}

// Carousel for Wishes
function initCarousel() {
    const wishes = [
        { name: "Emma Watson", msg: "Happy Birthday! You're amazing! 🎉", photo: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "James Wilson", msg: "Wishing you the best day ever! 🎂", photo: "https://randomuser.me/api/portraits/men/2.jpg" },
        { name: "Sophia Lee", msg: "Stay blessed and happy! 💖", photo: "https://randomuser.me/api/portraits/women/3.jpg" },
        { name: "Michael Brown", msg: "Cheers to another wonderful year! 🥂", photo: "https://randomuser.me/api/portraits/men/4.jpg" },
        { name: "Olivia Chen", msg: "You deserve all the happiness! ✨", photo: "https://randomuser.me/api/portraits/women/5.jpg" }
    ];
    
    const track = document.getElementById("carouselTrack");
    const dotsContainer = document.getElementById("carouselDots");
    let currentIndex = 0;
    
    if (track) {
        wishes.forEach((wish, idx) => {
            const card = document.createElement("div");
            card.className = "wish-card";
            card.innerHTML = `
                <img src="${wish.photo}" alt="${wish.name}">
                <h3>${wish.name}</h3>
                <p>${wish.msg}</p>
                <i class="fas fa-heart" style="color: #ff6b6b; margin-top: 10px;"></i>
            `;
            track.appendChild(card);
            
            if (dotsContainer) {
                const dot = document.createElement("div");
                dot.className = "carousel-dot" + (idx === 0 ? " active" : "");
                dot.addEventListener("click", () => goToSlide(idx));
                dotsContainer.appendChild(dot);
            }
        });
    }
    
    function goToSlide(index) {
        if (!track) return;
        currentIndex = index;
        const cardWidth = 305; // 280px + 25px gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        document.querySelectorAll(".carousel-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }
    
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + wishes.length) % wishes.length;
            goToSlide(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % wishes.length;
            goToSlide(currentIndex);
        });
    }
}

// Interactive Gift Boxes
function initGiftBoxes() {
    const giftsData = [
        { icon: "🎁", title: "Surprise Message", message: "✨ You are the most wonderful person I know! Keep shining bright! ✨" },
        { icon: "📸", title: "Photo Reveal", message: "📸 Your smile lights up the whole world! Never stop being amazing! 📸" },
        { icon: "😂", title: "Funny Memory", message: "😂 Remember that time we laughed so hard we cried? More memories to come! 😂" },
        { icon: "🤫", title: "Secret Wish", message: "🤫 My secret wish: May all your dreams come true, today and always! 🤫" },
        { icon: "💌", title: "Special Note", message: "💌 You are loved more than words can express. Happy Birthday! 💌" }
    ];
    
    const grid = document.getElementById("giftsGrid");
    const modal = document.getElementById("giftModal");
    const modalMessage = document.getElementById("giftMessage");
    const closeModal = document.querySelector(".close-modal");
    
    if (grid) {
        giftsData.forEach((gift, idx) => {
            const box = document.createElement("div");
            box.className = "gift-box";
            box.innerHTML = `
                <i class="fas fa-gift"></i>
                <p>Gift ${idx + 1}</p>
                <div style="font-size: 1.5rem; margin-top: 5px;">${gift.icon}</div>
            `;
            box.addEventListener("click", () => {
                if (modalMessage) modalMessage.innerText = gift.message;
                if (modal) modal.style.display = "flex";
                createConfettiBurst();
            });
            grid.appendChild(box);
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            if (modal) modal.style.display = "none";
        });
    }
    
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }
}

// Flip Cards
function initFlipCards() {
    const qualities = ["Kind", "Caring", "Supportive", "Funny", "Inspirational", "Creative", "Strong", "Amazing"];
    const grid = document.getElementById("flipGrid");
    
    if (grid) {
        qualities.forEach(quality => {
            const card = document.createElement("div");
            card.className = "flip-card";
            card.innerHTML = `
                <div class="flip-inner">
                    <div class="flip-front">
                        <i class="fas fa-heart" style="font-size: 2rem; margin-bottom: 10px;"></i><br>
                        ${quality}
                    </div>
                    <div class="flip-back">
                        You are so ${quality.toLowerCase()}! ❤️
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

// Birthday Quiz
function initQuiz() {
    const quizQuestions = [
        {
            question: `What is ${BIRTHDAY_NAME}'s favorite color?`,
            options: ["Blue", "Pink", "Purple", "All colors!"],
            correct: 3
        },
        {
            question: `What does ${BIRTHDAY_NAME} love most?`,
            options: ["Travel", "Music", "Food", "All of the above!"],
            correct: 3
        },
        {
            question: `What is ${BIRTHDAY_NAME}'s superpower?`,
            options: ["Making people smile", "Solving problems", "Being kind", "All of these!"],
            correct: 3
        }
    ];
    
    const container = document.getElementById("quizContainer");
    const resultDiv = document.getElementById("quizResult");
    let currentQuestion = 0;
    let score = 0;
    
    function loadQuestion() {
        if (!container) return;
        const q = quizQuestions[currentQuestion];
        let html = `<div class="quiz-question">${q.question}</div>`;
        q.options.forEach((opt, idx) => {
            html += `
                <div class="quiz-option" data-opt="${idx}">
                    <input type="radio" name="quiz" value="${idx}" id="opt${idx}">
                    <label for="opt${idx}">${opt}</label>
                </div>
            `;
        });
        html += `<button id="nextQuizBtn" style="margin-top: 20px; padding: 10px 30px; background: #ff6b6b; border: none; border-radius: 50px; color: white; cursor: pointer;">Next →</button>`;
        container.innerHTML = html;
        
        document.querySelectorAll(".quiz-option").forEach(opt => {
            opt.addEventListener("click", () => {
                const radio = opt.querySelector("input");
                if (radio) radio.checked = true;
            });
        });
        
        const nextBtn = document.getElementById("nextQuizBtn");
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                const selected = document.querySelector('input[name="quiz"]:checked');
                if (selected) {
                    if (parseInt(selected.value) === q.correct) score++;
                    currentQuestion++;
                    if (currentQuestion < quizQuestions.length) {
                        loadQuestion();
                    } else {
                        showResult();
                    }
                } else {
                    alert("Please select an answer!");
                }
            });
        }
    }
    
    function showResult() {
        if (!resultDiv) return;
        const percentage = (score / quizQuestions.length) * 100;
        let message = "";
        if (percentage === 100) {
            message = "🎉 Perfect score! You know them so well! You're an amazing friend! 🎉";
            createConfettiBurst();
        } else if (percentage >= 66) {
            message = "🌟 Great job! You really care about them! 🌟";
        } else {
            message = "💕 Awww, time to learn more about this wonderful person! 💕";
        }
        resultDiv.innerHTML = `<div style="background: rgba(255,107,107,0.2); padding: 20px; border-radius: 15px;">
            <h3>Your Score: ${score}/${quizQuestions.length}</h3>
            <p>${message}</p>
        </div>`;
        container.innerHTML = "";
        if (percentage === 100) {
            triggerCelebration();
        }
    }
    
    if (container) loadQuestion();
}

// Memory Wall
function initMemoryWall() {
    let memories = [
        "Wishing you the happiest birthday! 🎂 - Alex",
        "You're the best! Stay blessed! 💖 - Sarah",
        "Can't wait to celebrate with you! 🎉 - Mike",
        "You inspire me every day! ✨ - Jessica"
    ];
    
    const wall = document.getElementById("memoryWall");
    const input = document.getElementById("memoryInput");
    const addBtn = document.getElementById("addMemoryBtn");
    
    function renderWall() {
        if (!wall) return;
        wall.innerHTML = "";
        memories.forEach((memory, idx) => {
            const note = document.createElement("div");
            note.className = "memory-note";
            note.style.setProperty("--rotation", (Math.random() * 4 - 2) + "deg");
            note.innerHTML = `
                <i class="fas fa-quote-left" style="opacity: 0.5;"></i>
                <p style="margin: 10px 0;">${memory}</p>
                <i class="fas fa-heart" style="color: #ff6b6b; font-size: 0.8rem;"></i>
            `;
            note.addEventListener("click", () => {
                if (confirm("Delete this memory?")) {
                    memories.splice(idx, 1);
                    renderWall();
                }
            });
            wall.appendChild(note);
        });
    }
    
    if (addBtn && input) {
        addBtn.addEventListener("click", () => {
            if (input.value.trim()) {
                memories.unshift(input.value.trim());
                renderWall();
                input.value = "";
                createConfettiBurst();
            }
        });
    }
    
    renderWall();
}

// Video Message
function initVideoMessage() {
    const placeholder = document.getElementById("videoPlaceholder");
    const iframe = document.getElementById("birthdayVideo");
    const frame = document.getElementById("videoFrame");
    
    if (placeholder) {
        placeholder.addEventListener("click", () => {
            if (iframe) {
                iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
                iframe.style.display = "block";
                placeholder.style.display = "none";
            }
        });
    }
}

// Scratch Card
function initScratchCard() {
    const canvas = document.getElementById("scratchCanvas");
    const message = document.getElementById("scratchMessage");
    const resetBtn = document.getElementById("resetScratchBtn");
    
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    
    function initCanvas() {
        canvas.width = 350;
        canvas.height = 180;
        ctx.fillStyle = "#888";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#aaa";
        ctx.font = "bold 20px 'Inter'";
        ctx.fillText("✨ SCRATCH ME ✨", 110, 95);
        ctx.fillStyle = "#666";
        ctx.font = "12px 'Inter'";
        ctx.fillText("~ drag mouse to scratch ~", 105, 130);
        if (message) message.innerText = "🎁 You are a wonderful person! Keep shining! 🎁";
    }
    
    function scratch(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        let x, y;
        if (e.touches) {
            x = (e.touches[0].clientX - rect.left) * scaleX;
            y = (e.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (e.clientX - rect.left) * scaleX;
            y = (e.clientY - rect.top) * scaleY;
        }
        
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
    }
    
    canvas.addEventListener("mousedown", () => { isDrawing = true; });
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", () => { isDrawing = false; });
    canvas.addEventListener("mouseleave", () => { isDrawing = false; });
    
    canvas.addEventListener("touchstart", (e) => { isDrawing = true; scratch(e); e.preventDefault(); });
    canvas.addEventListener("touchmove", scratch);
    canvas.addEventListener("touchend", () => { isDrawing = false; });
    
    if (resetBtn) {
        resetBtn.addEventListener("click", initCanvas);
    }
    
    initCanvas();
}

// Birthday Cake
function initBirthdayCake() {
    const candlesContainer = document.getElementById("candles");
    const blowBtn = document.getElementById("blowCandleBtn");
    const cutBtn = document.getElementById("cutCakeBtn");
    
    function createCandles() {
        if (!candlesContainer) return;
        candlesContainer.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const candle = document.createElement("div");
            candle.className = "candle";
            const flame = document.createElement("div");
            flame.className = "flame";
            candle.appendChild(flame);
            candle.addEventListener("click", (e) => {
                e.stopPropagation();
                if (flame.style.display !== "none") {
                    flame.style.display = "none";
                    createConfettiBurst();
                }
            });
            candlesContainer.appendChild(candle);
        }
    }
    
    function blowCandles() {
        const flames = document.querySelectorAll(".flame");
        flames.forEach(flame => {
            flame.style.animation = "none";
            flame.style.opacity = "0";
            setTimeout(() => { flame.style.display = "none"; }, 100);
        });
        if (blowSound) blowSound.play();
        createConfettiBurst();
    }
    
    function cutCake() {
        createHeavyConfetti();
        if (celebrateSound) celebrateSound.play();
        alert("🎂 Happy Birthday! May your year be as sweet as this cake! 🎂");
        triggerCelebration();
    }
    
    if (blowBtn) blowBtn.addEventListener("click", blowCandles);
    if (cutBtn) cutBtn.addEventListener("click", cutCake);
    
    createCandles();
}

// Celebrate Button & Fireworks
function initCelebrateButton() {
    const celebrateBtn = document.getElementById("celebrateBtn");
    if (celebrateBtn) {
        celebrateBtn.addEventListener("click", () => {
            triggerCelebration();
            startFireworks();
        });
    }
}

function triggerCelebration() {
    createHeavyConfetti();
    if (celebrateSound) celebrateSound.play();
    // Create floating balloons
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const balloon = document.createElement("div");
            balloon.innerHTML = ["🎈", "🎉", "✨", "🎂"][Math.floor(Math.random() * 4)];
            balloon.style.position = "fixed";
            balloon.style.left = Math.random() * 100 + "%";
            balloon.style.bottom = "-50px";
            balloon.style.fontSize = "40px";
            balloon.style.zIndex = "9999";
            balloon.style.animation = "floatUp 4s ease-out forwards";
            document.body.appendChild(balloon);
            setTimeout(() => balloon.remove(), 4000);
        }, i * 100);
    }
}

function startFireworks() {
    if (!fireworksCtx) return;
    let particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 5,
            life: 1,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`
        });
    }
    
    function animate() {
        if (!fireworksCtx) return;
        fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        let allDead = true;
        particles.forEach(p => {
            if (p.life > 0) {
                allDead = false;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2;
                p.life -= 0.02;
                fireworksCtx.beginPath();
                fireworksCtx.arc(p.x, p.y, 4 * p.life, 0, Math.PI * 2);
                fireworksCtx.fillStyle = p.color;
                fireworksCtx.fill();
            }
        });
        if (!allDead) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Confetti Effects
function createConfettiBurst() {
    if (!confettiCtx) return;
    const confettiParticles = [];
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: Math.random() * window.innerWidth,
            y: -10,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 8 + 5,
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            life: 1
        });
    }
    
    function animateConfetti() {
        if (!confettiCtx) return;
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        let alive = false;
        confettiParticles.forEach(p => {
            if (p.life > 0) {
                alive = true;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2;
                p.life -= 0.01;
                confettiCtx.fillStyle = p.color;
                confettiCtx.fillRect(p.x, p.y, p.size, p.size);
            }
        });
        if (alive) requestAnimationFrame(animateConfetti);
    }
    animateConfetti();
}

function createHeavyConfetti() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createConfettiBurst(), i * 100);
    }
}

function startBackgroundConfetti() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            createConfettiBurst();
        }
    }, 8000);
}

// Music Player
function initMusicPlayer() {
    const musicBtn = document.getElementById("musicBtn");
    const volumeSlider = document.getElementById("volumeSlider");
    
    if (musicBtn) {
        musicBtn.addEventListener("click", () => {
            if (musicPlaying) {
                music.pause();
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
                musicPlaying = false;
            } else {
                music.play();
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicPlaying = true;
            }
        });
    }
    
    if (volumeSlider && music) {
        volumeSlider.addEventListener("input", (e) => {
            music.volume = e.target.value;
        });
    }
}

// CTA Scroll
function initCTAScroll() {
    const ctaBtn = document.getElementById("ctaBtn");
    if (ctaBtn) {
        ctaBtn.addEventListener("click", () => {
            const countdownSection = document.getElementById("countdownSection");
            if (countdownSection) {
                countdownSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}

// Envelope Letter
function initEnvelopeLetter() {
    const envelope = document.getElementById("envelope");
    const letterPaper = document.getElementById("letterPaper");
    const typewriterDiv = document.getElementById("typewriterLetter");
    
    const letterMessage = `Dear ${BIRTHDAY_NAME},
    
On this special day, I want you to know how truly amazing you are. You bring so much joy, laughter, and love into this world.

Every day with you is a gift, and I'm so grateful to have you in my life. May this year bring you everything you've ever wished for and more.

Keep shining, keep dreaming, and never forget how loved you are.

Happy Birthday, beautiful soul! 🎂✨

With all my love,
Someone who adores you 💕`;
    
    if (envelope) {
        envelope.addEventListener("click", () => {
            envelope.classList.add("open");
            let i = 0;
            function typeLetter() {
                if (i < letterMessage.length && typewriterDiv) {
                    typewriterDiv.innerHTML += letterMessage.charAt(i);
                    i++;
                    setTimeout(typeLetter, 30);
                }
            }
            typeLetter();
        });
    }
}

// Section Animations on Scroll
function initSectionAnimations() {
    const sections = document.querySelectorAll(".section-container");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1, rootMargin: "50px" });
    
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease";
        observer.observe(section);
    });
}

// Helper Functions
function triggerCelebration() {
    createHeavyConfetti();
    startFireworks();
    if (celebrateSound) celebrateSound.play();
}