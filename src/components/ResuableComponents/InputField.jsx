import React from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  name,
}) => {
  return (
    <React.Fragment>
      <div className="w-full">
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold text-gray-600"
        >
          {label}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full border bg-white px-5 py-5 text-lg outline-none transition-all duration-200
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-orange-500"
            }
            rounded-sm`}
        />

        {error && (
          <p
            id={`${name}-error`}
            className="mt-2 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </React.Fragment>
  );
};

export default InputField;
