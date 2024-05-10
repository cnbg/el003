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
        block: null,
    }),
    getters: {},
    actions: {
        getBook(bookId, chapterId = null) {
            this.book = this.books.find(book => book.id === bookId)

            if(chapterId) {
                this.chapter = this.book?.chapters?.find(chapter => chapter.id === chapterId)
            }
        },
        getChapters(parentId = null, s = '') {
            return this.book?.chapters?.filter(chapter => {
                if(s.length > 0) {
                    return chapter.parent === parentId && (
                        chapter.title.match(new RegExp(s, 'i'))
                        // || chapter.desc.match(new RegExp(s, 'i'))
                        // || chapter.tags.includes(s)
                    )
                }
                return chapter.parent === parentId
            }) ?? []
        },
        saveBook(book) {
            book.id = uuid()
            book.date = new Date()
            book.author = {
                ...book.author,
                phone: faker.phone.number(),
                bio: faker.person.bio(),
                avatar: faker.image.avatar(),
            }
            book.cover = faker.image.urlLoremFlickr({category: 'history'})
            book.pages = faker.string.numeric({length: {min: 2, max: 3}})
            book.chapters = []

            this.books.push(book)
        },
        deleteBook(bookId) {
            this.books = this.books.filter(book => book.id !== bookId)
        },
        addChapter(chapter) {
            if(this.book) {
                chapter.id = uuid()
                chapter.parent = this.chapter?.id ?? null
                chapter.date = new Date()
                this.book.chapters?.push(chapter)
                this.calcChapterItems(chapter)
            }
        },
        calcChapterItems(chapter) {
            if(chapter.parent) {
                const parent = this.book.chapters?.find(ch => ch.id === chapter.parent)
                parent.items++
            }
        },
        deleteChapter(chapter) {
            if(chapter) {
                this.books.map(book => {
                    book.chapters = book.chapters.filter(ch => ch.id !== chapter.id)
                    if(book.id === chapter.book_id) {
                        this.book = book
                        this.chapters = book.chapters
                    }
                })

                this.chapter = null
                this.editing = false
                this.block = null

                return true
            }

            return false
        },
        clearStore() {
            this.book = null
            this.chapters = []
            this.chapter = null
            this.editing = false
            this.block = null
        },
        chapterObj() {
            return {
                id: '',
                parent: null,
                title: '',
                desc: '',
                tags: [],
                date: null,
                pages: 0,
                expanded: false,
                order: 0,
                items: 0,
                blocks: [],
            }
        },
    },
})
