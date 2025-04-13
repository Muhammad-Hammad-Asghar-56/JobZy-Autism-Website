import React from "react";

const ComboBox = ({
  label,
  name,
  value,
  onChange,
  options,
  defaultOption,
  customClassName,
}) => (
  <div className={`mb-4 ${customClassName}`}>
    {label && <label className="block mb-2 text-gray-700">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="" disabled>
        {defaultOption}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default ComboBox;
