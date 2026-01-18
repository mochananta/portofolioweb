tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                accent: '#8b5cf6',
                accent2: '#06b6d4',
            }
        }
    }
}

const cat = document.getElementById("cat-cursor");

// posisi awal
let mouseX = 0, mouseY = 0;
let catX = 0, catY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// smooth follow
function animate() {
    const speed = 0.15; // semakin besar semakin cepat mengikuti

    catX += (mouseX - catX) * speed;
    catY += (mouseY - catY) * speed;

    cat.style.transform = `translate(${catX}px, ${catY}px)`;

    requestAnimationFrame(animate);
}

animate();

function scrollNext() {
    document.querySelector('#portfolio').scrollIntoView({
        behavior: 'smooth'
    });
}

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// Animasi progress bar
document.querySelectorAll(".progress-bar").forEach(bar => {
    const value = bar.getAttribute("data-value");
    bar.style.width = "0%";
    setTimeout(() => {
        bar.style.transition = "width 1.4s cubic-bezier(.4,.0,.2,1)";
        bar.style.width = value + "%";
    }, 200);
});

document.getElementById("year").textContent = new Date().getFullYear();

AOS.init({
    duration: 900,
    once: true,
    offset: 80
});

document.addEventListener("DOMContentLoaded", () => {
    const bars = document.querySelectorAll(".progress-bar");

    bars.forEach(bar => {
        const value = bar.getAttribute("data-value");
        bar.style.width = "0%";

        setTimeout(() => {
            bar.style.transition = "width 1.7s cubic-bezier(0.4, 0, 0.2, 1)";
            bar.style.width = value + "%";
        }, 300);
    });
});

// Init AOS
AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Typing effect
const phrases = ['Building Laravel Applications', 'open to collaborations', 'Improving User Experience', 'Designing UI with Tailwind', 'Working on API & Automation', 'happy to build with you'];
let tIdx = 0, tChar = 0, tForward = true;
const typeEl = document.getElementById('type');
function tick() {
    const cur = phrases[tIdx];
    if (tForward) {
        typeEl.textContent = cur.slice(0, ++tChar);
        if (tChar === cur.length) { tForward = false; setTimeout(tick, 1100); return; }
    } else {
        typeEl.textContent = cur.slice(0, --tChar);
        if (tChar === 0) { tForward = true; tIdx = (tIdx + 1) % phrases.length; }
    }
    setTimeout(tick, tForward ? 80 : 30);
}
tick();

/* ---------------------------------------------------
    🌙 SMOOTH THEME TOGGLE (Baru)
----------------------------------------------------- */

const toggle = document.getElementById("themeToggle");
const circle = document.getElementById("toggleCircle");
const iconSun = document.getElementById("iconSun");
const iconMoon = document.getElementById("iconMoon");

function setTheme(theme) {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
        circle.style.transform = "translateX(28px)";
        iconMoon.classList.remove("opacity-0");
        iconSun.classList.add("opacity-0");
        iconSun.classList.add("hidden");
        iconMoon.classList.remove("hidden");
    } else {
        document.documentElement.classList.remove("dark");
        circle.style.transform = "translateX(0px)";
        iconSun.classList.remove("opacity-0");
        iconMoon.classList.add("opacity-0");
        iconMoon.classList.add("hidden");
        iconSun.classList.remove("hidden");
    }
}

// Init theme
(function () {
    const saved = localStorage.getItem("theme");
    if (saved) return setTheme(saved);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
})();

toggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
});

/* ---------------------------------------------------
    END OF SMOOTH THEME TOGGLE
----------------------------------------------------- */

// Contact form demo
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.submitter || e.target.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Mengirim...';
    setTimeout(() => { btn.disabled = false; btn.textContent = 'Kirim Pesan'; alert('Pesan terkirim! (Demo — tambahkan backend untuk produksi)'); }, 900);
});

// Lenis smooth scroll
const lenis = new Lenis({ lerp: 0.08, smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// GSAP micro animations
gsap.from('.glass', { opacity: 0, y: 18, stagger: 0.06, duration: 0.7, ease: 'power3.out' });

// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth, H = canvas.height = innerHeight;
window.addEventListener('resize', () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; initParticles(); });

let particles = [];
function initParticles() {
    particles = [];
    const count = Math.max(8, Math.floor((W * H) / 90000));
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2.5 + 0.6,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            alpha: Math.random() * 0.6 + 0.05
        });
    }
}
initParticles();

function draw() {
    ctx.clearRect(0, 0, W, H);
    const particleColor = getComputedStyle(document.documentElement).getPropertyValue('--particle') || 'rgba(139,92,246,0.08)';
    for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
    }
    requestAnimationFrame(draw);
}
draw();

// accessibility: show focus when tabbing
document.addEventListener('keydown', (e) => { if (e.key === 'Tab') document.body.classList.add('show-focus'); });

const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        toTop.classList.remove("hidden");
        toTop.classList.add("opacity-100");
    } else {
        toTop.classList.add("hidden");
        toTop.classList.remove("opacity-100");
    }
});

toTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

function openCert(src) {
    document.getElementById('certImage').src = src;
    document.getElementById('certModal').classList.remove('hidden');
    document.getElementById('certModal').classList.add('flex');
}

function closeCert() {
    document.getElementById('certModal').classList.add('hidden');
    document.getElementById('certModal').classList.remove('flex');
}

