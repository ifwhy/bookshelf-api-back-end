import {    addNewBookHandler, 
            getBookHandler, 
            getBookByIdHandler, 
            deleteBookByIdHandler, 
            editBookByIdHandler, 
            pageNotFoundHandler } from '../controllers/bookControllers.js';

const routes = [
    {
        // Menambahkan data buku baru
        method: 'POST',
        path: '/books',
        handler: addNewBookHandler
    }, {
        // Menampilkan seluruh data buku
        method: 'GET',
        path: '/books',
        handler: getBookHandler
    }, {
        // Menampilkan detail data buku berdasarkan ID
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler
    }, {
        // Mengubah data buku berdasarkan ID
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookByIdHandler
    }, {
        // Menghapus data buku berdasarkan ID
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler
    }, {
        // Halaman tidak ditemukan
        method: '*',
        path: '/{any*}',
        handler: pageNotFoundHandler
    }
];

export default routes;