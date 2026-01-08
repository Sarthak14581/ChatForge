import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

// these are usefull when interacting with the frontend
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected with Database!.")
  } catch (error) {
    console.log("Failed to connect with DB",error);
  }

  
}


// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer  ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//     const data = await response.json();
//     console.log(data.choices[0].message.content);
//     res.send(data.choices[0].message.content);
//   } catch (error) {
//     console.log(error);
//   }
// });

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
