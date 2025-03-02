// src/app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold text-gray-400">Gestión Escolar</h1>
      <p className="text-gray-600 mt-2">
        Organiza tu escuela de manera eficiente
      </p>
      <div className="mt-6">
        <Link href="/autenticacion/registrarse">
          <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md">
            Ingresar
          </button>
        </Link>
      </div>
    </main>
  );
}
