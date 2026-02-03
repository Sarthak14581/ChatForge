import "dotenv/config";

export default async function summarizer(thread) {
  const N = 10;

  if (thread.summarizedUntil >= thread.messages.length) return;

  const start = thread.summarizedUntil;
  const end = start + N;
  const firstNMessages = thread.messages.slice(start, start + N);
  

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer  ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are summarizing a conversation for long-term memory.",
        },
        {
          role: "user",
          content:
            "Summarize the following conversation, preserving key facts, decisions, and goals.",
        },
        ...firstNMessages,
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options,
    );

    const data = await response.json();

    // console.log(data.choices[0].message.content);
    return data.choices[0].message.content; // reply we are returning
  } catch (error) {
    console.log(error);
  }
}
