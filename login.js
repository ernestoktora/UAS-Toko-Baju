const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload halaman

    const username = usernameInput.value;
    const password = passwordInput.value;

    // --- LOGIKA LOGIN SEDERHANA (Hardcoded) ---
    // Kamu bisa ganti password di sini sesuai keinginan
    if (username === 'tora' && password === '2005') {
        
        // Simpan status login ke LocalStorage (Agar browser ingat kalau kita sudah login)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        alert('Login Berhasil! Selamat Datang.');
        
        // Arahkan ke halaman utama Toko
        window.location.href = 'index.html';
        
    } else {
        // Jika salah
        errorMsg.innerText = "Username atau Password salah!";
        
        // Efek goyang pada input (opsional visual)
        usernameInput.style.borderColor = 'red';
        passwordInput.style.borderColor = 'red';
    }
});

// Hilangkan pesan error saat user mulai mengetik ulang
usernameInput.addEventListener('input', () => {
    errorMsg.innerText = "";
    usernameInput.style.borderColor = '#334155';
});