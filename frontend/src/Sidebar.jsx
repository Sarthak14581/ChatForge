import "./Sidebar.css";
import logoImage from "./assets/blacklogo.png";

export default function Sidebar() {
  return (
    <section className="sidebar">
      {/* new chat button */}
      <button>
        <img src={logoImage} alt="chatForge logo" className="logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      {/* history */}

      <ul className="history">
        <li>thread_1</li>
        <li>thread_2</li>
        <li>thread_3</li>
        <li>thread_4</li>
        <li>thread_5</li>
      </ul>

      {/* sign */}

      <div className="sign">
        <p>By Sarthak &hearts; </p>
      </div>
    </section>
  );
}
