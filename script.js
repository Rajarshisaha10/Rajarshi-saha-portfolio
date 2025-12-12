// Console Easter Egg
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cLooking for opportunities? Let\'s talk!', 'font-size: 14px; color: #764ba2;');

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// THREE.JS Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("canvas-container").appendChild(renderer.domElement);

camera.position.z = 5;

// Particle System
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x667eea,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Shapes
const shapes = [];
const geometries = [
    new THREE.TorusGeometry(0.7, 0.2, 16, 100),
    new THREE.OctahedronGeometry(0.8),
    new THREE.IcosahedronGeometry(0.8),
    new THREE.TetrahedronGeometry(0.8)
];

for (let i = 0; i < 12; i++) {
    const mesh = new THREE.Mesh(
        geometries[Math.floor(Math.random() * geometries.length)],
        new THREE.MeshPhongMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.6,
            wireframe: Math.random() > 0.5
        })
    );

    mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );

    mesh.userData = {
        rx: Math.random() * 0.01,
        ry: Math.random() * 0.01
    };

    scene.add(mesh);
    shapes.push(mesh);
}

scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const pointLight = new THREE.PointLight(0x764ba2, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Mouse interaction
let mouseXPos = 0, mouseYPos = 0;
document.addEventListener('mousemove', (e) => {
    mouseXPos = (e.clientX / window.innerWidth) * 2 - 1;
    mouseYPos = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;

    // Animate shapes
    shapes.forEach(s => {
        s.rotation.x += s.userData.rx;
        s.rotation.y += s.userData.ry;
    });

    // Camera follows mouse
    camera.position.x += (mouseXPos * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseYPos * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Theme Toggle
const toggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
    document.body.classList.add("light");
    toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const light = document.body.classList.contains("light");
    toggle.textContent = light ? "☀️" : "🌙";
    localStorage.setItem("theme", light ? "light" : "dark");
});

// Scroll Reveal
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("active");
            }, index * 100);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);
});

// Form Submit
function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    e.target.reset();
}

// Project Card Click Handler
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const projectId = this.getAttribute('data-project');
        openModal(projectId);
    });
});

function openModal(projectId) {
    const modal = document.getElementById('modal-' + projectId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(projectId) {
    const modal = document.getElementById('modal-' + projectId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal on outside click
document.querySelectorAll('.project-modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.project-modal').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});