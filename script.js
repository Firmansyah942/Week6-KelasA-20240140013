// ==========================================
// 1. FITUR FETCH API - Data Produk
// ==========================================
const loadButton = document.getElementById('load-products');
const productContainer = document.getElementById('product-container');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-message');

loadButton.addEventListener('click', fetchProducts);

async function fetchProducts() {
    productContainer.innerHTML = '';
    errorEl.classList.add('hidden');
    loadingEl.classList.remove('hidden');

    try {
        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
            throw new Error(`Gagal memuat data (Status: ${response.status})`);
        }

        const data = await response.json();
        displayProducts(data.products);

    } catch (error) {
        errorEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Terjadi kesalahan: ${error.message}`;
        errorEl.classList.remove('hidden');
    } finally {
        loadingEl.classList.add('hidden');
    }
}

function displayProducts(products) {
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-item');

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-meta">
                    <span class="product-price">$${product.price}</span>
                    <span class="product-badge">${product.category}</span>
                </div>
            </div>
        `;

        productContainer.appendChild(card);
    });
}

// ==========================================
// 2. FITUR FORM - DOM & Event Handling
// ==========================================
const productForm = document.getElementById('product-form');
const formFeedback = document.getElementById('form-feedback');

productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nameInput = document.getElementById('prod-name').value.trim();
    const priceInput = document.getElementById('prod-price').value.trim();

    if (nameInput === '' || priceInput === '') {
        showFeedback('<i class="fa-solid fa-circle-exclamation"></i> Harap isi semua kolom input!', true);
        return;
    }

    if (Number(priceInput) <= 0) {
        showFeedback('<i class="fa-solid fa-circle-exclamation"></i> Harga produk harus lebih dari 0!', true);
        return;
    }

    showFeedback(`<i class="fa-solid fa-circle-check"></i> Berhasil! Produk "${nameInput}" seharga $${priceInput} telah tersimpan.`, false);
    productForm.reset();
});

function showFeedback(message, isError) {
    formFeedback.className = `alert ${isError ? 'alert-danger' : 'alert-success'}`;
    formFeedback.innerHTML = message;
    formFeedback.classList.remove('hidden');
}