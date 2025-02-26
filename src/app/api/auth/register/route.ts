// 📌 src/app/api/auth/register/route.ts

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//  Crear cliente de Supabase con permisos de administrador
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

//  Definir esquema de validación con Zod para asegurar que los datos sean correctos
const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"), // Validación de contraseña con mínimo 6 caracteres
});

//  Función que maneja el registro de usuario
export async function POST(request: NextRequest) {
  try {
    //  Obtener los datos del cuerpo de la solicitud
    const body = await request.json();

    //  Validar los datos con Zod antes de enviarlos a Supabase
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { email, password } = body;

    //  Crear el usuario en Supabase Auth
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
    });

    //  Manejo de errores en el registro de Supabase Auth
    if (error) {
      let errorMessage = error.message;

      if (
        errorMessage.toLowerCase().includes("user already") ||
        errorMessage.toLowerCase().includes("email already")
      ) {
        errorMessage = "El correo ya está registrado.";
      }

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    //  Obtener el usuario creado
    const { user } = data;
    if (!user?.id) {
      return NextResponse.json(
        { error: "Error en el registro de usuario." },
        { status: 500 }
      );
    }

    //  Insertar el usuario en la tabla 'users' de la base de datos
    const { error: dbError } = await supabaseAdmin
      .from("users")
      .insert([{ email, user_id: user.id }]);

    //  Si falla la inserción en la base de datos, eliminar el usuario de Supabase Auth
    if (dbError) {
      await supabaseAdmin.auth.admin.deleteUser(user.id);
      return NextResponse.json(
        { error: "Error al guardar datos del usuario." },
        { status: 500 }
      );
    }

    //  Iniciar sesión automáticamente después del registro
    const { data: sessionData, error: loginError } =
      await supabaseAdmin.auth.signInWithPassword({
        email,
        password,
      });

    //  Manejo de error si el inicio de sesión falla
    if (loginError || !sessionData.session) {
      return NextResponse.json(
        { error: "Registro exitoso, pero fallo el login." },
        { status: 400 }
      );
    }

    //  Configurar cookie con el token de sesión
    const response = NextResponse.json(
      {
        message: "Registro exitoso",
        session: sessionData.session, // Se devuelve la sesión en la respuesta para evitar una consulta adicional
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "sb:token",
      value: sessionData.session.access_token || "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    //  Captura de errores inesperados en el servidor
    return NextResponse.json(
      { error: "Error inesperado en el servidor." },
      { status: 500 }
    );
  }
}

/**
 * 📌 RESUMEN DEL PROCESO:
 *
 * 1️ Recepción de datos: Se obtiene el email y contraseña del usuario.
 * 2️ Validación: Se verifica que los datos no estén vacíos y que la contraseña tenga al menos 6 caracteres.
 * 3️ Registro en Supabase: Se crea la cuenta en el sistema de autenticación de Supabase.
 * 4️ Manejo de errores: Se revisa si el usuario ya existe y se informa al cliente.
 * 5️ Almacén de datos: Se guarda la información en la tabla 'users' de la base de datos.
 * 6️ Inicio de sesión automático: Se autentica al usuario tras el registro exitoso.
 * 7️ Gestión de sesión: Se configura una cookie con el token de sesión para mantener la autenticación.
 * 8️ Manejo de errores: Se capturan fallos inesperados y se responde con mensajes apropiados.
 *
 * Importancia: Este componente es fundamental para gestionar la autenticación
 * en la aplicación, proporcionando un flujo eficiente de registro e inicio de sesión.
 * Permite a los usuarios acceder de manera inmediata tras el registro y mantiene
 * la seguridad mediante cookies de sesión.
 */
