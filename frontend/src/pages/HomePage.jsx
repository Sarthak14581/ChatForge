import Sidebar from "../Sidebar.jsx";
import ChatWindow from "../ChatWindow";
import { AuthContext } from "../store/AuthContext.jsx";
import { useContext, useEffect, useState } from "react";
import { logger } from "../utils/logger.js";
import "../App.css"

function HomePage() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const { setIsLoggedIn } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <ChatWindow onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
}

export default HomePage;
