import { data, Form, redirect, useActionData } from "react-router-dom";
import "./Login.css";
import CustomForm from "../components/CustomForm";
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import toast from "react-hot-toast";
import { logger } from "../utils/logger";

function Login() {
  const validationErrors = useActionData();

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  return <CustomForm validationErrors={validationErrors} />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!data.password || !data.email) {
    return Response.json(
      { error: "Email and Password are required" },
      { status: 404 },
    );
  }
  // we got data from the Form which is in the login.jsx
  const response = await fetch(
    `${API_BASE_URL ? API_BASE_URL : "http://localhost:8080"}/gpt/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Add this line
      body: JSON.stringify(data),
    },
  );

  const res = await response.json();

  logger.debug(res);

  if (response.ok) {
    toast.success("Logged In Successfully");
    return redirect("/");
  } else {
    toast.error(res.error);
  }
}

export default Login;
