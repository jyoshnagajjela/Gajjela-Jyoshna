const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const dbPath = "./books.db";

let db;

// Initialize database and server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
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

        const PORT = process.env.PORT || 3000;

        const server = app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

        // Handle port conflicts
        server.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                console.error(`Port ${PORT} is already in use. Try another port.`);
            } else {
                console.error("Server Error:", error.message);
            }
        });

    } catch (error) {
        console.error("Database Error:", error.message);
    }
};

// GET all books with search, sorting, pagination and price filtering
app.get("/books", async (req, res) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = req.query;

        // Validate sorting column
        const allowedColumns = ["id", "title", "author", "price", "pages"];

        if (!allowedColumns.includes(order_by)) {
            return res.status(400).json({
                message: "Invalid order_by value"
            });
        }

        // Validate sorting order
        const sortOrder = order.toUpperCase();

        if (!["ASC", "DESC"].includes(sortOrder)) {
            return res.status(400).json({
                message: "Order must be ASC or DESC"
            });
        }

        // Validate pagination
        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) ||
            !Number.isInteger(pageOffset) ||
            pageLimit <= 0 ||
            pageOffset < 0
        ) {
            return res.status(400).json({
                message: "Limit must be positive and offset must be non-negative integers"
            });
        }

        // Build search and price conditions
        const conditions = [];
        const values = [];

        if (search_q.trim() !== "") {
            conditions.push("title LIKE ?");
            values.push(`%${search_q}%`);
        }

        if (min_price !== undefined) {
            if (
                min_price === "" ||
                !Number.isFinite(Number(min_price))
            ) {
                return res.status(400).json({
                    message: "min_price must be a valid number"
                });
            }

            conditions.push("price >= ?");
            values.push(Number(min_price));
        }

        if (max_price !== undefined) {
            if (
                max_price === "" ||
                !Number.isFinite(Number(max_price))
            ) {
                return res.status(400).json({
                    message: "max_price must be a valid number"
                });
            }

            conditions.push("price <= ?");
            values.push(Number(max_price));
        }

        if (
            min_price !== undefined &&
            max_price !== undefined &&
            Number(min_price) > Number(max_price)
        ) {
            return res.status(400).json({
                message: "min_price cannot be greater than max_price"
            });
        }

        let query = "SELECT * FROM book";

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += ` ORDER BY ${order_by} ${sortOrder} LIMIT ? OFFSET ?`;

        values.push(pageLimit, pageOffset);

        const books = await db.all(query, values);

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve books",
            error: error.message
        });
    }
});

// GET a single book
app.get("/books/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;

        const book = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [bookId]
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve book"
        });
    }
});

// POST a new book with validation
app.post("/books", async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            typeof author !== "string" ||
            author.trim() === "" ||
            price === undefined ||
            price === null ||
            price === "" ||
            !Number.isFinite(price)
        ) {
            return res.status(400).json({
                message: "Title and author are required, and price must be a number"
            });
        }

        const result = await db.run(
            `INSERT INTO book (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [title.trim(), author.trim(), price, pages]
        );

        res.status(201).json({
            message: "Book added successfully",
            bookId: result.lastID
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to add book",
            error: error.message
        });
    }
});

// PUT update a book
app.put("/books/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;
        const { title, author, price, pages } = req.body;

        const result = await db.run(
            `UPDATE book
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [title, author, price, pages, bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to update book"
        });
    }
});

// DELETE a book
app.delete("/books/:bookId", async (req, res) => {
    try {
        const { bookId } = req.params;

        const result = await db.run(
            "DELETE FROM book WHERE id = ?",
            [bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to delete book"
        });
    }
});

// Start application
initializeDBAndServer();