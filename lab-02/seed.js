const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function seedBooks() {
    const db = await open({
        filename: "./books.db",
        driver: sqlite3.Database
    });

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

    for (const book of books) {
        await db.run(
            `INSERT INTO book (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            book
        );
    }

    console.log("10 books inserted successfully");
    await db.close();
}

seedBooks();