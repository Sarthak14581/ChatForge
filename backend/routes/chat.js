import express from "express";
import Thread from "../models/Thread.js";
import getOpenAiApiResponse from "../utils/openai.js";

const router = express.Router();

// test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "you are cat",
      title: "as you wish you will be",
    });

    const response = await thread.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save in db!" });
  }
});

// get all threads
router.get("/thread", async (req, res) => {
  try {
    // we need threads in decending order of updatedAt i.e most recent chat will show on the top
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// get a specific thread
router.get("/thread/:threadId", async (req, res) => {
  const threadId = req.params.threadId;

  try {
    const thread = await Thread.findOne({ threadId: threadId });

    if (!thread) {
      res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      res.status(404).json({ error: "thread dosn't exist" });
    }

    res.status(200).json({ success: "Thread Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete the thread" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    res.status(404).json({ error: "Missing Required Fields" });
  } 

  try {
    let thread = await Thread.findOne({ threadId });

    // thread is not in the db means it is a new chat
    if (!thread) {
      // hence we create a new thread in the db
      thread = new Thread({
        threadId: threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {  
      // if the chat exist we push the message in the thread
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getOpenAiApiResponse(message);
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: assistantReply });
  } catch (error) { 
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }

  
});

export default router;
