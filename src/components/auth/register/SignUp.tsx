"use client"; // Asegúrate de que el archivo es tratado como componente del cliente

import Button from "@/components/custom/Button";
import InputField from "@/components/custom/form/InputField";
import { useState } from "react";
import { z } from "zod";

// Definir esquema de validación con Zod
const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const SignUp = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Función que maneja el cambio de los campos de entrada
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" })); // Limpiar errores cuando el usuario escriba
  };

  // Función de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación con Zod
    const result = schema.safeParse(formData);

    if (!result.success) {
      const formErrors: { email: string; password: string } = {
        email: "",
        password: "",
      };
      result.error.errors.forEach((err) => {
        formErrors[err.path[0] as "email" | "password"] = err.message;
      });
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/autenticacion/registrarse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error en el registro");

      alert("Registro exitoso");
    } catch {
      alert("Hubo un problema con el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-6xl font-semibold text-primary text-center">
        Registro
      </h1>
      <form
        className="form flex flex-col gap-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/3"
        onSubmit={handleSubmit}
        role="form"
      >
        <InputField
          label="Email"
          placeholder="usuario@dominio.com"
          footerText={errors.email}
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Contraseña"
          placeholder="* * * * * *"
          footerText={errors.password}
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button label="Registrarse" disabled={isLoading} />
      </form>
    </div>
  );
};

export default SignUp;
