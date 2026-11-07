# BDF Lab 03 – REST API Development

## 1. Project Overview

This project focuses on developing a REST API using Node.js, Express.js and SQLite for managing book records.

The application supports CRUD (Create, Read, Update and Delete) operations along with additional features such as partial title searching, sorting, pagination, price filtering, input validation and error handling.

## 2. Project Links

- **GitHub Repository:** https://github.com/jyoshnagajjela/Gajjela-Jyoshna/tree/main/lab-03
- **Live Deployment:** https://bdf-lab-03.onrender.com/books

## 3. Objectives

- Develop REST API endpoints using Express.js.
- Implement CRUD operations for book records.
- Search books using partial title matching.
- Sort books in ascending and descending order.
- Implement pagination using limit and offset.
- Filter books using minimum and maximum prices.
- Validate user inputs.
- Handle errors using appropriate HTTP status codes.
- Test API endpoints using Postman.
- Deploy the REST API using Render.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | REST API development |
| SQLite | Database management |
| SQLite3 | SQLite database connectivity |
| JavaScript | Application logic |
| Postman | API testing |
| Git and GitHub | Version control and code hosting |
| Render | Application deployment |

## 5. Project Structure

```text
lab-03/
│
├── screenshots/
├── .gitignore
├── .node-version
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── seed.js
```

## 6. Installation and Execution

### Step 1: Clone the Repository

```bash
git clone https://github.com/jyoshnagajjela/Gajjela-Jyoshna.git
```

### Step 2: Navigate to Lab 03

```bash
cd Gajjela-Jyoshna/lab-03
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Initialise the Database

```bash
node seed.js
```

This creates the SQLite database and inserts sample book records.

**Note:** The seed script clears existing book records before inserting the sample data.

### Step 5: Start the Server

```bash
npm run dev
```

The local server runs at:

```text
http://localhost:3000
```

## 7. API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:bookId` | Retrieve a specific book |
| POST | `/books` | Add a new book |
| PUT | `/books/:bookId` | Update an existing book |
| DELETE | `/books/:bookId` | Delete a book |

## 8. Additional API Features

### A. Search by Title

The `search_q` parameter supports partial title searching.

Example:

```text
GET /books?search_q=atomic
```

### B. Sorting

The `order_by` and `order` parameters are used to sort book records.

Example:

```text
GET /books?order_by=price&order=DESC
```

- ASC – Ascending order
- DESC – Descending order

### C. Pagination

The `limit` and `offset` parameters are used to retrieve records in smaller groups.

Example:

```text
GET /books?limit=5&offset=0
```

- `limit` specifies the maximum number of records.
- `offset` specifies the number of records to skip.

### D. Price Filtering

The `min_price` and `max_price` parameters filter books based on their prices.

Example:

```text
GET /books?min_price=300&max_price=400
```

### E. Combining Query Parameters

Multiple query parameters can be combined in a single API request.

Example:

```text
GET /books?search_q=the&min_price=200&max_price=500&order_by=price&order=ASC&limit=5&offset=0
```

## 9. Input Validation and Error Handling

The API validates incoming data before creating book records.

- Title is required.
- Author is required.
- Price must be a valid number.
- Invalid input returns `400 Bad Request`.
- Missing records return `404 Not Found`.
- Successful creation returns `201 Created`.
- Successful retrieval returns `200 OK`.
- Successful update returns `200 OK`.
- Successful deletion returns `200 OK`.

## 10. API Testing

All API functionalities were tested using Postman.

The following test cases were performed:

1. Retrieve all books.
2. Search books by partial title.
3. Sort books by price.
4. Retrieve books using pagination.
5. Filter books by price range.
6. Add a new book.
7. Validate POST requests with missing fields.
8. Update an existing book.
9. Delete an existing book.
10. Retrieve a non-existing book and verify the 404 response.

Testing screenshots are available in the `screenshots` folder.

## 11. Deployment

The REST API was deployed using Render.

**Live API Endpoint:**

```text
PASTE YOUR ACTUAL RENDER DEPLOYMENT URL HERE/books
```

The deployed API can be accessed to retrieve book records and test the available endpoints.

## 12. Debugging and Error Handling

The following development issues were considered during implementation:

- Port conflicts while running the server.
- Incorrect module import paths.
- SQLite table name mismatches.
- Missing `await` statements in asynchronous database operations.
- Invalid query parameters.
- Missing book records.
- Invalid input during POST requests.

## 13. Conclusion

This lab provided practical experience in developing REST APIs using Node.js, Express.js and SQLite.

It helped in understanding CRUD operations, HTTP methods, query parameters, searching, sorting, pagination, price filtering, input validation and error handling.

The project also provided hands-on experience in testing APIs using Postman, managing source code through GitHub and deploying an application using Render.