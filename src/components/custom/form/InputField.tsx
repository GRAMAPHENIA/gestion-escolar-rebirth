import React from "react";

interface InputProps {
  label: string;
  placeholder: string;
  footerText: string;
  type: string;
  id: string;
  value: string; // Añadido para manejar el valor del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Añadido para manejar el cambio de valor
}

const InputField: React.FC<InputProps> = ({
  label,
  placeholder,
  footerText,
  type,
  id,
  value,
  onChange,
}) => {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-primary dark:text-orange-300 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value} // Vinculamos el valor del input con el estado
        placeholder={placeholder}
        onChange={onChange} // Vinculamos el evento onChange
        className="w-full p-3 border border-orange-400 rounded-md shadow-sm focus:ring-opacity-0 focus:border-orange-400/80 focus:outline-none dark:border-orange-400/50 text-base"
        required
      />
      <p className="mt-2 text-xs text-muted dark:text-zinc-400">{footerText}</p>
    </div>
  );
};

export default InputField;
