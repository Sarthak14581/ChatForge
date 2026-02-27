import React, { useContext } from "react";
import "../pages/Login.css";
import { Form } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { ThemeContext } from "../store/ThemeContext";

function CustomForm({ signup, validationErrors, isSubmitting }) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <div className="login-div">
        <Form method="post" action={signup ? "/signup" : "/login"}>
          <div className="login-form">
            <h1>{signup ? "Signup" : "Login"}</h1>

            {validationErrors?.error && toast.error(validationErrors.error)}

            {signup && (
              <div className="input-div">
                <label htmlFor="userName">User Name: </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Enter User Name"
                  required
                />
              </div>
            )}

            <div className="input-div">
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="input-div">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                required
              />
            </div>
            <button>
              {signup ? "Signup" : "Login"}{" "}
              <ClipLoader
                loading={isSubmitting}
                size={18}
                color={theme === "dark" ? "#fff" : "#000"}
              />{" "}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default CustomForm;
