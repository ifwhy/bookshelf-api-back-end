
# Belajar Membuat Aplikasi Back End untuk Pemula

Proyek ini merupakan proyek kecil-kecilan yang saya buat untuk menyelesaikan kelas [Belajar Membuat Aplikasi Back End untuk Pemula](https://www.dicoding.com/academies/261) dari [Dicoding](https://www.dicoding.com). Proyek ini telah disubmit pada tanggal 9 September 2024 dan berhasil mendapatkan ⭐⭐⭐⭐⭐.

## Deskripsi
Proyek ini dikembangkan dengan menggunakan library [HapiJS](https://hapi.dev/). API ini dapat melakukan operasi CRUD (Create, Read, Update, Delete), dan beberapa fitur lain, seperti pencarian dengan params indeks tertentu dan pencarian berkelompok dengan query. 

API ini mampu melakukan validasi (secara manual tanpa library) seperti wajib menyertakan `name`, dan `readPage` tidak boleh lebih besar dari `pageCount`, serta variabel `finished` akan dievaluasi dari nilai `pageCount` dan `readPage` apakah sama atau tidak. Untuk id, digunakan library [nanoid](https://www.npmjs.com/package/nanoid) untuk mendapatkan id unik buku.

Proyek ini sudah dites dengan menggunakan Postman. File untuk melakukan testing terdapat pada folder [Testing Postman](BookshelfAPITestCollectionAndEnvironment). Anda dapat mengimpor kedua file json tersebut di Postman untuk melakukan testing.

## Instalasi

Unduh proyek pada repositori ini lalu jalankan dengan menggunkan perintah berikut : 

```bash
  npm install
  npm run start-dev
```

Catatan : Pada proyek ini, PORT dan HOSTNAME disimpan di sebuah file `.env` yang tidak disertakan pada repositori ini. Anda dapat membuatnya secara manual atau jika tidak, PORT dan HOSTNAME yang digunakan adalah PORT 9000 dan HOSTNAME `localhost`.
