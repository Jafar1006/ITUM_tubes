// --- BAGIAN BARU UNTUK MOBILE MENU ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Tutup menu saat link di dalam menu diklik
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Jalankan fungsi load data utama
    loadData();
});

// --- KODE LAMA (Tetap sama) ---

// Variabel untuk menyimpan data
let allProducts = [];
let itemsToShow = 4; // Jumlah awal yang ditampilkan

// Fungsi untuk membuat elemen HTML produk
function createProductCard(product) {
    return `
        <div class="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[3/4] transition-all duration-300 hover:scale-[1.02]" 
             style='background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%), url("${product.image}");'>
            <p class="text-white text-base font-bold leading-tight line-clamp-2 drop-shadow-md">
                ${product.name}
            </p>
        </div>
    `;
}

// Fungsi untuk menampilkan produk ke grid
function renderProducts(products) {
    const gridContainer = document.getElementById('product-grid');
    products.forEach(product => {
        gridContainer.innerHTML += createProductCard(product);
    });
}

// Fungsi utama untuk memuat data
async function loadData() {
    try {
        const response = await fetch('./data.json', { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - File tidak ditemukan`);
        }

        const data = await response.json();
        if (!data.products || !Array.isArray(data.products)) {
            throw new Error("Format JSON salah");
        }

        allProducts = data.products;
        const initialProducts = allProducts.slice(0, itemsToShow);
        renderProducts(initialProducts);
        checkLoadMoreButton();

    } catch (error) {
        console.error("Detail Error:", error);
        document.getElementById('product-grid').innerHTML = `
            <div class="col-span-full text-center p-4 bg-red-50 text-red-600 rounded-lg">
                <p>Gagal memuat produk: ${error.message}</p>
            </div>`;
    }
}

// Logika tombol Load More
const loadMoreBtn = document.getElementById('load-more-btn');

function checkLoadMoreButton() {
    const currentItemsCount = document.getElementById('product-grid').children.length;
    if (currentItemsCount < allProducts.length) {
        loadMoreBtn.classList.remove('hidden');
    } else {
        loadMoreBtn.classList.add('hidden');
    }
}

loadMoreBtn.addEventListener('click', () => {
    const currentCount = document.getElementById('product-grid').children.length;
    const remainingProducts = allProducts.slice(currentCount);
    renderProducts(remainingProducts);
    loadMoreBtn.classList.add('hidden');
});

console.log("Zaidan Orchid Website Loaded");