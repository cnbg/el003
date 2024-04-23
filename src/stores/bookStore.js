import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import books from '@/data/books'

export const useBookStore = defineStore('book', {
    state: () => ({
        books: books,
    }),
    getters: {
        getBooks: state => state.books,
        findBookById: state => {
            return bookId => state.books.find((book) => book.id === bookId)
        },
    },
    actions: {
        saveBook(book) {
            const index = this.books.findIndex(b => b.id === book.id)
            if(book.chapters === undefined) {
                book.chapters = []
            }

            if (index >= 0) {
                this.books[index] = book
            } else {
                book.id = uuidv4()
                this.books.push(book)
            }
        },
        saveChapter(bookId, chapter) {
            const bookIndex = this.books.findIndex(book => book.id === bookId)
            if (bookIndex >= 0) {
                const chapterIndex = this.books[bookIndex].chapters.findIndex(c => c.key === chapter.key)
                if (chapterIndex >= 0) {
                    this.books[bookIndex].chapters[chapterIndex] = chapter
                } else {
                    chapter.key = uuidv4()
                    this.books[bookIndex].chapters.push(chapter)
                }
            }

            console.log(this.books[bookIndex].chapters)
        },
    },
})
