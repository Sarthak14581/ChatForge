import Sidebar from "../Sidebar.jsx";
import ChatWindow from "../ChatWindow";
import ContextWrapper from "../store/MyContext.jsx";
import { AuthContext } from "../store/AuthContext.jsx";
import { useContext, useEffect } from "react";
import { logger } from "../utils/logger.js";

function HomePage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const { setIsLoggedIn } = useContext(AuthContext);
  async function checkAuth() {
    logger.debug("useEffect run in home page");
    try {
      const res = await fetch(
        `${API_BASE_URL ? API_BASE_URL : "http://localhost:8080"}/gpt/verify`,
        {
          credentials: "include",
        },
      );
      const user = await res.json();
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  }

  // check only first time if user was logged in or not
  // i have made the login and signup routes children of the parent
  //  hence this useEffect is working only once
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <div className="app">
        <Sidebar />
        <ChatWindow />
      </div>
    </>
  );
}

export default HomePage;
