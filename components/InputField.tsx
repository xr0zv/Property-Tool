import React, { useState } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  prefix?: string;
  isResult?: boolean;
  displayValue?: string;
  placeholder?: string;
  ariaLabel?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  unit,
  prefix,
  isResult = false,
  displayValue,
  placeholder,
  ariaLabel,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and a single decimal point
    // This also sanitizes pasted values that might include currency symbols or commas
    const sanitizedValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    onChange(sanitizedValue);
  };

  const inputClasses = `
    w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg 
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
    transition-all duration-200 ease-in-out
    ${prefix ? 'pl-12' : 'pl-3'} 
    ${unit ? 'pr-14' : 'pr-3'} 
    ${isResult 
      ? 'text-2xl md:text-3xl font-bold py-3 bg-gray-900/50 border-blue-800 text-blue-300' 
      : 'text-base py-2'}
  `;

  // When focused, show the raw value for editing.
  // When blurred, show the formatted displayValue if available.
  const valueToDisplay = !isFocused && displayValue && value !== '' ? displayValue : value;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-1.5 text-sm font-medium text-gray-400">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 ${isResult ? 'text-2xl text-blue-300' : 'text-base'}`}>
            {prefix}
          </span>
        )}
        <input
          type="text" // Use text to allow for more flexible input handling
          id={id}
          value={valueToDisplay}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          placeholder={placeholder}
          aria-label={ariaLabel || label}
        />
        {unit && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-gray-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;