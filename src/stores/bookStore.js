import { defineStore } from 'pinia'

export const useBookStore = defineStore('book', {
    state: () => ({
        books: [
            {name: 'my first book'},
            {name: 'my second book'},
        ],
    }),
    getters: {
        getBooks: state => state.books,
    },
    actions: {
        createBook(book) {
            this.books.push(book)
        },
    },
})
