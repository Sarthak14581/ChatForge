import { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { MyContext } from "./store/MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"

// react-markdown
// rehype-highlight

function Chat() {
  const [latestReply, setLatestReply] = useState("");
  const { newChat, prevChats, reply } = useContext(MyContext);

  useEffect(() => {

    if(!prevChats?.length) return;

    const content = reply.split(" "); //individual words are stored
    // const content = reply; // character by character output

    let idx = 0;
    const interval = setInterval(() => {
        setLatestReply(content.slice(0, idx+1).join(" ")); // individual word output
        
        // setLatestReply(content.slice(0, idx+1)); // character by character output
        idx++;
        if(idx >= content.length){
          clearInterval(interval);
        }
    }, 40);

    return () => clearInterval(interval);

  }, [prevChats, reply])
  
  return (
    <>
      {newChat && <h1>Where Should We Begin</h1>}
      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, idx) => {
          const markdown = chat.content;

          return (
            <div
              className={chat.role === "user" ? "userDiv" : "gptDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{markdown}</ReactMarkdown>
              )}
            </div>
          );
        })}

        {
          prevChats?.length > 0 && latestReply !== null && 
          <div className="gptDiv" key={"typing"}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{latestReply}</ReactMarkdown>
          </div>
        }

      </div>
    </>
  );
}

export default Chat;
