const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function seedBooks() {
    let db;

    try {
        db = await open({
            filename: "./books.db",
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS book (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                price INTEGER NOT NULL,
                pages INTEGER
            );
        `);

        // Remove existing records to avoid duplicate entries
        await db.run("DELETE FROM book");

        const books = [
            ["Wings of Fire", "A.P.J. Abdul Kalam", 250, 180],
            ["The Alchemist", "Paulo Coelho", 300, 208],
            ["Atomic Habits", "James Clear", 450, 320],
            ["Rich Dad Poor Dad", "Robert Kiyosaki", 350, 336],
            ["Ikigai", "Hector Garcia", 280, 194],
            ["Think Like a Monk", "Jay Shetty", 400, 288],
            ["The Psychology of Money", "Morgan Housel", 380, 256],
            ["Deep Work", "Cal Newport", 420, 304],
            ["The Power of Habit", "Charles Duhigg", 390, 371],
            ["Zero to One", "Peter Thiel", 320, 210]
        ];

        const insertQuery = `
            INSERT INTO book (title, author, price, pages)
            VALUES (?, ?, ?, ?)
        `;

        for (const book of books) {
            await db.run(insertQuery, book);
        }

        console.log("10 books inserted successfully!");

    } catch (error) {
        console.error("Database Seeding Error:", error.message);

    } finally {
        if (db) {
            await db.close();
        }
    }
}

seedBooks();