// Fungsi utama untuk memuat data
async function loadData() {
    try {
        // PERBAIKAN 1: Gunakan './data.json' (titik di depan) agar relatif terhadap file index.html
        // Tambahkan header cache-control untuk memastikan Vercel tidak mem-cache data lama jika ada update
        const response = await fetch('./data.json', { cache: "no-store" });
        
        // PERBAIKAN 2: Cek apakah file ditemukan (Status 200 OK)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - File tidak ditemukan`);
        }

        const data = await response.json();
        
        // Validasi struktur JSON (jaga-jaga jika format salah)
        if (!data.products || !Array.isArray(data.products)) {
            throw new Error("Format JSON salah: Property 'products' tidak ditemukan atau bukan array.");
        }

        allProducts = data.products;
        
        // Render 4 produk pertama
        const initialProducts = allProducts.slice(0, itemsToShow);
        renderProducts(initialProducts);

        // Cek tombol load more
        checkLoadMoreButton();

    } catch (error) {
        console.error("Detail Error:", error);
        // Tampilkan pesan error yang lebih spesifik di layar
        document.getElementById('product-grid').innerHTML = `
            <div class="col-span-full text-center p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
                <p class="font-bold">Gagal memuat produk.</p>
                <p class="text-sm">${error.message}</p>
                <p class="text-xs mt-2 text-gray-500">Pastikan file 'data.json' berada di folder yang sama dengan index.html atau di dalam folder public.</p>
            </div>`;
    }
}