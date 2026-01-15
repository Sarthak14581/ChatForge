import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./store/MyContext.jsx";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
    reply,
    setReply,
    prompt,
    setPrompt,
    currentThreadId,
    setNewChat,
    setPrevChats,
  } = useContext(MyContext);

  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function getReply() {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };
    
    setNewChat(false)

    try {
      setisLoading(true);
      const response = await fetch("http://localhost:8080/api/chat", options);
      const data = await response.json();
      // console.log(data.reply);
      setReply(data.reply);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // append new chats to previous chats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
      
    }

    setPrompt("");

    // async function getAllChats() {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:8080/api/thread/${currentThreadId}`
    //     );
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getAllChats();
  
  }, [reply]);


  function handleProfileClick() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ChatForge <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick} >
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>  
          </span>
        </div>
      </div>

      {
        isOpen && 
        <div className="dropDown">
          <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
          <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan</div>
          <div className="dropDownItem"><i className="fa-solid fa-right-from-bracket"></i> Log Out</div>
        </div>
      }

      <Chat></Chat>

      <ScaleLoader loading={isLoading} color="#fff" />

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask Anything"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && getReply()}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          ChatForge can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
