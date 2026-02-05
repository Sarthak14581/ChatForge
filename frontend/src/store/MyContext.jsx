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
  isLoading: false,
  setIsLoading: () => {}
});

export default function ContextWrapper({children}) {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null); //we don't know what type of reply we are getting hence it is null
  const [currentThreadId, setCurrentThreadId] = useState(uuidv1());  //we can start a new chat immediately
  const [prevChats, setPrevChats] = useState([]); // stores all chats of the current thread
  const [newChat, setNewChat] = useState(true); // user always gets option to start new chat
  const [allThreads, setAllThreads] = useState([]); // all threads that we use to show history
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // to reflect if user is logged in or not
  const [isLoading, setIsLoading] = useState(false);

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
    isLoading,
    setIsLoading
  };

  return <MyContext value={providerValues}>{children}</MyContext>;
}
