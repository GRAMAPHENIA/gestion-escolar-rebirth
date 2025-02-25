import React from "react";

const InputMail = () => {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-primary dark:text-orange-300 mb-2"
      >
        Correo Electrónico
      </label>
      <input
        type="email"
        id="email"
        placeholder="ejemplo@dominio.com"
        className="w-full p-3 border border-orange-400 rounded-md shadow-sm focus:ring-opacity-0 focus:border-orange-400/80 focus:outline-none dark:border-orange-400/50 dark:text-white"
        required
      />
      <p className="mt-2 text-xs text-muted dark:text-zinc-400">
        Ingresa un correo válido para el registro.
      </p>
    </div>
  );
};

export default InputMail;
