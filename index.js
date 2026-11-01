
const express = require("express");

const app = express();

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to my Express server!");
});

// About route
app.get("/about", (req, res) => {
    res.status(200).json({
        name: "Gajjela Jyoshna",
        section: "CSE-AIDE Sec S-10"
    });
});

// Time route
app.get("/time", (req, res) => {
    res.status(200).json({
        currentTime: new Date()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// Server port configuration
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
