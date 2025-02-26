"use client";

import Button from "@/components/custom/Button";
import InputField from "@/components/custom/form/InputField";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Para redirigir
import { z } from "zod";
import toast from "react-hot-toast";

// Definir esquema de validación con Zod
const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const SignUp = () => {
  const router = useRouter(); // 👈 Hook de navegación
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
      const formErrors = { email: "", password: "" };
      result.error.errors.forEach((err) => {
        formErrors[err.path[0] as "email" | "password"] = err.message;
      });
      setErrors(formErrors);
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error en el registro");

      toast.success("Registro exitoso");

      // Redirigir al dashboard después de registrarse
      router.push("/tablero");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Hubo un problema con el registro"
      );
    }

    setIsLoading(false);
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

// Este componente gestiona el formulario de registro de usuarios en la aplicación.
// Utiliza un esquema de validación con Zod para asegurar que los datos ingresados sean correctos.
// Al enviar el formulario, se realiza una petición a la API de autenticación,
// la cual crea el usuario en Supabase y lo autentica automáticamente.
// En caso de éxito, el usuario es redirigido al dashboard; de lo contrario, se muestran mensajes de error.
// Además, se emplea un sistema de notificaciones para mejorar la experiencia del usuario.
