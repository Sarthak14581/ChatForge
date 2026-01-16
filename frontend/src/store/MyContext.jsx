import { createContext } from "react";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

export const MyContext = createContext({
  prompt: "",
  setPrompt: () => {},
  reply: null,
  setReply: () => {},
  currentThreadId: "",
  setCurrentThreadId: () => {},
  prevChats: [],
  setPrevChats: () => {},
  newChat: true,
  setNewChat: () => {},
  allThreads: [],
  setAllThreads: () => {},
});

export default function ContextWrapper({children}) {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); // stores all chats of the current thread
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    setCurrentThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };

  return <MyContext value={providerValues}>{children}</MyContext>;
}
