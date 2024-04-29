import { faker } from '@faker-js/faker'
import bookData from './books.json'

const html = () => {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentences({min: 2, max: 5}),
        tags: faker.lorem.words({min: 1, max: 3}).split(' '),
        date: faker.date.recent(),
        pages: faker.string.numeric({length: {min: 2, max: 3}}),
        type: 'html',
        content: faker.lorem.paragraph({min: 3, max: 10}),
        chapters: [],
    }
}

const img = () => {
    const chapter = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentences({min: 2, max: 5}),
        tags: faker.lorem.words({min: 1, max: 3}).split(' '),
        date: faker.date.recent(),
        pages: faker.string.numeric({length: {min: 2, max: 3}}),
        type: 'img',
        content: '',
        images: [],
        chapters: [],
    }

    for (let i = 0; i < 5; i++) {
        const imgSrc = faker.image.urlLoremFlickr()

        const img = {
            src: imgSrc,
            thumb: imgSrc,
            alt: faker.lorem.sentence(),
            title: faker.lorem.sentence(),
        }

        chapter.images.push(img)
    }

    return chapter
}

const fillBooks = () => {
    for (let i = 1; i <= 5; i++) {
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
            cover: faker.image.urlLoremFlickr(),
            pages: faker.string.numeric({length: {min: 2, max: 3}}),
            chapters: [],
        }

        const rand = Math.random() * 5 + 5

        for (let j = 0; j < rand; j++) {
            const chapter = html()

            const rand2 = Math.random() * 2 + 1

            for (let c = 0; c < rand2; c++) {
                chapter.chapters.push(html())
                chapter.chapters.push(img())
            }

            book.chapters.push(chapter)
            book.chapters.push(img())
        }

        books.push(book)
    }
}

// const books = []
// fillBooks()
// console.log(books)

const books = bookData

export default books
