import React from "react";

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
