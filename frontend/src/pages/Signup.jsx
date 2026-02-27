import React from "react";
import CustomForm from "../components/CustomForm";
import { redirect, useNavigation } from "react-router-dom";
import toast from "react-hot-toast";
import { logger } from "../utils/logger";

function Signup() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return <CustomForm signup={true} isSubmitting={isSubmitting}/>;
}

export async function action({ request }) {
  const formData = await request.formData();

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    userName: formData.get("userName"),
  };

  logger.debug(data);

  const response = await fetch(
    `${API_BASE_URL ? API_BASE_URL : "http://localhost:8080"}/gpt/signup`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );

  const msg = await response.json();
  logger.debug(response.status);

  if (response.status === 409) {
    toast.error(msg.error);
    return;
  }

  if (response.status === 422) {
    toast.error(msg.error);
    return;
  }

  // if user is created successfully we will redirect it to home
  if (response.status === 201) {
    toast.success(msg.message);
    toast.success("You are Logged In");
    return redirect("/");
  }
}

export default Signup;
