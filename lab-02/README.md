# Lab 02: SQLite Database and CRUD Routes

## Student Details

* **Name:** Gajjela Jyoshna
* **Registration Number:** 252U1R5045
* **Section:** CSE-AIDE Sec S-10
* **Course:** Backend Development Fundamentals
* **Year:** II
* **Term:** II

## Objective

To connect an Express.js server with an SQLite database and implement CRUD operations using HTTP routes.

## Technologies Used

* Node.js
* Express.js
* SQLite
* JavaScript
* Postman
* Nodemon

## Installation and Execution

1. Clone the repository.

2. Open the `lab-02` folder in the terminal.

3. Install the dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

5. Open the application at:

   `http://localhost:3000`

## Database

Database file: `books.db`

Table name: `book`

Columns:

* id
* title
* author
* price
* pages

The database contains 10 initial book records.

## API Endpoints

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/books/`         | Get all books         |
| GET    | `/books/:bookId/` | Get a particular book |
| POST   | `/books/`         | Add a new book        |
| PUT    | `/books/:bookId/` | Update a book         |
| DELETE | `/books/:bookId/` | Delete a book         |

## Postman Testing Screenshots

Screenshots of all five CRUD operations are available in the `screenshots` folder.

1. `get-all-books.png`
2. `get-single-book.png`
3. `post-add-book.png`
4. `put-update-book.png`
5. `delete-book.png`
6. `verify-books.png`

## Parameterised Queries

SQL queries use `?` placeholders to safely pass user-provided values and reduce the risk of SQL injection.

## Conclusion

Successfully connected an Express.js server to an SQLite database and implemented all five CRUD operations. Tested the API endpoints using Postman and verified the database changes.
