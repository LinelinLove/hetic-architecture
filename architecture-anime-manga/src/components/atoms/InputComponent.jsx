import React from "react";

const InputComponent = ({ placeholder, type }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full leading-10 px-4 rounded"
    />
  );
};

export default InputComponent;
