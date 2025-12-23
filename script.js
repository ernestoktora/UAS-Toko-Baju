// --- CEK STATUS LOGIN ---
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// 1. DATA PRODUK (20 ITEM)
const products = [
    { id: 1, name: "Kaos Polos Navy", price: 85000, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", desc: "Kaos katun bambu premium." },
    { id: 2, name: "Jaket Denim Dark", price: 250000, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80", desc: "Jaket jeans tebal vintage." },
    { id: 3, name: "Kemeja Formal Slim", price: 150000, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", desc: "Kemeja kerja anti kusut." },
    { id: 4, name: "Sweater Midnight", price: 120000, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80", desc: "Sweater rajut hangat." },
    { id: 5, name: "Kaos Oversize Black", price: 95000, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80", desc: "Kaos potongan lebar style korea." },
    { id: 6, name: "Hoodie Polos Abu", price: 175000, image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", desc: "Hoodie fleece lembut." },
    { id: 7, name: "Kemeja Flannel Merah", price: 135000, image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80", desc: "Motif kotak-kotak klasik." },
    { id: 8, name: "Celana Chino Cream", price: 180000, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80", desc: "Celana panjang slim fit." },
    { id: 9, name: "Topi Baseball Navy", price: 45000, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80", desc: "Topi drill pengatur besi." },
    { id: 10, name: "Blazer Casual Pria", price: 350000, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80", desc: "Blazer semi-formal." },
    { id: 11, name: "Dress Floral Biru", price: 210000, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80", desc: "Dress motif bunga rayon." },
    { id: 12, name: "Rok Plisket Hitam", price: 85000, image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80", desc: "Rok panjang lipat-lipat." },
    { id: 13, name: "Sepatu Sneakers Putih", price: 299000, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80", desc: "Sneakers kulit sintetis." },
    { id: 14, name: "Tas Ransel Kulit", price: 450000, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80", desc: "Tas punggung kulit asli." },
    { id: 15, name: "Jam Tangan Minimalis", price: 150000, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80", desc: "Jam tangan strap kulit." },
    { id: 16, name: "Kacamata Hitam Retro", price: 65000, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80", desc: "Lensa UV400." },
    { id: 17, name: "Scarf Leher Sutra", price: 55000, image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=500&q=80", desc: "Syal leher motif abstrak." },
    { id: 18, name: "Rompi Vest Rajut", price: 90000, image: "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?w=500&q=80", desc: "Vest rajut gaya vintage." },
    { id: 19, name: "Kaos Kaki Motif (3 Pcs)", price: 35000, image: "https://media.istockphoto.com/id/871896858/id/foto/gambar-beberapa-kaki-dengan-ruang-fotokopi.jpg?s=1024x1024&w=is&k=20&c=Ark9pdcXyk5CV_MTYL-zhP1O6gOlo6xW3Ul1Cy2x7ho=", desc: "Paket 3 pasang kaos kaki." },
    { id: 20, name: "Sabuk Kulit Pria", price: 120000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&q=80", desc: "Ikat pinggang kulit sapi." }
];

// Random Promo Hemat 5% (4 Produk)
function applyDailyDeals() {
    products.forEach(p => { p.finalPrice = p.price; p.isPromo = false; });
    let promoIndices = [];
    while(promoIndices.length < 4) {
        let r = Math.floor(Math.random() * products.length);
        if(promoIndices.indexOf(r) === -1) promoIndices.push(r);
    }
    promoIndices.forEach(index => {
        products[index].isPromo = true;
        products[index].finalPrice = products[index].price * 0.95;
    });
}
applyDailyDeals();

// Random Stock
products.forEach(product => { if(!product.stock) product.stock = Math.floor(Math.random() * 45) + 5; });

let cart = [];
let discountMultiplier = 0; 

// DOM ELEMENTS
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartDiscountElement = document.getElementById('cart-discount');
const couponInput = document.getElementById('coupon-input');
const couponMsg = document.getElementById('coupon-msg');
const closeCartBtn = document.querySelector('.close-btn');

// Detail Modal Elements
const detailModal = document.getElementById('product-detail-modal');
const closeDetailBtn = document.querySelector('.close-detail-btn');
const detailImg = document.getElementById('detail-img');
const detailName = document.getElementById('detail-name');
const detailDesc = document.getElementById('detail-desc');
const detailPrice = document.getElementById('detail-price');
const detailStock = document.getElementById('detail-stock');
const btnBuyModal = document.getElementById('btn-buy-modal');

// Promo Modal Elements
const promoModal = document.getElementById('promo-modal');
const closePromoBtn = document.querySelector('.close-promo-btn');

const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

// Popup Promo
window.addEventListener('load', () => setTimeout(() => promoModal.style.display = 'flex', 500));
closePromoBtn.addEventListener('click', () => promoModal.style.display = 'none');
function closePromo() { promoModal.style.display = 'none'; }
function copyCoupon() {
    const couponCode = "UAS_A_PLUS"; 
    navigator.clipboard.writeText(couponCode).then(() => {
        alert("Kode berhasil disalin: " + couponCode + "\nSilakan 'Paste' di dalam keranjang!");
        closePromo();
        document.getElementById('search-input').focus();
    }).catch(err => closePromo());
}

// Display Products
function displayProducts(items) {
    productList.innerHTML = '';
    if (items.length === 0) { productList.innerHTML = `<p style="text-align:center; color:#94a3b8; width:100%; grid-column: 1/-1;">Produk tidak ditemukan...</p>`; return; }

    items.forEach(product => {
        const isOutOfStock = product.stock === 0;
        const stockText = isOutOfStock ? `<span class="stock-empty">Stok Habis</span>` : `Stok: ${product.stock}`;
        const buttonState = isOutOfStock ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : '';
        const buttonText = isOutOfStock ? 'Stok Habis' : 'Beli';

        let priceHTML = '';
        let badgeHTML = '';

        if (product.isPromo) {
            priceHTML = `<div class="price-container"><span class="price-coret">${formatRupiah(product.price)}</span><span class="price-now">${formatRupiah(product.finalPrice)}</span></div>`;
            badgeHTML = `<div class="badge-promo">Hemat 5%</div>`;
        } else {
            priceHTML = `<p class="price">${formatRupiah(product.price)}</p>`;
        }

        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            ${badgeHTML}
            <div style="cursor: pointer;" onclick="showDetail(${product.id})">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
            </div>
            ${priceHTML}
            <p class="stock-info">${stockText}</p> 
            <button class="btn-add" onclick="addToCart(${product.id})" ${buttonState}>${buttonText}</button>
        `;
        productList.appendChild(productCard);
    });
}

// Show Detail
function showDetail(id) {
    const product = products.find(p => p.id === id);
    if(!product) return;
    detailImg.src = product.image;
    detailName.innerText = product.name;
    detailDesc.innerText = product.desc;
    
    if (product.isPromo) {
        detailPrice.innerHTML = `<span class="price-coret" style="font-size:1rem; margin-right:10px;">${formatRupiah(product.price)}</span><span class="price-now" style="font-size:1.5rem;">${formatRupiah(product.finalPrice)}</span><span style="background:red; color:white; padding:2px 8px; border-radius:10px; font-size:0.8rem; vertical-align:middle;">Hemat 5%</span>`;
    } else {
        detailPrice.innerHTML = `<span class="price-now" style="font-size:1.5rem;">${formatRupiah(product.price)}</span>`;
    }

    if(product.stock === 0) {
        detailStock.innerHTML = `<span style="color:red">Stok Habis</span>`;
        btnBuyModal.disabled = true;
        btnBuyModal.innerText = "Stok Habis";
    } else {
        detailStock.innerText = `Sisa Stok: ${product.stock}`;
        btnBuyModal.disabled = false;
        btnBuyModal.innerText = "+ Masukkan Keranjang";
        btnBuyModal.onclick = function() { addToCart(product.id); detailModal.style.display = 'none'; };
    }
    detailModal.style.display = 'block';
}
closeDetailBtn.addEventListener('click', () => detailModal.style.display = 'none');

// Add To Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    const priceToUse = product.finalPrice; 
    let currentQty = existingItem ? existingItem.quantity : 0;
    if (currentQty + 1 > product.stock) { alert(`Maaf, stok ${product.name} tidak cukup!`); return; }
    
    if (existingItem) existingItem.quantity++;
    else cart.push({ ...product, price: priceToUse, quantity: 1 });
    
    discountMultiplier = 0; couponInput.value = ""; couponMsg.innerText = "";
    updateCartUI();
}

// --- [LOGIKA KUPON UPDATED] ---
function applyCoupon() {
    const code = couponInput.value.trim();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    // 1. Cek apakah kupon sudah pernah dipakai di sesi ini?
    if (localStorage.getItem('couponUsed') === 'true') {
        couponMsg.innerText = "Maaf, kupon hanya bisa dipakai 1x per login!";
        couponMsg.className = "msg-error";
        return;
    }

    if (code === "UAS_A_PLUS") {
        if (totalQty === 0) {
            couponMsg.innerText = "Keranjang masih kosong!"; couponMsg.className = "msg-error";
        } else if (totalQty > 2) {
            couponMsg.innerText = "Maaf, promo ini maksimal untuk 2 produk!"; couponMsg.className = "msg-error"; discountMultiplier = 0;
        } else {
            discountMultiplier = 0.9; couponMsg.innerText = "Diskon 90% aktif!"; couponMsg.className = "msg-success";
        }
    } else {
        couponMsg.innerText = "Kode tidak valid."; couponMsg.className = "msg-error"; discountMultiplier = 0;
    }
    updateCartUI();
}

// Helper Functions
function changeQty(id, action) {
    const item = cart.find(i => i.id === id);
    const product = products.find(p => p.id === id);
    if (!item) return;
    if (action === 'plus') {
        if (item.quantity + 1 > product.stock) { alert("Maksimal stok tercapai!"); return; }
        item.quantity++;
    } else if (action === 'minus') {
        if (item.quantity > 1) item.quantity--; else if(confirm("Hapus barang?")) removeFromCart(id);
    }
    discountMultiplier = 0; couponInput.value = ""; couponMsg.innerText = "Keranjang berubah, input ulang kupon."; couponMsg.className = "msg-error";
    updateCartUI();
}
function removeFromCart(id) { cart = cart.filter(item => item.id !== id); discountMultiplier = 0; updateCartUI(); }

// Update Cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    if (cart.length === 0) { cartItemsContainer.innerHTML = '<p>Keranjangmu masih kosong.</p>'; discountMultiplier = 0; }
    else {
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <div style="flex:1;">
                    <h4>${item.name}</h4>
                    <p style="color:var(--accent); font-size:0.9rem;">${formatRupiah(item.price)}</p>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="changeQty(${item.id}, 'minus')">-</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 'plus')">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Hapus</button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
    const discountAmount = subtotal * discountMultiplier;
    const finalTotal = subtotal - discountAmount;
    cartSubtotalElement.innerText = formatRupiah(subtotal);
    cartDiscountElement.innerText = "- " + formatRupiah(discountAmount);
    cartTotalPriceElement.innerText = formatRupiah(finalTotal);
}

// Listeners
document.querySelector('.cart-icon').addEventListener('click', () => cartModal.style.display = 'block');
closeCartBtn.addEventListener('click', () => cartModal.style.display = 'none');
window.onclick = function(event) { 
    if (event.target == cartModal) cartModal.style.display = 'none';
    if (event.target == detailModal) detailModal.style.display = 'none';
    if (event.target == promoModal) promoModal.style.display = 'none';
}
searchInput.addEventListener('input', function(e) {
    const keyword = e.target.value.toLowerCase();
    displayProducts(products.filter(p => p.name.toLowerCase().includes(keyword)));
});

// --- [CHECKOUT UPDATED] ---
function checkout() {
    if (cart.length === 0) { alert("Keranjang kosong!"); return; }
    const name = document.getElementById('customer-name').value;
    const payment = document.getElementById('payment-method').value;
    const address = document.getElementById('customer-address').value;
    if (!name || !payment || !address) { alert("Mohon lengkapi data pemesanan."); return; }

    cart.forEach(cartItem => {
        const productIndex = products.findIndex(p => p.id === cartItem.id);
        if (productIndex !== -1) products[productIndex].stock -= cartItem.quantity;
    });

    // 2. Tandai kupon sudah dipakai jika discountMultiplier aktif
    if (discountMultiplier > 0) {
        localStorage.setItem('couponUsed', 'true');
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountVal = subtotal * discountMultiplier;
    const finalTotal = subtotal - discountVal;

    let message = `Halo Admin, pesanan baru:\n`;
    cart.forEach(item => { message += `- ${item.name} (${item.quantity}x) @ ${formatRupiah(item.price)}\n`; });
    
    message += `\nSubtotal: ${formatRupiah(subtotal)}`;
    if(discountMultiplier > 0) message += `\nDiskon (90%): - ${formatRupiah(discountVal)}`;
    message += `\n*TOTAL BAYAR: ${formatRupiah(finalTotal)}*`;
    message += `\n\nNama: ${name}\nAlamat: ${address}\nBayar: ${payment}`;

    const adminNumber = "6281234567890"; 
    window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`, '_blank');

    cart = []; discountMultiplier = 0; updateCartUI();
    document.getElementById('customer-name').value = ''; document.getElementById('customer-address').value = ''; document.getElementById('payment-method').value = ''; couponInput.value = ''; couponMsg.innerText = '';
    cartModal.style.display = 'none'; displayProducts(products);
    alert("Terima kasih! Pesanan diproses.");
}

document.addEventListener('DOMContentLoaded', () => displayProducts(products));

// --- [LOGOUT UPDATED] ---
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // 3. Reset status kupon agar user berikutnya bisa pakai
    localStorage.removeItem('couponUsed');
    window.location.href = 'login.html';
}