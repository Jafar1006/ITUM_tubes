tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#363E1B",
                "background-light": "#F7F8F3",
                "background-dark": "#1C200E",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "Noto Sans", "sans-serif"]
            },
        },
    },
};

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
    
    // Kita tambahkan produk baru ke container (append), bukan replace
    // agar efek load more terlihat halus
    products.forEach(product => {
        gridContainer.innerHTML += createProductCard(product);
    });
}

// Fungsi utama untuk memuat data
async function loadData() {
    try {
        const response = await fetch('data.JSON');
        const data = await response.json();
        
        allProducts = data.products;
        
        // Render 4 produk pertama
        const initialProducts = allProducts.slice(0, itemsToShow);
        renderProducts(initialProducts);

        // Cek tombol load more
        checkLoadMoreButton();

    } catch (error) {
        console.error("Gagal memuat data:", error);
        document.getElementById('product-grid').innerHTML = "<p class='text-red-500'>Gagal memuat produk. Pastikan file data.json tersedia.</p>";
    }
}

// Logika tombol Load More
const loadMoreBtn = document.getElementById('load-more-btn');

function checkLoadMoreButton() {
    // Jika jumlah item yang sudah ditampilkan kurang dari total item, tampilkan tombol
    const currentItemsCount = document.getElementById('product-grid').children.length;
    
    if (currentItemsCount < allProducts.length) {
        loadMoreBtn.classList.remove('hidden');
    } else {
        loadMoreBtn.classList.add('hidden');
    }
}

loadMoreBtn.addEventListener('click', () => {
    const currentCount = document.getElementById('product-grid').children.length;
    // Ambil sisa produk (tampilkan semua sisanya)
    const remainingProducts = allProducts.slice(currentCount);
    
    renderProducts(remainingProducts);
    
    // Sembunyikan tombol setelah semua tampil
    loadMoreBtn.classList.add('hidden');
});

// Jalankan saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadData);

console.log("Zaidan Orchid Website Loaded");