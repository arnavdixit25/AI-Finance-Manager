require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing from environment!");
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

router.post('/advice', async (req, res) => {
  try {
    const { context } = req.body;

    if (!context || typeof context !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing "context"' });
    }

    // Long detailed prompt as user role only:
    const promptText = `
You are a helpful and knowledgeable financial advisor AI. Based on the following transactions, provide a detailed and thorough financial advice including spending habits, saving tips, budgeting, and any other relevant recommendations.

Transactions summary:
${context}

Please explain your advice clearly and provide actionable steps. Make your response detailed and easy to understand.
`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }]
          }
        ]
      }
    );

    const aiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.json({ reply: aiReply });

  } catch (err) {
    console.error("❌ Gemini API error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Gemini AI analysis failed.",
      details: err.response?.data || err.message
    });
  }
});

module.exports = router;
