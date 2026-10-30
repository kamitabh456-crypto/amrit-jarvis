require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/api/status", (req, res) => {
  res.json({
    name: "AMRIT JARVIS",
    status: "online"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    const response = await ai.models.generateContent({
model: "gemini-3.1-flash-lite",
    contents: `You are AMRIT JARVIS, a friendly personal AI assistant created by Amrit. Always introduce yourself as AMRIT JARVIS, never as Gemini. Reply in the same language as the user, especially Hindi or Hinglish. Be helpful, clear, and friendly.

User's message: ${message}`

    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      error: error.message || String(error)
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `AMRIT JARVIS running at http://127.0.0.1:${PORT}`
  );
});
