import { faker } from '@faker-js/faker'

const books = []

for (let i = 1; i <= 10; i++) {
    const book = {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        desc: faker.lorem.sentences({min: 2, max: 5}),
        author: {
            avatar: faker.image.avatar(),
            email: faker.internet.email(),
            name: faker.person.fullName(),
            bio: faker.person.bio(),
            phone: faker.phone.number(),
        },
        tags: faker.lorem.words({min: 1, max: 3}).split(' '),
        date: faker.date.recent(),
        cover: faker.image.urlLoremFlickr(),
        pages: faker.string.numeric({length: {min: 2, max: 3}}),
        chapters: [],
    }

    const rand = Math.random() * 20 + 5

    for (let j = 0; j < rand; j++) {
        const id = faker.string.uuid()
        const chapter1 = {
            id: id,
            parent: faker.string.uuid(),
            title: faker.lorem.sentence(),
            desc: faker.lorem.sentences({min: 2, max: 5}),
            content: faker.lorem.paragraph({min: 3, max: 10}),
            tags: faker.lorem.words({min: 1, max: 3}).split(' '),
            date: faker.date.recent(),
            cover: faker.image.urlLoremFlickr(),
            pages: faker.string.numeric({length: {min: 2, max: 3}}),
        }

        const chapter2 = {
            id: faker.string.uuid(),
            parent: id,
            title: faker.lorem.sentence(),
            desc: faker.lorem.sentences({min: 2, max: 5}),
            content: faker.lorem.paragraph({min: 3, max: 10}),
            tags: faker.lorem.words({min: 1, max: 3}).split(' '),
            date: faker.date.recent(),
            cover: faker.image.urlLoremFlickr(),
            pages: faker.string.numeric({length: {min: 2, max: 3}}),
        }

        book.chapters.push(chapter1)
        book.chapters.push(chapter2)
    }

    books.push(book)
}

export default books
