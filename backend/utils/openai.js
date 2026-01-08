import "dotenv/config";

// this functions returns reply from the model or it's api based on the message
const getOpenAiApiResponse = async (message) => {

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
          role: "user",
          content: message,
        },
      ],
    }),
  };



  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();

    // console.log(data.choices[0].message.content);

    return data.choices[0].message.content; // reply we are returning
  } catch (error) {
    console.log(error);
  }
};

export default getOpenAiApiResponse;