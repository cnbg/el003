import { defineStore } from 'pinia'
import books from '../data/books'

export const useBookStore = defineStore('book', {
    state: () => ({
        books: books,
    }),
    getters: {},
    actions: {
        findById(bookId) {
            return this.books.find((book) => book.id === bookId)
        },
    },
})
