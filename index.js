const express = require("express");
const {OpenAI} = require("openai");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

const app = express();
const port = 3000;
app.use(express.json());

const openai = new OpenAI({
  apiKey: API_KEY,
});

app.post("/api/chat-gpt", sendMessages);

async function sendMessages(req, res) {
  try {
    const messages = req.body.messages;
    const response = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });
    res.send(response.choices[0]);
  } catch (error) {
    console.log(error);
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
