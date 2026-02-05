import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import toast from "react-hot-toast";
import { MyContext } from "../store/MyContext";
import { useNavigate } from "react-router-dom";

export function useAuthenticatedFetch() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const { setAllThreads, setNewChat, setPrevChats, setPrompt, setReply } =
    useContext(MyContext);

  const authenticatedFetch = async (url, options = {}) => {
    let response = await fetch(url, {
      ...options,
      credentials: "include",
    });

    // Check for 401 Unauthorized
    if (response.status === 401) {
      console.log("Access token expired, attempting refresh...");
      const refreshResponse = await fetch("http://localhost:8080/gpt/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        console.log("Token refreshed successfully!");

        response = await fetch(url, { ...options, credentials: "include" });
        return response;
      } else {
        // Automatically logout
        console.log("Refresh token expired, logging out...");
        setIsLoggedIn(false);
        setPrevChats([]);
        setPrompt("");
        setReply(null);
        setAllThreads([]);
        setNewChat(true);
        // Optional: Show toast or redirect
        toast.error("Session expired. Please login again.");
        navigate("/");
      }
    }

    return response;
  };

  return authenticatedFetch;
}
