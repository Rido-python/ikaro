// =====================
// Keranjang Belanja IKARO
// =====================

// Ambil keranjang dari localStorage (kalau ada)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fungsi menambah produk
function tambahKeranjang(nama, harga) {
  // cek apakah produk sudah ada di keranjang
  let item = cart.find(p => p.nama === nama);
  if (item) {
    item.jumlah++;
  } else {
    cart.push({ nama, harga, jumlah: 1 });
  }
  simpanKeranjang();
  tampilkanKeranjang();
}

// Fungsi hapus produk
function hapusProduk(nama) {
  cart = cart.filter(p => p.nama !== nama);
  simpanKeranjang();
  tampilkanKeranjang();
}

// Fungsi simpan ke localStorage
function simpanKeranjang() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Fungsi tampilkan isi keranjang
function tampilkanKeranjang() {
  let list = document.getElementById("keranjang");
  let totalElement = document.getElementById("total");
  list.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.harga * item.jumlah;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.nama} x${item.jumlah} - Rp${(item.harga * item.jumlah).toLocaleString()}
      <button onclick="hapusProduk('${item.nama}')">❌</button>
    `;
    list.appendChild(li);
  });

  totalElement.textContent = "Total: Rp" + total.toLocaleString();
}

// Fungsi checkout (langsung ke WhatsApp)
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo, aku mau pesan:%0A";
  let total = 0;

  cart.forEach(item => {
    pesan += `- ${item.nama} x${item.jumlah} = Rp${(item.harga * item.jumlah).toLocaleString()}%0A`;
    total += item.harga * item.jumlah;
  });

  pesan += `%0ATotal: Rp${total.toLocaleString()}`;

  
  let nomorWA = "6288277334822"; 
  window.open(`https://wa.me/${nomorWA}?text=${pesan}`, "_blank");
}

// Panggil pertama kali saat halaman dibuka
document.addEventListener("DOMContentLoaded", tampilkanKeranjang);

