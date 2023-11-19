import React from "react";

const InputComponent = ({ placeholder, type, required, id }) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="w-full leading-10 px-4 rounded"
      required={required}
    />
  );
};

export default InputComponent;
