import React from "react";

const InputComponent = ({ placeholder, type, required, name, onChange }) => {
  return (
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className="w-full leading-10 px-4 rounded"
      required={required}
      onChange={onChange}
    />
  );
};

export default InputComponent;
