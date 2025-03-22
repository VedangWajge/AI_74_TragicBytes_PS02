const express = require("express");
const bodyParser = require("body-parser");
const chatRouter = require("./routes/chatbot");

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", chatRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
