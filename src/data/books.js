import { faker } from '@faker-js/faker'
import bookData from './books.json'

const chapter = () => {
    return {
        id: faker.string.uuid(),
        parent: null,
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentences({min: 2, max: 5}),
        tags: faker.lorem.words({min: 1, max: 3}).split(' '),
        date: faker.date.recent(),
        pages: faker.string.numeric({length: {min: 2, max: 3}}),
        expanded: false,
        order: 0,
        items: 0,
        blocks: [
            {type: 'html', content: faker.lorem.paragraphs({min: 2, max: 5})},
            {type: 'html', content: faker.lorem.paragraphs({min: 2, max: 5})},
            {type: 'html', content: faker.lorem.paragraphs({min: 2, max: 5})},
            {type: 'html', content: faker.lorem.paragraphs({min: 2, max: 5})},
        ],
    }
}

const fillBooks = () => {
    for(let i = 0; i < 6; i++) {
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
                category: 'history',
            }),
            pages: faker.string.numeric({length: {min: 2, max: 3}}),
            chapters: [],
        }

        for(let j = 0; j < 6; j++) {
            const ch1 = chapter()
            ch1.order = j
            ch1.items = 4
            book.chapters.push(ch1)

            for(let k = 0; k < ch1.items; k++) {
                const ch2 = chapter()
                ch2.parent = ch1.id
                ch2.items = 2
                ch2.order = k

                book.chapters.push(ch2)

                for(let h = 0; h < ch2.items; h++) {
                    const ch3 = chapter()
                    ch3.parent = ch2.id
                    ch3.order = h

                    book.chapters.push(ch3)
                }
            }
        }

        books.push(book)
    }
}

// const books = []
// fillBooks()
// console.log(books)

const books = bookData

export default books
