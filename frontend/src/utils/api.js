import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import toast from "react-hot-toast";
import { MyContext } from "../store/MyContext";
import { useNavigate } from "react-router-dom";

export function useAuthenticatedFetch() {
  const {
    setIsLoggedIn,
  } = useContext(AuthContext);

  const navigate = useNavigate()

  const {setAllThreads, setNewChat, setPrevChats, setPrompt, setReply,} = useContext(MyContext);

  const authenticatedFetch = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
    });

    // Check for 401 Unauthorized
    if (response.status === 401) {
      // Automatically logout
      setIsLoggedIn(false);
      setPrevChats([]);
      setPrompt("");
      setReply(null);
      setAllThreads([]);
      setNewChat(true);
      // Optional: Show toast or redirect
      toast.error("Session expired. Please login again.");
      navigate("/login");
    }

    return response;
  };

  return authenticatedFetch;
}
