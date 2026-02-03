import Sidebar from "../Sidebar.jsx";
import ChatWindow from "../ChatWindow";
import ContextWrapper from "../store/MyContext.jsx";
import  { AuthContext } from "../store/AuthContext.jsx";
import { useContext, useEffect } from "react";

function HomePage() {
  const { setIsLoggedIn } = useContext(AuthContext);
  async function checkAuth() {
    console.log("useEffect run in home page");
    try {
      const res = await fetch("http://localhost:8080/gpt/verify", {
        credentials: "include",
      });
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
