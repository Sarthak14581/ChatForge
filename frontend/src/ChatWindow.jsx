import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { MyContext } from "./store/MyContext.jsx";
import { ScaleLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./store/AuthContext.jsx";
import { ThemeContext } from "./store/ThemeContext.jsx";
import toast from "react-hot-toast";
import { useAuthenticatedFetch } from "./utils/api.js";

function ChatWindow() {
  const authFetch = useAuthenticatedFetch();

  const {
    reply,
    setReply,
    prompt,
    setPrompt,
    currentThreadId,
    setNewChat,
    setPrevChats,
    setAllThreads,
  } = useContext(MyContext);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  // to get api response when user enters prompt
  async function getReply() {
    if (prompt.trim().length <= 0) {
      toast.error("Please Enter Prompt");
      return;
    }

    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };

    // to set the text of "Where Should We Begin"
    setNewChat(false);

    try {
      setisLoading(true);
      const response = await authFetch(
        "http://localhost:8080/api/chat",
        options,
      );

      // console.log(data);

      if (response.status === 401) {
        toast.error("Log In to Chat");
        return;
      }

      // we get reply for the current prompt from the user
      const data = await response.json();

      // we set the reply from the gpt api
      setReply(data.reply);
      setisLoading(false);

      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.log("Error to chat with the api", error);
    }
  }

  // append new chats to previous chats
  useEffect(() => {
    // sets previous chats first when the component loads
    // and then sets the chats when the reply changes

    // this means that there should be a prompt and reply to set the previous chats
    // for new chats preChats remains [] array
    if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply },
      ]);
    }

    // setting prompt to "" so user can enter next prompt
    setPrompt("");

    // Reset textarea height
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }

    // if we add prompt in this array the effect will run at every key stroke
  }, [reply]);

  // this function handles opening and closing of profile icon
  function handleProfileClick() {
    setIsOpen(!isOpen);
  }

  // logouts the user by sending post request to logut
  async function handleLogout() {
    const response = await authFetch(
      "http://localhost:8080/gpt/refresh/logout",
      {
        credentials: "include",
        method: "POST",
      },
    );

    if (response.ok) {
      toast.success("You are Logged Out");
    }
    setIsLoggedIn(false);
    setIsOpen(false);
    setPrevChats([]);
    setPrompt("");
    setReply(null);
    setAllThreads([]);
    setNewChat(true);
  }

  function handleTheme() {
    toggleTheme();
  }

  const textAreaRef = useRef(null);

  function handleTextareaChange(event) {
    setPrompt(event.target.value);

    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  }

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          ChatForge <i className="fa-solid fa-chevron-down"></i>
        </span>

        {isLoggedIn ? (
          <div className="userIconDiv" onClick={handleProfileClick}>
            <span className="userIcon">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
        ) : (
          <div className="userIconDiv">
            <div className="log-sign-btn">
              <Link to={"/signup"}>
                {" "}
                <button>Signup</button>{" "}
              </Link>
              <Link to={"/login"}>
                {" "}
                <button>Log In</button>{" "}
              </Link>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan
          </div>
          <div className="dropDownItem" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>Log Out
          </div>
          <div className="dropDownItem" onClick={handleTheme}>
            Change Theme {theme === "light" ? "🌙" : "☀️"}
          </div>
        </div>
      )}

      <Chat></Chat>

      <ScaleLoader
        loading={isLoading}
        color={theme === "dark" ? "#fff" : "#000"}
      />

      <div className="chatInput">
        <div className="inputBox">
          <textarea
            ref={textAreaRef}
            placeholder="Ask Anything"
            name="prompt"
            value={prompt}
            onChange={handleTextareaChange}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                e.preventDefault();
                getReply();
              }
            }}
            disabled={isLoading}
            // rows={1}
            style={{
              resize: "none",
            }}
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
