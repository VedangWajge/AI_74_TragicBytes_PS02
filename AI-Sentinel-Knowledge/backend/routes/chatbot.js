const express = require("express");
const { GPTModel } = require("../models/gpt_model");

const router = express.Router();
const gpt_model = new GPTModel();

// Handle Chat API
router.post("/chat", async (req, res) => {
  const userQuery = req.body.question;

  if (!userQuery) {
    return res.status(400).json({ error: "Query cannot be empty" });
  }

  // Generate AI Response using GPT-2
  const aiResponse = await gpt_model.generateResponse(userQuery);

  return res.json({ response: aiResponse });
});

module.exports = router;
