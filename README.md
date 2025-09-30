# Deptech Project

## How to Setup Project

MODE : development (only)

### Backend

- Navigasi ke folder deptech-be
- Gunakan database MySQL dan buatkan database dengan nama **deptech-db**  
- Install sequelize-cli dari sini: https://sequelize.org/docs/v7/cli/  
- Buat file `.env`, ambil semua data dari `.env.example`  
- Sesuaikan credentials untuk koneksi ke database  
- Jalankan `npm install`  
- Jalankan `npm run refresh` (Refresh database)  
- Jalankan `npm run dev`  
- Server akan berjalan di http://localhost:8080  

### Frontend

- Navigasi ke folder deptech-fe
- Menggunakan Laravel versi 12  
- Buat file `.env`, ambil semua data dari `.env.example`  
- Jalankan `composer install`  
- Jalankan `composer run dev`
- Server akan berjalan di http://localhost:8000 
- Login menggunakan akun:  
  - email: admin@deptech.com  
  - password: abcDEF123!  
- Login akan berlaku selama 1 jam (3600 detik), di atas itu akan otomatis ke logout  

## Tech Stack

### Backend
- Node.js  
- Express.js  
- Sequelize ORM  
- MySQL Database  

### Frontend
- Laravel 12  
- Blade / Inertia (opsional sesuai implementasi)  
- Bootstrap / Tailwind (opsional sesuai implementasi)  

## Notes

- Pastikan backend dan frontend berjalan bersamaan  
- Backend berjalan di port **8080**  
- Frontend berjalan sesuai konfigurasi default Laravel  
- Gunakan file `.env` untuk menyimpan konfigurasi environment masing-masing service  
