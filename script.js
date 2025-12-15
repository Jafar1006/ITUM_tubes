document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    loadData();
});

// --- RENDER HERO (GAMBAR SLIDER, TEKS STATIS + TOMBOL LINK) ---

function renderHero(slides) {
    const bgWrapper = document.getElementById('hero-bg-wrapper');
    const staticContent = document.getElementById('hero-static-content');
    
    if (!bgWrapper || !staticContent || slides.length === 0) return;

    // 1. Render Background Images ke Swiper
    bgWrapper.innerHTML = '';
    slides.forEach(slide => {
        bgWrapper.innerHTML += `
            <div class="swiper-slide w-full h-full bg-cover bg-center bg-no-repeat"
                 style='background-image: url("${slide.image}");'>
            </div>
        `;
    });

    // 2. Render Teks Statis & Tombol Link
    const content = slides[0]; 
    staticContent.innerHTML = `
        <h1 class="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg">
            ${content.title}
        </h1>
        <p class="text-white text-sm md:text-lg font-normal leading-normal drop-shadow-md">
            ${content.subtitle}
        </p>
        
        <a href="#work" class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg mt-4">
            <span class="truncate">${content.ctaText}</span>
        </a>
    `;

    initHeroSwiper();
}

// --- RENDER PRODUK ---
// --- RENDER PRODUK (KARTU LEBIH BESAR) ---
function createProductSlide(product) {
    return `
        <div class="swiper-slide h-auto p-1">
            <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col group cursor-pointer hover:shadow-2xl transition-all duration-300">
                <div class="relative overflow-hidden aspect-[3/4]">
                    <img src="${product.image}" alt="${product.alt || product.name}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                    <div class="absolute bottom-0 left-0 p-5 w-full">
                        <p class="text-white text-lg font-bold leading-tight drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            ${product.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}           

function renderProductSlides(products) {
    const wrapper = document.getElementById('product-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = ''; 
    products.forEach(product => wrapper.innerHTML += createProductSlide(product));
    initProductSwiper();
}

// --- RENDER ABOUT US ---
function createAboutSlide(item) {
    return `
        <div class="swiper-slide">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mx-1 my-1">
                <div class="grid md:grid-cols-2 gap-0">
                    <div class="w-full h-64 md:h-[400px] relative overflow-hidden">
                        <img class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="${item.image}" alt="${item.title}"/>
                    </div>
                    <div class="flex flex-col justify-center p-8 md:p-12 gap-4">
                        <div class="w-12 h-1 bg-primary rounded-full mb-2"></div>
                        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">${item.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed text-justify">
                            ${item.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAboutSlides(slides) {
    const wrapper = document.getElementById('about-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = '';
    slides.forEach(slide => wrapper.innerHTML += createAboutSlide(slide));
    initAboutSwiper();
}

// --- INISIALISASI SWIPER ---
function initHeroSwiper() {
    new Swiper(".hero-swiper", {
        slidesPerView: 1,
        loop: true,
        effect: "fade", 
        speed: 1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: false, 
    });
}

function initProductSwiper() {
    new Swiper(".product-swiper", {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
        },
        breakpoints: {
            640: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 28 },
        },
    });
}

function initAboutSwiper() {
    new Swiper(".about-swiper", {
        slidesPerView: 1,
        spaceBetween: 40,
        effect: "fade", 
        fadeEffect: { crossFade: true },
        autoHeight: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

// --- LOAD DATA ---
async function loadData() {
    try {
        const response = await fetch('./data.json', { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (data.heroSlides) renderHero(data.heroSlides);
        if (data.products) renderProductSlides(data.products);
        if (data.aboutSlides) renderAboutSlides(data.aboutSlides);

    } catch (error) {
        console.error("Error loading data:", error);
    }
}