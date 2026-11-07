# BDF Lab 03 – REST API with Advanced Features

## Objective
To develop a REST API using Node.js, Express.js and SQLite with search, sorting, pagination, price filtering, input validation and error handling.

## Technologies Used
- Node.js
- Express.js
- SQLite
- SQLite3
- Postman

## Project Setup

1. Install dependencies:

   npm install

2. Start the server:

   npm run dev

3. Server runs at:

   http://localhost:3000

## API Endpoints

### 1. Get All Books
GET /books

### 2. Get a Single Book
GET /books/:bookId

### 3. Add a New Book
POST /books

Example request body:

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 350,
  "pages": 200
}

### 4. Update a Book
PUT /books/:bookId

### 5. Delete a Book
DELETE /books/:bookId

## Advanced Features

### Search
GET /books?search_q=atomic

Searches books using part of the title.

### Sorting
GET /books?order_by=price&order=DESC

Sorts books by price in descending order.

### Pagination
GET /books?limit=5&offset=0

Returns five books starting from the first record.

### Price Filtering
GET /books?min_price=300&max_price=450

Returns books within the specified price range.

## Input Validation

- Title is required.
- Author is required.
- Price must be a valid number.
- Invalid input returns HTTP 400.

## HTTP Status Codes

- 200 – Successful request
- 201 – Book created successfully
- 400 – Invalid input
- 404 – Book not found

## Debugging

The project covers:
- Resolving port conflicts.
- Correcting import paths.
- Fixing database table-name errors.
- Using await for asynchronous database operations.

## Conclusion

This lab demonstrates how to build an advanced REST API using Express.js and SQLite. It includes CRUD operations, search, sorting, pagination, filtering, validation and debugging.