import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    // Crear el usuario en Supabase
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { user } = data;

    // Insertar en la tabla 'users'
    const { error: dbError } = await supabase.from("users").insert([{ email, user_id: user?.id }]);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    // Iniciar sesión automáticamente después de registrarse
    const { data: sessionData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      return NextResponse.json({ error: "Registro exitoso, pero fallo el login" }, { status: 400 });
    }

    // Configurar cookie de sesión
    const response = NextResponse.json({ message: "Registro exitoso" }, { status: 200 });
    response.cookies.set({
      name: "sb:token",
      value: sessionData.session?.access_token || "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error al registrar el usuario" }, { status: 500 });
  }
}
