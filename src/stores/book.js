import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'

import books from '../data/books'

export const useBookStore = defineStore('book', {
    state: () => ({
        books: books,
        book: null,
        chapters: [],
        chapter: null,
        editing: false,
    }),
    getters: {},
    actions: {
        async findById(bookId) {
            this.book = await this.books.find(book => book.id === bookId)
        },
        async saveBook(book) {
            book.id = uuid()
            book.date = new Date()
            book.author = {
                ...book.author,
                phone: faker.phone.number(),
                bio: faker.person.bio(),
                avatar: faker.image.avatar(),
            }
            book.cover = faker.image.urlLoremFlickr()
            book.pages = faker.string.numeric({length: {min: 2, max: 3}})
            book.chapters = []

            await this.books.push(book)
        },
        async deleteBook(bookId) {
            this.books = await this.books.filter(book => book.id !== bookId)
        },
        async addChapter(bookId, chapter) {
            chapter.id = uuid()
            this.books.map(book => {
                if (book.id === bookId) {
                    book.chapters.push(chapter)
                }
            })

            return chapter
        },
        chapterObj() {
            return {
                id: '',
                title: '',
                desc: '',
                tags: [],
                date: '',
                pages: 0,
                chapters: [],
            }
        }
    },
})
