import db from '../config/bookContainer.js';

const addData = ({ id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt }) => {
    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };
    db.push(newBook);
};

const getAllData = () => {
    return db;
};

const getSpecificData = (id) => {
    return db.find((book) => book.id === id);
};

const getSpecificDataIndex = (id) => {
    return db.findIndex((book) => book.id === id);
};

const editBookById = (bookIndex, { name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt  }) => {
    db[bookIndex] = {
        ...db[bookIndex],
        name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt
    };
};

const deleteBookById = (id) => {
    db.splice(id, 1);
};

export { addData, getAllData, getSpecificData, getSpecificDataIndex, editBookById, deleteBookById };