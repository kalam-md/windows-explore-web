# Cara Install

Halo! Saya **Kalam Mahardhika**, seorang calon kandidat **Fullstack Developer** di **Infokes**. Ini adalah repositori untuk tes Fullstack Developer yang telah saya kerjakan.

## Teknologi yang Digunakan

### Frontend
- **Vue.js**
  - Digunakan untuk membangun antarmuka pengguna yang interaktif dan responsif.

### Backend
- **Elysia.js**
  - Framework server-side modern yang cepat dan ringan untuk menangani permintaan API.

### Database
- **MySQL**
  - Digunakan sebagai basis data untuk menyimpan dan mengelola data aplikasi.

### Lingkungan Pengembangan
- **Laragon**
  - Digunakan untuk mempermudah pengaturan lingkungan pengembangan lokal.

## Cara Menjalankan Proyek

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/kalam-md/windows-explore-web.git
   cd repo-name
   ```

2. **Install dependensi frontend:**
   ```bash
   cd frontend
   bun install
   ```

3. **Jalankan server frontend:**
   ```bash
   bun run dev
   ```

4. **Install dependensi backend:**
   ```bash
   cd backend
   bun install
   ```

5. **Konfigurasi database:**
   - Pastikan MySQL sudah aktif.
   - Buat database baru dan sesuaikan pengaturan koneksi di file konfigurasi backend (misalnya `.env`).
   - Gunakan SQL berikut untuk membuat tabel dan data sample:

     ```sql
     CREATE TABLE folders (
         id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(255) NOT NULL,
         parent_id INT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
         FOREIGN KEY (parent_id) REFERENCES folders(id) ON DELETE CASCADE
     );

     -- Insert some sample data
     INSERT INTO folders (name, parent_id) VALUES ('Root', NULL);
     INSERT INTO folders (name, parent_id) VALUES ('Documents', 1);
     INSERT INTO folders (name, parent_id) VALUES ('Pictures', 1);
     INSERT INTO folders (name, parent_id) VALUES ('Work', 2);
     INSERT INTO folders (name, parent_id) VALUES ('Personal', 2);
     ```

6. **Jalankan server backend:**
   ```bash
   bun run dev
   ```

7. **Akses aplikasi:**
   - Buka browser dan akses frontend melalui `http://localhost:<port-frontend>`.
   - Backend tersedia di `http://localhost:<port-backend>`.

## Struktur Proyek

```
project-root/
├── frontend/   # Folder untuk Vue.js
├── backend/    # Folder untuk Elysia.js
├── .gitignore
├── README.md
└── lainnya...
```

## Catatan Tambahan
- Proyek ini menggunakan **Laragon** untuk lingkungan pengembangan lokal agar lebih mudah dalam pengelolaan server dan database.
- Jika ada kendala atau pertanyaan, silakan hubungi saya melalui email: [kalammahardhika1002@gmail.com](mailto:kalammahardhika1002@gmail.com).

---

Terima kasih sudah meluangkan waktu untuk melihat hasil tes ini! 😊
