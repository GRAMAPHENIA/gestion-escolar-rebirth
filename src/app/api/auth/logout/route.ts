import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

//  Crear cliente de Supabase con permisos de administrador
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

//  Función que maneja el cierre de sesión del usuario
export async function POST(request: NextRequest) {
  try {
    //  Obtener la cookie con el token de sesión
    const token = request.cookies.get("sb:token")?.value;

    //  Si no hay token, significa que el usuario no está autenticado
    if (!token) {
      return NextResponse.json(
        { error: "No hay sesión activa." },
        { status: 400 }
      );
    }

    //  Invalidar la sesión en Supabase Auth
    const { error } = await supabaseAdmin.auth.signOut();

    //  Manejo de errores al cerrar sesión
    if (error) {
      return NextResponse.json(
        { error: "Error al cerrar sesión." },
        { status: 500 }
      );
    }

    //  Crear una respuesta con la cookie de sesión eliminada
    const response = NextResponse.json(
      { message: "Sesión cerrada exitosamente." },
      { status: 200 }
    );

    response.cookies.set({
      name: "sb:token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 0, // Expirar la cookie inmediatamente
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
 * 1️ Validar sesión: Se revisa si el usuario tiene una sesión activa mediante la cookie.
 * 2️ Manejo de error: Si no hay sesión activa, se informa al usuario.
 * 3️ Cierre de sesión: Se invalida la sesión en Supabase Auth.
 * 4️ Manejo de errores: Si hay un problema al cerrar sesión, se devuelve un error.
 * 5️ Eliminación de cookie: Se borra la cookie de sesión para asegurar el cierre.
 * 6️ Respuesta al cliente: Se informa que la sesión se cerró correctamente.
 *
 * Importancia: Este endpoint garantiza un cierre de sesión seguro, eliminando la sesión
 * del usuario tanto en Supabase como en las cookies del navegador.
 */
