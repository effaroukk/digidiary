const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello, My Digital Diary Backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
