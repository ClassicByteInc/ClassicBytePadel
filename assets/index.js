// 图片路径数组
const heroImages = [
    './img/p1.png',
    './img/p2.jpg',
    './img/p3.png',
    './img/p4.jpg',
    './img/p5.jpg',
    './img/p6.jpg',
    './img/p7.jpg',
    './img/p8.jpg',
    './img/p9.jpg',
    './img/p10.jpg',
    './img/p11.jpg',
    './img/p12.jpg'
];
let heroIndex = 0;
const bgCurrent = document.querySelector('.hero-bg-current');
const bgNext = document.querySelector('.hero-bg-next');

function setHeroBg(idx, el) {
    el.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('${heroImages[idx]}')`;
}

// 初始化
setHeroBg(heroIndex, bgCurrent);

setInterval(() => {
    const nextIndex = (heroIndex + 1) % heroImages.length;
    setHeroBg(nextIndex, bgNext);
    bgNext.style.opacity = 1;
    // 渐变完成后切换
    setTimeout(() => {
        setHeroBg(nextIndex, bgCurrent);
        bgNext.style.opacity = 0;
        heroIndex = nextIndex;
    }, 1200);
}, 3500);

// 渐进显示img目录下的图片
const aboutGalleryImages = [
    './img/p1.png',
    './img/p2.jpg',
    './img/p3.png',
    './img/p4.jpg',
    './img/p5.jpg',
    './img/p6.jpg',
    './img/p7.jpg',
    './img/p8.jpg',
    './img/p9.jpg',
    './img/p10.jpg',
    './img/p11.jpg',
    './img/p12.jpg'
];
let aboutGalleryIdx = 0;
const aboutGalleryEl = document.getElementById('about-gallery-img');
function showAboutGalleryImg(idx) {
    aboutGalleryEl.style.opacity = 0;
    setTimeout(() => {
        aboutGalleryEl.style.backgroundImage = `url('${aboutGalleryImages[idx]}')`;
        aboutGalleryEl.style.opacity = 1;
    }, 400);
}
showAboutGalleryImg(aboutGalleryIdx);
setInterval(() => {
    aboutGalleryIdx = (aboutGalleryIdx + 1) % aboutGalleryImages.length;
    showAboutGalleryImg(aboutGalleryIdx);
}, 2500);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .Project-item, .about-text, .about-image').forEach(el => {
    observer.observe(el);
});

// Simple form handler (no backend, just UI feedback)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    // 发送后立即关闭连接（fetch本身是短连接，发送后自动关闭，无需手动关闭）
    fetch('https://132.232.242.101:54258/api/jsonreceiver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)// 明确不保持连接
    }).catch(() => { });
    this.reset();
    document.getElementById('formSuccess').style.display = 'block';
    setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 35000);
});