// 📌 src/components/auth/register/SignUp.tsx

"use client";

import Button from "@/components/custom/Button";
import InputField from "@/components/custom/form/InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast from "react-hot-toast";

// Esquema de validación para el email y la contraseña (mínimo de 6 caracteres)
const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Función que maneja el cambio de los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación del formulario usando el esquema
    const result = schema.safeParse(formData);
    if (!result.success) {
      const formErrors = { email: "", password: "" };
      result.error.errors.forEach((err) => {
        if (err.path[0] === "email" || err.path[0] === "password") {
          // Asignar los errores específicos a los campos correspondientes
          formErrors[err.path[0] as keyof typeof formErrors] = err.message;
        }
      });
      setErrors(formErrors);
      toast.error("Por favor, corrige los errores en el formulario.");
      return;
    }

    // Indicar que el proceso de registro está en curso
    setIsLoading(true);
    try {
      // Enviar los datos del formulario al servidor para registrar al usuario
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error en el registro");

      // Notificar al usuario si el registro fue exitoso
      toast.success("Registro exitoso");
      router.push("/tablero"); // Redirigir al usuario al tablero
    } catch (error) {
      // Notificar al usuario si ocurrió algún error durante el registro
      toast.error(
        error instanceof Error
          ? error.message
          : "Hubo un problema con el registro"
      );
    }
    setIsLoading(false); // Terminar el estado de carga
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="mb-6 text-4xl font-semibold text-primary text-center">
        Registro
      </h1>
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        {/* Campo de entrada para el email */}
        <InputField
          label="Email"
          placeholder="usuario@dominio.com"
          footerText={errors.email}
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* Campo de entrada para la contraseña */}
        <InputField
          label="Contraseña"
          placeholder="* * * * * *"
          footerText={errors.password}
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* Botón de registro, deshabilitado si la contraseña tiene menos de 6 caracteres o está en proceso de carga */}
        <Button
          label={isLoading ? "Creando usuario..." : "Registrarse"}
          disabled={isLoading || formData.password.length < 6}
        />
      </form>
    </div>
  );
};

export default SignUp;

/**
 * 📌 RESUMEN DEL PROCESO:
 *
 * 1️ Validación de datos: Se asegura que el email sea válido y que la contraseña tenga al menos 6 caracteres.
 * 2️ Manejo de errores: Si hay errores en los datos, se muestran al usuario sin enviar la solicitud al servidor.
 * 3️ Registro de usuario: Se envía la información a la API para registrar al usuario en Supabase.
 * 4️ Gestión de sesión: En caso de éxito, se muestra una notificación y se redirige al usuario al tablero.
 * 5️ Interfaz responsiva: Se emplea `isLoading` para evitar múltiples envíos mientras el registro está en curso.
 * 6️ Notificaciones interactivas: Se informa al usuario del éxito o fallos en el proceso con `react-hot-toast`.
 *
 * Importancia: Este componente es clave en la experiencia de usuario, ya que gestiona el registro de manera segura,
 * evitando errores comunes, mejorando la accesibilidad y garantizando una transición fluida a la plataforma.
 */
