const path = require('node:path');
const sqlite3 = require('sqlite3').verbose();

// Function to create tables in the SQLite database
const createTables = () => {
    // Create a connection to the SQLite database


    // Run SQL queries to create tables
    db.serialize(() => {
        // Create 'books' table
        db.run(`
            CREATE TABLE IF NOT EXISTS books (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                desc TEXT,
                author_name TEXT,
                author_email TEXT,
                author_phone TEXT,
                author_bio TEXT,
                author_avatar TEXT,
                date TEXT,
                cover TEXT,
                pages INTEGER
            )
        `);

        // Create 'chapters' table
        db.run(`
            CREATE TABLE IF NOT EXISTS chapters (
                id TEXT PRIMARY KEY,
                book_id TEXT NOT NULL,
                title TEXT NOT NULL,
                desc TEXT,
                date TEXT,
                pages INTEGER,
                order_id INTEGER,
                expanded BOOLEAN,
                parent TEXT,
                FOREIGN KEY(book_id) REFERENCES books(id)
            )
        `);
    });

    // Close the database connection after creating tables
    db.close();
};

// Call the function to create tables
createTables();
module.exports = db;
