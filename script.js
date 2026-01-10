import { Analytics } from '@vercel/analytics/next';
 
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
 
export default MyApp;
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
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

    // 2. Close Modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeFullscreen();
    });

    // 3. Close Modal on Click Outside Image
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.relative') === null) {
                closeFullscreen();
            }
        });
    }

    // 4. ANIMASI SCROLL REVEAL (BARU)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Panggil sekali di awal untuk elemen yang sudah terlihat
    revealOnScroll();

    loadData();
});

// --- LOGIKA MODAL FULLSCREEN ---
function openFullscreen(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('fullscreen-image');
    
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalImg.classList.remove('scale-95');
            modalImg.classList.add('scale-100');
        }, 10);
        document.body.classList.add('overflow-hidden');
    }
}

function closeFullscreen() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('fullscreen-image');
    
    if (modal && modalImg) {
        modal.classList.add('opacity-0');
        modalImg.classList.remove('scale-100');
        modalImg.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modalImg.src = '';
        }, 300);
        document.body.classList.remove('overflow-hidden');
    }
}


// --- RENDER HERO ---
function renderHero(slides) {
    const bgWrapper = document.getElementById('hero-bg-wrapper');
    const staticContent = document.getElementById('hero-static-content');
    
    if (!bgWrapper || !staticContent || slides.length === 0) return;

    bgWrapper.innerHTML = '';
    slides.forEach(slide => {
        bgWrapper.innerHTML += `
            <div class="swiper-slide w-full h-full bg-cover bg-center bg-no-repeat"
                 style='background-image: url("${slide.image}");'>
            </div>
        `;
    });

    const content = slides[0]; 
    // Menambahkan class animasi (animate-title, dll)
    staticContent.innerHTML = `
        <h1 class="animate-title text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] drop-shadow-lg">
            ${content.title}
        </h1>
        <p class="animate-subtitle text-white text-sm md:text-lg font-normal leading-normal drop-shadow-md">
            ${content.subtitle}
        </p>
        <a href="#produk" class="animate-btn flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-white hover:text-primary transition-all duration-300 shadow-lg mt-4">
            <span class="truncate">${content.ctaText}</span>
        </a>
    `;

    initHeroSwiper();
}

// --- RENDER PRODUK ---
function createProductSlide(product) {
    // Menambahkan class hover-scale-up pada container
    return `
        <div class="swiper-slide h-auto p-2">
            <div class="hover-scale-up bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col group transition-all duration-300 hover:shadow-2xl">
                
                <div class="relative overflow-hidden aspect-[3/4] cursor-zoom-in touch-manipulation" onclick="openFullscreen('${product.image}')">
                    <img src="${product.image}" alt="${product.alt || product.name}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                    <div class="absolute bottom-0 left-0 p-5 w-full pointer-events-none">
                        <p class="text-white text-lg font-bold leading-tight drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            ${product.name}
                        </p>
                    </div>
                    <div class="absolute top-4 right-4 bg-black/30 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span class="material-symbols-outlined text-white text-sm">fullscreen</span>
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
                    <div class="w-full h-64 md:h-[400px] relative overflow-hidden group cursor-zoom-in" onclick="openFullscreen('${item.image}')">
                        <img class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="${item.image}" alt="${item.title}"/>
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
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
        preventClicks: false,
        preventClicksPropagation: false,
        touchStartPreventDefault: false, 
        threshold: 10, 
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