import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

import books from '../data/books'

export const useBookStore = defineStore('book', {
    state: () => ({
        editing: false,
        books: books,
        book: null,
        chapter: null,
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
                phone: '',
                bio: '',
                avatar: '',
                ...book.author,
            }
            book.pages = 0
            book.chapters = []

            this.books.push(book)
        },
        updateBook(book) {
            this.books.map(b => {
                return b.id === book.id ? book : b
            })
        },
        deleteBook(bookId) {
            this.books = this.books.filter(book => book.id !== bookId)
        },
        saveChapter(chapter) {
            this.book?.chapters?.push({
                ...chapter,
                ...{
                    id: uuid(),
                    date: new Date(),
                },
            })

            if(chapter.parent) {
                this.book?.chapters?.map(ch => {
                    if(ch.id === chapter.parent) ch.items++
                    return ch
                })
            }
        },
        updateChapter(chapter) {
            this.book?.chapters?.map(ch => {
                return ch.id === chapter.id ? chapter : ch
            })
        },
        deleteChapter() {
            if(this.book && this.chapter) {
                this.book.chapters = this.book.chapters.filter(ch => ch.id !== this.chapter.id)
                this.chapter = null
                this.books.map(book => {
                    return book.id === this.book.id ? this.book : book
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
            this.chapter = null
            this.editing = false
            this.block = null
        },
        chapterObj(obj) {
            return {
                ...{
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
                },
                ...obj,
            }
        },
    },
})
