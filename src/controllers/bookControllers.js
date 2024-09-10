import { nanoid } from "nanoid";
import {    addData, 
            getAllData, 
            getSpecificData, 
            getSpecificDataIndex, 
            deleteBookById } from '../models/booksModel.js';
import db from "../config/bookContainer.js";

const addNewBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, 
        readPage, finished, reading, insertedAt, updatedAt
    };
    
    // Jika berhasil
    if(name && readPage <= pageCount) {

        // Validasi
        try {
            addData(newBook);
        } catch (error) {
            return h.response({
                status : "fail",
                message : "Buku gagal ditambahkan"
            }.code(500));
        }

        return h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id
            }
        }).code(201);

    } else if (name  && readPage > pageCount) {
        // Jika gagal karena readPage lebih besar dari pageCount
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400);
    } else {
        // Jika gagal karena nama buku kosong
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400);
    }
};

const getBookHandler = (request, h) => {
    const { name: nameQuery, reading: readingQuery, finished: finishedQuery } = request.query;

    let filteredBooks = db;

    // Filter name (case-insensitive)
    if (nameQuery) {
        filteredBooks = filteredBooks.filter((book) =>
            book.name.toLowerCase().includes(nameQuery.toLowerCase())
        );
    }

    // Filter reading status (0 or 1)
    if (readingQuery) {
        const isValidReadingQuery = readingQuery === "0" || readingQuery === "1";
        if (isValidReadingQuery) {
            filteredBooks = filteredBooks.filter((book) => book.reading === Boolean(parseInt(readingQuery)));
        } else {
            return h.response({
                status: "fail",
                message: "Query reading harus berupa 0 atau 1",
            }).code(400);
        }
    }

    // Filter by finished status (0 or 1)
    if (finishedQuery) {
        const isValidFinishedQuery = finishedQuery === "0" || finishedQuery === "1";
        if (isValidFinishedQuery) {
            filteredBooks = filteredBooks.filter((book) => book.finished === Boolean(parseInt(finishedQuery)));
        } else {
            return h.response({
                status: "fail",
                message: "Query finished harus berupa 0 atau 1",
            }).code(400);
        }
    }

    // Mengembalikan buku yang sudah difilter
    if(nameQuery || readingQuery || finishedQuery) {
        const data = filteredBooks.map((book) => ({
            id : book.id,
            name : book.name,
            publisher : book.publisher
        }));
        return h.response({
            status: "success",
            data: {
                books: data
            },
        }).code(200);
    }

    try {
        const books = getAllData();
        const data = books.map((book) => ({
            id : book.id,
            name : book.name,
            publisher : book.publisher
        }));

        return h.response({
            status: "success",
            data: {
                books : data
            }
        }).code(200);
    } catch (error) {
        return h.response({
            status: "fail",
            message: "Gagal mendapatkan"
        }).code(404);
    }
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    
    const book = getSpecificData(bookId);
    
    if(book !== undefined) {
        return h.response({
            status: "success",
            data: {
                book
            }
        }).code(200);
    } else {
        return h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        }).code(404);
    }
};

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if(name){
        const updatedAt = new Date().toISOString();
        const finished = pageCount === readPage;

        const updatedBook = {
            name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
        };

        const bookIndex = getSpecificDataIndex(bookId, updatedBook);
        
        if(bookIndex !== -1){
            if(readPage <= pageCount){
                try {
                    db[bookIndex] = {
                        ...db[bookIndex],
                        name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
                    };
                    return h.response({
                        status: "success",
                        message: "Buku berhasil diperbarui",
                    }).code(200);
                } catch (error) {
                    return h.response({
                        status: "fail",
                        message: "Gagal memperbarui buku"
                    }).code(500);
                }
            } else {
                return h.response({
                    status: "fail",
                    message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
                }).code(400);
            }
        } else {
            return h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Id tidak ditemukan"
            }).code(404);
        }
    } else {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400);
    }
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const bookIndex = getSpecificDataIndex(bookId);

    if(bookIndex !== -1) {
        deleteBookById(bookId);
        return h.response({
            status: "success",
            message: "Buku berhasil dihapus"
        }).code(200);
    } else {
        return h.response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan"
        }).code(404);
    }
};

const pageNotFoundHandler = (request, h) => {
    return h.response({
        status: "fail",
        message: "Halaman tidak ditemukan"
    }).code(404);
};

export {    addNewBookHandler, 
            getBookHandler, 
            getBookByIdHandler, 
            deleteBookByIdHandler, 
            editBookByIdHandler, 
            pageNotFoundHandler };