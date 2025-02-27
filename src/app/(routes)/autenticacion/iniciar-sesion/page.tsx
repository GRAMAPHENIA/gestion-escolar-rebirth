"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast from "react-hot-toast";
import Button from "@/components/custom/Button";
import InputField from "@/components/custom/form/InputField";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = schema.safeParse(formData);
    if (!result.success) {
      const formErrors = { email: "", password: "" };
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email" || err.path[0] === "password") {
          formErrors[err.path[0] as keyof typeof formErrors] = err.message;
        }
      });
      setErrors(formErrors);
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al iniciar sesión");

      toast.success("Inicio de sesión exitoso");
      router.push("/tablero");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Hubo un problema con el inicio de sesión"
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="mb-6 text-4xl font-semibold text-primary text-center">
        Iniciar sesión
      </h1>
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
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
        <Button
          label={isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          disabled={isLoading || formData.password.length < 6}
        />
      </form>
    </div>
  );
};

export default LoginForm;