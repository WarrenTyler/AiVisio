import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

// dotenv.config();
dotenv.config({path : "../.env"})
const router = express.Router();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAIApi(configuration);

// test api
router.get("/", async (req, res) => {
  res.send("Hello from OpenAI API (DALL-E)");
});

router.post("/generate", async (req, res) => {
  try {
    // get prompt from frontend client's http request body
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].image;

    // send image to frontend client
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data.error.message);
  }
});

export default router;
