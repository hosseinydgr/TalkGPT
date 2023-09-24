const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is active");
});

// const { Configuration, OpenAIApi } = require("openai");

// const openai = new OpenAIApi(
//   new Configuration({
//     apiKey: "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",
//   })
// );

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

app.post("/chat", async (req, res) => {
  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.question }],
      temperature: 0,
      max_tokens: 256,
    });

    res.status(200).json({ message: resp.choices[0].message.content });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
