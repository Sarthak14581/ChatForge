import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = 8080;

// these are usefull when interacting with the frontend
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});


app.post("/test", async (req, res) => {

});

// import OpenAI from 'openai';
// import { config } from 'dotenv';
// // config();
// console.log(process.env.OPENAI_API_KEY);
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });
// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
//   // instructions: 'You are a coding assistant that talks like a pirate',
//   input: 'what was your purpose in humanity answer in one sentence',
// });
// console.log(response.output_text);
