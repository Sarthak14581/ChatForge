import React from "react";

function Input({label, ...props}) {
  return (
    <div className="input-div">
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Enter Your Email"
      />
    </div>
  );
}

export default Input;
