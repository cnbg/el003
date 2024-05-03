import { faker } from '@faker-js/faker'
import bookData from './books.json'

const chapter = () => {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentences({min: 2, max: 5}),
        tags: faker.lorem.words({min: 1, max: 3}).split(' '),
        date: faker.date.recent(),
        pages: faker.string.numeric({length: {min: 2, max: 3}}),
        chapters: [],
    }
}

const fillBooks = () => {
    for (let i = 1; i < 7; i++) {
        const book = {
            id: faker.string.uuid(),
            title: faker.lorem.sentence(),
            desc: faker.lorem.sentences({min: 2, max: 5}),
            author: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                bio: faker.person.bio(),
                avatar: faker.image.avatar(),
            },
            tags: faker.lorem.words({min: 1, max: 3}).split(' '),
            date: faker.date.recent(),
            cover: faker.image.urlLoremFlickr({
                category: 'history'
            }),
            pages: faker.string.numeric({length: {min: 2, max: 3}}),
            chapters: [],
        }

        const rand = Math.random() * 6 + 2

        for (let j = 0; j < rand; j++) {
            const ch = chapter()

            book.chapters.push(ch)
        }

        books.push(book)
    }
}

// const books = []
// fillBooks()
// console.log(books)

const books = bookData

export default books
