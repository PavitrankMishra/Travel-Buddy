import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Travel Buddy server</h1>");
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
