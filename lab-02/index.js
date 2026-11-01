const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const dbPath = "./books.db";

let db;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS book (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                author TEXT,
                price INTEGER,
                pages INTEGER
            );
        `);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log(`Database Error: ${error.message}`);
    }
};

// GET all books
app.get("/books/", async (req, res) => {
    const books = await db.all("SELECT * FROM book");
    res.status(200).json(books);
});

// GET one book
app.get("/books/:bookId/", async (req, res) => {
    const { bookId } = req.params;

    const book = await db.get(
        "SELECT * FROM book WHERE id = ?",
        [bookId]
    );

    if (!book) {
        return res.status(404).send("Book Not Found");
    }

    res.status(200).json(book);
});

// POST a book
app.post("/books/", async (req, res) => {
    const { title, author, price, pages } = req.body;

    const result = await db.run(
        `INSERT INTO book (title, author, price, pages)
         VALUES (?, ?, ?, ?)`,
        [title, author, price, pages]
    );

    res.status(201).json({
        message: "Book Added Successfully",
        bookId: result.lastID
    });
});

// PUT a book
app.put("/books/:bookId/", async (req, res) => {
    const { bookId } = req.params;
    const { title, author, price, pages } = req.body;

    const result = await db.run(
        `UPDATE book
         SET title = ?, author = ?, price = ?, pages = ?
         WHERE id = ?`,
        [title, author, price, pages, bookId]
    );

    if (result.changes === 0) {
        return res.status(404).send("Book Not Found");
    }

    res.status(200).send("Book Updated Successfully");
});

// DELETE a book
app.delete("/books/:bookId/", async (req, res) => {
    const { bookId } = req.params;

    const result = await db.run(
        "DELETE FROM book WHERE id = ?",
        [bookId]
    );

    if (result.changes === 0) {
        return res.status(404).send("Book Not Found");
    }

    res.status(200).send("Book Deleted Successfully");
});

initializeDBAndServer();