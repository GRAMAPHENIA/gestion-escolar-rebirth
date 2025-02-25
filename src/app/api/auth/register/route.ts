import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    // Crear el usuario en Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { user } = data;

    // Aquí puedes agregar un paso adicional como crear un registro en una tabla de 'usuarios'
    // Ejemplo de inserción en la tabla 'users'
    const { error: dbError } = await supabase.from("users").insert([
      { email, user_id: user?.id },
    ]);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Registro exitoso" }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error al registrar el usuario" }, { status: 500 });
  }
}
