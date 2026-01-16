import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import ContextWrapper, { MyContext } from "./store/MyContext.jsx";


function App() {     

  

  return (
    <div className="app">
      <ContextWrapper>
        <Sidebar />
        <ChatWindow />
      </ContextWrapper>
    </div>
  );
}

export default App;
