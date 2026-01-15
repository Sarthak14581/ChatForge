import { useContext, useEffect } from "react";
import "./Sidebar.css";
import logoImage from "./assets/blacklogo.png";
import { MyContext } from "./store/MyContext";
import { v1 as uuidv1 } from "uuid";

export default function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currentThreadId,
    setCurrentThreadId,
    prevChats,
    setNewChat,
    setPrompt,
    setReply,
    setPrevChats,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const data = await response.json();

      // threadId, title
      const filteredData = data.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currentThreadId]);

  function startNewChat() {
    if (prevChats.length) {
      setNewChat(true);
      setReply(null);
      setPrompt("");
      setPrevChats([]);
      setCurrentThreadId(uuidv1());
    }
  }

  async function changeThread(newThreadId) {
    setCurrentThreadId(newThreadId);

    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`
      );
      const data = await response.json();
      console.log(data);

      setPrevChats(data);
      setNewChat(false);
      // setPrompt("")
      setReply(null);
    } catch (error) {
      console.log(error);
    }
  }


  async function deleteThread(threadId) {
    try {
      const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if(threadId === currentThreadId) {
        startNewChat();
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="sidebar">
      {/* new chat button */}
      <button onClick={startNewChat}>
        <img src={logoImage} alt="chatForge logo" className="logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      {/* history */}

      <ul className="history">
        {allThreads?.map((thread) => {
          return (
            <li
              key={thread.threadId}
              onClick={() => changeThread(thread.threadId)}
              className={currentThreadId === thread.threadId && "highlighted"}
            >
              {thread.title}
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation() //prevents event bubbling means event only happens on the trach icon not on the parent li
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
          );
        })}
      </ul>

      {/* sign */}

      <div className="sign">
        <p>By Sarthak &hearts; </p>
      </div>
    </section>
  );
}
