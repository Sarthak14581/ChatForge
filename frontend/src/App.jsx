import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login, { action as loginAction } from "./pages/Login";
import Signup, { action as signupActions } from "./pages/Signup";
import AuthContextProvider from "./store/AuthContext";
import ContextWrapper from "./store/MyContext";
import RootLayout from "./RootLayout";
import ThemeContextProvider from "./store/ThemeContext";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: signupActions,
      },
    ],
  },
]);

function App() {
  return (
    <ContextWrapper>
      <AuthContextProvider>
        <ThemeContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </ContextWrapper>
  );
}

export default App;
