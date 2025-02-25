import React from "react";

const InputPassWord = () => {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-primary dark:text-orange-300 mb-2"
      >
        Contraseña
      </label>
      <input
        type="password"
        id="password"
        className="w-full p-3 border border-orange-400 rounded-md shadow-sm focus:ring-opacity-0 focus:border-orange-400/80 focus:outline-none dark:border-orange-400/50 dark:text-white"
        placeholder="Introducí tu contraseña"
        required
      />
      <p className="mt-2 text-xs text-muted dark:text-zinc-400">
        Asegúrate de que tu contraseña tenga al menos 8 caracteres.
      </p>
    </div>
  );
};

export default InputPassWord;
