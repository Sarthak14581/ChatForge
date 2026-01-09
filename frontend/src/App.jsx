import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./store/MyContext.jsx";

function App() {
  const providerValues = {};

  return (
    <div className="app">
      <MyContext value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext>
    </div>
  );
}

export default App;
